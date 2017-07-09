import React,{Component} from 'react';
export default class Private extends Component
{
    constructor(props)
    {
        super(props);

    }
    componentDidMount()
    {
        socket.emit('getUser',this.props.roomName);
        socket.on('userList',function(data){

        })

    }
    render()
    {
        return ()
        {

        }
    }
}