// import { response } from "express";
import sessionManager from "../sessionManager.js";


const requireAuth = (req, res, next) => {
  console.log("kör requireAuth middleware");
  // console.log(
  //   `[${req.method}] ${req.cookie} ${req.url}`
  // );
  // console.log(res.headers.cookie)

  try{
    const id = req.headers.cookie.split("=")[1]
    const {username} = sessionManager.findSessionById(id);
    console.log(username)
    console.log("cookie exists")

    // behöver redirecta till inloggade sidan om man ändrar url till "/login"

    next();
  } catch (TypeError){
    console.log("cookie undefined")
    res.redirect("/login");
  }
};

export default requireAuth;
