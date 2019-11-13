var io = require('socket.io')(8090);

io.on('connection', (socket) => {
    
    console.log(socket.id + ' conectado')
    socket.broadcast.emit('chave-publica')

    /**
     * 
     */
    socket.on('chave-publica', ()=> {
        socket.broadcast.emit('chave-privada')
    })

    /**
     * Quando um novo cliente necessita da chave dos usuários já conectados.
     * chave = "RSA_CHAVE_PUBICA"
     */
    socket.on('envia-chave-publica', (chave)=>{
        socket.broadcast.emit("recebe-chave-publica", {id: socket.id, chave_privada: chave})
    })

    /**
     * Quando o cliente enviar a mensagem
     * data = {id:"ID_CLIENTE", msg: "MSG_ENCRIPTADO"}
     */
    socket.on('message', (data) => {
        //Verifica se o id está conectado.
        if (io.sockets.connected[data.id] === undefined){
            return;
        }

        //Envia mensagen encryptada para o respectivo destinatirario 
        io.sockets.connected[data.id].emit('message', { id: socket.id, msg: data.payload })
    })
    
    /**
     * Quando o cliente desconectar.
     */
    socket.on('disconnect', () => {

        socket.broadcast.emit('exit', {id: socket.id})
        console.log(socket.id + ' desconectado.')

    })
})
