const requireAuth = (req, res, next) => {
  console.log("body: ", req.body)
  next();
};

export default requireAuth;
