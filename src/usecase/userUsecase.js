import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { create, findOne } from "../repository/userRepository.js";
import {
  generateAccessToken,
  generateRefreshToken,
  generateEmailToken,
} from "../utils/tokenUtils.js";
import { sendEmail } from "../utils/emailUtils.js";

export const createUser = async ({ nickname, email, password, isVerify }) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await create({ nickname, email, isVerify, password: hash });

    const emailToken = generateEmailToken(user._id);
    const verificationLink = `${process.env.CLIENT_URL}/user/verify-email?token=${emailToken}`;

    await sendEmail({
      to: email,
      subject: "Подтверждение регистрации",
      html: `
        <h1>Добро пожаловать, ${nickname}!</h1>
        <p>Для завершения регистрации перейдите по ссылке:</p>
        <a href="${verificationLink}">${verificationLink}</a>
      `,
    });

    const accessToken = generateAccessToken(user._id);
    const setRefreshToken = generateRefreshToken(user._id);

    user.refreshToken = setRefreshToken;
    await user.save();

    return {
      user,
      accessToken,
    };
  } catch (err) {
    throw new Error("Ошибка при обработке регистрации" + err);
  }
};

export const findUser = async ({ email, password }) => {
  try {
    const user = await findOne({ email });
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

export const updateToken = async ({ refreshToken }) => {
  const user = await findOne({ refreshToken });
  if (!user) {
    throw new Error("Пользователь не найден");
  }

  try {
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const accessToken = generateAccessToken(user._id);
    const setRefreshToken = generateRefreshToken(user._id);

    user.refreshToken = setRefreshToken;
    await user.save();

    return {
      user,
      accessToken,
    };
  } catch (err) {
    throw new Error("Токен не действителен");
  }
};

export const verifyEmail = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.EMAIL_TOKEN_SECRET);
    const user = await findOne({ _id: decoded.id });
    if (!user) {
      throw new Error("Пользователь не найден.");
    }

    if (user.isVerify) {
      throw new Error("Email уже подтвержден.");
    }

    user.isVerify = true;
    await user.save();

    return { message: "Email успешно подтвержден.", user };
  } catch (err) {
    throw new Error("Ошибка подтверждения email: " + err.message);
  }
};
