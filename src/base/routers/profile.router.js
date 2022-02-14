import { Router } from "express";
import { readFile, resolvePublicPath } from "../util.js";

const privateRouter = Router();

privateRouter.get("/", async (req, res) => {
  // console.log("getheader")
  // console.log(req)   // new
  // console.log("getbody")
  // console.log(req.body);
  // console.log("req", req)
  console.log("kör privat router profile")
  console.log(req.headers.cookie)
  console.log(req.method)

  const htmlDoc = (await readFile(resolvePublicPath("index.html"))).replace(
    "$username$",
    "FIXME"
  );

  res.status(200).send(htmlDoc);
});

export default {
  privateRouter,
};
