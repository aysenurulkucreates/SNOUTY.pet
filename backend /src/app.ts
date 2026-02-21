import dotenv from "dotenv";
dotenv.config();
import cors from "cors";

import express from "express";
import mongoose from "mongoose";
import petRoutes from "./routers/Pet";
import userRoutes from "./routers/User";
import adminRoutes from "./routers/Admin";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/pets", petRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);

mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => console.log("DB connection is successfull"));

app.listen(8800, () => {
  console.log("The service is listening port 8800.🚀");
});
