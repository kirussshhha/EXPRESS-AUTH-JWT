import { createUser } from "../usecase/userUsecase.js";

export const signUp = async (req, res) => {
  try {
    const user = await createUser(req.body);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
