import userModel from "../models/userModel.js";

export const create = async (data) => {
  return await userModel.create(data);
};
