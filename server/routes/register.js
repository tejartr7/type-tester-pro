import express from "express";
import mongoose from "mongoose";
import UserSchema from "../schema/userSchema.js"; 
const registerRouter = express.Router();

registerRouter.post("/", async (req, res) => {
  try {
    const { username, email } = req.body;
    console.log("request body is ");
    console.log(req.body);
    const existingUser = await UserSchema.findOne({ email });
    if(existingUser) {
      return res.status(200).send("User already exists");
    }
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
    res.status(201).send("user created"); 
  } catch (error) {
    res.status(400).send(error.message); 
  }
});

export default registerRouter;
