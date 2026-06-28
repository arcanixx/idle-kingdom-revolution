import { Container, Text, TextStyle } from "pixi.js";

export function spawnFloatingText(
  stage: Container,
  x: number,
  y: number,
  value: number,
  type: "damage" | "heal" | "miss"
): void {
  const colors = { damage: 0xff4444, heal: 0x44ff44, miss: 0xaaaaaa };
  const label = type === "miss" ? "MISS" : (type === "heal" ? "+" : "-") + Math.abs(value);

  const text = new Text({
    text: label,
    style: new TextStyle({
      fontSize: type === "miss" ? 14 : 18,
      fontWeight: "bold",
      fill: colors[type],
    }),
  });
  text.x = x;
  text.y = y;
  text.anchor.set(0.5);
  stage.addChild(text);

  let frame = 0;
  const animate = () => {
    frame++;
    text.y -= 1.5;
    text.alpha = Math.max(0, 1 - frame / 40);
    if (frame < 40) {
      requestAnimationFrame(animate);
    } else {
      text.destroy();
    }
  };
  requestAnimationFrame(animate);
}
