import express from "express";
import multer from "multer";
import {
  AddCategoryController,
  GetAllCategoriesController,
  RemoveCategoryController,
} from "../controllers/categoryController.js";

const categoryRoutes = express.Router();

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, callback) => {
    return callback(null, `Category_${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });
categoryRoutes.post("/add", upload.single("image"), AddCategoryController);
categoryRoutes.delete("/remove/:id", RemoveCategoryController);
categoryRoutes.get("/get-all-categories", GetAllCategoriesController);
export default categoryRoutes;
