import OrderModel from "../models/OrderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripeKey = new Stripe(process.env.STRIPE_SECRET_KEY);

//placeing Order
const PlaceOrderController = async (req, res) => {
  try {
    const userId = req.body.userId;
    if (userId) {
      const newOrder = new OrderModel({
        userId: userId,
        Item: req.body.items,
        Amount: req.body.amount,
        Address: req.body.address,
      });
      await newOrder.save();
      //now for claering cart form user
      await userModel.findByIdAndUpdate(userId, { cartData: {} });

      const line_items = req.body.items.map((item) => ({
        price_data: {
          currency: "aed",
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100 * 3.4,
        },
        quantity: 1,
      }));
      line_items.push({
        price_data: {
          currency: "aed",
          product_data: {
            name: "Delivery Charges",
          },
          unit_amount: 2 * 100 * 3.4,
        },
        quantity: 1,
      });
      const frontendUrl = "http://localhost:5173/";
      const session = await stripeKey.checkout.sessions.create({
        line_items: line_items,
        mode: "payment",
        success_url: `${frontendUrl}verify?success=true&OrderId=${newOrder._id}`,
        cancel_url: `${frontendUrl}verify?success=false&OrderId=${newOrder._id}`,
      });
      return res.status(200).json({
        success: true,
        message: "Order placed successfully",
        session_url: session.url,
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "You are not logged In",
        session_url: session.url,
      });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Order not placed successfully", error: error.message });
  }
};

const GetOrdersController = async (req, res) => {
  const userId = req.body.userId;

  if (userId) {
    const userOrders = await OrderModel.find({ userId });
    return res.status(200).send({
      success: true,
      message: "user Orders fetched successfully",
      totalOrders: userOrders.length,
      userOrders,
    });
  } else
    return res
      .status(400)
      .json({ success: false, message: "something went wrong!" });
};
export { PlaceOrderController, GetOrdersController };
