import React, { Component } from "react";
import { notification} from "antd";
class Send extends Component {
    constructor(props) {
        super(props);
        this.state={
            value:"",
            placeHolder:"在这里输入消息"
        };
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleKey=this.handleKey.bind(this);
        this.handleIcon=this.handleIcon.bind(this);
    }
    handleChange(event){
        this.setState({value:event.target.value});
    }
    handleIcon(event)
    {

    }
    handleSubmit(event)
    {
        let m_value=this.state.value;
        //这里需要调用value的字符值

        if (this.state.value.toString() != "") {
            socket.emit("client", this.state.value);
            this.setState({value: ""});
        } else {


            // alert('不能为空');
            notification["error"]({
                message: "Error",
                description: "消息不能为空"
            });


            this.setState({value: ""});
        }
    }
    handleKey(event){
        let key=(event.keyCode?event.keyCode:event.which);
        let m_value=this.state.value.toString();//m_value='\n';因为这是一个keyup事件

        if(key=="13")
        {
			
            if(m_value=="\n"||m_value=="")
            {
                notification["error"]({
                    message: "Error",
                    description: "消息不能为空"
                });

                this.setState({value:""});
            }
            else
            {
				
			  socket.emit("client",this.state.value);
		       this.setState({value:""});

            }

        }

    }
    render() {
        return (
            <div className='send'>
                <span className="sendIconActive"><i onClick={this.handleIcon} className="arrow_icon">&#xe9df;</i></span>

                <input type="text" value={this.state.value} onKeyUp={this.handleKey} onChange={this.handleChange} placeholder={this.state.placeHolder}/>
                <span className={this.state.value?"sendIconActive":"sendIcon"}><i onClick={this.handleSubmit} className="arrow_icon">&#xe949;</i></span>
            </div>
        );
    }
}
export default Send;