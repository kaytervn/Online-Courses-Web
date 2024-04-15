import express from "express";
import mongoose from "mongoose";

const app = express();
app.use(express.json({ limit: "200mb" }));

app.listen(4000, () => console.log("Listening at 4000"));
