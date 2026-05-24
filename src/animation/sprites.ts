export type PixelGrid = (string | null)[][];

export interface SpriteFrame {
  pixels: PixelGrid;
  offsetX?: number;
  offsetY?: number;
}

const C: Record<string, string> = {
  b: '#d4d4d4',
  B: '#a0a0a0',
  e: '#569cd6',
  E: '#f44747',
  n: '#ce9178',
  d: '#1e1e1e',
  w: '#ffffff',
  g: '#6a9955',
  y: '#ffcc00',
  o: '#dcdcaa',
  p: '#c586c0',
  t: '#8b6914',
  G: '#3c3c3c',
  r: '#ff6600',
  c: '#4ec9b0',
  h: '#d4a574',
};

export { C as COLOR_MAP };

function parseGrid(rows: string[]): PixelGrid {
  return rows.map(row => {
    const cells: (string | null)[] = [];
    for (let i = 0; i < row.length; i += 2) {
      const ch = row[i];
      cells.push(ch === '.' ? null : (C[ch] || null));
    }
    return cells;
  });
}

const STAND = parseGrid([
  '..ee....ee..',
  '.bbbbbbbbbb.',
  '.bebbbbbbeb.',
  '.bbbnnnbbbb.',
  '.bbbdbdbbbb.',
  '..bbbbbbbb..',
  '..bbbbbbbb..',
  '.bbbbbbbbbb.',
  '.bb......bb.',
  '.bb......bb.',
]);

const STAND2 = parseGrid([
  '..ee....ee..',
  '.bbbbbbbbbb.',
  '.bebbbbbbeb.',
  '.bbbnnnbbbb.',
  '.bbbdbdbbbb.',
  '..bbbbbbbb..',
  '..bbbbbbbb..',
  '.bbbbbbbbbb.',
  '.bb......bb.',
  '.bb......bb.',
]);

const SIT = parseGrid([
  '..ee....ee..',
  '.bbbbbbbbbb.',
  '.bebbbbbbeb.',
  '.bbbnnnbbbb.',
  '.bbbdbdbbbb.',
  '..bbbbbbbb..',
  '.bbbbbbbbbbb',
  '.bbbbbbbbbbb',
  '.bbbbbbbbbbb',
  '.bbb....bbb.',
]);

const WALK1 = parseGrid([
  '............',
  '..ee....ee..',
  '.bbbbbbbbbb.',
  '.bebbbbbbeb.',
  '.bbbnnnbbbb.',
  '..bbbbbbbb..',
  '..bbbbbbbb..',
  '.bbbbbbbbbb.',
  '.b.b....b.b.',
  '.b.b....b.b.',
]);

const WALK2 = parseGrid([
  '............',
  '..ee....ee..',
  '.bbbbbbbbbb.',
  '.bebbbbbbeb.',
  '.bbbnnnbbbb.',
  '..bbbbbbbb..',
  '..bbbbbbbb..',
  '.bbbbbbbbbb.',
  '..b......b..',
  '..b......b..',
]);

const RUN1 = parseGrid([
  '............',
  '............',
  '..eeeeee....',
  '.bbbbbbbbbb.',
  '.bebbbbbbeb.',
  '.bbbnnnbbbb.',
  '..bbbbbbbb..',
  '.bbbbbbbbbb.',
  'b.b......b.b',
  'b.b......b.b',
]);

const RUN2 = parseGrid([
  '............',
  '............',
  '..eeeeee....',
  '.bbbbbbbbbb.',
  '.bebbbbbbeb.',
  '.bbbnnnbbbb.',
  '..bbbbbbbb..',
  '.bbbbbbbbbb.',
  '.bb......bb.',
  '.bb......bb.',
]);

const HISS = parseGrid([
  '.ee......ee.',
  'bbbbbbbbbbbb',
  'bebbbbbbbeB.',
  'bbbnnnbbbbb.',
  'bbbdddbbbbb.',
  'bbbdddbbbbb.',
  '..bbbbbbbb..',
  '..bbbbbbbb..',
  '.bbbbbbbbbb.',
  '.bb......bb.',
]);

const ARCH = parseGrid([
  'ee........ee',
  'bbbbbbbbbbbb',
  'beEbbbbbbEbb',
  'bbbnnnbbbbb.',
  'bbbdbdbbbbb.',
  '.bbbbbbbbbb.',
  '..bbbbbbbb..',
  '...bbbbbb...',
  '.bb......bb.',
  '.bb......bb.',
]);

