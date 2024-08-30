import mongoose from "mongoose";

const categoryModel = new mongoose.Schema({
  name: { type: String, require: true },
  description: { type: String, require: true },
  image: { type: String, require: true },
});
export default mongoose.model("category", categoryModel);
