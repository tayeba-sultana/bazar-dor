import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
import { MongoClient } from "mongodb";
const client = new MongoClient(process.env.MONGODB_URL as string);
const db = client.db("bazar-dor");

export const auth = betterAuth({
    emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
  },
    account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["github", "google"],
      updateUserInfoOnLink: true, 
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
 
  plugins: [nextCookies()],
});