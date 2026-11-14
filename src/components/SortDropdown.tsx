"use client";

export type SortKey = "default" | "price-asc" | "price-desc";

interface Props {
  value: SortKey;
  onChange: (value: SortKey) => void;
}

export default function SortDropdown({ value, onChange }: Props) {
  return (
    <label className="flex items-center gap-2 text-sm text-base-content/70">
      <span>সাজান</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortKey)}
        className="select select-sm h-8 min-h-8 w-auto border-base-content/20 bg-base-100 text-xs text-base-content"
        aria-label="সাজান"
      >
        <option value="default">ডিফল্ট</option>
        <option value="price-asc">দাম: কম থেকে বেশি</option>
        <option value="price-desc">দাম: বেশি থেকে কম</option>
      </select>
    </label>
  );
}