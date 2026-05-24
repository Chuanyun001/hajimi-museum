import {
  SPRITES,
  SCENE_COLORS,
  Particle,
  createParticle,
  updateParticle,
  drawParticle,
  type PixelGrid,
  type SpriteFrame,
} from './sprites';

export interface AnimInstance {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  script: AnimScript;
  state: AnimState;
  visible: boolean;
  time: number;
  frameIdx: number;
  frameTimer: number;
  particles: Particle[];
  catX: number;
  catY: number;
  catFlip: boolean;
  sceneData: Record<string, number>;
  stepIdx: number;
  stepTimer: number;
  textBubble: string | null;
  textTimer: number;
}

export interface AnimState {
  sprite: string;
  catX: number;
  catY: number;
  flip: boolean;
}

export interface AnimStep {
  duration: number;
  sprite: string;
  catX?: number;
  catY?: number;
  flip?: boolean;
  moveX?: number;
  moveY?: number;
  spawnParticles?: () => Particle[];
  sceneUpdate?: (inst: AnimInstance, dt: number) => void;
  text?: string;
  onEnter?: (inst: AnimInstance) => void;
}

export interface AnimScript {
  steps: AnimStep[];
  pixelSize?: number;
  bg?: string;
  sceneDraw?: (ctx: CanvasRenderingContext2D, w: number, h: number, ps: number, inst: AnimInstance) => void;
  loop?: boolean;
}

const instances: AnimInstance[] = [];
let animId: number | null = null;
let lastTime = 0;
const TARGET_FPS = 10;
const FRAME_DURATION = 1000 / TARGET_FPS;

export function registerInstance(canvas: HTMLCanvasElement, script: AnimScript): AnimInstance {
  const ctx = canvas.getContext('2d')!;
  const inst: AnimInstance = {
    canvas,
    ctx,
    script,
    state: { sprite: 'stand', catX: 5, catY: 10, flip: false },
    visible: false,
    time: 0,
    frameIdx: 0,
    frameTimer: 0,
    particles: [],
    catX: script.steps[0]?.catX ?? 5,
    catY: script.steps[0]?.catY ?? 10,
    catFlip: script.steps[0]?.flip ?? false,
    sceneData: {},
    stepIdx: 0,
    stepTimer: 0,
    textBubble: null,
    textTimer: 0,
  };
  instances.push(inst);
  ensureLoop();
  return inst;
}

export function unregisterInstance(inst: AnimInstance) {
  const idx = instances.indexOf(inst);
  if (idx >= 0) instances.splice(idx, 1);
  if (instances.length === 0 && animId !== null) {
    cancelAnimationFrame(animId);
    animId = null;
  }
}

export function setVisible(inst: AnimInstance, visible: boolean) {
  inst.visible = visible;
}

function ensureLoop() {
  if (animId !== null) return;
  lastTime = performance.now();
  animId = requestAnimationFrame(tick);
}

function tick(now: number) {
  const elapsed = now - lastTime;
  if (elapsed >= FRAME_DURATION) {
    lastTime = now - (elapsed % FRAME_DURATION);
    const dt = elapsed / 1000;
    for (const inst of instances) {
      if (inst.visible) {
        updateInstance(inst, dt);
        renderInstance(inst);
      }
    }
  }
  animId = requestAnimationFrame(tick);
}

