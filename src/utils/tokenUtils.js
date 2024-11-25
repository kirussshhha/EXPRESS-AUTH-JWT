import jwt from "jsonwebtoken";

export const generateAccessToken = (userId) => {
  return jwt.sign({ _id: userId }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "10m",
  });
};

export const generateRefreshToken = (userId) => {
  return jwt.sign({ _id: userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
};