import express from "express";
import mongoose from "mongoose";
import Topic from "../models/TopicModel.js";

const router = express.Router();
const createTopic = async(req, res)=>{
    const {title} = req.body;
    if (!title) {
      res.status(400).json({ error: "All fields are required!" });
    }

    const topicSearch = await Topic.findOne({title:title });

    if (topicSearch) {
      res.status(400).json({ error: "Email already existed!" });
    } else {
      try {
        const topic = await Topic.create({ title: title });
        res.status(200).json({ success: "Create Topic successful!", topic });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
}

export {
  createTopic
};
