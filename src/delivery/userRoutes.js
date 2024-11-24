import express from "express";
import { signIn, signUp } from "./userController.js";
import validateRequest from "../middlewares/validation/validateRequest.js";
import orderSchema from "../middlewares/validation/schema/userSchema.js";

const router = express.Router();

router.post("/signUp",validateRequest(orderSchema), signUp);
router.get("/signIn", signIn);

export default router;
