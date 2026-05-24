import type { AnimScript, AnimInstance } from './engine';
import {
  SPRITES,
  drawSceneRect,
  drawGround,
  drawBox,
  drawFoodBowl,
  drawDoor,
  drawTable,
  drawCup,
  drawSofa,
  drawBed,
  drawPlant,
  drawWindow,
  drawCarpet,
  drawStatusBar,
  drawTextBubble,
  drawShockwave,
  drawExplosion,
  drawClashAura,
  drawDamageNumber,
  drawHealNumber,
  drawLightning,
  drawVS,
  createParticle,
  SCENE_COLORS,
} from './sprites';

const D = '#1e1e1e';
const W = '#2d2d2d';

function drawSprite(
  ctx: CanvasRenderingContext2D,
  spriteKey: string,
  x: number, y: number,
  ps: number,
  flip: boolean = false
) {
  const frames = SPRITES[spriteKey];
  if (!frames || frames.length === 0) return;
  const grid = frames[0].pixels;
  const rows = grid.length;
  if (rows === 0) return;
  const cols = grid[0].length;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const color = grid[r][c];
      if (!color) continue;
      const px = flip
        ? Math.round((x + cols - 1 - c) * ps)
        : Math.round((x + c) * ps);
      const py = Math.round((y + r) * ps);
      ctx.fillStyle = color;
      ctx.fillRect(px, py, ps, ps);
    }
  }
}

function drawHandSprite(
  ctx: CanvasRenderingContext2D,
  x: number, y: number,
  ps: number,
  active: boolean
) {
  const spriteKey = active ? 'hand_scratch' : 'hand_reach';
  drawSprite(ctx, spriteKey, x, y, ps, false);
}

