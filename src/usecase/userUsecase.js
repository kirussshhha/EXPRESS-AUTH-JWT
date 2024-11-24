import { create } from "../repository/userRepository.js";

export const createUser = async (data) => {
  return await create(data);
};
