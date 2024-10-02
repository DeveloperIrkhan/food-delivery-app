import mongoose from "mongoose";
const OrderSchema = new mongoose.Schema({
  userId: { type: String, require: true },
  Item: { type: Array, require: true },
  Amount: { type: String, require: true },
  Address: { type: Object, require: true },
  Status: { type: String, default: "Food Processing" },
  Date: { type: Date, default: Date.now() },
  Payment: { type: Boolean, default: false },
});

const OrderModel =
  mongoose.models.Order || mongoose.model("Order", OrderSchema);
export default OrderModel;
