import Image from "next/image";
import { getBanglaDate } from "@/lib/utils";

export default function Hero() {
  return (
    <section className="overflow-hidden rounded-3xl border border-base-300 bg-base-100">
      <div className="flex flex-col items-center gap-6 px-6 py-8 md:flex-row md:px-10 md:py-10">
        {/* Text */}
        <div className="flex flex-1 flex-col items-start gap-2">
          {/* eyebrow */}
          <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            {getBanglaDate()}
          </span>
          {/* main heading */}
          <h1 className="text-3xl font-bold leading-snug md:text-4xl">আজকের বাজারের দাম এক নজরে</h1>
          {/* subtitle */}
          <p className="max-w-xl text-base text-base-content/70">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়,
            সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          {/* CTA button */}
          <a href="#সব-পণ্য" className="btn btn-primary mt-3 h-10 min-h-10 text-sm font-semibold">
            সব পণ্য দেখুন
          </a>
        </div>

        {/* Banner image */}
        <div className="flex flex-1 justify-center md:justify-end">
          <Image
            src="/bazar-hero.png"
            alt="সবজির ঝুড়ি"
            width={315}
            height={263}
            priority
            className="h-auto w-56 md:w-78.75"
          />
        </div>
      </div>
    </section>
  );
}