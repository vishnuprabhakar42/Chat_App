const express=require('express');
const dotenv=require("dotenv");
const {chats}=require("./data/data");
const connectDB =require('./config/data');
const {notFound,errorHandler}=require('./middlewares/errorMiddleware');
const userRoutes=require('./routes/userRoutes');
const chatRoutes=require('./routes/chatRoutes');
const messageRoutes=require("./routes/messageRoutes");
const app=express();
app.use(express.json());
dotenv.config();
const PORT=process.env.PORT||5000;
connectDB();

app.get("/",(req,res)=>{
    res.send("main page");
    
});

app.use('/api/user',userRoutes);
app.use('/api/chat',chatRoutes);
app.use('/api/message',messageRoutes);
app.use(notFound);
app.use(errorHandler);


const server=app.listen(PORT,function(){
    console.log(`Server is running on port ${PORT}`);
});

const io=require('socket.io')(server,{
    pingTimeout: 60000,
    cors: {
      origin: "http://localhost:3000",
      // credentials: true,
    },
});

io.on("connection", (socket) => {
    console.log("Connected to socket.io");
    socket.on("setup", (userData) => {
        socket.join(userData._id);
        console.log(userData._id);
        socket.emit("connected");
      });

      socket.on("join chat", (room) => {
        socket.join(room);
        console.log("User Joined Room: " + room);
      });

      socket.on("typing", (room) => socket.in(room).emit("typing"));
      socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

      socket.on("new message", (newMessageRecieved) => {
        var chat = newMessageRecieved.chat;
    
        if (!chat.users) return console.log("chat.users not defined");
    
        chat.users.forEach((user) => {
          if (user._id == newMessageRecieved.sender._id) return;
    
          socket.in(user._id).emit("message recieved", newMessageRecieved);
        });
      });
      socket.off("setup", () => {
        console.log("USER DISCONNECTED");
        socket.leave(userData._id);
      });
 });

 