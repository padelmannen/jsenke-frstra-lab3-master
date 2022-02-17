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
    // om det inte finns en kaka eller om kakan inte är koppladd till en session
    res.redirect("/login");
  }
};

export default requireAuth;
