import { Router } from "express";
import db from "../database.js";
import sessionManager from "../sessionManager.js";

const publicRouter = Router();
const privateRouter = Router();

publicRouter.post("/login", (req, res) => {
  // console.log("hej")
  console.log(req.body);
  // nytt som kommer vid klickning av inlogg
  // FIXME

  db.each("SELECT rowid AS id, info FROM lorem", (err, row) => {
    if (err) {
      throw new Error(err);
    }
    if (row = "")
    console.log(`${row.id}: ${row.info}`);
  });

  // FIXME

  const session = sessionManager.createNewSession();

  res.cookie("session-id", session.id).redirect("/");
});

publicRouter.post("/registration", (req, res) => {
  console.log(req.body);

  // FIXME

  db.each("SELECT rowid AS id, info FROM lorem", (err, row) => {
    if (err) {
      throw new Error(err);
    }
    console.log(`${row.id}: ${row.info}`);
  });

  // FIXME

  res.redirect("/login?success=FIXME");
});

privateRouter.post("/logout", (req, res) => {
  console.log(req.body);

  // FIXME

  res.redirect("/login?error=FIXME");
});

export default {
  publicRouter,
  privateRouter,
};
