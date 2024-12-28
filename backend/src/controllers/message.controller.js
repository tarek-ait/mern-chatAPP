import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import {getReceiverSocketId} from '../lib/socket.js';
import {io} from '../lib/socket.js';
export const getUsersForSideBar = async (req, res) => {
  // fetching all users except the logged in user
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    res.status(200).json(filteredUsers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "internal server error" });
  }
};
export const getMessages = async (req, res) => {
  try {
    const { id } = req.params;
    const loggedInUserId = req.user._id;
    const messages = await Message.find({
      $or: [
        { senderId: loggedInUserId, receiverId: id },
        { senderId: id, receiverId: loggedInUserId },
      ],
    }).sort({ createdAt: 1 });
    res.status(200).json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "internal server error" });
  }
};
export const sendMessages = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, image } = req.body;
    const loggedInUserId = req.user._id;

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessages = new Message({
      senderId: loggedInUserId,
      receiverId: id,
      text,
      image: imageUrl,
    });

    await newMessages.save();

   
    const receiverSocketId = getReceiverSocketId(id);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("new message", newMessages);
    }
    
    res.status(201).json(newMessages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "internal server error" });
  }
};
