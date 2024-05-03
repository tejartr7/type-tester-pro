import express from "express";
import mongoose from "mongoose";
import UserSchema from "../schema/userSchema.js"; 
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { username, email } = req.body;
    console.log("request body is ");
    console.log(req.body);
    // Create a new user instance with default values for typing speed, etc.
    const newUser = new UserSchema({
      username,
      email,
      typingspeed: 0, 
      highestspeed: 0, 
      averageSpeed: 0, 
      accuracy: 0, 
      totalTests: 0, 
      totalTime: 0, 
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser); 
  } catch (error) {
    res.status(400).send(error.message); 
  }
});

export default router;
