// import { response } from "express";
// import { redirect } from "express/lib/response";
// import loginRouter from "../routers/login.router.js";
import sessionManager from "../sessionManager.js";

const requireAuth = (req, res, next) => {
  console.log("kör requireAuth middleware");
  try {
    const id = req.headers.cookie.split("=")[1];
    sessionManager.isInvalidSession(id);
    sessionManager.findSessionById(id);
    next();
  } catch (TypeError) {
    res.redirect("/login");
  }
};

export default requireAuth;
