import express from "express";
const router = express.Router();
import {registration,login,validateRegistration} from "../app/controllers/authController.js";
import {isLoggedIn} from "../app/middlewares/authMiddleware.js";
import {createRoom} from "../app/controllers/roomController.js";
import {joinRoom} from "../app/controllers/roomUserController.js";
import {sendMessage} from "../app/controllers/messageController.js";

router.post("/register",validateRegistration,registration);
router.get("/login",login);
router.post("/rooms", isLoggedIn,createRoom);
router.post("/rooms/:room_id/join", isLoggedIn,joinRoom);
router.post("/rooms/:room_id/messages", isLoggedIn, sendMessage);  

export default router;