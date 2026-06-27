const FALLBACK_UNIT = "/assets/fallback/units/human/human_warrior.svg";
const FALLBACK_BOSS = "/assets/fallback/bosses/fire_dragon.svg";
const FALLBACK_PORTRAIT = "/assets/fallback/portraits/human/human_happy.svg";
const FALLBACK_ITEM = "/assets/fallback/items/health_potion.svg";

const CLASS_OVERRIDES: Record<string, Record<string, string>> = {
  orc: { assassin: "berserker", ranger: "hunter", healer: "shaman" },
  celestial: { assassin: "warrior" },
};

function mapClass(faction: string, unitClass: string): string {
  return CLASS_OVERRIDES[faction]?.[unitClass] || unitClass;
}

export function getUnitAsset(faction: string, unitClass: string): string {
  const fc = faction?.toLowerCase() || "human";
  const cls = mapClass(fc, unitClass?.toLowerCase() || "warrior");
  return `/assets/fallback/units/${fc}/${fc}_${cls}.svg`;
}

export function getBossAsset(bossId: string): string {
  return `/assets/fallback/bosses/${bossId.replace(/^boss_/, "")}.svg`;
}

export function getPortraitAsset(faction: string, emotion = "happy"): string {
  const fc = faction?.toLowerCase() || "human";
  return `/assets/fallback/portraits/${fc}/${fc}_${emotion}.svg`;
}

export function getItemAsset(itemType: string): string {
  const map: Record<string, string> = {
    weapon: "/assets/fallback/items/gold_coin.svg",
    armor: "/assets/fallback/items/health_potion.svg",
    accessory: "/assets/fallback/items/health_potion.svg",
    consumable: "/assets/fallback/items/health_potion.svg",
    material: "/assets/fallback/items/gold_coin.svg",
    cosmetic: "/assets/fallback/items/health_potion.svg",
  };
  return map[itemType] || FALLBACK_ITEM;
}

export function getEventAsset(event: "victory" | "defeat"): string {
  return `/assets/fallback/events/${event}.svg`;
}

export function getMagicEffectAsset(effect: string): string {
  return `/assets/fallback/effects/magic/${effect}.svg`;
}

export function getWeatherAsset(weather: string): string {
  return `/assets/fallback/effects/weather/${weather}.svg`;
}
