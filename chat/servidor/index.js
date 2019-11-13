var io = require('socket.io')(8090);

io.on('connection', (socket) => {
    
    console.log(socket.id + ' conectado')
    socket.broadcast.emit('chave-publica')

    socket.on('chave-publica', ()=> {
        socket.broadcast.emit('chave-privada')
    })

    socket.on('envia-chave-publica', (chave)=>{
        socket.broadcast.emit("recebe-chave-publica", {id: socket.id, chave_privada: chave})
    })

    socket.on('message', (data)=>{
       if (io.sockets.connected[data.id] === undefined){
            return;
        }
        io.sockets.connected[data.id].emit('message', {id: socket.id, msg: data.payload});
    })

    socket.on('disconnect', () => {
        socket.broadcast.emit('exit', {id: socket.id});
        console.log(socket.id + ' desconectado.')
    });
});
