/* export const PORT = process.env.PORT || 5000

export const ACCESS_TOKEN = process.env.ACCESS_TOKEN */
import { config } from "dotenv";

config();

export default {
 
   
    db_url: process.env.DB_URL || ""
};
