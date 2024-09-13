import express from "express";
import {
  UserSignInController,
  UserSignupController,
} from "../controllers/userController.js ";
import multer from "multer";

const userRoutes = express.Router();
//to store image as byte[] in db
// const storage = multer.memoryStorage();

//Image storage Engin as string
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, callback) => {
    return callback(null, `userImg_${Date.now()}${file.originalname}`);
  },
});
const upload = multer({ storage: storage });
userRoutes.post("/Signup", upload.single("image"), UserSignupController);
//userRoutes.post("/Signup", UserSignupController);
userRoutes.post("/SignIn", UserSignInController);

export default userRoutes;
