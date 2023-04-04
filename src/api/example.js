import { Router } from "express";
import AppError from "../exceptions/AppError.js";

const router = Router();

/**
 * PLEASE LEAVE THIS FILE UNCHANGED
 */

router.get("/throw-err", (req, res, next) => {
  next(new AppError("Failure is a part of progress", 400));
});

router.get("/throw-app-err", (req, res, next) => {
  next(new AppError("I'm a teapot", 418));
});

router.get("/runtime-err", (req, res) => {
  const a = nonExistingFunc();
  res.json({ message: "This response won't be sent! :(" });
});

export default router;
