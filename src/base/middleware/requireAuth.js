// import { response } from "express";
// import { redirect } from "express/lib/response";
// import loginRouter from "../routers/login.router.js";
import sessionManager from "../sessionManager.js";


const requireAuth = (req, res, next) => {
  console.log("kör requireAuth middleware");
  // console.log(
  //   `[${req.method}] ${req.cookie} ${req.url}`
  // );
  // console.log(res.headers.cookie)




  try{
    const id = req.headers.cookie.split("=")[1]
    sessionManager.isInvalidSession(id)
    sessionManager.findSessionById(id);
    console.log("A")
    next()
    console.log("B")
  } catch (TypeError){
    console.log(req.headers.cookie)
    console.log("cookie undefined")
    console.log("C")
    res.redirect("/login");
    console.log("D")
    // loginRouter.publicRouter(req, res)
    // const htmlDoc = await readFile(resolvePublicPath("login.html"));
    // const htmlDoc = readFile(resolvePublicPath("login.html"));
    // res.status(200).send(htmlDoc);

    // next()
  }
};

export default requireAuth;
