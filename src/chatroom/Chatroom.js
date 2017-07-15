import React,{Component} from "react";
import Box from "../chatroom/Box.js";

import RoomList from "../chatroom/RoomList";
export default class Chatroom extends Component
{
    constructor(props)
    {
        super(props);

    }
    componentDidMount()
    {
        let root=document.getElementsByClassName("root")[0];

        if( parseInt(window.getComputedStyle(root).width.split("p")[0])<=500)
        {
            console.log(  window.getComputedStyle(root).width.split("p")[0]);
            let startX,startY,endX,endY;
            if(root.addEventListener)
            {
                root.addEventListener("touchstart",function(event){

                    startX=event.touches[0].clientX;
                    startY=event.touches[0].clientY;


                });
                root.addEventListener("touchend",function(event){
                    endX=event.changedTouches[0].clientX;
                    endY=event.changedTouches[0].clientY;
                    if(Math.abs(parseFloat(startX)-parseFloat(endX))>=Math.abs(parseFloat(startY)-parseFloat(endY)))
                    {
                        if(Math.abs(parseFloat(startX)-parseFloat(endX))>=10)
                        {
                            if(parseFloat(startX)-parseFloat(endX)<=0) //这里是判断是左开始
                            {
                                let roomList=document.getElementsByClassName("roomList")[0].style;
                                let userList=document.getElementsByClassName("userList")[0].style;
                                if("block"==userList.display)
                                {         userList.display="none";
                                    document.querySelector("#overlay").classList.remove('overlay');

                                }
                                else {
                                      roomList.display="block";        
                                      roomList.zIndex="2";
                                      document.querySelector("#overlay").classList.add('overlay');

                                }
                                 




                            }
                            else {//判断是右边
                                let roomList=document.getElementsByClassName("roomList")[0].style;
                                if(roomList.display==="block")
                                {
                                    roomList.display="none";
                                    document.querySelector("#overlay").classList.remove('overlay');
                                }
                                else
                                {
                                    let userList=document.getElementsByClassName("userList")[0].style;
                                    userList.display="block";
                                    userList.zIndex="2";
                                    document.querySelector("#overlay").classList.add('overlay');
                                }
                            }
                        }




                    }


                });





            }


        }


    }
    render()
    {
        return(
            <div className="root">
                <RoomList/>
                <Box username={this.props.username}/>
            </div>
        );
    }
}
