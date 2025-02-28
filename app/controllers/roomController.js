import chatRoomModel from "../models/chatRoomModel.js"; 

export const createRoom =  async (req, res) => {
  try {
    const { name, isGroup = false } = req.body;
    const userId = req.user_id; // Extracted from JWT token

    // Validate input
    if (!name) {
      return res.status(400).json({ status: "failed", message: "Room name is required" });
    }

    // Check if room name already exists
    const existingRoom = await chatRoomModel.findOne({ name });
    if (existingRoom) {
      return res.status(400).json({ status: "failed", message: "Room name already exists" });
    }

    // Create new chat room
    const newRoom = new chatRoomModel({
      name,
      createdBy: userId,
      isGroup
    });

    await newRoom.save();

    res.status(201).json({
      status: "success",
      message: "Chat room created successfully",
      room: {
        id: newRoom._id,
        name: newRoom.name,
        isGroup: newRoom.isGroup,
        createdBy: newRoom.createdBy
      }
    });

  } catch (error) {
    console.error("Error creating chat room:", error);
    res.status(500).json({ status: "failed", message: "Internal Server Error" });
  }
}
