import React from "react";
import ReactDOM from "react-dom";
import Chatroom from "../chatroom/Chatroom.js";
let username="";
fetch("/getname",{
    credentials:"include"
}).then(res=>res.json())
    .then(function(data){

        //向服务器发送这个名字
        socket.emit("sendname",data);
        username=data;
        var element=<Chatroom username={username}/>
        ReactDOM.render(
            element,
            document.getElementById("hello"));
    });
// $.post("/getname",function(data,status){


// });
//这里应该传入一个对象数组，分别由time，name，message



