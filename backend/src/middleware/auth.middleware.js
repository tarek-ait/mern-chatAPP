import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt; // Corrected to req.cookies

    if (!token) {
      return res
        .status(401)
        .json({ message: "unauthorized - No Token provided" });
    }

    // Decoding the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res
        .status(401)
        .json({ message: "unauthorized - Invalid Token" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res
        .status(404)
        .json({ message: "user not found" });
    }

    // Store the user in the request and call the next function
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
};
