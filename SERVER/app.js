import express from "express";
import connectDb from "./config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import checkAuth from "./middleware/authMiddleware.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}))
app.use(cookieParser());


app.use("/user",userRoutes);
app.use("/todos",checkAuth,todoRoutes);


app.listen(port, () => {
  connectDb();
  console.log(`server is started on ${port}`);
});