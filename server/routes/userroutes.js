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
    if (!existingUser) {
      return res.status(400).send("User does not exist");
    }

    // Increase totalTests by 1
    existingUser.totalTests += 1;

    // Add time to totalTime
    existingUser.totalTime += time / 1000;

    // Round accuracy and averageSpeed to 2 decimal places
    const roundedAccuracy = parseFloat(
      (
        ((existingUser.totalTests - 1) / existingUser.totalTests) *
          existingUser.accuracy +
        (1 / existingUser.totalTests) * accuracy
      ).toFixed(2)
    );

    const roundedAverageSpeed = parseFloat(
      (
        ((existingUser.totalTests - 1) / existingUser.totalTests) *
          existingUser.averageSpeed +
        (1 / existingUser.totalTests) * speed
      ).toFixed(2)
    );

    // Update accuracy
    existingUser.accuracy = roundedAccuracy;

    // Update averageSpeed
    existingUser.averageSpeed = roundedAverageSpeed;

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
