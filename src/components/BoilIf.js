import React from 'react';
function BoilIf (props)
{
	if(props.celsius>=100)
	{
		return <p>The water would boil</p>
	}
	return <p>the water would not boil</p>
}

			const scaleNames={
	        c:'Celsius',
	        f:'Fahrenheit'
};
function toC(f)
{
	return(f-32)*5/9;
}
function toF(c)
{
	return (c*9/5)+32;
}
function tryConvert(t,convert)
{
	const input=parseFloat(t);
	if(Number.isNaN(input))
	{
		return '';
	}
	const output=convert(input);
	const rounded=Math.round(output*1000)/1000;
	return rounded.toString();
}
class TemperatureInput extends React.Component{
	constructor(props) {
		super(props);
		this.handleChange=this.handleChange.bind(this);
		
	}
	handleChange(e)
	{
		this.props.onTemperatureChange(e.target.value);
	}
	render()
	{


		const temperature=this.props.temperature;
		const scale=this.props.scale;
		return (
			<fieldset>
				<legend>Enter temperature in {scaleNames[scale]}</legend>
				<input type="text" value={temperature} onChange={this.handleChange}/>
			</fieldset>);
	}
}
class Calculator extends React.Component{
	constructor(props) {
		super(props);
		this.handleC_Change=this.handleC_Change.bind(this);
		this.handleF_Change=this.handleF_Change.bind(this);
		this.state={temperature:'',scale:'c'};
	}
	handleC_Change(t){
		this.setState({scale:'c',temperature:t});
	}
	handleF_Change(t)
	{this.setState({scale:'f',temperature:t})};
	render(){
		const scale=this.state.scale;
		const temperature=this.state.temperature;
		const celsius=scale==='f'? tryConvert(temperature,toC):temperature;
		const Fahrenheit=scale==='c'?tryConvert(temperature,toF):temperature;
		return (
			<div>
				<TemperatureInput scale='c' temperature={celsius} onTemperatureChange={this.handleC_Change}/>
				<TemperatureInput scale="f" temperature={Fahrenheit} onTemperatureChange={this.handleF_Change}/>
				<BoilIf celsius={parseInt((celsius), 10)} />
				
			</div>)
	}
}
export default Calculator;