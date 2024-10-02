import express from "express";
import {
  GetOrdersController,
  PlaceOrderController,
} from "../controllers/OrderController.js";
import requiredSignInAsync from "../middleware/authMiddleware.js";

export const orderRoute = express.Router();

orderRoute.post("/placeorder", requiredSignInAsync, PlaceOrderController);
orderRoute.get("/GetOrders", requiredSignInAsync, GetOrdersController);
