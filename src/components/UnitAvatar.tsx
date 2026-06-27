import { getUnitAsset } from "@/lib/game/asset-resolver";

interface UnitAvatarProps {
  faction?: string;
  unitClass?: string;
  name?: string;
  size?: "sm" | "md" | "lg";
}

const SIZES = { sm: "w-8 h-8", md: "w-12 h-12", lg: "w-16 h-16" };

export function UnitAvatar({ faction, unitClass, name, size = "md" }: UnitAvatarProps) {
  const src = getUnitAsset(faction || "human", unitClass || "warrior");
  return (
    <div className={"relative shrink-0 rounded-full overflow-hidden border-2 border-border " + SIZES[size]}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={name || "unit"} className="w-full h-full object-cover" />
    </div>
  );
}
