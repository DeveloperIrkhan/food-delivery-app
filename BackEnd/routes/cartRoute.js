import express from "express";
import {
  GetAllCartItemsController,
  AddToCartController,
  RemoveFromCartController,
} from "../controllers/cartController.js";
import requiredSignInAsync from "../middleware/authMiddleware.js";

const cartRoute = express.Router();

cartRoute.get(
  "/GetAllCartItems",
  requiredSignInAsync,
  GetAllCartItemsController
);
cartRoute.post("/AddtoCart", requiredSignInAsync, AddToCartController);
cartRoute.delete(
  "/RemoveFromCart",
  requiredSignInAsync,
  RemoveFromCartController
);

export default cartRoute;
