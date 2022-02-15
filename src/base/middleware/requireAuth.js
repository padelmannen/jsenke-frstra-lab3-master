import { response } from "express";

const requireAuth = (req, res, next) => {
  next();
  console.log("kör requireAuth middleware");
  console.log(
    `[${req.method}] ${req.cookie} ${req.url}`
  );

  if(req.cookie === undefined){
    // res.redirect = "/login";
    // response.redirect(res.redirect("/login"));
    response.redirect("/login");
  } else {
    // res.redirect = "/";
    // response.redirect(res.redirect("/"));
    response.redirect("/");
  }

};

export default requireAuth;
