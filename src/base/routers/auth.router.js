import { Router } from "express";
import db from "../database.js";
import sessionManager from "../sessionManager.js";

const publicRouter = Router();
const privateRouter = Router();

function invalidNewPassword(username, password, confirm) {
  if (password !== confirm) {
    console.log("lösenord stämmer inte överens"); // kolla så att lösenorden stämmer överens
    return true;
  }
  if (password.length < 3 || username.length < 3) {
    // antalet tecken
    console.log("måste vara minst 3 tecken");
    return true;
  }

  if (
    username.replace(/[^0-9]/g, "").length === 0 ||
    password.replace(/[^0-9]/g, "").length === 0
  ) {
    // antalet siffror
    console.log("måste vara minst 1 siffra");
    return true;
  }

  if (
    username.replace(/[a-zA-Z]/g, "").length === 0 ||
    password.replace(/[a-zA-Z]/g, "").length === 0
  ) {
    // antalet bokstäver
    console.log("måste vara minst 1 bokstav");
    return true;
  }

  return false;;
}

async function invalidNewUsername(username) {
  await db.each("SELECT * FROM users WHERE username=?", [username], (err) => {
    // kolla så att användarnamnet inte redan finns
    if (err) {
      throw new Error(err);
    } else {
      console.log("användarnamnet upptaget");
      return true;
    }
  });
  return false;
}

async function logIn(username, password) {
  let match = false;
  await db.each(
    "SELECT * FROM users WHERE username=? AND password=?",
    [username, password],
    (err, row) => {
      if (err) {
        console.log("error");
        throw new Error(err);
      } else {
        match = true;
        console.log("matchning");
        console.log(row);
      }
    }
  );

  console.log(match);
  return match;
}

publicRouter.post("/login", (req, res) => {
  console.log(req.body);
  let match = false;
  const { username } = req.body;
  const { password } = req.body;
  match = logIn(username, password);
  console.log("returnat match: ", match);

  if (match === true) {
    console.log("match");
    const session = sessionManager.createNewSession();
    res.cookie("session-id", session.id).redirect("/");
  } else {
    console.log("no match");
    res.redirect("/login");
  }
});

function insertToDatabase(username, password){
db.run("INSERT INTO users (username, password) VALUES (?,?)",[username, password]);
}

publicRouter.post("/registration", (req, res) => {
  console.log(req.body);

  const { username } = req.body;
  const { password } = req.body;
  const { confirm } = req.body;

  let okUser = true;

  invalidNewUsername(username).then((invalidInput) => {
    if (invalidInput) {
      okUser = false;
    }
  });

  if (invalidNewPassword(username, password, confirm)) {
    okUser = false;

  }

  if (okUser){
    insertToDatabase(username, password)
    const session = sessionManager.createNewSession();
    res.cookie("session-id", session.id).redirect("/login");
  }
  else{
    res.redirect("/registration?error=felaktig input")
  }

  
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
