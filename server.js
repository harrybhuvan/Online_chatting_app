//Create http server
var app = require('express')()  
var http = require('http').createServer(app)
var io = require('socket.io')(http)
app.get('/index',(req, res) =>{
    res.sendFile(__dirname + '/index.html');
})


io.on('connection',(socket) =>{

    //user is connect this msg printed inthe console
    console.log("user online"); 

    socket.io('codeboard-message',(msg) =>{  

        //msg will be receiver fromthe user
        console.log("Message receiver :"+msg);  

        //that msg will be broadcast to all the clients 
        socket.broadcast.emit("codeboard-message-boardcasted", msg);  
    })
})


//http server port number
var server_port = process.env.PORT || 3000
http.listen(server_port)  
