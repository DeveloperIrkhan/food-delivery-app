import foodModel from "../models/FoodModel.js";
import userModel from "../models/userModel.js";

const GetAllCartItemsController = async (req, resp) => {
  try {
    const userId = req.body.userId;
    const user = await userModel.findOne({ _id: userId });
    if (user) {
      let cartItems = (await user.cartData) || {};

      const itemIds = Object.keys(cartItems);
      // Fetch item details based on item IDs stored in cartData
      const items = await foodModel.find({ _id: { $in: itemIds } });
      // Enrich the items with their quantities from the cartData
      const cartItemsDetails = items.map((item) => ({
        _id: item._id,
        name: item.name,
        price: item.price,
        image: item.image,
        OrderQuantity: cartItems[item._id], // Get quantity from cartData
      }));
      return resp.status(200).send({
        status: "success",
        message: "all items retrieved",
        cartItemsDetails,
      });
    }
  } catch (error) {
    return resp.status(200).send({
      error: error,
      status: "false",
      message: "something went wrong.",
    });
  }
};
const AddToCartController = async (req, resp) => {
  try {
    const userId = req.body.userId;
    const itemId = req.body.itemId;
    let userData = await userModel.findOne({ _id: userId });
    let cartItems = (await userData.cartData) || {};
    if (!cartItems[itemId]) {
      cartItems[itemId] = 1;
    } else {
      cartItems[itemId] += 1;
    }
    await userModel.findByIdAndUpdate(userId, { cartData: cartItems });
    return resp
      .status(200)
      .send({ success: true, message: "item added successfully" });
  } catch (error) {
    return resp
      .status(200)
      .send({ success: false, message: "error while adding item to cart" });
  }
};
const RemoveFromCartController = async (req, resp) => {
  try {
    const userId = req.body.userId;
    const itemId = req.body.itemId;
    let userData = await userModel.findById(userId);
    let cartItems = userData.cartData;
    if (cartItems[itemId] != 1) {
      cartItems[itemId] -= 1;
    } else {
      delete cartItems[itemId];
    }
    await userModel.findByIdAndUpdate(userId, { cartData: cartItems });
    return resp
      .status(200)
      .send({ success: true, message: "item removed successfully" });
  } catch (error) {
    return resp
      .status(200)
      .send({ success: false, message: "error while removing item to cart" });
  }
};

export {
  GetAllCartItemsController,
  AddToCartController,
  RemoveFromCartController,
};
