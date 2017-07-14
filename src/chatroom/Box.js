/* eslint-disable no-mixed-spaces-and-tabs */
import React,{Component} from "react";
import Send from "./Send.js";
import Message from "./Message.js";
import { Menu, Icon } from 'antd';



const message_container={
    height:"90%",
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
        	list.forEach(function(item,index){
            li_arr.push(<Menu.Item key={index}><i className="arrow_icon">&#xe972;</i><span><a href="javascript:void(0)">{item}</a></span></Menu.Item>);
        });
        	that.setState({userList:li_arr});
        });
        console.log(document.getElementsByClassName("message_box")[0]);
       if(document.getElementsByClassName("message_box")[0].width<=500)
       {
           console.log(document.getElementsByClassName("message_box")[0]);
       }


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
            <div className='message_box'>
                <div className="userList">
                    <h1>{this.state.roomName}</h1>
                    <Menu
                        onClick={this.handleClick}
                        defaultSelectedKeys={['0']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                    >
                        {this.state.userList}
                    </Menu>

                </div>
                <div className="message">
                <div style={message_container} className="message_container">{this.state.listItems}</div>
                <Send></Send>
                </div>
				
            </div>);
    }
}
export default Box;