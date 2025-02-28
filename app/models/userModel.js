import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true, unique: true },
    lastname: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    status: { type: String, enum: ["online", "offline"], default: "offline" },
  },
  { 
    timestamps: true, 
    versionKey: false
  }
);

const userModel = mongoose.model('User', UserSchema);

export default userModel;