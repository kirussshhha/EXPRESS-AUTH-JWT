import { createUser, findUser, updateToken } from "../usecase/userUsecase.js";

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

export const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken)
      return res.status(401).json({ message: "Токен отсутствует" });

    const result = await updateToken({ refreshToken });
    res.status(200).json({
      message: "Токен обновлен",
      result,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
