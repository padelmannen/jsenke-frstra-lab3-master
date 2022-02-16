import { Router } from "express";
import { readFile, resolvePublicPath } from "../util.js";
import sessionManager from "../sessionManager.js";

const publicRouter = Router();

publicRouter.get("/login", async (req, res) => {
  // console.log("getting login")
  // console.log("pubRuter Body: ")
  // console.log(req.head)
  // console.log("pubRuter Body: ")
  // console.log(req.body);
  console.log("kör pub router login");
  // console.log(res)

  if(req.headers.cookie === undefined || !sessionManager.findSessionById(req.headers.cookie.split("=")[1])){
    const htmlDoc = await readFile(resolvePublicPath("login.html"));
    res.status(200).send(htmlDoc);
  }
  else{
    console.log("ERROR: kan inte gå till login om inloggad");
    res.redirect("/");
  }

});

publicRouter.get("/registration", async (req, res) => {
  console.log("kör pub router reqistration");
  
  if(req.headers.cookie === undefined || !sessionManager.findSessionById(req.headers.cookie.split("=")[1])){
    const htmlDoc = await readFile(resolvePublicPath("registration.html"));
    res.status(200).send(htmlDoc);
  }
  else{
    console.log("ERROR: kan inte gå till registration om inloggad");
    res.redirect("/");
  }

});

export default {
  publicRouter,
};
