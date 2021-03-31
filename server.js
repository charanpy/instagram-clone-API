const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({
  path: './config.env',
});

const app = require('./app');

//^Mongoose connection

mongoose
  .connect('', {
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
    socket.join(userId);
  });
  socket.on('join room', (groupId) => {
    socket.join(groupId);
  });
  socket.on('message', ({ groupId, message }) => {
    socket.broadcast.to(groupId).emit('message', { groupId, message });
  });
  socket.on('seen', (message) => {
    console.log('message', message);
  });
  socket.on('disconnect', () => {
    console.log('disconnected');
  });
});
