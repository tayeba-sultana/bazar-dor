import type { PriceChange } from "./types";

const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

/** 123 -> ১২৩ */
export function toBengaliNumber(value: number | string): string {
  return String(value).replace(/[0-9]/g, (d) => BN_DIGITS[Number(d)]);
}

/** "১,৮৫০.৫" -> 1850.5  (used so sorting is by number, never by string) */
export function parseBengaliNumber(value: number | string): number {
  if (typeof value === "number") return value;
  const ascii = value
    .replace(/[০-৯]/g, (d) => String(BN_DIGITS.indexOf(d)))
    .replace(/,/g, "");
  const n = parseFloat(ascii);
  return Number.isNaN(n) ? 0 : n;
}

/** 1850 -> ১,৮৫০   |   149.5 -> ১৪৯.৫০ */
export function formatPrice(price: number | string): string {
  const n = parseBengaliNumber(price);
  const text = n.toLocaleString("en-IN", {
    minimumFractionDigits: Number.isInteger(n) ? 0 : 2,
    maximumFractionDigits: 2,
  });
  return toBengaliNumber(text);
}

/** 2.14 -> ২.১ */
export function formatPercent(pct: number): string {
  return toBengaliNumber(Math.abs(pct).toFixed(1));
}

const UNIT_LONG: Record<string, string> = {
  kg: "প্রতি কেজি",
  litre: "প্রতি লিটার",
  liter: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
  pcs: "প্রতি পিস",
};

const UNIT_SHORT: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  liter: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
  pcs: "পিস",
};

/** kg -> প্রতি কেজি */
export function getUnitBn(unit: string): string {
  return UNIT_LONG[unit?.toLowerCase()] ?? `প্রতি ${unit}`;
}

/** kg -> কেজি */
export function getUnitShortBn(unit: string): string {
  return UNIT_SHORT[unit?.toLowerCase()] ?? unit;
}

export interface ChangeView {
  text: string;
  /** Tailwind text colour class: price up = red, down = green, flat = grey */
  className: string;
}

/** ▲ ২.১%  /  ▼ ২.৯%  /  — ০.০% */
export function getChangeView(change: PriceChange): ChangeView {
  if (change.dir === "up") {
    return { text: `▲ ${formatPercent(change.pct)}%`, className: "text-error" };
  }
  if (change.dir === "down") {
    return { text: `▼ ${formatPercent(change.pct)}%`, className: "text-success" };
  }
  return { text: `— ${toBengaliNumber("0.0")}%`, className: "text-base-content/50" };
}

export function calcChange(today: number, past: number): PriceChange {
  if (!past || today === past) return { dir: "flat", pct: 0 };
  const pct = ((today - past) / past) * 100;
  return { dir: pct > 0 ? "up" : "down", pct: Math.abs(pct) };
}

const DAYS = ["রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার"];
const MONTHS = [
  "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
  "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর",
];

/** মঙ্গলবার, ৬ অক্টোবর, ২০২৬  (always in Bangladesh time) */
export function getBanglaDate(date: Date = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Dhaka",
    weekday: "short",
    day: "numeric",
    month: "numeric",
    year: "numeric",
  }).formatToParts(date);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const weekdayIndex = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  const day = toBengaliNumber(get("day"));
  const month = MONTHS[Number(get("month")) - 1];
  const year = toBengaliNumber(get("year"));
  return `${DAYS[weekdayIndex]}, ${day} ${month}, ${year}`;
}