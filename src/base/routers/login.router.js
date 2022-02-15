import { Router } from "express";
import { readFile, resolvePublicPath } from "../util.js";

const publicRouter = Router();

publicRouter.get("/login", async (req, res) => {
  // console.log("getting login")
  // console.log("pubRuter Body: ")
  // console.log(req.head)
  // console.log("pubRuter Body: ")
  // console.log(req.body);
  console.log("kör pub router login");

  const htmlDoc = await readFile(resolvePublicPath("login.html"));

  res.status(200).send(htmlDoc);
});

publicRouter.get("/registration", async (req, res) => {
  console.log("kör pub router reqistration");

  const htmlDoc = await readFile(resolvePublicPath("registration.html"));

  res.status(200).send(htmlDoc);
});

export default {
  publicRouter,
};
