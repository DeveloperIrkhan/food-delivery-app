import express from "express";
import {
  UserSignInController,
  UserSignupController,
} from "../controllers/userController.js ";
const userRoutes = express.Router();

userRoutes.post("/Signup", UserSignupController);
userRoutes.post("/SignIn", UserSignInController);

export default userRoutes;
