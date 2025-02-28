import messageModel from "../models/messageModel.js";
import roomUserModel from "../models/roomUserModel.js";

export const setupSocket = (io) => {
    io.on('connection', (socket) => {
        
        socket.on('joinRoom', (room) => {
          socket.join(room);
        });
        socket.on('newMessage', (newMessageRecieve) => {
          
        });
      });
};
