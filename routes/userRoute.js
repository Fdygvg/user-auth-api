import express from "express";
import usercontroller from "../controller/userController.js";
import { verifyToken } from "../middleware/auth.js";


class UserRouteClass {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }
  initializeRoutes() {
    this.router.post("/register", usercontroller.registeracct);
    this.router.post("/auth/login", usercontroller.login);
    this.router.get("/profile", verifyToken, usercontroller.viewAcct);
    this.router.post("/logout", verifyToken, usercontroller.logout);
  }
  getRouter(){
    return this.router
  }
}

const userRoutes = new UserRouteClass()
export default userRoutes