import React from "react";
import ReactDOM from "react-dom";
import "../css/index.scss";
import Chatroom from "../chatroom/Chatroom.js";
let username="";
if(window.fetch)
{fetch("/getname",{
    credentials:"include"
}).then(res=>res.json())
    .then(function(data){


        //向服务器发送这个名字
        socket.emit("sendname",data);
        username=data;
        var element=<Chatroom username={username}/>;
        ReactDOM.render(
            element,
            document.getElementById("hello"));
    });

}
else if(window.XMLHttpRequest)

{

    let xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange=function(){
        if(xmlhttp.readyState==4&&xmlhttp.status==200)
        {
            let data=JSON.parse(xmlhttp.responseText);
            socket.emit("sendname",data);
            let element=<Chatroom username={data}/>;
            ReactDOM.render(
                element,
                document.getElementById("hello"));
        }
    };
    xmlhttp.open("GET","/getname",true);
    xmlhttp.send();


//这里应该传入一个对象数组，分别由time，name，message

}





