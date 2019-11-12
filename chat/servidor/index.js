var io = require('socket.io')(8090);

io.on('connection', (socket) => {
    
    console.log(socket.id + ' conectado, aguardando transmissão de chave publica.')

    socket.on('chave-publica', (id)=> {
        
        socket.broadcast.emit('chave-publica',chave)
    })

    socket.on('envia-chave-publica', (chave)=>{
        socket.broadcast.emit("recebe-chave-publica", {id: socket.id, chave_publica: chave})
    })

    socket.on('message', (data)=>{
        socket.broadcast.emit('message', {id: socket.id, msg: data})
    })

});

