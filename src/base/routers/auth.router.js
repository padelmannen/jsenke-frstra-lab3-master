import { Router } from "express";
import * as bcrypt from "bcrypt";
import db from "../database.js";
import sessionManager from "../sessionManager.js";

const publicRouter = Router();
const privateRouter = Router();

async function usernameExists(username) {
  let exists = false;
  await db.each("SELECT * FROM users WHERE username=?", [username], (err) => {
    // kolla så att användarnamnet inte redan finns
    console.log("user finns")
    if (err) {
      throw new Error(err);
    } else {
      exists = true;
    }

  });
  return exists;
}

function isCorrectConfirm(password, confirm) {
  // kolla så att lösenorden stämmer överens
  return password === confirm;
  // console.log("lösenord stämmer inte överens");
}

function isLongerThan3(input) {
  return input.length > 2;
}

function hasNoLetter(input) {
  return input.replace(/[^0-9]/g, "").length === 0;
}

function hasNoNumber(input) {
  return input.replace(/[a-zA-Z]/g, "").length === 0;
}

function checkUsername(username) {
  let errMess = "";
  
  if( usernameExists(username).then((exists) => {
    console.log(exists)
    if (exists) {
      errMess = "Användarnamnet är upptaget";
    } 
    else{
      errMess = "";
    }
  })) errMess = "Användarnamnet är upptaget";
  else{
    if (!isLongerThan3(username)) {
      return "användarnamnet måste ha minst 3 tecken";
    }
    if (hasNoLetter(username)) {
      return "användarnamnet måste ha minst 1 bokstav";
    }
    if (hasNoNumber(username)) {
      return "användarnamnet måste ha minst 1 siffra";
    }
    return errMess;
  }
  return errMess;
  // console.log("errmess", errMess)
  // if (errMess !== "") {
  //   return errMess;
  // }
  
}

function checkPassword(password, confirm) {
  if (!isCorrectConfirm(password, confirm)) {
    return "lösenorden stämmer inte överens";
  }
  if (!isLongerThan3(password)) {
    return "lösenordet måste ha minst 3 tecken";
  }
  if (hasNoLetter(password)) {
    return "lösenordet måste ha minst 1 bokstav";
  }
  if (hasNoNumber(password)) {
    return "lösenordet måste ha minst 1 siffra";
  }
  return "";
}

function insertToDatabase(username, password) {
  db.run("INSERT INTO users (username, password) VALUES (?,?)", [
    username,
    password,
  ]);
}

async function logIn(username, password) {
  let match = false;
  await db.each(
    "SELECT password FROM users WHERE username=?",
    [username],
    (err, hashedPassword) => {
      console.log(hashedPassword);
      if (err) {
        console.log("error");
        throw new Error(err);
      } else {
        bcrypt.compareSync(password, hashedPassword.toString()); // true om rätt lösen
        match = true;
      }
    }
  );
  return match;
}

publicRouter.post("/login", (req, res) => {
  const { username } = req.body;
  const { password } = req.body;

  logIn(username, password).then((match) => {
    // match är antingen true eller false
    console.log("match: ", match);

    if (match === true) {
      const session = sessionManager.createNewSession(username);
      res.cookie("session-id", session.id).redirect("/");
    } else {
      res.redirect("/login?error=Felaktig inloggning!");
    }
  });
});

publicRouter.post("/registration", (req, res) => {
  console.log(req.body);

  const { username } = req.body;
  const { password } = req.body;
  const { confirm } = req.body;

  const usernameError = checkUsername(username);
  const passwordError = checkPassword(password, confirm);

  if (usernameError === "" && passwordError === "") {
    const hashedPassword = bcrypt.hashSync(password, 10);
    insertToDatabase(username, hashedPassword);
    res.redirect("/login?success=Ny användare registrerad!");
  } else {
    console.log("redirectar error");
    res.redirect(`/registration?error=${usernameError}\n${passwordError}`);
  }
});

privateRouter.post("/logout", (req, res) => {
  const id = req.headers.cookie.split("=")[1];
  console.log("invaliderar cookie!");
  sessionManager.endSession(id);
  res.redirect("/login?success=Du är utloggad!");
});

export default {
  publicRouter,
  privateRouter,
};