function updateInstance(inst: AnimInstance, dt: number) {
  const { script } = inst;
  const steps = script.steps;
  if (steps.length === 0) return;

  inst.time += dt;
  inst.stepTimer += dt;
  inst.frameTimer += dt;
  inst.textTimer -= dt;
  if (inst.textTimer <= 0) inst.textBubble = null;

  const step = steps[inst.stepIdx];
  if (inst.stepTimer >= step.duration) {
    inst.stepTimer = 0;
    inst.stepIdx = (inst.stepIdx + 1) % steps.length;
    if (inst.stepIdx === 0 && !script.loop) {
      inst.stepIdx = steps.length - 1;
    }
    const nextStep = steps[inst.stepIdx];
    if (nextStep.onEnter) nextStep.onEnter(inst);
    if (nextStep.text) {
      inst.textBubble = nextStep.text;
      inst.textTimer = nextStep.duration * 0.8;
    }
  }

  const curStep = steps[inst.stepIdx];

  if (curStep.catX !== undefined) inst.catX = curStep.catX;
  if (curStep.catY !== undefined) inst.catY = curStep.catY;
  if (curStep.flip !== undefined) inst.catFlip = curStep.flip;
  if (curStep.moveX !== undefined) inst.catX += curStep.moveX * dt;
  if (curStep.moveY !== undefined) inst.catY += curStep.moveY * dt;

  if (curStep.spawnParticles) {
    const newP = curStep.spawnParticles();
    inst.particles.push(...newP);
  }

  if (curStep.sceneUpdate) curStep.sceneUpdate(inst, dt);

  inst.particles = inst.particles.filter(p => updateParticle(p, dt));

  const spriteKey = curStep.sprite;
  const frames = SPRITES[spriteKey];
  if (frames && frames.length > 1) {
    if (inst.frameTimer >= 0.3) {
      inst.frameTimer = 0;
      inst.frameIdx = (inst.frameIdx + 1) % frames.length;
    }
  } else {
    inst.frameIdx = 0;
  }
}

function renderInstance(inst: AnimInstance) {
  const { ctx, canvas, script } = inst;
  const w = canvas.width;
  const h = canvas.height;
  const ps = script.pixelSize ?? 4;

  ctx.clearRect(0, 0, w, h);

  if (script.bg) {
    ctx.fillStyle = script.bg;
    ctx.fillRect(0, 0, w, h);
  }

  if (script.sceneDraw) {
    script.sceneDraw(ctx, w, h, ps, inst);
  }

  for (const p of inst.particles) {
    drawParticle(ctx, p, ps);
  }

  const spriteKey = script.steps[inst.stepIdx]?.sprite ?? 'stand';
  const frames = SPRITES[spriteKey];
  if (frames) {
    const frame = frames[inst.frameIdx % frames.length];
    drawSprite(ctx, frame.pixels, inst.catX, inst.catY, ps, inst.catFlip);
  }

  if (inst.textBubble && inst.textTimer > 0) {
    drawTextBubble(ctx, inst.textBubble, inst.catX, inst.catY - 3, ps, inst.textTimer);
  }
}

function drawSprite(
  ctx: CanvasRenderingContext2D,
  grid: PixelGrid,
  ox: number, oy: number,
  ps: number,
  flip: boolean
) {
  const rows = grid.length;
  if (rows === 0) return;
  const cols = grid[0].length;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const color = grid[r][c];
      if (!color) continue;
      const px = flip
        ? Math.round((ox + cols - 1 - c) * ps)
        : Math.round((ox + c) * ps);
      const py = Math.round((oy + r) * ps);
      ctx.fillStyle = color;
      ctx.fillRect(px, py, ps, ps);
    }
  }
}

function drawTextBubble(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number, y: number,
  ps: number,
  alpha: number
) {
  const px = Math.round(x * ps);
  const py = Math.round(y * ps);
  ctx.globalAlpha = Math.min(1, alpha * 2);
  ctx.fillStyle = '#252526';
  const tw = text.length * 5 + 8;
  ctx.fillRect(px - 2, py - 8, tw, 10);
  ctx.strokeStyle = '#569cd6';
  ctx.lineWidth = 1;
  ctx.strokeRect(px - 2, py - 8, tw, 10);
  ctx.fillStyle = '#d4d4d4';
  ctx.font = '8px monospace';
  ctx.fillText(text, px + 2, py);
  ctx.globalAlpha = 1;
}

export function drawRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number,
  w: number, h: number,
  color: string, ps: number
) {
  ctx.fillStyle = color;
  ctx.fillRect(
    Math.round(x * ps),
    Math.round(y * ps),
    Math.round(w * ps),
    Math.round(h * ps)
  );
}

export { SCENE_COLORS };
