import express from "express";
import cors from 'cors'

import { prisma } from "../prisma/prisma.js";
import cookieParser from "cookie-parser";
import router from "../routes/router.js";


const app = express();
const PORT = 5050;


app.use(express.json());
app.use(cookieParser())
app.use(cors(
  {
    origin: "http://localhost:3000",
    credentials: true,
  }
))


app.use('/api', router)

async function start() {
  try {
    await prisma.$connect();
    console.log("PostgreSQL connected");

    app.listen(PORT, () => {
      console.log("Server started on port", PORT);
    });
  } catch (err) {
    console.log("DB error:", err);
    process.exit(1);
  }
}



start();
