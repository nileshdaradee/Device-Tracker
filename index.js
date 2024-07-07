const express=require('express')
const socketio=require('socket.io')
const http=require('http');
const path=require('path')

const app=express()


const server=http.createServer(app);
const io=socketio(server);

app.set('view engine','ejs')
app.use(express.static(__dirname + '/public'));

io.on("connection",function(socket){
    socket.on("send-location",function(data)
{
    io.emit("recieve-location",{id:socket.id,...data});
})
    socket.on("disconnect",function()
{
    io.emit("user-disconneted",socket.id);
})
    console.log("Connected");
})




app.get('/',(req,res)=>{
    res.render('index.ejs')
})


server.listen(3000);