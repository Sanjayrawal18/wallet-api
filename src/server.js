import express from "express";
import cors from 'cors'
import dotenv from "dotenv";
import { initDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

import transactionsRoute from "./routes/transactionsRoute.js";

dotenv.config();

const app = express();

// const corsOptions = {
//   origin: 'https://your-allowed-domain.com', // Replace with your domain
//   optionsSuccessStatus: 200
// };

// middleware
app.use(cors())
app.use(rateLimiter);
app.use(express.json());

const PORT = process.env.PORT || 5001;

app.use("/api/transactions", transactionsRoute);

initDB().then(() => {
  app.listen(5001, () => {
    console.log("Server is up and running on PORT:", PORT);
  });
});
