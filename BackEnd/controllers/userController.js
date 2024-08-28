import userModel from "../models/userModel.js";
import validator from "validator";
import {
  ComparePasswordAsync,
  createToken,
  PasswordHashing,
} from "../helpers/authHelper.js";
import { userRoleEnums } from "../Enums/userRolesEnums.js";

//Login User
const UserSignInController = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(404)
        .send({ message: "pelase enter username and password" });
    }
    // checking user exsisting
    const IsExistingUser = await userModel.findOne({ email: username });
    if (!IsExistingUser) {
      return res.status(404).send({
        success: false,
        message: `this user ${username} is not registered yet`,
      });
    }
    // checking password comparing
    const IsPasswordMatched = await ComparePasswordAsync(
      password,
      IsExistingUser.password
    );
    if (!IsPasswordMatched) {
      return res.status(404).send({
        success: false,
        message: "password doesn't matched....",
      });
    }
    // generating new token
    const token = createToken(IsExistingUser._id);
    return res.status(200).send({
      success: true,
      message: "user login successfully...",
      exsistingUser: {
        name: IsExistingUser.name,
        username: IsExistingUser.email,
        userRole:IsExistingUser.Role
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while login",
      error,
    });
  }
};

//SignUp User
const UserSignupController = async (req, res) => {
  try {
    const { name, password, email } = req.body;
    if (!name) {
      return res.send({ message: "name is required." });
    }
    if (!password) {
      return res.send({ message: "password is required." });
    }
    if (!email) {
      return res.send({ message: "email is required." });
    }
    const IsAlreadyExists = await userModel.findOne({ email });
    if (IsAlreadyExists) {
      return res.status(200).send({
        success: false,
        message: `this user ${email} already exist`,
      });
    }
    //validating user email
    if (!validator.isEmail(email)) {
      return res.status(200).send({
        success: false,
        message: `provided email ${email} is not correct`,
      });
    }
    //validating strong password of user
    if (password.length < 8) {
      return res.status(200).send({
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
    });
    const user = await NewUser.save();
    const token = createToken(user._id);
    return res.status(200).send({
      success: true,
      message: "New user register successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error white registering user!",
      error,
    });
  }
};

export { UserSignInController, UserSignupController };
