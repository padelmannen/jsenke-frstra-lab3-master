// import { response } from "express";

const requireAuth = (req, res, next) => {
  console.log("kör requireAuth middleware");
  // console.log(
  //   `[${req.method}] ${req.cookie} ${req.url}`
  // );
  console.log(req.headers.cookie);
  // console.log(res.headers.cookie)

  if (req.headers.cookie === undefined) {
    console.log("cookie undefined");
    res.redirect("/login");
  } else {
    console.log("cookie exists");
    next();
  }
};

export default requireAuth;
