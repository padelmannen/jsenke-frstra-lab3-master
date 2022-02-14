const requireAuth = (req, res, next) => {
  next();
  console.log("kör requireAuth middleware")
  console.log(
    `[${res.method}] ${req.cookie} ${req.url}`
  );
  
};

export default requireAuth;
