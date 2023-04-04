import express, { json } from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

import exampleApi from "./api/example.js";
import AppError from "./exceptions/AppError.js";
import errorHandler from "./exceptions/errorHandler.js";

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(json());

app.get("/", (req, res) => {
  res.json({ message: "👋🌎🌍🌏" });
});

app.use("/example", exampleApi);

app.all("*", (req, res, next) => {
  next(new AppError("Route not found", 404));
});

app.use(errorHandler);

export default app;
