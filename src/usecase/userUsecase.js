import bcrypt from "bcrypt";
import { create, findByEmail } from "../repository/userRepository.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/tokenUtils.js";

export const createUser = async ({ nickname, email, password, isVerify }) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await create({ nickname, email, isVerify, password: hash });

    const accessToken = generateAccessToken(user._id);
    const setRefreshToken = generateRefreshToken(user._id);

    user.refreshToken = setRefreshToken;
    await user.save();

    return {
      user,
      accessToken,
    };
  } catch (err) {
    throw new Error("Ошибка при обработке регистрации");
  }
};

export const findUser = async ({ email, password }) => {
  try {
    const user = await findByEmail({ email });
    if (!user) {
      throw new Error("Пользователь не найден");
    }

    const isValidPass = await bcrypt.compare(password, user.password);
    if (!isValidPass) {
      throw new Error("Неверный логин или пароль");
    }

    const accessToken = generateAccessToken(user._id);
    const setRefreshToken = generateRefreshToken(user._id);

    user.refreshToken = setRefreshToken;
    await user.save();

    return {
      user,
      accessToken,
    };
  } catch (err) {
    throw new Error("Ошибка при входе в аккаунт");
  }
};
