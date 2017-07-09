import React,{Component} from "react";
export default class RoomList extends Component
{
	constructor(props)
	{
		super(props);
		this.handleAddRoom=this.handleAddRoom.bind(this);//添加聊天室的
		this.handleChange=this.handleChange.bind(this);//处理聊天室名称的
		this.handleJoin=this.handleJoin.bind(this);//这是处理加入聊天室的
		this.handleLeave=this.handleLeave.bind(this);
		this.state={
			value:"",
			rooms:[],
			activeroom:"hello"
		};
	}
	handleAddRoom(event)
	{
		event.preventDefault();
		socket.emit("addroom",this.state.value);


	}
	handleLeave(event)
	{
		if(this.state.activeroom)
		{
			socket.emit("leave",this.state.activeroom);
		}
	}
	handleJoin(event)
	{
		event.preventDefault();
		this.handleLeave();
		this.setState({
			activeroom:event.target.innerText
		});
		console.log(event.target.innerText);
		socket.emit("join",event.target.innerText);

	}
	componentDidMount()
	{
		var that=this;
		socket.emit("load");
		socket.on("roomlist",function(data){
			let roomList=JSON.parse(data);
			console.log(data);
			let rooms=[];
			roomList.forEach(function(item,index){


				rooms.push(<li><a href="" onClick={that.handleJoin}>{item.value}</a></li>);


			});
			that.setState({
				rooms:rooms
			});
		});
	}
	handleChange(event)
	{
		event.preventDefault();
		this.setState({
			value:event.target.value,
		});
	}
	render()
	{
		return (
			<ul>
				<li><input type="text" onChange={this.handleChange}/><a href="" onClick={this.handleAddRoom}>添加新房间</a></li>
				{this.state.rooms}
			</ul>
		);
	}
}