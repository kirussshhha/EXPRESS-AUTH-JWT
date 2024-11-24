import userModel from "../models/userModel.js";

export const create = async (data) => {
  return await userModel.create(data);
};

export const find = async (email, password) => {
  return await userModel.find({ email, password });
};