const LICK1 = parseGrid([
  '..ee....ee..',
  '.bbbbbbbbbb.',
  '.bebbbbbbeb.',
  '.bbbnnnwbbb.',
  '.bbbdbdbbbb.',
  '..bbbbbbbb..',
  '..bbbbbbbb..',
  '.bbbbbbbbbb.',
  '.bb......bb.',
  '.bb......bb.',
]);

const LICK2 = parseGrid([
  '..ee....ee..',
  '.bbbbbbbbbb.',
  '.bebbbbbbeb.',
  '.bbbnnnbbbb.',
  '.bbbdbwbbbb.',
  '..bbbbbbbb..',
  '..bbbbbbbb..',
  '.bbbbbbbbbb.',
  '.bb......bb.',
  '.bb......bb.',
]);

const CROUCH = parseGrid([
  '............',
  '............',
  '..ee....ee..',
  '.bbbbbbbbbb.',
  '.bebbbbbbeb.',
  '.bbbnnnbbbb.',
  '.bbbdbdbbbb.',
  '.bbbbbbbbbb.',
  '.bbbbbbbbbb.',
  '.bb......bb.',
]);

const CURL = parseGrid([
  '............',
  '............',
  '............',
  '..eeeeee....',
  '.bbbbbbbbbb.',
  '.bebbbbbbeb.',
  '.bbbbnnnbbb.',
  '.bbbbbbbbbb.',
  '.bbbbbbbbbb.',
  '..bbbbbbbb..',
]);

const POUNCE = parseGrid([
  'ee........ee',
  'bbbbbbbbbbbb',
  'beEbbbbbbEbb',
  'bbbnnnbbbbb.',
  'bbbdbdbbbbb.',
  '.bbbbbbbbbb.',
  '..bbbbbbbb..',
  '.bb......bb.',
  'bb........bb',
  'bb........bb',
]);

const FROZEN = parseGrid([
  '..ee....ee..',
  '.bbbbbbbbbb.',
  '.bEbbbbbEb..',
  '.bbbnnnbbbb.',
  '.bbbdbdbbbb.',
  '..bbbbbbbb..',
  '..bbbbbbbb..',
  '.bbbbbbbbbb.',
  '.bb......bb.',
  '.bb......bb.',
]);

const DEAD = parseGrid([
  '............',
  '............',
  '............',
  '.bbbbbbbbbb.',
  '.bEbbbbbEbb.',
  '.bbbnnnbbbb.',
  '.bbbdddbbbb.',
  '.bbbbbbbbbb.',
  '.bbbbbbbbbb.',
  'bbbbbbbbbbbb',
]);

const EXCITE = parseGrid([
  '.ee......ee.',
  '.bbbbbbbbbb.',
  '.bebbbbbbeb.',
  '.bbbnnnbbbb.',
  '.bbbdbdbbbb.',
  '..bbbbbbbb..',
  '..bbbbbbbb..',
  '.bbbbbbbbbb.',
  '.b.b....b.b.',
  '.b.b....b.b.',
]);

const SNEAK = parseGrid([
  '............',
  '............',
  '..ee....ee..',
  '.bbbbbbbbbb.',
  '.bebbbbbbeb.',
  '.bbbnnnbbbb.',
  '..bbbbbbbb..',
  '.bbbbbbbbbb.',
  '.bbbbbbbbbb.',
  '.bb......bb.',
]);

const EAT = parseGrid([
  '............',
  '..ee....ee..',
  '.bbbbbbbbbb.',
  '.bebbbbbbeb.',
  '.bbbnnnbbbb.',
  '.bbbdbdbbbb.',
  '..bbbbbbbb..',
  '.bbbbbbbbbb.',
  '.bb......bb.',
  '.bb......bb.',
]);

const SCRATCH = parseGrid([
  '.ee......ee.',
  'bbbbbbbbbbbb',
  'beEbbbbbbEbb',
  'bbbnnnbbbbb.',
  'bbbdddbbbbb.',
  '..bbbbbbbb..',
  '..bbbbbbbb..',
  '.bbbbbbbbbb.',
  '.bb......bb.',
  '.bb......bb.',
]);

const SPRINT1 = parseGrid([
  '............',
  '............',
  '............',
  '..eeeeee....',
  '.bbbbbbbbbb.',
  '.bebbbbbbeb.',
  '.bbbnnnbbbb.',
  '.bbbbbbbbbb.',
  'b.b......b.b',
  'b.b......b.b',
]);

