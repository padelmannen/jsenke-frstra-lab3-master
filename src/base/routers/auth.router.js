import { Router } from "express";
import * as bcrypt from 'bcrypt';
import db from "../database.js";
import sessionManager from "../sessionManager.js";

const publicRouter = Router();
const privateRouter = Router();

async function usernameExists(username) {
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
  usernameExists(username).then((exists) => {
    if (exists) {
      errMess = "Användarnamnet är upptaget";
    }
  });
  if (errMess !== "") {
    return errMess;
  }
  if (!isLongerThan3(username)) {
    return "användarnamnet måste ha minst 3 tecken";
  }
  if (hasNoLetter(username)) {
    return "användarnamnet måste ha minst 1 bokstav";
  }
  if (hasNoNumber(username)) {
    return "användarnamnet måste ha minst 1 siffra";
  }
  return "";
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

// function hashPassword(password){
//   bcrypt.hash(password, 10, (err, hashedPassword) => {
//     console.log(hashedPassword)
//     if (err){
//       console.log("hash error")
//       throw new Error (err)
//     }
//     else{
//       return hashedPassword
//     }
//   })
// }

async function logIn(username, password) {
  let match = false;
  console.log("password", password)
  // const hashedPassword = hashPassword(password)
  // console.log(hashedPassword)
  await db.each(
    "SELECT password FROM users WHERE username=?",
    [username],
    (err, hashedPassword) => {
      console.log(hashedPassword)
      if (err) {
        console.log("error");
        throw new Error(err);
      } else {
        // hashedPassword.toString()
        bcrypt.compareSync(password,  hashedPassword.toString()); // true om rätt lösen 
        match = true;
        // console.log("matchning");
        // console.log(row);
      }
    }
  );

  // console.log(match);
  return match;
}


publicRouter.post("/login", (req, res) => {
  // console.log(req.body);
  // let match = false;
  const { username } = req.body;
  const { password } = req.body;
  // const hashedPassword = hashPassword(password)

  logIn(username, password).then((match) => {
    // match är antingen true eller false
    console.log("match: ", match);
    // console.log("returnat match: ", match);

    if (match === true) {
      console.log("match");
      const session = sessionManager.createNewSession(username);
      res.cookie("session-id", session.id).redirect("/");
      // cookieList.append
    } else {
      console.log("no match");
      res.redirect("/login?error=felaktig inloggning");
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

  console.log("testar okUser");

  if (usernameError === "" && passwordError === "") {
    const hashedPassword = bcrypt.hashSync(password, 10);
    console.log(hashedPassword)
    insertToDatabase(username, hashedPassword);
    const session = sessionManager.createNewSession();
    res.cookie("session-id", session.id).redirect("/login");
  } else {
    console.log("redirectar error")
    res.redirect(`/registration?error=${usernameError}\n${passwordError}`);
  }
});

privateRouter.post("/logout", (req, res) => {
  console.log(req.body);

  const id = req.headers.cookie.split("=")[1];
  
  console.log("invaliderar cookie!")
  sessionManager.endSession(id);

  res.redirect("/login?success=Du är utloggad!");
});

export default {
  publicRouter,
  privateRouter,
};
