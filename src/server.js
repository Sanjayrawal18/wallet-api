import express from "express";
import cors from 'cors'
import dotenv from "dotenv";
import { initDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

import transactionsRoute from "./routes/transactionsRoute.js";
import job from "./config/cron.js";

dotenv.config();

const app = express();

if (process.env.NODE_ENV === 'production') job.start();

// middleware
const allowedOrigins = ['http://localhost:8081', 'exp://10.131.69.200:8081'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));
app.use(rateLimiter);
app.use(express.json());

const PORT = process.env.PORT || 5001;

app.get("api/health", (req, res) => {
  res.status(200).json({ status: "ok"})
})

app.use("/api/transactions", transactionsRoute);

initDB().then(() => {
  app.listen(5001, () => {
    console.log("Server is up and running on PORT:", PORT);
  });
});
