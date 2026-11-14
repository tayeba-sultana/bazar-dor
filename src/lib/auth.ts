// import { betterAuth } from "better-auth";
// import { MongoClient } from "mongodb";
// import { mongodbAdapter } from "@better-auth/mongo-adapter";

import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
import { MongoClient } from "mongodb";
const client = new MongoClient(process.env.MONGODB_URL as string);
const db = client.db("bazar-dor");

export const auth = betterAuth({
    // emailAndPassword: {
    //     enabled: true,
    // },
    emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
  },
    account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["github", "google"],
      updateUserInfoOnLink: true, // refresh name/picture from GitHub/Google
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      overrideUserInfoOnSignIn: true,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
       overrideUserInfoOnSignIn: true,
    },
  },
  
  database: mongodbAdapter(db, {
    client,
  }),
  // Lets server actions / route handlers set the session cookie
  plugins: [nextCookies()],
});