export const SCRIPTS: Record<string, AnimScript> = {
  // ========== CORE CODE ==========
  lick_fur: {
    loop: true,
    pixelSize: 4,
    bg: D,
    sceneDraw: (ctx, w, h, ps) => {
      drawGround(ctx, w, h, ps);
      drawPlant(ctx, 2, 12, ps);
    },
    steps: [
      { duration: 1.0, sprite: 'sit', catX: 10, catY: 8 },
      { duration: 0.8, sprite: 'lick', catX: 10, catY: 8, text: 'activate_saliva()' },
      { duration: 0.8, sprite: 'lick', catX: 10, catY: 8 },
      { duration: 0.6, sprite: 'sit', catX: 10, catY: 8 },
      { duration: 0.8, sprite: 'lick', catX: 10, catY: 8 },
      { duration: 0.8, sprite: 'lick', catX: 10, catY: 8 },
      { duration: 1.0, sprite: 'sit', catX: 10, catY: 8, text: 'cleanliness: 100%' },
    ],
  },

  bury_poop: {
    loop: true,
    pixelSize: 4,
    bg: D,
    sceneDraw: (ctx, w, h, ps) => {
      drawGround(ctx, w, h, ps);
      drawSceneRect(ctx, 20, 16, 4, 2, '#8b6914', ps);
    },
    steps: [
      { duration: 0.6, sprite: 'crouch', catX: 8, catY: 10 },
      { duration: 0.5, sprite: 'crouch', catX: 8, catY: 10,
        spawnParticles: () => [
          createParticle(10, 16, -1.5, -2, '#8b6914', 0.8),
          createParticle(11, 16, 0.5, -2.5, '#8b6914', 0.7),
          createParticle(12, 16, 1, -1.5, '#a07818', 0.9),
        ],
      },
      { duration: 0.5, sprite: 'crouch', catX: 8, catY: 10,
        spawnParticles: () => [
          createParticle(10, 16, -0.5, -2, '#8b6914', 0.6),
          createParticle(11, 16, 1, -2, '#a07818', 0.5),
        ],
      },
      { duration: 0.4, sprite: 'crouch', catX: 8, catY: 10 },
      { duration: 0.8, sprite: 'stand', catX: 12, catY: 8, text: 'buried!' },
      { duration: 0.6, sprite: 'walk', catX: 16, catY: 8, flip: true },
      { duration: 0.6, sprite: 'walk', catX: 20, catY: 8, flip: true },
    ],
  },

  push_things: {
    loop: true,
    pixelSize: 4,
    bg: D,
    sceneDraw: (ctx, w, h, ps, inst) => {
      drawGround(ctx, w, h, ps);
      drawTable(ctx, 4, 10, ps);
      const cupX = inst.sceneData.cupX ?? 10;
      const cupY = inst.sceneData.cupY ?? 8;
      drawCup(ctx, cupX, cupY, ps);
    },
    steps: [
      { duration: 0.8, sprite: 'walk', catX: 4, catY: 8, flip: false,
        sceneUpdate: (inst) => { inst.sceneData.cupX = 10; inst.sceneData.cupY = 8; },
      },
      { duration: 0.5, sprite: 'stand', catX: 8, catY: 8, flip: false },
      { duration: 0.4, sprite: 'crouch', catX: 10, catY: 10, flip: false },
      { duration: 0.3, sprite: 'crouch', catX: 10, catY: 10, flip: false,
        spawnParticles: () => [
          createParticle(11, 8, 0.5, 0, '#569cd6', 0.3),
        ],
      },
      { duration: 1.0, sprite: 'stand', catX: 10, catY: 8, flip: false,
        sceneUpdate: (inst, dt) => {
          inst.sceneData.cupY = (inst.sceneData.cupY ?? 8) + 8 * dt;
          if ((inst.sceneData.cupY ?? 8) > 17) inst.sceneData.cupY = 17;
        },
        spawnParticles: () => [
          createParticle(11, 17, -1, -1, '#569cd6', 0.5),
          createParticle(12, 17, 1, -1.5, '#569cd6', 0.4),
        ],
      },
      { duration: 1.2, sprite: 'sit', catX: 10, catY: 8, flip: false, text: 'chaos +20' },
    ],
  },

  enclosed_space: {
    loop: true,
    pixelSize: 4,
    bg: D,
    sceneDraw: (ctx, w, h, ps, inst) => {
      drawGround(ctx, w, h, ps);
      const boxOpen = inst.stepIdx < 3;
      drawBox(ctx, 14, 10, ps, boxOpen);
      drawWindow(ctx, 2, 4, ps);
    },
    steps: [
      { duration: 0.8, sprite: 'walk', catX: 4, catY: 8 },
      { duration: 0.5, sprite: 'stand', catX: 10, catY: 8, text: 'box detected' },
      { duration: 0.6, sprite: 'crouch', catX: 12, catY: 10, text: 'fits? True' },
      { duration: 0.8, sprite: 'crouch', catX: 14, catY: 12 },
      { duration: 1.5, sprite: 'curl', catX: 15, catY: 13 },
      { duration: 2.0, sprite: 'curl', catX: 15, catY: 13, text: 'safe +30' },
    ],
  },

  fight: {
    loop: true,
    pixelSize: 4,
    bg: D,
    sceneDraw: (ctx, w, h, ps) => {
      drawGround(ctx, w, h, ps);
      drawPlant(ctx, 22, 12, ps);
    },
    steps: [
      { duration: 0.8, sprite: 'walk', catX: 8, catY: 8, flip: false },
      { duration: 0.4, sprite: 'stand', catX: 8, catY: 8, flip: false, text: 'threat!' },
      { duration: 0.6, sprite: 'arch', catX: 6, catY: 6, flip: false },
      { duration: 0.5, sprite: 'hiss', catX: 6, catY: 8, flip: false,
        spawnParticles: () => [
          createParticle(10, 6, 2, -0.5, '#f44747', 0.8),
          createParticle(11, 6, 2.5, 0, '#f44747', 0.6, 1, 'circle'),
        ],
      },
      { duration: 0.4, sprite: 'hiss', catX: 6, catY: 8, flip: false },
      { duration: 0.8, sprite: 'stand', catX: 8, catY: 8, text: '威慑 +40' },
    ],
  },

  midnight_zoomies: {
    loop: true,
    pixelSize: 4,
    bg: '#111118',
    sceneDraw: (ctx, w, h, ps) => {
      drawGround(ctx, w, h, ps);
      drawSofa(ctx, 2, 12, ps);
      drawBed(ctx, 16, 12, ps);
      ctx.fillStyle = '#569cd6';
      ctx.font = 'bold 10px monospace';
      ctx.fillText('3:00 AM', 18, 8);
    },
    steps: [
      { duration: 0.5, sprite: 'stand', catX: 2, catY: 8, text: '3:00 AM!' },
      { duration: 0.25, sprite: 'sprint', catX: 6, catY: 8 },
      { duration: 0.25, sprite: 'sprint', catX: 12, catY: 8 },
      { duration: 0.25, sprite: 'sprint', catX: 18, catY: 6,
        spawnParticles: () => [
          createParticle(17, 8, -3, 0, '#858585', 0.5),
          createParticle(18, 8, -2, -1, '#858585', 0.4),
        ],
      },
      { duration: 0.25, sprite: 'sprint', catX: 12, catY: 10, flip: true },
      { duration: 0.25, sprite: 'sprint', catX: 6, catY: 8, flip: true },
      { duration: 0.25, sprite: 'sprint', catX: 2, catY: 8, flip: true },
      { duration: 1.0, sprite: 'sit', catX: 2, catY: 8, text: 'chaos +100' },
    ],
  },

  // ========== YUANTOU MAODIE ==========
  sanha_yiqiangpu: {
    loop: true,
    pixelSize: 4,
    bg: D,
    sceneDraw: (ctx, w, h, ps) => {
      drawGround(ctx, w, h, ps);
    },
    steps: [
      { duration: 0.6, sprite: 'arch', catX: 4, catY: 6, flip: false },
      { duration: 0.4, sprite: 'hiss', catX: 4, catY: 8, flip: false, text: '哈!',
        spawnParticles: () => [
          createParticle(8, 6, 3, 0, '#f44747', 0.6, 1, 'circle'),
          createParticle(8, 7, 3, 0.5, '#ff6600', 0.5, 1, 'circle'),
        ],
      },
      { duration: 0.4, sprite: 'hiss', catX: 4, catY: 8, flip: false, text: '哈!',
        spawnParticles: () => [
          createParticle(8, 6, 3, 0, '#f44747', 0.6, 1, 'circle'),
        ],
      },
      { duration: 0.4, sprite: 'hiss', catX: 4, catY: 8, flip: false, text: '哈!',
        spawnParticles: () => [
          createParticle(8, 6, 3, 0, '#f44747', 0.6, 1, 'circle'),
        ],
      },
      { duration: 0.3, sprite: 'pounce', catX: 10, catY: 4,
        spawnParticles: () => [
          createParticle(10, 8, 3, -1, '#f44747', 0.4, 1.5, 'star'),
          createParticle(11, 8, 4, -0.5, '#ff6600', 0.3, 1, 'star'),
        ],
      },
      { duration: 0.6, sprite: 'run', catX: 16, catY: 8, flip: true },
      { duration: 1.0, sprite: 'stand', catX: 2, catY: 8, text: 'damage +100' },
    ],
  },

  qiangchuang_mingzhai: {
    loop: true,
    pixelSize: 4,
    bg: D,
    sceneDraw: (ctx, w, h, ps) => {
      drawGround(ctx, w, h, ps);
      drawDoor(ctx, 14, 4, ps, true);
    },
    steps: [
      { duration: 0.6, sprite: 'walk', catX: 4, catY: 8 },
      { duration: 0.4, sprite: 'stand', catX: 10, catY: 8, text: 'door found' },
      { duration: 0.5, sprite: 'scratch', catX: 11, catY: 8,
        spawnParticles: () => [
          createParticle(14, 10, 0, 0, '#f44747', 0.3, 0.5),
          createParticle(14, 11, 0, 0, '#f44747', 0.3, 0.5),
          createParticle(14, 12, 0, 0, '#f44747', 0.3, 0.5),
        ],
      },
      { duration: 0.3, sprite: 'arch', catX: 8, catY: 6, text: 'locked!' },
      { duration: 0.3, sprite: 'pounce', catX: 12, catY: 4,
        spawnParticles: () => [
          createParticle(14, 8, -1, -1, '#ffcc00', 0.5, 1.5, 'star'),
          createParticle(15, 8, 0, -2, '#ffcc00', 0.4, 1, 'star'),
        ],
      },
      { duration: 1.2, sprite: 'stand', catX: 16, catY: 8, text: 'entered!' },
    ],
  },

  maoliang_qiduo: {
    loop: true,
    pixelSize: 4,
    bg: D,
    sceneDraw: (ctx, w, h, ps) => {
      drawGround(ctx, w, h, ps);
      drawFoodBowl(ctx, 18, 16, ps);
    },
    steps: [
      { duration: 0.5, sprite: 'sneak', catX: 4, catY: 10, text: 'food!' },
      { duration: 0.6, sprite: 'sneak', catX: 8, catY: 10 },
      { duration: 0.6, sprite: 'sneak', catX: 12, catY: 10 },
      { duration: 0.4, sprite: 'run', catX: 16, catY: 8 },
      { duration: 0.5, sprite: 'crouch', catX: 17, catY: 10,
        spawnParticles: () => [
          createParticle(19, 16, 0, -1, '#ce9178', 0.5, 1, 'circle'),
        ],
      },
      { duration: 0.6, sprite: 'run', catX: 12, catY: 8, flip: true },
      { duration: 0.6, sprite: 'run', catX: 6, catY: 8, flip: true },
      { duration: 1.0, sprite: 'sit', catX: 2, catY: 8, text: '饱腹 +80' },
    ],
  },

  zhuashang_renlei: {
    loop: true,
    pixelSize: 4,
    bg: D,
    sceneDraw: (ctx, w, h, ps) => {
      drawGround(ctx, w, h, ps);
    },
    steps: [
      { duration: 0.6, sprite: 'stand', catX: 8, catY: 8 },
      { duration: 0.4, sprite: 'arch', catX: 6, catY: 6, text: 'warning!' },
      { duration: 0.3, sprite: 'scratch', catX: 6, catY: 8,
        spawnParticles: () => [
          createParticle(10, 8, 4, 0, '#f44747', 0.3, 1.5),
          createParticle(10, 9, 4, 0.5, '#f44747', 0.2, 1),
          createParticle(10, 7, 4, -0.5, '#ff6600', 0.2, 1),
        ],
      },
      { duration: 0.6, sprite: 'stand', catX: 8, catY: 8, text: 'HP -30' },
      { duration: 0.5, sprite: 'run', catX: 14, catY: 8, flip: true },
      { duration: 1.0, sprite: 'sit', catX: 18, catY: 8, text: '无辜脸' },
    ],
  },

  haqi_jinggao: {
    loop: true,
    pixelSize: 4,
    bg: D,
    sceneDraw: (ctx, w, h, ps) => {
      drawGround(ctx, w, h, ps);
      drawPlant(ctx, 22, 12, ps);
    },
    steps: [
      { duration: 0.8, sprite: 'stand', catX: 8, catY: 8, text: 'level: low' },
      { duration: 0.5, sprite: 'stand', catX: 8, catY: 8,
        spawnParticles: () => [
          createParticle(10, 7, 1.5, 0, '#ffcc00', 0.4, 1, 'circle'),
        ],
      },
      { duration: 0.5, sprite: 'hiss', catX: 6, catY: 8, text: 'level: medium',
        spawnParticles: () => [
          createParticle(10, 6, 2, 0, '#ff6600', 0.5, 1.2, 'circle'),
          createParticle(10, 7, 2, 0.5, '#ff6600', 0.4, 1, 'circle'),
        ],
      },
      { duration: 0.4, sprite: 'arch', catX: 4, catY: 4, text: 'level: MAX!',
        spawnParticles: () => [
          createParticle(8, 4, 3, 0, '#f44747', 0.6, 1.5, 'star'),
          createParticle(8, 5, 3, 1, '#f44747', 0.5, 1, 'star'),
          createParticle(8, 3, 3, -1, '#ff6600', 0.5, 1, 'star'),
        ],
      },
      { duration: 1.0, sprite: 'stand', catX: 8, catY: 8 },
    ],
  },

  dawanjiupao: {
    loop: true,
    pixelSize: 4,
    bg: D,
    sceneDraw: (ctx, w, h, ps) => {
      drawGround(ctx, w, h, ps);
      drawBox(ctx, 20, 12, ps, false);
    },
    steps: [
      { duration: 0.4, sprite: 'scratch', catX: 8, catY: 8,
        spawnParticles: () => [
          createParticle(12, 8, 3, 0, '#f44747', 0.3, 1),
        ],
      },
      { duration: 0.25, sprite: 'sprint', catX: 12, catY: 8, flip: true },
      { duration: 0.25, sprite: 'sprint', catX: 8, catY: 8, flip: true },
      { duration: 0.25, sprite: 'sprint', catX: 4, catY: 8, flip: true },
      { duration: 0.25, sprite: 'sprint', catX: 2, catY: 8, flip: true },
      { duration: 1.5, sprite: 'curl', catX: 21, catY: 13, text: '躲起来了' },
      { duration: 0.8, sprite: 'sit', catX: 21, catY: 12, text: '无辜脸 :3' },
    ],
  },

  // ========== CONFLICT LAB - CLASSIC ==========
  'head-object': {
    loop: true,
    pixelSize: 4,
    bg: D,
    sceneDraw: (ctx, w, h, ps) => {
      drawGround(ctx, w, h, ps);
    },
    steps: [
      { duration: 0.6, sprite: 'walk', catX: 8, catY: 8 },
      { duration: 0.4, sprite: 'stand', catX: 8, catY: 8,
        spawnParticles: () => [
          createParticle(10, 3, 0, 1, '#ffcc00', 0.5, 2),
        ],
      },
      { duration: 2.0, sprite: 'frozen', catX: 8, catY: 8, text: '僵住了...' },
      { duration: 0.2, sprite: 'frozen', catX: 8, catY: 7.5 },
      { duration: 0.2, sprite: 'frozen', catX: 8, catY: 8.5 },
      { duration: 0.2, sprite: 'frozen', catX: 8, catY: 7.5 },
      { duration: 0.4, sprite: 'excite', catX: 8, catY: 8,
        spawnParticles: () => [
          createParticle(10, 5, 1, -2, '#ffcc00', 0.6, 1.5, 'star'),
        ],
      },
      { duration: 0.8, sprite: 'stand', catX: 8, catY: 8 },
    ],
  },

  'belly-rub': {
    loop: true,
    pixelSize: 4,
    bg: D,
    sceneDraw: (ctx, w, h, ps) => {
      drawGround(ctx, w, h, ps);
      drawCarpet(ctx, 4, 16, 16, 2, ps);
    },
    steps: [
      { duration: 1.0, sprite: 'dead', catX: 8, catY: 10, text: '摸我呀~' },
      { duration: 0.8, sprite: 'dead', catX: 8, catY: 10 },
      { duration: 0.3, sprite: 'arch', catX: 6, catY: 6,
        spawnParticles: () => [
          createParticle(10, 8, 2, 0, '#f44747', 0.4, 1),
          createParticle(10, 9, 2, 0.5, '#f44747', 0.3, 1),
        ],
      },
      { duration: 0.4, sprite: 'scratch', catX: 6, catY: 8, text: '咬!' },
      { duration: 0.6, sprite: 'run', catX: 14, catY: 8, flip: true },
      { duration: 1.0, sprite: 'stand', catX: 18, catY: 8 },
    ],
  },

  'finger-point': {
    loop: true,
    pixelSize: 4,
    bg: D,
    sceneDraw: (ctx, w, h, ps) => {
      drawGround(ctx, w, h, ps);
      ctx.fillStyle = '#858585';
      ctx.fillRect(20 * ps, 8 * ps, ps, 3 * ps);
      ctx.fillRect(21 * ps, 7 * ps, ps, ps);
    },
    steps: [
      { duration: 0.6, sprite: 'stand', catX: 8, catY: 8, flip: false },
      { duration: 0.4, sprite: 'stand', catX: 8, catY: 8, flip: false, text: '手指!' },
      { duration: 0.3, sprite: 'stand', catX: 8, catY: 8, flip: false },
      { duration: 0.3, sprite: 'stand', catX: 8, catY: 8, flip: false },
      { duration: 0.3, sprite: 'stand', catX: 8, catY: 8, flip: false },
      { duration: 1.0, sprite: 'frozen', catX: 8, catY: 8, text: '看手指...' },
    ],
  },

  'water-grooming': {
    loop: true,
    pixelSize: 4,
    bg: D,
    sceneDraw: (ctx, w, h, ps) => {
      drawGround(ctx, w, h, ps);
      drawSceneRect(ctx, 18, 16, 3, 2, '#569cd6', ps);
      drawSceneRect(ctx, 18, 15, 3, 1, '#858585', ps);
    },
    steps: [
      { duration: 0.8, sprite: 'crouch', catX: 14, catY: 10 },
      { duration: 0.4, sprite: 'crouch', catX: 14, catY: 10, text: '喝水...' },
      { duration: 0.25, sprite: 'lick', catX: 10, catY: 8 },
      { duration: 0.25, sprite: 'lick', catX: 10, catY: 8 },
      { duration: 0.25, sprite: 'lick', catX: 10, catY: 8 },
      { duration: 0.25, sprite: 'lick', catX: 10, catY: 8 },
      { duration: 0.25, sprite: 'lick', catX: 10, catY: 8 },
      { duration: 0.25, sprite: 'lick', catX: 10, catY: 8, text: '停不下来...' },
    ],
  },

  'tail-up': {
    loop: true,
    pixelSize: 4,
    bg: D,
    sceneDraw: (ctx, w, h, ps) => {
      drawGround(ctx, w, h, ps);
      drawSofa(ctx, 16, 12, ps);
    },
    steps: [
      { duration: 0.6, sprite: 'excite', catX: 8, catY: 8, text: '开心!' },
      { duration: 0.25, sprite: 'arch', catX: 8, catY: 6, text: '警戒!' },
      { duration: 0.4, sprite: 'excite', catX: 8, catY: 8, text: '开心!' },
      { duration: 0.25, sprite: 'arch', catX: 8, catY: 6, text: '警戒!' },
      { duration: 0.4, sprite: 'excite', catX: 8, catY: 8, text: '开心!' },
      { duration: 0.25, sprite: 'arch', catX: 8, catY: 6, text: '警戒!' },
      { duration: 0.8, sprite: 'stand', catX: 8, catY: 8 },
    ],
  },

  'escape-eat': {
    loop: true,
    pixelSize: 4,
    bg: D,
    sceneDraw: (ctx, w, h, ps) => {
      drawGround(ctx, w, h, ps);
      drawFoodBowl(ctx, 18, 16, ps);
      drawPlant(ctx, 22, 12, ps);
    },
    steps: [
      { duration: 0.5, sprite: 'sneak', catX: 6, catY: 10, text: 'food!' },
      { duration: 0.3, sprite: 'run', catX: 10, catY: 8 },
      { duration: 0.25, sprite: 'arch', catX: 8, catY: 6, text: 'danger!' },
      { duration: 0.3, sprite: 'run', catX: 4, catY: 8, flip: true },
      { duration: 0.3, sprite: 'sneak', catX: 6, catY: 10 },
      { duration: 0.3, sprite: 'run', catX: 10, catY: 8 },
      { duration: 0.25, sprite: 'arch', catX: 8, catY: 6 },
      { duration: 0.3, sprite: 'run', catX: 4, catY: 8, flip: true },
      { duration: 0.25, sprite: 'run', catX: 14, catY: 8 },
      { duration: 0.25, sprite: 'run', catX: 18, catY: 8,
        spawnParticles: () => [
          createParticle(19, 16, 0, -1, '#ce9178', 0.4, 1, 'circle'),
        ],
      },
      { duration: 0.6, sprite: 'run', catX: 4, catY: 8, flip: true, text: '叼走了!' },
      { duration: 0.4, sprite: 'run', catX: 0, catY: 8, flip: true },
    ],
  },

  // ========== EPIC CONFLICTS (Phase 3: Dual Character + Effects) ==========
  'yuantou-vs-baishoutao': {
    loop: true,
    pixelSize: 4,
    bg: D,
    sceneDraw: (ctx, w, h, ps, inst) => {
      drawGround(ctx, w, h, ps);
      drawFoodBowl(ctx, 14, 16, ps);
      drawHandSprite(ctx, 20, 8, ps, inst.stepIdx >= 2 && inst.stepIdx <= 4);
      if (inst.stepIdx >= 3) {
        drawClashAura(ctx, 16, 10, 4, '#f44747', '#d4a574', inst.time, ps);
      }
      if (inst.stepIdx === 3) {
        drawLightning(ctx, 14, 8, 20, 8, ps, '#f44747', 0.6);
      }
    },
    steps: [
      { duration: 0.6, sprite: 'sneak', catX: 8, catY: 10, text: '偷吃!' },
      { duration: 0.5, sprite: 'crouch', catX: 10, catY: 10 },
      { duration: 0.4, sprite: 'arch', catX: 8, catY: 6, text: '人来了!',
        spawnParticles: () => [
          createParticle(20, 8, -2, 0, '#d4a574', 0.5, 1),
        ],
      },
      { duration: 0.4, sprite: 'scratch', catX: 8, catY: 8,
        spawnParticles: () => [
          createParticle(14, 8, 3, -1, '#f44747', 0.4, 1.5, 'star'),
          createParticle(14, 9, 3, 0, '#ff6600', 0.3, 1, 'star'),
          createParticle(20, 8, -2, 0, '#d4a574', 0.3, 1),
        ],
      },
      { duration: 0.5, sprite: 'crouch', catX: 12, catY: 10,
        spawnParticles: () => [
          createParticle(15, 16, 0, -1.5, '#ce9178', 0.5, 1, 'circle'),
        ],
      },
      { duration: 1.0, sprite: 'sit', catX: 12, catY: 10, text: '吃饱了~' },
    ],
  },

  'yuantou-vs-hajimi': {
    loop: true,
    pixelSize: 4,
    bg: D,
    sceneDraw: (ctx, w, h, ps, inst) => {
      drawGround(ctx, w, h, ps);
      drawFoodBowl(ctx, 16, 16, ps);
      drawSprite(ctx, 'gentle_stand', 20, 8, ps, true);
      if (inst.stepIdx >= 2 && inst.stepIdx <= 3) {
        drawClashAura(ctx, 14, 8, 3, '#f44747', '#4ec9b0', inst.time, ps);
      }
      if (inst.stepIdx >= 4) {
        drawSprite(ctx, 'gentle_cower', 20, 10, ps, true);
      }
    },
    steps: [
      { duration: 0.6, sprite: 'walk', catX: 4, catY: 8 },
      { duration: 0.4, sprite: 'arch', catX: 4, catY: 6, text: '哈基米!' },
      { duration: 0.5, sprite: 'hiss', catX: 4, catY: 8, text: '滚!',
        spawnParticles: () => [
          createParticle(8, 6, 3, 0, '#f44747', 0.6, 1.5, 'circle'),
          createParticle(8, 7, 3, 0.5, '#ff6600', 0.5, 1, 'circle'),
        ],
      },
      { duration: 0.3, sprite: 'pounce', catX: 10, catY: 4,
        spawnParticles: () => [
          createParticle(12, 8, 2, -1, '#f44747', 0.4, 1.5, 'star'),
        ],
      },
      { duration: 0.8, sprite: 'crouch', catX: 14, catY: 10,
        spawnParticles: () => [
          createParticle(17, 16, 0, -1, '#ce9178', 0.5, 1, 'circle'),
        ],
      },
      { duration: 1.2, sprite: 'sit', catX: 14, catY: 10, text: '霸占!' },
    ],
  },

  'yuantou-vs-strays': {
    loop: true,
    pixelSize: 4,
    bg: D,
    sceneDraw: (ctx, w, h, ps, inst) => {
      drawGround(ctx, w, h, ps);
      drawSprite(ctx, 'stray_stand', 20, 8, ps, true);
      drawSprite(ctx, 'stray_stand', 22, 10, ps, true);
      if (inst.stepIdx >= 2) {
        drawSprite(ctx, 'stray_arch', 20, 6, ps, true);
        drawSprite(ctx, 'stray_arch', 22, 8, ps, true);
      }
      if (inst.stepIdx === 2) {
        drawClashAura(ctx, 12, 8, 5, '#f44747', '#6a9955', inst.time, ps);
        drawVS(ctx, 14, 4, inst.time, ps);
      }
      if (inst.stepIdx >= 3) {
        drawStatusBar(ctx, 20, 4, 6, 20, 100, '#f44747', ps, '勇气: 20');
        drawStatusBar(ctx, 22, 6, 6, 10, 100, '#f44747', ps, '勇气: 10');
      }
    },
    steps: [
      { duration: 0.5, sprite: 'walk', catX: 4, catY: 8 },
      { duration: 0.4, sprite: 'arch', catX: 4, catY: 6, text: '入侵者!' },
      { duration: 0.6, sprite: 'hiss', catX: 4, catY: 8, text: '哈!!!',
        spawnParticles: () => [
          createParticle(8, 6, 4, 0, '#f44747', 0.7, 2, 'star'),
          createParticle(8, 7, 4, 1, '#ff6600', 0.6, 1.5, 'star'),
          createParticle(8, 5, 4, -1, '#ffcc00', 0.5, 1, 'star'),
        ],
      },
      { duration: 0.5, sprite: 'hiss', catX: 4, catY: 8,
        spawnParticles: () => [
          createParticle(8, 6, 3, 0, '#f44747', 0.5, 1.5, 'star'),
        ],
      },
      { duration: 0.8, sprite: 'stand', catX: 8, catY: 8, text: '勇气 -200' },
      { duration: 1.2, sprite: 'sit', catX: 12, catY: 8, text: '猫王!' },
    ],
  },

  'yuantou-vs-door': {
    loop: true,
    pixelSize: 4,
    bg: D,
    sceneDraw: (ctx, w, h, ps, inst) => {
      drawGround(ctx, w, h, ps);
      const doorOpen = inst.stepIdx >= 3;
      drawDoor(ctx, 16, 4, ps, !doorOpen);
      if (inst.stepIdx === 2) {
        drawExplosion(ctx, 20, 10, inst.stepTimer * 10, 1, ps);
        drawShockwave(ctx, 20, 10, inst.stepTimer * 15, 8, '#ffcc00', ps);
      }
    },
    steps: [
      { duration: 0.5, sprite: 'walk', catX: 4, catY: 8 },
      { duration: 0.3, sprite: 'stand', catX: 10, catY: 8, text: '关门?' },
      { duration: 0.5, sprite: 'run', catX: 12, catY: 8 },
      { duration: 0.3, sprite: 'pounce', catX: 14, catY: 4, text: '砰!',
        spawnParticles: () => [
          createParticle(16, 8, -2, -2, '#ffcc00', 0.5, 2, 'star'),
          createParticle(17, 8, 0, -3, '#ff6600', 0.4, 1.5, 'star'),
          createParticle(16, 9, -2, 0, '#ffcc00', 0.4, 1, 'star'),
          createParticle(18, 7, 1, -2, '#f44747', 0.3, 1, 'star'),
        ],
      },
      { duration: 0.8, sprite: 'stand', catX: 18, catY: 8, text: '开了!' },
      { duration: 0.8, sprite: 'walk', catX: 22, catY: 8 },
    ],
  },

  'yuantou-vs-laser': {
    loop: true,
    pixelSize: 4,
    bg: D,
    sceneDraw: (ctx, w, h, ps, inst) => {
      drawGround(ctx, w, h, ps);
      drawFoodBowl(ctx, 18, 16, ps);
      const lx = 4 + Math.sin(inst.time * 5) * 8;
      const ly = 14 + Math.cos(inst.time * 4) * 3;
      ctx.fillStyle = 'rgba(244, 71, 71, 0.2)';
      ctx.beginPath();
      ctx.arc(lx * ps, ly * ps, ps * 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#f44747';
      ctx.beginPath();
      ctx.arc(lx * ps, ly * ps, ps * 0.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ff6666';
      ctx.beginPath();
      ctx.arc(lx * ps, ly * ps, ps * 0.4, 0, Math.PI * 2);
      ctx.fill();
      if (inst.stepIdx >= 4) {
        drawTextBubble(ctx, '无聊...', 8, 4, ps, 1, '#858585');
      }
    },
    steps: [
      { duration: 0.4, sprite: 'stand', catX: 14, catY: 8, text: '红点?' },
      { duration: 0.3, sprite: 'excite', catX: 14, catY: 8 },
      { duration: 0.6, sprite: 'run', catX: 10, catY: 8 },
      { duration: 0.4, sprite: 'stand', catX: 14, catY: 8 },
      { duration: 0.8, sprite: 'crouch', catX: 15, catY: 10, text: '不如猫粮' },
      { duration: 1.5, sprite: 'crouch', catX: 15, catY: 10 },
      { duration: 1.0, sprite: 'sit', catX: 15, catY: 10, text: '无视!' },
    ],
  },
};
