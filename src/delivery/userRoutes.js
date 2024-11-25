import express from "express";
import {
  signIn,
  signUp,
  refreshToken,
  verifyEmailHandler,
} from "./userController.js";
import validateRequest from "../middlewares/validation/validateRequest.js";
import {
  validateSignIn,
  validateSignUp,
  validateToken,
} from "../middlewares/validation/schema/validationSchema.js";

const router = express.Router();

router.post("/signUp", validateRequest(validateSignUp), signUp);
router.post("/signIn", validateRequest(validateSignIn), signIn);
router.post("/refresh-token", validateRequest(validateToken), refreshToken);
router.get("/verify-email", verifyEmailHandler);

export default router;
