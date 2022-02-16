import { Router } from "express";
import { readFile, resolvePublicPath } from "../util.js";
import sessionManager from "../sessionManager.js";

const privateRouter = Router();

privateRouter.get("/", async (req, res) => {
  // console.log("getheader")
  // console.log(req)   // new
  // console.log("getbody")
  // console.log(req.body);
  // console.log("req", req)
  console.log("kör privat router profile");
  console.log(req.headers.cookie);
  // const {cookie} = req.headers
  let username;
  try{
    const id = req.headers.cookie.split("=")[1];
    username = sessionManager.findSessionById(id).username;
  }catch(TypeError){
    username = "FEL I PROFILE.ROUTER"
  }
  

  console.log(req.method);



  const htmlDoc = (await readFile(resolvePublicPath("index.html"))).replace(
    "$username$",
    username
  );

  res.status(200).send(htmlDoc);
});

export default {
  privateRouter,
};
