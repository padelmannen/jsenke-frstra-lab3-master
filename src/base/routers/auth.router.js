import { Router } from "express";
import db from "../database.js";
import sessionManager from "../sessionManager.js";


const publicRouter = Router();
const privateRouter = Router();

function invalidNewPassword(username, password, confirm){
  if (password !== confirm){
    console.log("lösenord stämmer inte överens")    // kolla så att lösenorden stämmer överens 
    return false;
  }
  if (password.length < 3 || username.length < 3){   // antalet tecken
    console.log("måste vara minst 3 tecken")
    return false;
  }

  if ((username.replace(/[^0-9]/g,"").length)===0 || (password.replace(/[^0-9]/g,"").length)===0){    // antalet siffror
    console.log("måste vara minst 1 siffra")
    return false;
  }

  if ((username.replace(/[a-zA-Z]/g,"").length)===0 || (password.replace(/[a-zA-Z]/g,"").length)===0){    // antalet bokstäver
    console.log("måste vara minst 1 bokstav")
    return false;
  }
  
    return true;
  
}

function invalidNewUsername(username){
  db.each("SELECT * FROM users WHERE username=?", [username], (err) => {   // kolla så att användarnamnet inte redan finns
    if (err) {
      throw new Error(err);
    }
    else {
      console.log("användarnamnet upptaget")
      return true;    
    }
  });
  setTimeout(500)
  return false;
}


publicRouter.post("/login", (req, res) => {
  // console.log("hej")
  console.log(req.body);
  // nytt som kommer vid klickning av inlogg
  // FIXME

  const {username} = req.body
  const {password} = req.body


  // db.each("SELECT rowid AS id, info FROM lorem",(err, row) => {
  // const sql = db.prepare("SELECT * FROM users WHERE username=? AND password=?");
  // let match = false;
 
  db.each("SELECT * FROM users WHERE username=? AND password=?", [username, password], (err) =>{
    // const input = [username, password]
    // const query = sql.format(input)
    // statement.run(username, password) 
    // db.each("SELECT * FROM users",(err, row) => {
      // match = true
      console.log("matchning")
      if (err){
        console.log("error")
        throw new Error(err);
      }
      else{
        const session = sessionManager.createNewSession();
        console.log("OK")
        res.cookie("session-id", session.id).redirect("/index");
      }
    // console.log("done each()")
  })
})


publicRouter.post("/registration", (req, res) => {
  console.log(req.body);


  const {username} = req.body
  const {password} = req.body
  const {confirm} = req.body



  let redirection = "/login?success=FIXME"

  if (invalidNewPassword(username, password, confirm)){
    redirection = "/registration";
  }
  else if (invalidNewUsername(username)){
    redirection = "/registration"
  } 
  setTimeout(500);
  const session = sessionManager.createNewSession();
  res.cookie("session-id", session.id).redirect(redirection);  
})
  

privateRouter.post("/logout", (req, res) => {
  console.log(req.body);

  // FIXME

  res.redirect("/login");
  // res.redirect("/login?error=FIXME");
});

export default {
  publicRouter,
  privateRouter,
};