import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { tokenBlacklist } from "../middleware/auth.js";

class userControllerClass {
  registeracct = async (req, res) => {
    try {
      const { name, email, password } = req.body;

      // Check required fields first
      if (!name || !email || !password) {
        return res.status(400).json({ msg: "All fields are required" });
      }

      // Optional: validate password manually before hashing
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      if (!passwordRegex.test(password)) {
        return res.status(400).json({
          msg: "Password must be at least 8 characters and contain letters and numbers",
        });
      }

      // Now hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Save to DB
      const newUser = await User.create({
        name,
        email,
        hashedPassword,
      });

      res.status(200).json({ name, email });
    } catch (error) {
      console.error(error);
      res
        .status(400)
        .json({ msg: "Error Creating Account", error: error.message });
    }
  };
  login = async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ msg: "Email and password are required" });
      }

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "Invalid email or password" });
      }

      const isMatch = await bcrypt.compare(password, user.hashedPassword);
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid email or password" });
      }
      const { hashedPassword, createdAt, __v, _id, ...userData } = user._doc;
      const token = jwt.sign(
        { userId: user._id }, // payload
        process.env.JWT_SECRET, // secret key
        { expiresIn: "7d" } // options
      );

      // Now send the response
      res.status(200).json({
        msg: "Login successful",
        token, // the JWT
        user: userData,
      });
    } catch (error) {
      res.status(400).json({ msg: "An Error Occurred" });
    }
  };
  viewAcct = async (req, res) => {
    try {
      const user = await User.findById(req.userId).select(
        "-hashedPassword -createdAt"
      );
      if (!user) return res.status(404).json({ msg: "User not found" });

      res.status(200).json({ user });
    } catch (err) {
      res.status(500).json({ msg: "Server error" });
    }
  };
  logout = async (req, res) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(400).json({ msg: "No token provided" });
      }
      // add token to blacklist in auth.js
      tokenBlacklist.add(token);
      res.status(200).json({
        msg: "Logged out successfully",
      });
    } catch (error) {
      res.status(500).json({ msg: "Server error during logout" });
    }
  };
}
const usercontroller = new userControllerClass();
export default usercontroller;
