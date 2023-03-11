import dotenv from "dotenv";

dotenv.config();

export const port = process.env.PORT || 3000;
export const aivenApiUrl = process.env.AIVEN_API_URL;