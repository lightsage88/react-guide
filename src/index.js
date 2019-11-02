import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


class Clock extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            date: new Date()
        };
    }


    componentDidMount(){
        //We are free to add additional fields to the class
        //like below, if we need to store something that doesn't
        //participate in the data flow ((such as our timerID))
        this.timerID = setInterval(()=>{
            this.tick()
        }, 1000);
    }

    componentWillUnmount(){
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    render() {
        return (
            <div>
                <h1>Hello, world!</h1>
                <h2>It is, {this.state.date.toLocaleTimeString()}</h2>
            </div>
        );
    }
}




ReactDOM.render(<Clock />, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
