import { Slider } from "@/components/ui/slider";

export default function SliderMarksDemo() {
  const ramExpansions = ["4GB", "6GB", "8GB"];

  return (
    <div className="w-full max-w-sm">
      <Slider defaultValue={[1]} max={2} step={1} />
      <div className="mt-2 -mx-1.5 flex items-center justify-between text-muted-foreground text-xs">
        {ramExpansions.map((expansion) => (
          <span key={expansion}>{expansion}</span>
        ))}
      </div>
    </div>
  );
}
