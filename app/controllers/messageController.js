import express from "express";
import messageModel from "../models/messageModel.js";
import chatRoomModel from "../models/chatRoomModel.js";
import roomUserModel from "../models/roomUserModel.js";



// Send a message to a chat room
export const sendMessage = async (req, res) => {
  try {
    const { room_id } = req.params;
    const { content } = req.body;
    const senderId = req.user_id; 

    // Validate message content
    if (!content || content.trim() === "") {
      return res.status(400).json({ status: "failed", message: "Message content cannot be empty" });
    }

    // Check if the chat room exists
    const chatRoom = await chatRoomModel.findById(room_id);
    if (!chatRoom) {
      return res.status(404).json({ status: "failed", message: "Chat room not found" });
    }

    // Check if user is part of the chat room
    const isMember = await roomUserModel.findOne({ user: senderId, room: room_id });
    if (!isMember) {
      return res.status(403).json({ status: "failed", message: "User is not a member of this chat room" });
    }

    // Create a new message
    const newMessage = await messageModel.create({
      sender: senderId,
      room: room_id,
      content
    });

    res.status(201).json({
      status: "success",
      message: "Message sent successfully",
      data: {
        id: newMessage._id,
        sender: newMessage.sender,
        room: newMessage.room,
        content: newMessage.content,
        createdAt: newMessage.createdAt
      }
    });

  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ status: "failed", message: "Internal Server Error" });
  }
}
