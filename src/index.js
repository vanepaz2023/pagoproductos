import express from "express";
import morgan from "morgan";
import path from "path";
import cors from 'cors';
import dotenv from 'dotenv';
import { config } from 'dotenv';

import paymentRoutes from "./routes/payment.routes.js";
dotenv.config();
config();
const app = express();
app.use(express.json());
app.use(cors({
    origin:['https://productosnutricionales.com.ar']
}));
app.use(morgan("dev"));
// Configura la conexión a la base de datos PostgreSQL


app.use(paymentRoutes);

//app.use(express.static(path.resolve("src/public")));

app.listen(process.env.PORT_SERVER);
console.log("Server on port", process.env.PORT_SERVER);