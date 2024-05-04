import express from "express";
import UserSchema from "../schema/userSchema.js";
const userRouter = express.Router();
userRouter.get("/", async (req, res) => {
  try {
    const { email, username } = req.query;
    const existingUser = await UserSchema.findOne({ email });
    if (!existingUser) {
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
      return res.status(200).json(newUser);
    }
    res.status(201).send(existingUser);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
userRouter.post("/update", async (req, res) => {
  try {
    const { email, speed, accuracy, time } = req.body;
    const existingUser = await UserSchema.findOne({ email });
    console.log("req body is ");
    console.log(req.body);
    if (!existingUser) {
      return res.status(400).send("User does not exist");
    }

    // Increase totalTests by 1
    existingUser.totalTests += 1;

    // Add time to totalTime
    existingUser.totalTime += time/1000;

    // Update accuracy (assuming a simple calculation, adjust as needed)
    // Accuracy = (totalTests - 1) / totalTests * existing accuracy + (1 / totalTests) * new accuracy
    existingUser.accuracy =
      ((existingUser.totalTests - 1) / existingUser.totalTests) *
        existingUser.accuracy +
      (1 / existingUser.totalTests) * accuracy;

    // Update averageSpeed (assuming a simple calculation, adjust as needed)
    // AverageSpeed = (totalTests - 1) / totalTests * existing averageSpeed + (1 / totalTests) * new speed
    existingUser.averageSpeed =
      ((existingUser.totalTests - 1) / existingUser.totalTests) *
        existingUser.averageSpeed +
      (1 / existingUser.totalTests) * speed;

    // Update highestSpeed if the new speed is higher
    if (speed > existingUser.highestSpeed || !existingUser.highestSpeed) {
      existingUser.highestSpeed = speed;
    }

    // Save the updated user
    await existingUser.save();

    res.status(200).json(existingUser);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

export default userRouter;
