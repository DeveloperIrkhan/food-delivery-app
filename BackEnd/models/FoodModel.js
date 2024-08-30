import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  name: { type: String, require: true },
  description: { type: String, require: true },
  price: { type: Number, require: true },
  image: { type: String, require: true },
  category: { type: mongoose.ObjectId, ref: "category", require: true },
});
// we want to create food model once, if it present in database it will be use
// old one else create new one.
const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);

export default foodModel;
