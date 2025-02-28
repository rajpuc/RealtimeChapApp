
import roomUserModel from "../models/roomUserModel.js"; 
import chatRoomModel from "../models/chatRoomModel.js"; 




// Join a chat room
export const joinRoom = async (req, res) => {
  try {
    const { room_id } = req.params;
    const userId = req.user_id; 

    // Check if the chat room exists
    const chatRoom = await chatRoomModel.findById(room_id);
    if (!chatRoom) {
      return res.status(404).json({ status: "failed", message: "Chat room not found" });
    }

    // Check if user is already in the room
    const existingRoomUser = await roomUserModel.findOne({ user: userId, room: room_id });
    if (existingRoomUser) {
      return res.status(400).json({ status: "failed", message: "User already joined this room" });
    }

    // Add user to the room
    const newRoomUser = new roomUserModel({
      user: userId,
      room: room_id
    });

    await newRoomUser.save();

    res.status(201).json({
      status: "success",
      message: "User joined the chat room successfully",
      roomUser: {
        id: newRoomUser._id,
        user: newRoomUser.user,
        room: newRoomUser.room
      }
    });

  } catch (error) {
    console.error("Error joining chat room:", error);
    res.status(500).json({ status: "failed", message: "Internal Server Error" });
  }
}
