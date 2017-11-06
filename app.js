const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const moment = require("moment");
const session = require("express-session");
const compression=require("compression");
const log=require("./routes/log.js");


var app = express();
var server=require("http").createServer(app);
var datas=[];
const io = require("socket.io")(server);


// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser("key"));
app.use(session({
    secret: "key",
    resave: false,
    saveUninitialized: true
}));//这里使用session
app.use(compression());//这里添加压缩模块
app.use(express.static(path.join(__dirname, "public")));
app.use("/js",express.static(path.join(__dirname,"dist/js")));//这里添加了一个虚拟路径
app.use("/css", express.static(path.join(__dirname, "dist/css")));
app.use("/",log);
app.get("/",function(req,res)
{
    if(req.session.user)
    {
        res.set({
            "Cache-Control":"max-age=360"
        });
        res.sendFile(path.resolve(__dirname+"/dist/index.html"));
    }
    else
    {

        res.sendFile(path.resolve(__dirname+"/views/login.html"));
    }

	
});
app.get("/getname",function(req,res)
{
    var user=req.session.user;
      
    var name=user.username;

    res.send(JSON.stringify(name));
});
app.get("/user",function(req,res){
    res.sendFile(path.resolve(__dirname+"/views/login.html"));
});




// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

server.listen(80,function(err){
    if(err)
    {
        console.log(err);
    }
    console.log("服务器已经启动");
});
Array.prototype.deleteValue=function(val)
{
    for(let i=0;i<this.length;i++)
        if (this[i] == val) {
            this.splice(i, 1);

            break;
        }
};
Array.prototype.IndexOf=function(val)
{
    for(let i=0;i<this.length;i++)
    {
        if(this[i].value==val)
        {
            return i;
            break;
        }
    }
    return -1;
};
//这是为了roomlist准备的
let initRoom={
    valueOf:function(){
        return this.value;
    },
    toString:function()
    {
        return this.value;
    },
    value:"hello",
    datas:[]

};
let roomList=[initRoom];//这里放这全部的聊天室
io.on("connection",function(socket){



    socket.on("load",function(){
        socket.emit("roomlist",JSON.stringify(roomList));
        datas.forEach(function(item,index){
            socket.emit("serverMessage",JSON.stringify(item));



        });

    });//加载的时候先发送roomlist和初始化的hello
    socket.on("client",function(content){
        var message={
            time:moment().format("YYYY-MM-DD HH:mm:ss"),
            name:socket.name,
            message:content
        };

        //这里是让用户一登录就能看见小心
        if(socket.room=="hello")
        {
            datas.push(message);
        }
        socket.emit("serverMessage",JSON.stringify(message)); //发送回去
        socket.to(socket.room).emit("serverMessage",JSON.stringify(message));  //发送给其他客户端
        let index=roomList.IndexOf(socket.room);
        if(index>=0)
        {
            roomList[index].datas.push(message);
        }




    });
    socket.on("sendname",function(username){
        socket.name=username;
        if(!socket.room)
        {
            socket.join(roomList[0]);//这里是有一个默认的聊天室的
            socket.room="hello";
            if (!roomList[0].users) {
                roomList[0].users = [].concat(username);
                console.log(roomList[0].users);
            } else {
                roomList[0].users.push(socket.name);

            }
            //这里对users进行判断，如果存在就加入
            console.log("添加"+roomList[0].users);
            socket.to(socket.room).emit("userList",JSON.stringify(roomList[0].users));
            socket.emit("userList",JSON.stringify(roomList[0].users));

        }


    });
    socket.on("room",function(room){

    });
    socket.on("addroom",function(roomname)
    {
        let initRoom={
            valueOf:function(){
                return this.value;
            },
            toString:function()
            {
                return this.value;
            },
            value:roomname,
            datas:[]

        };
        roomList.push(initRoom);
        socket.emit("roomlist",JSON.stringify(roomList));
        socket.broadcast.emit("roomlist",JSON.stringify(roomList));
        

    });
    socket.on("join",function(room){
        if(socket.room=="hello")
        {

            roomList[0].users.deleteValue(socket.name);//这里调用自定义的方法
            socket.to(socket.room).emit("userList",JSON.stringify(roomList[0].users));
            socket.emit("userList",JSON.stringify(roomList[0].users));
            socket.leave("hello");

        }
        else
        {

            let index=roomList.IndexOf(socket.room);

            roomList[index].users.deleteValue(socket.name);//先删除自己的值
            console.log(roomList[index].users+"这是user");
            socket.to(socket.room).emit("userList",JSON.stringify(roomList[index].users));//然后发送给前端
            // socket.emit("userList",JSON.stringify(roomList[index].users));
            socket.leave(socket.room);
        }
        socket.join(room,()=>{
            socket.room=room;//这里只是为了方便自己调用
            let index=roomList.IndexOf(room);
            socket.emit("roomName",room);


            roomList[index].users=(roomList[index].users?roomList[index].users:[]).concat(socket.name);
            console.log(roomList[index].users);
            socket.emit("userList",JSON.stringify(roomList[index].users));
            socket.to(socket.room).emit("userList",JSON.stringify(roomList[index].users));//这里设定是加入新房间会自动显示用户数量，但是我觉得这样不好
            // let rooms = Object.keys(socket.rooms);
            // console.log(rooms); // [ <socket.id>, 'room 237' ]
            console.log(roomList[index].datas+" flag");
            roomList[index].datas.forEach(function(item,index){
                socket.emit("serverMessage",JSON.stringify(item)); //发送回去


            });

        });

    });
    socket.on("getRoomMessage",function(roomName){
        let index=roomList.IndexOf(roomName);

    });
    socket.on("leave",function(oldroom){
        if(oldroom)
        {
            socket.leave(oldroom,function(){
                console.log("离开了 "+oldroom);
            });
        }
    });
    socket.on("getUser",function(roomName){
        socket.emit();
    });
    socket.on("disconnect",(reason)=>{
        console.log(reason);

        let index=roomList.IndexOf(socket.room);
        if(roomList[index])
        {
            roomList[index].users.deleteValue(socket.name);
            socket.to(socket.room).emit("userList",JSON.stringify(roomList[index].users));
            socket.emit("userList",JSON.stringify(roomList[index].users));
            socket.leave(socket.room);
        }

    });



});
