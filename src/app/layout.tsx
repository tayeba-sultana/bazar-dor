// import type { Metadata } from "next";
// import { Hind_Siliguri } from "next/font/google";
// import { Toaster } from "react-hot-toast";
// import Navbar from "@/components/Navbar";
// import PriceTicker from "@/components/PriceTicker";
// import Footer from "@/components/Footer";
// import { getCategories, getProducts } from "@/lib/api";
// import "./globals.css";
// import { headers } from "next/headers";
// import { auth } from "@/lib/auth";

// const hindSiliguri = Hind_Siliguri({
//   subsets: ["bengali", "latin"],
//   weight: ["300", "400", "500", "600", "700"],
//   variable: "--font-hind",
//   display: "swap",
// });

// export const metadata: Metadata = {
//   title: "বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে",
//   description:
//     "চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।",
// };


// export default async function RootLayout({
//   children,
// }: Readonly<{ children: React.ReactNode }>) {
//   const [categories, products, session] = await Promise.all([
//   getCategories(),
//   getProducts(),
//   auth.api.getSession({ headers: await headers() }),
// ]);

// const initialUser = session?.user
//   ? { name: session.user.name, email: session.user.email, image: session.user.image }
//   : null;

//   return (
//     <html lang="bn" data-theme="bazardor" className={hindSiliguri.variable}>
//       <body className="font-sans antialiased">
//         <Navbar categories={categories} initialUser={initialUser} />
//         <PriceTicker products={products} />
//         <main className="min-h-[60vh]">{children}</main>
//         <Footer />
//         <Toaster
//           position="top-center"
//           toastOptions={{
//             style: { fontFamily: "inherit", fontSize: "14px", borderRadius: "12px" },
//             success: { iconTheme: { primary: "#05893e", secondary: "#f3fbf4" } },
//             error: { iconTheme: { primary: "#d03739", secondary: "#fff6f5" } },
//           }}
//         />
//       </body>
//     </html>
//   );
// }

import type { Metadata } from "next";
import { Suspense } from "react";
import { headers } from "next/headers";
import { Hind_Siliguri } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import Footer from "@/components/Footer";
import { auth } from "@/lib/auth";
import { getCategories, getProducts } from "@/lib/api";
import "./globals.css";

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-hind",
  display: "swap",
});

export const metadata: Metadata = {
  title: "বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে",
  description:
    "চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।",
};

// Reads the logged-in user (request-time data), so it must sit inside <Suspense>
async function SiteHeader() {
  const [categories, session] = await Promise.all([
    getCategories(),
    auth.api.getSession({ headers: await headers() }),
  ]);

  const initialUser = session?.user
    ? { name: session.user.name, email: session.user.email, image: session.user.image }
    : null;

  return <Navbar categories={categories} initialUser={initialUser} />;
}

async function SiteTicker() {
  const products = await getProducts();
  return <PriceTicker products={products} />;
}

function HeaderFallback() {
  return (
    <header className="border-b border-base-300 bg-base-100">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-lg text-primary-content">
            🛒
          </span>
          <span className="text-xl font-bold">বাজার দর</span>
        </div>
        <div className="skeleton h-10 w-28 rounded-lg" />
      </div>
      <div className="h-11" />
    </header>
  );
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="bn" data-theme="bazardor" className={hindSiliguri.variable}>
      <body className="font-sans antialiased">
        <Suspense fallback={<HeaderFallback />}>
          <SiteHeader />
        </Suspense>
        <Suspense fallback={<div className="h-9 border-b border-base-300 bg-base-100" />}>
          <SiteTicker />
        </Suspense>
        <main className="min-h-[60vh]">{children}</main>
        <Footer />
        <Toaster
          position="top-center"
          toastOptions={{
            style: { fontFamily: "inherit", fontSize: "14px", borderRadius: "12px" },
            success: { iconTheme: { primary: "#05893e", secondary: "#f3fbf4" } },
            error: { iconTheme: { primary: "#d03739", secondary: "#fff6f5" } },
          }}
        />
      </body>
    </html>
  );
}