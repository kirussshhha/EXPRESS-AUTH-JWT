import { create, find } from "../repository/userRepository.js";

export const createUser = async (data) => {
  return await create(data);
};

export const findUser = async (email, password) => {
  return await find(email, password);
};
