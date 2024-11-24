import express from "express";
import { signIn, signUp } from "./userController.js";

const router = express.Router();

router.post("/signUp", signUp);
router.get("/signIn", signIn);

export default router;
