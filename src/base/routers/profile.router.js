import { Router } from "express";
import { readFile, resolvePublicPath } from "../util.js";

const privateRouter = Router();

privateRouter.get("/", async (req, res) => {
  // console.log("getheader")
  // console.log(req.head)   // new
  // console.log("getbody")
  // console.log(req.body);

  console.log(req.headers.cookie);

  const htmlDoc = (await readFile(resolvePublicPath("index.html"))).replace(
    "$username$",
    "kalle"
    
  );

  res.status(200).send(htmlDoc);
});

export default {
  privateRouter,
};
