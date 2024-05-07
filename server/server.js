import express from "express";
import { usersRoutes } from "./routes/usersRoutes.js";
import { authsRoutes } from "./routes/authsRoutes.js";
import mongoose from "mongoose";
import passport from "./passport.js";
import cors from "cors";
import cookieSession from "cookie-session";
import { coursesRoutes } from "./routes/coursesRoutes.js";

const app = express();

app.use(
  cookieSession({
    name: "session",
    keys: ["key1"],
    maxAge: 24 * 60 * 60 * 1000,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:3000",
    method: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json({ limit: "200mb" }));

app.use("/api/users", usersRoutes);
app.use("/api/courses", coursesRoutes);
app.use("/auth", authsRoutes);

// Connect to the MongoDB database
mongoose
  .connect(process.env.MONGODB_URI, { dbName: "cookiedu_db" })
  .then(() => {
    console.log("Connected to the database");
    app.listen(5000, "localhost", () => {
      console.log("Listening on port 5000");
    });
  })
  .catch((error) => {
    console.log("Error connecting to the database: ", error);
  });
