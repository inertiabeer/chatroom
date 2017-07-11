/* eslint-disable no-mixed-spaces-and-tabs */
import React,{Component} from "react";
import Send from "./Send.js";
import Message from "./Message.js";


const box={
    position:"absolute",
    left:"25%",
    width:"75%"
};
const userList={
    position:"absolute",
    right:"0",
    width:"20%",
    margin:'0'
}
const message={
    position:"absolute",
    right:"20%",
    margin:'0',
    width:'80%'
}
const message_container={
    height:"500px",
    overflowY:"scroll",
    overflowX:"hidden",
    padding:"1rem"
}
class Box extends Component
{
    constructor(props) {
        super(props);
        this.state={
            listItems:[],
            roomName:"hello",
            userList:[]

        };

		
    }

    componentDidMount() {
        var that=this;
        socket.on("serverMessage",function(content){

	    let message=JSON.parse(content);
	    that.setState({listItems:that.state.listItems.concat([<Message time={message.time} name={message.name} message={message.message} username={that.props.username}>
	    	</Message>])});//这里获取所有的消息



	
        });
        socket.on("roomName",function(roomName){
            if(that.state.roomName!=roomName)
            {

            }
        	that.setState({roomName:roomName,
            listItems:[]});//设置房间名


        });
        socket.on("userList",function(userList){
        	let li_arr=[];
        	let list=JSON.parse(userList);
        	list.forEach(function(item){
            li_arr.push(<li>{item}</li>);
        });
        	that.setState({userList:li_arr});
        });


    };
    componentDidUpdate(prevProps, prevState) {
		
        var node=document.getElementsByClassName("message_container");//获取整个的消息框
        if(node[0].scrollHeight>=node[0].clientHeight)
        {
            node[0].scrollIntoView(false);
            node[0].scrollTop=node[0].scrollHeight;
        }
    };
    componentWillUpdate(nextProps, nextState) {
		
    };
    render()
    {
        return (
            <div className='message_box' style={box}>
                <div style={userList}>
                    <h3>{this.state.roomName}</h3>
                    <ul>{this.state.userList}</ul>
                </div>
                <div style={message}>
                <div style={message_container} className="message_container">{this.state.listItems}</div>
                <Send></Send>
                </div>
				
            </div>);
    }
}
export default Box;