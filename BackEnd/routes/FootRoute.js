import express from "express";

import {
  AddingFoodController,
  ListAllFoodController,
  RemovingFoodItemController,
} from "../controllers/foodController.js";
import multer from "multer";
// multer is used for storing image.
const foodRouter = express.Router();

//Image storage Engin
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, callback) => {
    return callback(null, `FoodItem_${Date.now()}${file.originalname}`);
  },
});
const upload = multer({ storage: storage });
foodRouter.post("/add", upload.single("image"), AddingFoodController);
foodRouter.get("/getAllFood", ListAllFoodController);
foodRouter.delete("/remove/:id", RemovingFoodItemController);

export default foodRouter;
