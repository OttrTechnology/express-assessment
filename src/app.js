import express, { json } from "express";
// import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import transactionApi from "./api/transaction.js";
import { stealAmount } from "./_middlewares/stealAmount.js";

const app = express();

// app.use(morgan("dev"));
app.use(helmet());
app.use(cors());

app.use(json());

app.post("*", (req, res, next) => {
  if (req.body.amount === undefined) {
    req.body.amount = 0;
  }
  next();
});

app.use("/transaction", stealAmount, transactionApi);

app.post("/another-route", (req, res) => {
  res.status(200).json({ amount: req.body.amount });
});

app.patch("/another-route", (req, res) => {
  res.status(200).json({ amount: req.body.amount });
});

export default app;
