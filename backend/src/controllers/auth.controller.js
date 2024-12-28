import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  console.log(email, password, fullName);
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate password length
    if (password.length < 6) {
      return res
        .status(400) // Fixed typo in 'staus'
        .json({ message: "Password must be at least 6 characters" });
    }

    // Check if the user already exists
    const user = await User.findOne({ email });

    if (user) {
      return res.status(200).json({ message: "Email already in use" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = await User.create({
      email,
      fullName,
      password: hashedPassword,
    });

    if (newUser) {
      // Generate JWT token and respond
      generateToken(newUser._id, res);
      await newUser.save();
      return res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
      });
    } else {
      return res.status(400).json({ message: "User creation failed" });
    }
  } catch (err) {
    console.error(err); // Log the error for debugging
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userFound = await User.findOne({ email: email });

    if (!userFound) {
      return res.status(400).json({ message: "invalid user credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      userFound.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "invalid user credentials" });
    }

    generateToken(userFound._id, res);
    return res.status(200).json({
      _id: userFound._id,
      fullName: userFound.fullName,
      email: userFound.email,
      profilePic: userFound.profilePic,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    console.error(err); // Log the error for debugging
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = (req, res) => {
  // clear out the cookies
  try {
    res.cookie("jwt", "", { maxAage: 0 });
    res.status(200).json({ message: "logged out successfully" });
  } catch (error) {
    console.error(err); // Log the error for debugging
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic) {
      return res.status(400).json({ message: "Profile picture is required" });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    // and return the updated profile
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Profile updated successfully", updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
