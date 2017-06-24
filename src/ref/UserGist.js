import React from'react';
import $ from 'jquery';
class UserGist extends React.Component
{
	constructor(props) {
		super(props);
		this.state={username:'',
		lastGistUrl:''};
		
	}
	componentDidMount() {
		this.server=$.get(this.props.source,function(result){
			let lastGist=result[0];
			this.setState({
				username:lastGist.owner.login,
				lastGistUrl:lastGist.html_url
			});
		}.bind(this));
	}
	render(){
		return (
			<div>{this.state.username}
			<br/>
			<a href={this.state.lastGistUrl}>{this.state.lastGistUrl}</a></div>)
	}
}
export default UserGist;