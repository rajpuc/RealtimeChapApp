import mongoose from "mongoose";

const ChatRoomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    createdBy : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
    },
    isGroup:{
        type: Boolean,
        default: false
    }
  },
  { timestamps: true , versionKey : false }
  
);

const chatRoomModel = mongoose.model('ChatRoom', ChatRoomSchema);
export default chatRoomModel;