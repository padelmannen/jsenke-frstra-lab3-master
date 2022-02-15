// import { response } from "express";

const requireAuth = (req, res, next) => {
  console.log("kör requireAuth middleware");
  console.log(
    `[${req.method}] ${req.cookie} ${req.url}`
  );
  
  if(req.headers.cookie === undefined){
    res.redirect("/login");
    // res.redirect = "/login";
    // response.redirect(res.redirect("/login"));
    // response.redirect("/login");
  } else {
    next();
    // res.redirect = "/";
    // response.redirect(res.redirect("/"));
    // response.redirect("/");
  }

};

export default requireAuth;
