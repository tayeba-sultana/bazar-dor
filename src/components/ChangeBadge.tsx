import type { PriceChange } from "@/lib/types";
import { getChangeView } from "@/lib/utils";

/** ▲ ২.১% (red) · ▼ ২.৯% (green) · — ০.০% (grey) */
export default function ChangeBadge({
  change,
  className = "",
}: {
  change: PriceChange;
  className?: string;
}) {
  const view = getChangeView(change);
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-base-200 px-2 py-1 text-xs font-semibold ${view.className} ${className}`}
    >
      {view.text}
    </span>
  );
}