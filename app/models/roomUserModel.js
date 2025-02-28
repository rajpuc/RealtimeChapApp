import mongoose from "mongoose";

const RoomUserSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChatRoom",
      required: true,
    },
    latestMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
    }
  },
  { timestamps: true, versionKey: false }
);


const roomUserModel = mongoose.model('RoomUser', RoomUserSchema);
export default roomUserModel;