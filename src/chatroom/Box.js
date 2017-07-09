import React,{Component} from "react";
import Send from "./Send.js";
import Message from "./Message.js";

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
	    	</Message>])});



	
        });
        socket.on("roomName",function(roomName){
        	that.setState({roomName:roomName});
        });
        socket.on("userList",function(userList){
        	var li_arr=[];
        	var list=JSON.parse(userList);
        	list.forEach(function(item){
                li_arr.push(<li>{item}</li>);
            });
        	that.setState({userList:li_arr});
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
                <h3>{this.state.roomName}</h3>
                <ul>{this.state.userList}</ul>
                <div className='message_container'>{this.state.listItems}</div>
                <Send></Send>
				
            </div>);
    }
}
export default Box;