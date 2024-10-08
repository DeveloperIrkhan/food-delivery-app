import foodModel from "../models/FoodModel.js";

import fs from "fs";

const AddingFoodController = async (req, resp) => {
  try {
    const { name, description, price, category } = req.body;

    // Ensure that file upload middleware has processed the image
    if (!req.file || !req.file.filename) {
      return resp
        .status(500)
        .send({ success: false, message: "please upload image" });
    }
    const imageName = req.file.filename;

    // Validate required fields
    if (!name)
      return resp
        .status(500)
        .send({ success: false, message: "please enter Name" });
    if (!description)
      return resp
        .status(500)
        .send({ success: false, message: "please enter description" });
    if (!price)
      return resp
        .status(500)
        .send({ success: false, message: "please enter price" });
    if (!category)
      return resp
        .status(500)
        .send({ success: false, message: "please enter category" });

    // Create a new food item
    const createNewFood = new foodModel({
      name,
      description,
      price,
      category,
      image: imageName,
    });

    // Save the new food item to the database
    await createNewFood.save();

    // Send a success response after saving
    return resp.status(200).send({
      success: true,
      message: "New food item added successfully",
      data: createNewFood,
    });
  } catch (error) {
    console.log(error);
    return resp.status(500).send({
      success: false,
      message: "Error while creating new product",
    });
  }
};

const ListAllFoodController = async (req, resp) => {
  try {
    const foods = await foodModel.find({});
    return resp.status(200).send({
      success: true,
      message: "food items fetched successfully",
      totalFoodItems: foods.length,
      foods,
    });
  } catch (error) {
    console.log(error);
    return resp.status(200).send({
      success: false,
      message: "error while food items is fetching",
    });
  }
};

const RemovingFoodItemController = async (req, resp) => {
  try {
    const fooditem = await foodModel.findById(req.params.id);
    fs.unlink(`uploads/${fooditem.image}`, () => {});
    await foodModel.findByIdAndDelete(req.params.id);
    resp.status(200).send({
      success: true,
      message: "food items deleted successfully",
      fooditem,
    });
  } catch (error) {
    console.log(error);
    resp.status(200).send({
      success: false,
      message: "error while deleting food items",
    });
  }
};

export {
  AddingFoodController,
  ListAllFoodController,
  RemovingFoodItemController,
};
