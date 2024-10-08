import categoryModel from "../models/categoryModel.js";
import fs from "fs";

const AddCategoryController = async (req, resp) => {
  try {
    const { name, description } = req.body;
    if (!req.file || !req.file.filename) {
      return resp
        .status(500)
        .send({ success: false, message: "please upload image" });
    }
    const ImageFile = req.file.filename;
    if (!name) {
      return resp
        .status(500)
        .send({ success: false, message: "please enter name" });
    }
    if (!description) {
      return resp
        .status(500)
        .send({ success: false, message: "please enter description" });
    }
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return resp.status(200).send({
        success: false,
        message: `${name} category is already existed`,
      });
    }

    const createNewCategory = new categoryModel({
      name,
      description,
      image: ImageFile,
    });

    await createNewCategory.save();
    return resp.status(200).send({
      success: true,
      message: "category created successfully",
      data: createNewCategory,
    });
  } catch (error) {
    console.log(error);
    return resp.status(400).send({
      success: false,
      message: "Error while creating new category",
    });
  }
};

const RemoveCategoryController = async (request, response) => {
  try {
    const removeCategory = await categoryModel.findById(request.params.id);
    if (removeCategory != null) {
      fs.unlink(`uploads/${removeCategory.image}`, () => {});
      await categoryModel.findByIdAndDelete(request.params.id);
      return response
        .status(200)
        .send({ success: true, message: "category deleted successfully" });
    } else {
      return response
        .status(400)
        .send({ success: false, message: "category not found" });
    }
  } catch (error) {
    console.log(error);
    return response.status(400).send({
      success: false,
      message: "Error while deleting category item",
      error,
    });
  }
};

const GetAllCategoriesController = async (request, response) => {
  try {
    const categories = await categoryModel.find({});
    if (categories) {
      return response.status(200).send({
        success: true,
        message: "categories fetched successfully",
        Totalcategories: categories.length,
        categories,
      });
    }
    return response.json({ success: false, message: "no category found" });
  } catch (error) {
    console.log(error);
    return response.status(400).send({
      success: false,
      message: "Error retriving category",
      error,
    });
  }
};

export {
  AddCategoryController,
  RemoveCategoryController,
  GetAllCategoriesController,
};
