import { createUser, findUser } from "../usecase/userUsecase.js";

export const signUp = async (req, res) => {
  try {
    const { nickname, email, password, isVerify } = req.body;
    const result = await createUser({ nickname, email, password, isVerify });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await findUser({ email, password });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
