import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from 'cors';
import {app, server} from '../src/lib/socket.js';
import path from "path";
dotenv.config();


const port = process.env.PORT;
const __dirname = path.resolve()

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:5173',  // Allow your frontend origin
  credentials: true,                // Allow cookies (if needed)
}));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/messages", messageRoutes);

if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend","dist","index.html"));
  });
}

// adsing the socker server
server.listen(port, () => {
  console.log("server listening on port: " + port);
  connectDB();
});
