import userModel from "../models/userModel.js";

export const create = async ({ nickname, password, email, isVerify }) => {
  const user = new userModel({
    nickname,
    password,
    email,
    isVerify,
  });

  return await user.save();
};

export const findByEmail = async ({ email }) => {
  return await userModel.findOne({ email });
};
