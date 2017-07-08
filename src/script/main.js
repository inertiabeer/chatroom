import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "../css/main.css";
import Box from "../chatroom/Box.js";
import $ from "jquery";
import RoomList from '../chatroom/RoomList';
$.post("/getname",function(data,status){
	//向服务器发送这个名字
    socket.emit("sendname",JSON.parse(data));

});
//这里应该传入一个对象数组，分别由time，name，message

var element=(
		<div>
            <RoomList/>
		<Box/>




		</div>);
ReactDOM.render(
		element,
		document.getElementById("hello"));

