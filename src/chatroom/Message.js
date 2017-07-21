import React, { Component } from "react";
const message={
    textAlign:"center"
}
const nameStyle={
    color:"#63223f",
    marginRight:"3rem",
    fontSize:"1.5rem",
    margin:"15px 0px"



};
const rightNameStyle=
{
    color:"#63223f",
    marginLeft:"3rem",
    fontSize:"1.5rem"
};
const bubble={
    fontSize:"1rem",
    position:"relative",


};
const rightBubble={
    fontSize:"1rem",
    position:"relative",
    textAlign:"right"
};

const triangle=
{
    width:"0",
    height:"0",
    border:"0.4rem solid #fff",
    borderRight:"1.5rem solid #97e8cc",
    position:"absolute",
    top:"0",
    left:"-0.4rem",
    transform: "rotate(30deg)",
    zIndex: "-1"
};
const rightTriangle={
    width:"0",
    height:"0",
    border:"0.4rem solid #fff",
    borderLeft:"1.5rem solid #97e8cc",
    position:"absolute",
    top:"0",
    right:"-0.4rem",
    transform: "rotate(-30deg)",
    zIndex: "-1"
};
const rightContainer={
    backgroundColor:"#97e8cc",
    marginRight:"1rem",
    borderRadius: "8px",
    zIndex:"100",
    width:"auto",
    display:"inline-block",
    wordBreak:"break-all",
    paddingLeft:"10px",
    paddingRight:"10px",
    fontSize:"1.2rem"
};
const container=
{
    backgroundColor:"#97e8cc",
    marginLeft:"1rem",
    borderRadius: "8px",
    zIndex:"100",
    width:"auto",
    display:"inline-block",
    wordBreak:"break-all",
    paddingLeft:"10px",
    paddingRight:"10px",
	fontSize:"1.2rem"


};
const rightName={
    textAlign:"right"
};

class Message extends Component {
    constructor(props)
    {
        super(props);
        this.state={
            time:this.props.time,
            message:this.props.message,
            name:this.props.name,
        };
    }
    componentWillMount()
    {
        let date=new Date();




        let dateArr=this.state.time.split(" ");

        let month=(date.getMonth()+1)>=10?(date.getMonth()+1):"0"+(date.getMonth()+1).toString();
        let time=date.getFullYear()+"-"+month+"-"+date.getDate();
        if(dateArr[0]==time)
        {

            this.setState({
                time:dateArr[1]
            });
        }





    }


    render() {
        if(this.props.name==this.props.username){
            return (

                <div style={message}>
                    {this.state.time}
                    <p style={rightName}>  &nbsp;&nbsp;<span style={rightNameStyle}>{this.state.name}</span></p>
				
                    <div style={rightBubble}>
                        <div style={rightTriangle}></div>
                        <div style={rightContainer}><p>{this.state.message}</p></div>
                    </div>
                </div>

            );
        }
        else
        {
            return(
                <div style={message}>
                    <p><span style={nameStyle}>{this.state.name}</span>&nbsp;&nbsp;{this.state.time}</p>
				
                    <div style={bubble}>
                        <div style={triangle}></div>
                        <div style={container}><p>{this.state.message}</p></div>
                    </div>
                </div>
            );
        }


    }
}
export default Message;