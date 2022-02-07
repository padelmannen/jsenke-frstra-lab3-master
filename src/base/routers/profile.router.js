import { Router } from "express";
import { readFile, resolvePublicPath } from "../util.js";

const privateRouter = Router();

privateRouter.get("/", async (req, res) => {
  console.log(req.body);

  // FIXME

  const htmlDoc = (await readFile(resolvePublicPath("index.html"))).replace(
    "$username$",
    "FIXME"
  );

  res.status(200).send(htmlDoc);
});

export default {
  privateRouter,
};
