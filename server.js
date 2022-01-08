const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Notification = require('./models/Notification');

dotenv.config({
  path: './config.env',
});

const app = require('./app');

mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Db connected');
  })
  .catch((e) => {
    console.log(e, 'Failed to connect Db');
  });

const server = app.listen(process.env.PORT || 3001, () => {
  console.log('Server started');
});

const io = require('socket.io')(server, { pingTimeout: 60000 });

io.on('connection', (socket) => {
  console.log('connected');
  socket.on('authenticated', (userId) => {
    console.log(userId, 'auth');
    socket.join(userId);
  });
  socket.on('join room', (groupId) => {
    socket.join(groupId);
  });
  socket.on('message', ({ groupId, message }) => {
    socket.broadcast.to(groupId).emit('message', { groupId, message });
  });
  socket.on('seen', (groupId) => {
    socket.broadcast.to(groupId).emit('seen', groupId);
  });
  socket.on('render', (groupId) => {
    socket.broadcast.to(groupId).emit('render', groupId);
  });
  socket.on('notification', async (msg) => {
    const notification = await Notification.create(msg);
    socket.broadcast.to(msg.to).emit('notification');
  });
  socket.on('disconnect', () => {
    console.log('disconnected');
  });
});