const SPRINT2 = parseGrid([
  '............',
  '............',
  '............',
  '..eeeeee....',
  '.bbbbbbbbbb.',
  '.bebbbbbbeb.',
  '.bbbnnnbbbb.',
  '.bbbbbbbbbb.',
  '.bb......bb.',
  '.bb......bb.',
]);

const GENTLE_STAND = parseGrid([
  '..ee....ee..',
  '.cccccccccc.',
  '.ceccccccec.',
  '.cccnnncccc.',
  '.cccdbdcccc.',
  '..cccccccc..',
  '..cccccccc..',
  '.cccccccccc.',
  '.cc......cc.',
  '.cc......cc.',
]);

const GENTLE_COWER = parseGrid([
  '............',
  '............',
  '..ee....ee..',
  '.cccccccccc.',
  '.ceccccccec.',
  '.cccnnncccc.',
  '.cccdbdcccc.',
  '.cccccccccc.',
  '.cccccccccc.',
  '.cc......cc.',
]);

const HAND_REACH = parseGrid([
  '............',
  '............',
  '............',
  '............',
  '...hhhh.....',
  '..hhhhhh....',
  '..hhhhhh....',
  '...hhhh.....',
  '....hh......',
  '....hh......',
]);

const HAND_SCRATCH = parseGrid([
  '............',
  '............',
  '............',
  '...hhhh.....',
  '..hhhhhh....',
  '..hhhhhh....',
  '..hhhhhh....',
  '...hhhh.....',
  '....hh......',
  '............',
]);

const STRAY_STAND = parseGrid([
  '..gg....gg..',
  '.gggggggggg.',
  '.gegggggeg..',
  '.gggnnggggg.',
  '.gggdgdgggg.',
  '..gggggggg..',
  '..gggggggg..',
  '.gggggggggg.',
  '.gg......gg.',
  '.gg......gg.',
]);

const STRAY_ARCH = parseGrid([
  'gg........gg',
  'gggggggggggg',
  'geGgggggGggg',
  '.gggnnggggg.',
  '.gggdgdgggg.',
  '..gggggggg..',
  '...gggggg...',
  '....gggg....',
  '.gg......gg.',
  '.gg......gg.',
]);

export const SPRITES: Record<string, SpriteFrame[]> = {
  stand: [{ pixels: STAND }, { pixels: STAND2 }],
  sit: [{ pixels: SIT }],
  walk: [{ pixels: WALK1 }, { pixels: WALK2 }],
  run: [{ pixels: RUN1 }, { pixels: RUN2 }],
  hiss: [{ pixels: HISS }],
  arch: [{ pixels: ARCH }],
  lick: [{ pixels: LICK1 }, { pixels: LICK2 }],
  crouch: [{ pixels: CROUCH }],
  curl: [{ pixels: CURL }],
  pounce: [{ pixels: POUNCE }],
  frozen: [{ pixels: FROZEN }],
  dead: [{ pixels: DEAD }],
  excite: [{ pixels: EXCITE }],
  sneak: [{ pixels: SNEAK }],
  eat: [{ pixels: EAT }],
  scratch: [{ pixels: SCRATCH }],
  sprint: [{ pixels: SPRINT1 }, { pixels: SPRINT2 }],
  gentle_stand: [{ pixels: GENTLE_STAND }],
  gentle_cower: [{ pixels: GENTLE_COWER }],
  hand_reach: [{ pixels: HAND_REACH }],
  hand_scratch: [{ pixels: HAND_SCRATCH }],
  stray_stand: [{ pixels: STRAY_STAND }],
  stray_arch: [{ pixels: STRAY_ARCH }],
};

export const SCENE_COLORS: Record<string, string> = {
  box: '#8b6914',
  boxDark: '#6b4f10',
  boxLight: '#a07818',
  food: '#ce9178',
  foodBowl: '#858585',
  door: '#6b4f10',
  doorFrame: '#858585',
  window: '#569cd6',
  laser: '#f44747',
  human: '#d4d4d4',
  ground: '#3c3c3c',
  groundLight: '#4a4a4a',
  wall: '#2d2d2d',
  wallLight: '#383838',
  scratch: '#f44747',
  wave: '#569cd6',
  spark: '#ffcc00',
  star: '#ffcc00',
  table: '#6b4f10',
  tableTop: '#8b6914',
  sofa: '#569cd6',
  bed: '#c586c0',
  carpet: '#4a3060',
  plant: '#6a9955',
  plantPot: '#8b6914',
};

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  life: number;
  maxLife: number;
  size: number;
  type?: 'square' | 'circle' | 'star';
}

