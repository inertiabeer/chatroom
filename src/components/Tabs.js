import React,{Component} from 'react';
function Welcome(props)
{
	return <h1>Hello,{props.name}</h1>
}
function App()
{
	return (
		<div>
			<Welcome name="sara" />
			<Welcome name="caoqbi" />
			<Welcome name='hello'/>
		</div>)
};
export default App;