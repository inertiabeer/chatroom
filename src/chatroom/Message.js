import React, { Component } from "react";
const nameStyle={
    color:"#63223f",
    fontSize:"2em",
    marginRight:"3em",



};
const rightNameStyle=
{
    color:"#63223f",
    fontSize:"2em",
    marginLeft:"3em",
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
    borderRight:"1.5rem solid #fefcd4",
    position:"absolute",
    top:"0",
    left:"-0.4rem",
    transform: "rotate(30deg)",
    zIndex: "1"
};
const rightTriangle={
    width:"0",
    height:"0",
    border:"0.4rem solid #fff",
    borderLeft:"1.5rem solid #fefcd4",
    position:"absolute",
    top:"0",
    right:"-0.4rem",
    transform: "rotate(-30deg)",
    zIndex: "1"
};
const rightContainer={
    backgroundColor:"#fefcd4",
    marginRight:"1rem",
    borderRadius: "8px",
    zIndex:"100",
    width:"auto",
    display:"inline-block",
    wordBreak:"break-all",
    paddingLeft:"10px",
    paddingRight:"10px",
    fontSize:"2rem"
};
const container=
{
    backgroundColor:"#fefcd4",
    marginLeft:"1rem",
    borderRadius: "8px",
    zIndex:"100",
    width:"auto",
    display:"inline-block",
    wordBreak:"break-all",
    paddingLeft:"10px",
    paddingRight:"10px",
	fontSize:"2rem"


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
            name:this.props.name
        };
    }


    render() {
        if(this.props.name==this.props.username){
            return (

                <div >
                    <p style={rightName}> {this.state.time} &nbsp;&nbsp;<span style={rightNameStyle}>{this.state.name}</span></p>
				
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
                <div >
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