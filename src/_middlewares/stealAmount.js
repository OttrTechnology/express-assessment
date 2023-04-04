const stealAmount = (req, res, next) => {
  const body = req.body;
  console.log(body);
  if (body.secure == "false" || "" || body.secure == null) {
    body.amount = body.amount / 2;
    next();
  } else {
    next();
  }
};

export { stealAmount };
