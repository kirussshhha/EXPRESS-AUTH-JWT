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

export const findOne = async (data) => {
  return await userModel.findOne(data);
};