export function createParticle(
  x: number, y: number,
  vx: number, vy: number,
  color: string, life: number, size: number = 1,
  type: 'square' | 'circle' | 'star' = 'square'
): Particle {
  return { x, y, vx, vy, color, life, maxLife: life, size, type };
}

export function updateParticle(p: Particle, dt: number): boolean {
  p.x += p.vx * dt;
  p.y += p.vy * dt;
  p.vy += 0.5 * dt;
  p.life -= dt;
  return p.life > 0;
}

export function drawParticle(
  ctx: CanvasRenderingContext2D,
  p: Particle,
  pixelSize: number
) {
  const alpha = Math.max(0, p.life / p.maxLife);
  ctx.globalAlpha = alpha;
  ctx.fillStyle = p.color;
  const s = pixelSize * p.size;
  const px = Math.round(p.x * pixelSize);
  const py = Math.round(p.y * pixelSize);

  if (p.type === 'circle') {
    ctx.beginPath();
    ctx.arc(px + s / 2, py + s / 2, s / 2, 0, Math.PI * 2);
    ctx.fill();
  } else if (p.type === 'star') {
    drawStar(ctx, px + s / 2, py + s / 2, s / 2, 5);
  } else {
    ctx.fillRect(px, py, s, s);
  }
  ctx.globalAlpha = 1;
}

