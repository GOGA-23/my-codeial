

module.exports.chatSockets = (socketServer)=>{

  // let io = require('socket.io')(socketServer);
  const io = require('socket.io')(socketServer, {
    
    cors: {
      origin: '*',
    }
  });

  io.sockets.on('connection', (socket)=>{
    console.log('new connection received', socket.id);

    socket.on('disconnect', ()=>{
      console.log('socket disconnect');
    });

    socket.on('join_room', (data)=>{
      console.log('joining request received', data);

      socket.join(data.chatroom);

      io.in(data.chatroom).emit('user_joined', data)
    });

    socket.on('send_message', function(data){
      io.in(data.chatroom).emit('receive_message', data);
  });
  });
}