import React, { Component } from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider, connect } from "react-redux";


//定义组件
class App extends Component{
    render() {
        const {text,name,onChangeText, onButtonClick} = this.props;//这里是从props获取数据
        return (
            <div>
                <h1 onClick={onChangeText}> {text} </h1>
                <h1>{name}</h1>
                <button onClick={onButtonClick}>click me</button>

            </div>
        );
    }
}




//reducer
const initialState = {
    text: "Hello",
    name:"caoqibin"
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
    case "CHANGE_TEXT":
        console.log(action.descrebe);
        return {
            text: state.text==="Hello" ? "world":"Hello",
            name:action.descrebe
        };
    case "BUTTON_CLICK":
       let temp=JSON.parse(JSON.stringify(state));
        temp.text="我变了";
        return temp;
    default:
        return initialState;
    }
};

//store
let store = createStore(reducer);//创建store的函数中传入一个reducer
//可以通过store中的getState()获取当前时间下的所有状态

//映射Redux state到组件的属性,这里是将整个store中的属性选取一部分当做props
function mapStateToProps(state) {
    return { text: state.text,name:state.name};
}
//action
const changeTextAction = {
    type:"CHANGE_TEXT",
    descrebe:"我是修改文本行为"
};
const buttonClickAction = {
    type:"BUTTON_CLICK"//这个对象里面可以放别的数据
};

//映射Redux actions到组件的属性 这里是将改变之后的返回到顶层store
function mapDispatchToProps(dispatch){
    return{
        onButtonClick:()=>dispatch(buttonClickAction),
        onChangeText:()=>dispatch(changeTextAction)
    };
}
//onButtonClick这些是App的props

//连接组件
App = connect(mapStateToProps, mapDispatchToProps)(App);

//渲染组件
//react-redux中是通过这一个store直接获取的
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("hello")
);