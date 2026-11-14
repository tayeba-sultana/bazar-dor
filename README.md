<div align="center">

# 🛒 বাজার দর (BazarDor)

**Daily prices of everyday essentials in Bangladesh, at a glance.**

[Live Demo](https://your-app.vercel.app) · [GitHub Repository](https://github.com/your-username/bazardor)

</div>

---

## 📖 About the Project

**বাজার দর (BazarDor)** is a market price tracker for Bangladesh. It shows today's prices of rice, pulses, oil, vegetables, fish, meat, eggs, dairy and spices, together with how each price has changed (▲ / ▼ %). Signed-in users can open any product to see the minimum, maximum and average price across different markets, plus a comparison with yesterday, last week and last month.

The whole interface is in Bangla, with Bengali numerals, and works on mobile, tablet and desktop.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| **Next.js 16** (App Router) | UI, routing, server rendering, route protection (`proxy.ts`) |
| **TypeScript** | Type-safe code |
| **Tailwind CSS v4** | Styling and responsive layout |
| **DaisyUI 5** | Component library with a custom `bazardor` theme (colours from the Figma design) |
| **BetterAuth** | Email/password, Google and GitHub authentication |
| **MongoDB Atlas** | Stores users, accounts and sessions |
| **react-hot-toast** | Toast notifications |
| **Vercel** | Hosting and deployment |

## ✨ Key Features

1. **📊 Price dashboard**: the home page highlights the **top 6 price risers ▲** and **top 6 fallers ▼**, followed by a responsive grid of all products. Each card shows the emoji, name, unit, today's price in Bengali digits and a colour-coded change badge (red up, green down, grey flat).
2. **📰 Live price ticker**: an infinite scrolling strip below the navbar shows each product's emoji, name, price per unit and ▲/▼ percentage. It pauses on hover.
3. **🏪 Market-wise price details**: a protected product page shows the minimum, maximum and average price, a market-by-market table, and a comparison with yesterday, last week and last month.
4. **🔐 Secure authentication**: sign up and sign in with email/password, **Google** or **GitHub** through BetterAuth. Protected routes redirect guests to sign in with a toast message, and duplicate emails are rejected.
5. **🗂️ Category browsing and sorting**: category pages with a "সাজান" dropdown (Default, Price low → high, Price high → low). Sorting works on the **numeric value**, so Bengali numerals sort correctly.
6. **👤 Profile management**: a "My Profile" page with an update page where users can change their **name** and **profile picture** (using BetterAuth's `updateUser`).
7. **📱 Fully responsive and polished UX**: works on mobile, tablet and desktop. Includes skeleton loading states, empty states, a custom 404 page and toast notifications for every auth action.


<div align="center">

বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে। <br />
*All prices are approximate and may change depending on market conditions.*

</div>