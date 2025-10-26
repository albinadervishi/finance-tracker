import { useAnimatedNumber } from "@/hooks/general/useAnimatedNumber";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  className?: string;
}

export function AnimatedNumber({
  value,
  duration = 500,
  className,
}: AnimatedNumberProps) {
  const displayedValue = useAnimatedNumber(value, duration);
  const [shouldFade, setShouldFade] = useState(false);

  useEffect(() => {
    setShouldFade(true);
    const timer = setTimeout(() => setShouldFade(false), duration);
    return () => clearTimeout(timer);
  }, [value, duration]);

  return (
    <span
      className={cn(
        "transition-all duration-500",
        shouldFade ? "opacity-50 scale-95" : "opacity-100 scale-100",
        className
      )}
    >
      {displayedValue.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}
    </span>
  );
}
