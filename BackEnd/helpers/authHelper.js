import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const PasswordHashing = async (userPassword) => {
  try {
    const saltRound = await bcrypt.genSalt(10);
    const HashedPassword = await bcrypt.hash(userPassword, saltRound);
    return HashedPassword;
  } catch (error) {
    console.log("error while hashing password", error);
  }
};

export const ComparePasswordAsync = (password, existingPassword) => {
  try {
    return bcrypt.compare(password, existingPassword);
  } catch (error) {
    console.log("error while comparing password", error);
  }
};

export const createAccessToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_TOKEN_SECRET, { expiresIn: "2d" });
};
export const createRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_TOKEN_SECRET, { expiresIn: "2d" });
};
