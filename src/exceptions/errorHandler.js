import AppError from "./AppError.js";

export default (err, req, res, next) => {
  if (err instanceof AppError) {
    if (err.httpStatusCode === 418) {
      err.message =
        "The server refuses the attempt to brew coffee with a teapot.";
    }
    return res.status(err.httpStatusCode).json({ message: err.message });
  }
  res.status(500).json({ message: "Unknown error occured" });
};

// export default { errorHandler };
