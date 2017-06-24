import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import {DatePicker} from 'antd';
import {Button} from 'antd';
import {Icon,Row,Col}from 'antd';
import "../css/main.css";
import Send from '../chatroom/Send.js';
import Message from '../chatroom/Message.js';
import $ from 'jquery';
$.post('/getname',function(data,status){
	console.log(data);//这里获取一下这个socket的用户名
	//向服务器发送这个名字
	socket.emit('sendname',JSON.parse(data));

})
var messages=[];//这里应该传入一个对象数组，分别由time，name，message
var listItems=[];
socket.on('serverMessage',function(content){
	messages.push(JSON.parse(content));
	var message=JSON.parse(content);
	listItems=messages.map((item)=><Message time={message.time} 
		name={message.name} message={message.message}></Message>)
	element=(
		<div>
		
		<div className='message_container'>{listItems}</div>
		<Send></Send>




		</div>);
	ReactDOM.render(
		element,
		document.getElementById('hello'));


})

var element=(
		<div>
		<Send></Send>
		<div>{listItems}</div>




		</div>);
	ReactDOM.render(
		element,
		document.getElementById('hello'));

