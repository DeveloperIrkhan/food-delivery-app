import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    cartItem: { type: Object, default: {} },
  },
  { minimize: false }
);
const cartModel =
  mongoose.models.cartModel || mongoose.model("cartItems", cartSchema);
export default cartModel;
