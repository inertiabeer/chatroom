const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const moment = require("moment");
const session = require("express-session");
const pg = require("pg");
const Pool = pg.Pool;
const config = {
    host: "47.94.226.150",
    user: "postgres",
    password: "986619667",
    database: "chatroom",
};
var pool=new Pool(config);

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
app.use(express.static(path.join(__dirname, "public")));
app.use("/js",express.static(path.join(__dirname,"dist/js")));
app.get("/",function(req,res)
{
    if(req.session.user)
  { 
        res.sendFile(path.resolve(__dirname+"/dist/index.html"));
    }
    else
  {
        res.sendFile(path.resolve(__dirname+"/views/login.html"));
    }

	
});
app.post("/getname",function(req,res)
{
    var user=req.session.user;
      
    var name=user.username;

    res.send(JSON.stringify(name));
});
app.get("/user",function(req,res){
    res.sendFile(path.resolve(__dirname+"/views/login.html"));
});
app.post("/login", function(req, res) {
    console.log(req.body);
    var sql="SELECT userpassword FROM public.user WHERE username='"+req.body.username+"'";
    console.log(sql);
    pool.query(sql,function(err,result){
        if(err)
    {
            console.log(err);
        }
        console.log(result.rows[0].userpassword);
        if(result.rows[0].userpassword==req.body.password)
    {
            var user={
                username:req.body.username,
                password:req.body.password
            };
            req.session.user=user;
            res.send("y");



        }


    });

});
app.post("/logout",function(req,res){
    req.session.destroy(function(err)
  {if(err)
    {console.log(err);}
    
    });

   
    res.send("y");
});
app.post("/logup", function(req, res) {
    console.log(req.body);
    var sql = "INSERT INTO public.user (username,userpassword) VALUES ('"+req.body.username+"', '"+ req.body.password + "')";
    console.log(sql);
    var user_table="CREATE TABLE user_"+req.body.username+"(action VARCHAR, time VARCHAR)";
    console.log(user_table);
    pool.query(user_table,function(err,result){
        if(err)
      {
            console.log(err);
        }


    });


    pool.query(sql, function(err, result) {
        if (err) {
            console.log(err);
            res.send("n");
        }
        else{

            console.log(result);
            res.send("y");
        }
    });
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

server.listen(3000,function(err){
    if(err)
  {
        console.log(err);
    }
    console.log("服务器已经启动");
});

let roomList=["hello"];
io.on("connection",function(socket){
    socket.join(roomList[0]);//这里是有一个默认的聊天室的
    socket.room="hello";

    setTimeout(function(){
        socket.emit("roomlist",JSON.stringify(roomList));
        datas.forEach(function(item,index){
            socket.emit("serverMessage",JSON.stringify(item));
            console.log(item);


        });

    },100);//这里一会用promise替代了

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


    });
    socket.on("sendname",function(username){
        socket.name=username;

    });
    socket.on("room",function(room){

    });
    socket.on("addroom",function(roomname)
    {
        roomList.push(roomname);
        socket.emit("roomlist",JSON.stringify(roomList));
        socket.broadcast.emit("roomlist",JSON.stringify(roomList));
        

    });
    socket.on("join",function(room){
        if(socket.room="hello")
        {
            socket.leave('hello');
        }
        socket.join(room,()=>{
            socket.room=room;//这里只是为了方便自己调用
            let rooms = Object.keys(socket.rooms);
            console.log(rooms); // [ <socket.id>, 'room 237' ]
        });

    });
    socket.on("leave",function(oldroom){
        if(oldroom)
        {
            socket.leave(oldroom,function(){
                console.log("离开了 "+oldroom);
            });
        }
    });



});
