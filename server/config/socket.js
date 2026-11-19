const { Server } = require('socket.io');

let io = null;

const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || 'http://localhost:5173',
      methods: ['GET', 'POST'],
      credentials: true
    }
  });

  io.on('connection', (socket) => {
    console.log(`🔌 Socket Client Connected: ${socket.id}`);

    socket.on('join_room', (roomId) => {
      socket.join(roomId);
      console.log(`Socket ${socket.id} joined room: ${roomId}`);
    });

    socket.on('leave_room', (roomId) => {
      socket.leave(roomId);
    });

    // WebRTC Signaling
    socket.on('video_offer', (data) => {
      socket.to(data.roomId).emit('video_offer', data);
    });

    socket.on('video_answer', (data) => {
      socket.to(data.roomId).emit('video_answer', data);
    });

    socket.on('ice_candidate', (data) => {
      socket.to(data.roomId).emit('ice_candidate', data);
    });

    socket.on('consultation_chat', (data) => {
      io.to(data.roomId).emit('new_message', data);
    });

    socket.on('disconnect', () => {
      console.log(`Socket Client Disconnected: ${socket.id}`);
    });
  });

  return io;
};

const getIO = () => io;

module.exports = { initSocket, getIO };
