const requireAuth = (req, res, next) => {
  next();
  console.log("kör requireAuth middleware")
  console.log(
    `[${req.method}] ${req.cookie} ${req.url}`
  );
};

export default requireAuth;
