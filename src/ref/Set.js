import React from 'react';
import $ from'jquery';
class Sets extends React.Component{
    constructor(props) {
    	super(props);
    	this.state={val:1};
    }
    handleChick(){
    	
    	console.log($('div.left'));

    }
    componentDidMount() {
    	this.setState({val:this.state.val+1});
    	console.log(this.state.val);
    	this.setState({val:this.state.val+1});
    	console.log(this.state.val);
    	setTimeout(()=>{this.setState({val:this.state.val+1});
    		console.log(this.state.val);
    		this.setState({val:this.state.val+1});
    		console.log(this.state.val);},0);
    }
    render(){
    	return <div onClick={this.handleChick}>this is a test about setState</div>
    }

}
export default Sets;