import React from 'react';
class CustomTextInput extends React.Component
{
	constructor(props) {
		super(props);
		this.foucs=this.foucs.bind(this);
	}
	foucs(){
		this.textInput.focus();
	}
	render()
	{
		<div>
			<input type="text" ref={(input)=>{this.textInput=input}}/>
			<input type="text" value="Focus the text input" onClick={this.foucs}/>
		</div>
	}
}