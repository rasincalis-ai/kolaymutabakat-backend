import dotenv from "dotenv";
dotenv.config();

export const config = {
  PORT: process.env.PORT || 5000,
  JWT_SECRET: process.env.JWT_SECRET,
  SUPABASE_CONNECTION: process.env.SUPABASE_CONNECTION
};
