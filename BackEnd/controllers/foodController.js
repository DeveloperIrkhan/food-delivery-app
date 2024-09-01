import foodModel from "../models/FoodModel.js";

import fs from "fs";
// to add food model

// const AddFood = async (req, resp) => {
//   let imageName = `${req.file.filename}`;
//   const food = new foodModel({
//     name: req.body.name,
//     description: req.body.description,
//     price: req.body.price,
//     image: imageName,
//     category: req.body.category,
//   });

//   try {
//     await food.save();
//     resp.json({
//       success: true,
//       message: "Food added",
//     });
//   } catch (error) {
//     console.log(error);
//     resp.status(500).send({
//       success: false,
//       message: "error while creating new food item",
//     });
//   }
// };

const AddingFoodController = async (req, resp) => {
  try {
    const { name, description, price, category } = req.body;

    // Ensure that file upload middleware has processed the image
    if (!req.file || !req.file.filename) {
      return resp.status(500).send({ error: "please upload image" });
    }
    const imageName = req.file.filename;

    // Validate required fields
    if (!name) return resp.status(500).send({ error: "Name is required" });
    if (!description)
      return resp.status(500).send({ error: "Description is required" });
    if (!price) return resp.status(500).send({ error: "Price is required" });
    if (!category)
      return resp.status(500).send({ error: "Category is required" });

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
    return resp.status(201).send({
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
