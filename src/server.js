import express from "express";
import dotenv from "dotenv";
import connectionToDatabase from "./config/connectToDatabase.js";
import userRoutes from "./delivery/userRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());
const port = process.env.PORT || 4000;

app.use("/user", userRoutes);

app.listen(port, async () => {
  await connectionToDatabase();
  console.log(`Server is listening on port ${port}`);
});
