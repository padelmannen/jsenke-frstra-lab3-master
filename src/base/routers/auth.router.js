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

  const {username} = req.body
  const {password} = req.body

  db.each("SELECT rowid AS id, info FROM lorem",(err, row) => {
    
    if (err) {
      throw new Error(err);
    }
    else if ((`${row.id}`===username && `${row.info}`=== password)){  // kollar om input matchar given rad i databasen 
      console.log("hittade användare")  // funkar
      
      console.log(`${row.id}: ${row.info}`); 
     // foundUser = true;  // sätter true

      const session = sessionManager.createNewSession();
  
      res.cookie("session-id", session.id).redirect("/");
      // return false;
      
    }; 
    console.log(`${row.id}: ${row.info}`); 
    // return true;


  });


  
  // res.redirect("/");
});

  // FIXME



publicRouter.post("/registration", (req, res) => {
  console.log(req.body);

  
  const {username} = req.body
  const {password} = req.body
  const {confirm} = req.body

  if (password !== confirm){
    console.log("lösenord stämmer inte överens")    // kolla så att lösenorden stämmer överens 
    res.redirect("/login");
  }
  else if (password.length < 3 || username.length < 3){   // antalet tecken
    console.log("måste vara minst 3 tecken")
    res.redirect("/login");
  }

  else if ((username.replace(/[^0-9]/g,"").length)===0 || (password.replace(/[^0-9]/g,"").length)===0){    // antalet siffror
    console.log("måste vara minst 1 siffra")
    res.redirect("/login");
  }

  else if ((username.replace(/[a-zA-Z]/g,"").length)===0 || (password.replace(/[a-zA-Z]/g,"").length)===0){    // antalet bokstäver
    console.log("måste vara minst 1 bokstav")
    res.redirect("/login");
  }
  else{
    console.log("lösenordet är godkänt")
  

  // FIXME

    db.each("SELECT rowid AS id, info FROM lorem", (err, row) => {   // kolla så att användarnamnet inte redan finns
      if (err) {
        throw new Error(err);
      }
      else if (`${row.id}`===username){
        console.log("användarnamnet upptaget")
        res.redirect("/registration");
        // return false;
      }
      console.log(`${row.id}: ${row.info}`);
    });

    // FIXME

    res.redirect("/login?success=FIXME");
  };
})

privateRouter.post("/logout", (req, res) => {
  console.log(req.body);

  // FIXME

  res.redirect("/login?error=FIXME");
});

export default {
  publicRouter,
  privateRouter,
};