import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import {Button} from 'antd';
import "../css/main.css";
import Box from '../chatroom/Box.js';
import $ from 'jquery';
$.post('/getname',function(data,status){
	console.log(data);//这里获取一下这个socket的用户名
	//向服务器发送这个名字
	socket.emit('sendname',JSON.parse(data));

})
//这里应该传入一个对象数组，分别由time，name，message

var element=(
		<div>
		<Box></Box>




		</div>);
	ReactDOM.render(
		element,
		document.getElementById('hello'));

