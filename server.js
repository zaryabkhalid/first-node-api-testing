import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user.js";
import erorrHandler from "./middleware/ErorrHandler.js";
import connectDB from "./config/DatabaseConnect.js";
import blogRouter from "./routes/blog.js";

const app = express();
dotenv.config();
const PORT = process.env.APP_PORT || 3500;
connectDB();

app.use(express.json());
app.use("/api/v2", userRouter);
app.use("/api/v2/blogs", blogRouter);
app.get("/", (req, res) => {
  res.status(200).send("<h2>Hi i am live API Project Two</h2>");
});
app.use(erorrHandler);

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
