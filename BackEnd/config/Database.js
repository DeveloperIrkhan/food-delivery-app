import mongoose from "mongoose";

export const ConnectionDb = async () => {
  await mongoose
    .connect(
      "mongodb+srv://programmerirfansha:IRkhan_123@cluster0.met58xe.mongodb.net/FoodDeliveryApp"
    )
    .then(console.log("connection made successfuly"));
};
