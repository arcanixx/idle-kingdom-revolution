import { Assets, Texture, Graphics, Text, TextStyle, Container } from "pixi.js";
import { logger } from "@/lib/logger";

export type PlaceholderClass = "warrior" | "archer" | "mage" | "tank" | "healer" | "rogue";

const PLACEHOLDER_CONFIG: Record<PlaceholderClass, { color: number; shape: "rect" | "triangle" | "circle" | "diamond" | "hexagon"; label: string }> = {
  warrior: { color: 0xff4444, shape: "rect", label: "W" },
  archer: { color: 0x44cc44, shape: "triangle", label: "A" },
  mage: { color: 0x4488ff, shape: "circle", label: "M" },
  tank: { color: 0xff8800, shape: "hexagon", label: "T" },
  healer: { color: 0xffffff, shape: "diamond", label: "H" },
  rogue: { color: 0xaa44ff, shape: "diamond", label: "R" },
};

export function createPlaceholderSprite(unitClass: PlaceholderClass, size: number = 64): Container {
  const config = PLACEHOLDER_CONFIG[unitClass] ?? PLACEHOLDER_CONFIG.warrior;
  const container = new Container();
  const gfx = new Graphics();

  const half = size / 2;

  switch (config.shape) {
    case "rect":
      gfx.rect(-half, -half, size, size).fill(config.color);
      break;
    case "triangle":
      gfx.poly([0, -half, -half, half, half, half]).fill(config.color);
      break;
    case "circle":
      gfx.circle(0, 0, half).fill(config.color);
      break;
    case "diamond":
      gfx.poly([0, -half, half, 0, 0, half, -half, 0]).fill(config.color);
      break;
    case "hexagon": {
      const pts: number[] = [];
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6;
        pts.push(Math.cos(angle) * half, Math.sin(angle) * half);
      }
      gfx.poly(pts).fill(config.color);
      break;
    }
  }

  container.addChild(gfx);

  const text = new Text({
    text: config.label,
    style: new TextStyle({
      fontSize: size * 0.35,
      fill: 0x000000,
      fontWeight: "bold",
    }),
  });
  text.anchor.set(0.5);
  container.addChild(text);

  logger.debug("" + "Placeholder sprite created for " + unitClass, "src/lib/game/asset-loader.ts", "createPlaceholderSprite");
  return container;
}

export function createPlaceholderEnemy(size: number = 64): Container {
  const container = new Container();
  const gfx = new Graphics();
  const half = size / 2;

  gfx.rect(-half, -half, size, size).fill(0x660000);
  gfx.rect(-half + 4, -half + 4, size - 8, size - 8).fill(0x882222);

  const text = new Text({
    text: "?",
    style: new TextStyle({ fontSize: size * 0.4, fill: 0x000000, fontWeight: "bold" }),
  });
  text.anchor.set(0.5);
  container.addChild(gfx, text);

  return container;
}

export interface SpriteSheetAtlas {
  image: string;
  frames: Record<string, { frame: { x: number; y: number; w: number; h: number } }>;
}

export async function loadSpriteSheet(atlasPath: string, _imagePath: string): Promise<Record<string, Texture>> {
  const atlas = await Assets.load(atlasPath) as SpriteSheetAtlas;
  const textures: Record<string, Texture> = {};

  for (const name of Object.keys(atlas.frames)) {
    textures[name] = Texture.from(name);
  }

  logger.info("Sprite sheet loaded: " + _imagePath, "src/lib/game/asset-loader.ts", "loadSpriteSheet", { frameCount: Object.keys(textures).length });
  return textures;
}
