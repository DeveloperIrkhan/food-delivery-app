import userModel from "../models/userModel.js";
import validator from "validator";
import {
  ComparePasswordAsync,
  createAccessToken,
  createRefreshToken,
  PasswordHashing,
} from "../helpers/authHelper.js";
import { userRoleEnums } from "../Enums/userRolesEnums.js";

//Login User
const UserSignInController = async (request, res) => {
  try {
    const { email, password } = request.body;
    if (!email || !password) {
      return res
        .status(404)
        .json({ message: "pelase enter email and password" });
    }

    // checking user exsisting
    const IsExistingUser = await userModel.findOne({ email: email });
    if (!IsExistingUser) {
      return res.status(200).json({
        success: false,
        message: `this user ${email} is not registered yet`,
      });
    }
    // checking password comparing
    const IsPasswordMatched = await ComparePasswordAsync(
      password,
      IsExistingUser.password
    );
    if (!IsPasswordMatched) {
      return res.status(200).json({
        success: false,
        message: "password doesn't matched....",
      });
    }
    // generating new token
    const accessToken = createAccessToken(IsExistingUser._id);
    const refreshToken = createRefreshToken(IsExistingUser._id);
    res.cookie("accessToken", accessToken, {
      secure: true, 
      maxAge: 24 * 60 * 60 * 1000, 
      path: "/",
    });
    res.cookie("refreshToken", refreshToken, {
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, 
      path: "/",
    });
    return res.status(200).json({
      success: true,
      message: "user login successfully...",
      exsistingUser: {
        name: IsExistingUser.name,
        email: IsExistingUser.email,
        userRole: IsExistingUser.Role,
        image: IsExistingUser.image,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error while login",
      error,
    });
  }
};

//SignUp User
const UserSignupController = async (request, response) => {
  try {
    const { name, password, email } = request.body;
    if (!name) {
      return response.json({ message: "name is required." });
    }
    if (!password) {
      return response.json({ message: "password is required." });
    }
    if (!email) {
      return response.json({ message: "email is required." });
    }
    const imageName = request.file.filename;

    const IsAlreadyExists = await userModel.findOne({ email });
    if (IsAlreadyExists) {
      return response.status(200).json({
        success: false,
        message: `this user ${email} already exist`,
      });
    }
    //validating user email
    if (!validator.isEmail(email)) {
      return response.status(200).json({
        success: false,
        message: `provided email ${email} is not correct`,
      });
    }
    //validating strong password of user
    if (password.length < 8) {
      return response.status(200).json({
        success: false,
        message: "Please enter minimum 8 digits password",
      });
    }
    //Hashing Password
    const HasehdPassword = await PasswordHashing(password);
    //creating new user
    const NewUser = new userModel({
      name,
      email,
      Role: userRoleEnums.isUser,
      password: HasehdPassword,
      //this is saving image as byte[]
      // image: request.file.buffer,
      //this is saving image as string
      image: imageName,
    });
    const user = await NewUser.save();
    const accessToken = createAccessToken(user._id);
    const refreshToken = createRefreshToken(user._id);
    response.cookie("accessToken", accessToken, {
      // httpOnly: true, // Ensures the cookie is accessible only by the web server
      secure: true, // Ensures cookies are sent only over HTTPS in production
      // sameSite: "Strict", // Prevents cross-site request forgery
      maxAge: 24 * 60 * 60 * 1000, // Sets cookie expiration (1 day in this case)
      path: "/",
    });
    response.cookie("refreshToken", refreshToken, {
      // httpOnly: true,
      secure: true,
      // sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // Refresh token expiration (7 days in this case)
      path: "/",
    });
    return response.status(200).json({
      success: true,
      message: "New user register successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      success: false,
      message: "Error white registering user!",
      error,
    });
  }
};

export { UserSignInController, UserSignupController };
