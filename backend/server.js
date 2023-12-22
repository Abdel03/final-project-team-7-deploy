import express from "express";
import dotemv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import morgan from "morgan";
import cors from "cors";
import path from "path";

dotemv.config();
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";

const port = process.env.PORT || 3000;
if (process.env.NODE_ENV === "production") {
  const _dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "frontend")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend,", "index.html"))
  );
} else {
  app.get("/", (req, res) => res.send("Server is ready"));
}

connectDB();

const app = express();
app.use(
  cors({
    origin: true,
  })
);
app.use(express.json());
app.use(morgan("tiny"));

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/users", userRoutes);

app.get("/", (req, res) => res.send("server is ready"));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`server started on port: ${port}`));
