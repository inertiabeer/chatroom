import React from "react";
import ReactDOM from "react-dom";
import "../css/main.css";
import Box from "../chatroom/Box.js";

import RoomList from '../chatroom/RoomList';
let username='';
fetch("/getname",{
	credentials:'include'
}).then(res=>res.json())
.then(function(data){

		//向服务器发送这个名字
    socket.emit("sendname",data);
    username=data;
    var element=(
		<div className="root">
        <RoomList/>
		<Box username={username}/>
        </div>);
ReactDOM.render(
		element,
		document.getElementById("hello"));
})
// $.post("/getname",function(data,status){



// });
//这里应该传入一个对象数组，分别由time，name，message



