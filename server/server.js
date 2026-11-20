const http = require('http');
const app = require('./app');
const { connectDB } = require('./config/database');
const { initSocket } = require('./config/socket');

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

// Initialize real-time WebRTC and chat signaling via Socket.IO
initSocket(server);

// Start server
connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`🏥 MEDICARE AI — ALL-IN-ONE DIGITAL HEALTH ECOSYSTEM`);
    console.log(`🚀 Server active on port: ${PORT}`);
    console.log(`🌐 Base URL: http://localhost:${PORT}/api`);
    console.log(`🩺 Socket.IO & WebRTC signaling ready`);
    console.log(`====================================================`);
  });
}).catch(err => {
  console.error('Fatal initialization error:', err);
});
