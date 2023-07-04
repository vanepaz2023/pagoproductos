/* export const PORT = process.env.PORT || 5000

export const ACCESS_TOKEN = process.env.ACCESS_TOKEN */
import { config } from "dotenv";

config();

export default {
    host: process.env.HOST || "",
    database: process.env.DB_NAME || "",
    user: process.env.DB_USER || "",
    password: process.env.DB_PASSWORD || "",
    port: process.env.PORT || "",
};
