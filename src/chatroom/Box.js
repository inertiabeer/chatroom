import React,{Component} from "react";
import Send from "./Send.js";
import Message from "./Message.js";
import {Button} from "antd";

class Box extends Component
{
	constructor(props) {
		super(props);
		this.state={
			listItems:[]
		};

		
	}
	componentDidMount() {
		var that=this;
		socket.on("serverMessage",function(content){

	    let message=JSON.parse(content);
	    that.setState({listItems:that.state.listItems.concat([<Message time={message.time} name={message.name} message={message.message}></Message>])});



	
		});


	}
	componentDidUpdate(prevProps, prevState) {
		
		var node=document.getElementsByClassName("message_container");//获取整个的消息框
		if(node[0].scrollHeight>=node[0].clientHeight)
		{
			node[0].scrollIntoView(false);
			node[0].scrollTop=node[0].scrollHeight;
		}
	}
	componentWillUpdate(nextProps, nextState) {
		
	}
	render()
	{
		return (
			<div className='message_box'>
				<div className='message_container'>{this.state.listItems}</div>
				<Send></Send>
				
			</div>);
	}
}
export default Box;