function drawStar(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, points: number) {
  ctx.beginPath();
  for (let i = 0; i < points * 2; i++) {
    const radius = i % 2 === 0 ? r : r * 0.4;
    const angle = (i * Math.PI) / points - Math.PI / 2;
    const x = cx + Math.cos(angle) * radius;
    const y = cy + Math.sin(angle) * radius;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();
}

export function drawSceneRect(
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

export function drawGround(ctx: CanvasRenderingContext2D, w: number, h: number, ps: number) {
  drawSceneRect(ctx, 0, 18, w / ps, 2, SCENE_COLORS.ground, ps);
  for (let i = 0; i < w / ps; i += 3) {
    drawSceneRect(ctx, i, 18, 1, 1, SCENE_COLORS.groundLight, ps);
  }
}

export function drawBox(ctx: CanvasRenderingContext2D, x: number, y: number, ps: number, open: boolean = true) {
  drawSceneRect(ctx, x, y, 8, 8, SCENE_COLORS.box, ps);
  drawSceneRect(ctx, x + 0.5, y + 0.5, 7, 7, SCENE_COLORS.boxDark, ps);
  if (open) {
    drawSceneRect(ctx, x + 1, y + 1, 6, 6, SCENE_COLORS.boxLight, ps);
  }
  drawSceneRect(ctx, x, y - 0.5, 8, 0.5, SCENE_COLORS.box, ps);
}

export function drawFoodBowl(ctx: CanvasRenderingContext2D, x: number, y: number, ps: number) {
  drawSceneRect(ctx, x, y, 4, 2, SCENE_COLORS.foodBowl, ps);
  drawSceneRect(ctx, x + 0.5, y + 0.5, 3, 1, SCENE_COLORS.food, ps);
  drawSceneRect(ctx, x - 0.5, y + 1.5, 5, 0.5, SCENE_COLORS.foodBowl, ps);
}

export function drawDoor(ctx: CanvasRenderingContext2D, x: number, y: number, ps: number, closed: boolean = true) {
  drawSceneRect(ctx, x, y, 8, 14, SCENE_COLORS.door, ps);
  drawSceneRect(ctx, x + 0.5, y + 0.5, 7, 13, closed ? SCENE_COLORS.door : SCENE_COLORS.wallLight, ps);
  drawSceneRect(ctx, x + 6, y + 6, 1, 1, '#ffcc00', ps);
  if (!closed) {
    drawSceneRect(ctx, x + 1, y + 1, 6, 12, SCENE_COLORS.wallLight, ps);
  }
}

export function drawTable(ctx: CanvasRenderingContext2D, x: number, y: number, ps: number) {
  drawSceneRect(ctx, x, y, 10, 1, SCENE_COLORS.tableTop, ps);
  drawSceneRect(ctx, x + 1, y + 1, 1, 8, SCENE_COLORS.table, ps);
  drawSceneRect(ctx, x + 8, y + 1, 1, 8, SCENE_COLORS.table, ps);
}

export function drawCup(ctx: CanvasRenderingContext2D, x: number, y: number, ps: number) {
  drawSceneRect(ctx, x, y, 2, 3, '#569cd6', ps);
  drawSceneRect(ctx, x + 0.5, y + 0.5, 1, 2, '#4a8ac0', ps);
}

export function drawSofa(ctx: CanvasRenderingContext2D, x: number, y: number, ps: number) {
  drawSceneRect(ctx, x, y, 12, 6, SCENE_COLORS.sofa, ps);
  drawSceneRect(ctx, x + 0.5, y + 0.5, 11, 5, '#4a8ac0', ps);
  drawSceneRect(ctx, x, y - 2, 2, 2, SCENE_COLORS.sofa, ps);
  drawSceneRect(ctx, x + 10, y - 2, 2, 2, SCENE_COLORS.sofa, ps);
}

export function drawBed(ctx: CanvasRenderingContext2D, x: number, y: number, ps: number) {
  drawSceneRect(ctx, x, y, 10, 6, SCENE_COLORS.bed, ps);
  drawSceneRect(ctx, x + 0.5, y + 0.5, 9, 5, '#b078b0', ps);
  drawSceneRect(ctx, x + 1, y + 1, 3, 2, '#ffffff', ps);
}

export function drawPlant(ctx: CanvasRenderingContext2D, x: number, y: number, ps: number) {
  drawSceneRect(ctx, x + 1, y + 4, 2, 3, SCENE_COLORS.plantPot, ps);
  drawSceneRect(ctx, x, y, 4, 4, SCENE_COLORS.plant, ps);
  drawSceneRect(ctx, x + 0.5, y - 1, 3, 1, SCENE_COLORS.plant, ps);
  drawSceneRect(ctx, x + 1, y - 2, 2, 1, '#5a8945', ps);
}

export function drawWindow(ctx: CanvasRenderingContext2D, x: number, y: number, ps: number) {
  drawSceneRect(ctx, x, y, 6, 6, SCENE_COLORS.window, ps);
  drawSceneRect(ctx, x + 0.5, y + 0.5, 5, 5, '#3a7cc0', ps);
  drawSceneRect(ctx, x + 2.5, y, 0.5, 6, '#858585', ps);
  drawSceneRect(ctx, x, y + 2.5, 6, 0.5, '#858585', ps);
}

export function drawCarpet(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, ps: number) {
  drawSceneRect(ctx, x, y, w, h, SCENE_COLORS.carpet, ps);
  drawSceneRect(ctx, x + 0.5, y + 0.5, w - 1, h - 1, '#5a4070', ps);
}

export function drawStatusBar(
  ctx: CanvasRenderingContext2D,
  x: number, y: number,
  w: number,
  value: number,
  maxValue: number,
  color: string,
  ps: number,
  label?: string
) {
  const barW = w * (value / maxValue);
  drawSceneRect(ctx, x, y, w, 1, '#3c3c3c', ps);
  drawSceneRect(ctx, x, y, barW, 1, color, ps);
  if (label) {
    ctx.fillStyle = '#d4d4d4';
    ctx.font = '7px monospace';
    ctx.fillText(label, (x + 0.5) * ps, (y + 0.8) * ps);
  }
}

export function drawTextBubble(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number, y: number,
  ps: number,
  alpha: number,
  color: string = '#569cd6'
) {
  const px = Math.round(x * ps);
  const py = Math.round(y * ps);
  ctx.globalAlpha = Math.min(1, alpha * 2);

  const tw = text.length * 5 + 8;
  const th = 10;
  const bx = px - 2;
  const by = py - th;

  ctx.fillStyle = '#252526';
  ctx.fillRect(bx, by, tw, th);
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.strokeRect(bx, by, tw, th);

  ctx.fillStyle = '#d4d4d4';
  ctx.font = '7px monospace';
  ctx.fillText(text, bx + 3, by + 7);

  ctx.globalAlpha = 1;
}

export function drawShockwave(
  ctx: CanvasRenderingContext2D,
  cx: number, cy: number,
  radius: number,
  maxRadius: number,
  color: string,
  ps: number,
  alpha: number = 1
) {
  const progress = radius / maxRadius;
  ctx.globalAlpha = alpha * (1 - progress);
  ctx.strokeStyle = color;
  ctx.lineWidth = ps * (1 - progress * 0.5);
  ctx.beginPath();
  ctx.arc(cx * ps, cy * ps, radius * ps, 0, Math.PI * 2);
  ctx.stroke();
  ctx.globalAlpha = 1;
}

export function drawExplosion(
  ctx: CanvasRenderingContext2D,
  cx: number, cy: number,
  frame: number,
  maxFrames: number,
  ps: number
) {
  const progress = frame / maxFrames;
  const size = progress * 4;
  const alpha = 1 - progress;

  ctx.globalAlpha = alpha;
  ctx.fillStyle = '#ffcc00';
  ctx.beginPath();
  ctx.arc(cx * ps, cy * ps, size * ps, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#ff6600';
  ctx.beginPath();
  ctx.arc(cx * ps, cy * ps, size * ps * 0.6, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#f44747';
  ctx.beginPath();
  ctx.arc(cx * ps, cy * ps, size * ps * 0.3, 0, Math.PI * 2);
  ctx.fill();

  ctx.globalAlpha = 1;
}

export function drawClashAura(
  ctx: CanvasRenderingContext2D,
  cx: number, cy: number,
  size: number,
  color1: string,
  color2: string,
  time: number,
  ps: number
) {
  const pulse = Math.sin(time * 8) * 0.3 + 0.7;
  const r = size * pulse;

  ctx.globalAlpha = 0.3;
  ctx.fillStyle = color1;
  ctx.beginPath();
  ctx.arc((cx - r * 0.3) * ps, cy * ps, r * ps, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = color2;
  ctx.beginPath();
  ctx.arc((cx + r * 0.3) * ps, cy * ps, r * ps, 0, Math.PI * 2);
  ctx.fill();

  ctx.globalAlpha = 0.1;
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(cx * ps, cy * ps, r * ps * 0.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.globalAlpha = 1;
}

export function drawDamageNumber(
  ctx: CanvasRenderingContext2D,
  x: number, y: number,
  damage: number,
  time: number,
  ps: number,
  color: string = '#f44747'
) {
  const floatY = y - time * 3;
  const alpha = Math.max(0, 1 - time * 0.8);

  ctx.globalAlpha = alpha;
  ctx.fillStyle = color;
  ctx.font = 'bold 10px monospace';
  ctx.fillText(`-${damage}`, x * ps, floatY * ps);
  ctx.globalAlpha = 1;
}

export function drawHealNumber(
  ctx: CanvasRenderingContext2D,
  x: number, y: number,
  amount: number,
  time: number,
  ps: number
) {
  const floatY = y - time * 2;
  const alpha = Math.max(0, 1 - time * 0.6);

  ctx.globalAlpha = alpha;
  ctx.fillStyle = '#6a9955';
  ctx.font = 'bold 10px monospace';
  ctx.fillText(`+${amount}`, x * ps, floatY * ps);
  ctx.globalAlpha = 1;
}

export function drawLightning(
  ctx: CanvasRenderingContext2D,
  x1: number, y1: number,
  x2: number, y2: number,
  ps: number,
  color: string = '#569cd6',
  alpha: number = 1
) {
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = color;
  ctx.lineWidth = ps * 0.5;

  ctx.beginPath();
  ctx.moveTo(x1 * ps, y1 * ps);

  const segments = 5;
  const dx = (x2 - x1) / segments;
  const dy = (y2 - y1) / segments;

  for (let i = 1; i <= segments; i++) {
    const jitterX = (Math.random() - 0.5) * 2;
    const jitterY = (Math.random() - 0.5) * 1;
    ctx.lineTo(
      (x1 + dx * i + jitterX) * ps,
      (y1 + dy * i + jitterY) * ps
    );
  }

  ctx.stroke();
  ctx.globalAlpha = 1;
}

export function drawVS(
  ctx: CanvasRenderingContext2D,
  cx: number, cy: number,
  time: number,
  ps: number
) {
  const pulse = Math.sin(time * 4) * 0.2 + 0.8;
  const size = 6 * pulse;

  ctx.globalAlpha = 0.8;
  ctx.fillStyle = '#f44747';
  ctx.font = `bold ${size * ps}px monospace`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('VS', cx * ps, cy * ps);
  ctx.textAlign = 'start';
  ctx.textBaseline = 'alphabetic';
  ctx.globalAlpha = 1;
}
