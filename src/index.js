import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';


    function UserGreeting(props){
        return <h1>Welcome back!</h1>
    }

    function GuestGreeting(props){
        return <h1>Please sign up.</h1>
    }

function Greeting(props){
    const isLoggedIn = props.isLoggedIn;
    return isLoggedIn ?  <UserGreeting/> : <GuestGreeting/>
}

    function LogoutButton(props) {
        return (
            <button onClick={props.onClick}>
                Logout
            </button>
        )
    }

    function LoginButton(props) {
        return (
            <button onClick={props.onClick}>
                Login
            </button>
        )
    }

class LoginControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false
        }
    }

    handleLoginClick() {
        this.setState({
            isLoggedIn: true
        })
    }

    handleLogoutClick() {
        this.setState({
            isLoggedIn: false
        })
    }

    render() {
        const isLoggedIn = this.state.isLoggedIn;
        
        let button
        if(isLoggedIn) {
            button = <LogoutButton onClick={this.handleLogoutClick.bind(this)}/>

        } else {
            button = <LoginButton onClick={this.handleLoginClick.bind(this)} />
        }

        return(
            <div>
                <Greeting isLoggedIn={isLoggedIn} />
                {button}
            </div>
        )

    }
}

class Clock extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            date: new Date(),
            toggleStatus: true,
        };

        // this.handleClick = this.handleClick.bind(this, x);
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

    handleClick(x,e) {
        console.log(e);
        console.log(x);
        this.setState( state => ({
            toggleStatus: !state.toggleStatus
        }))
    }

    tick() {
        //the call below may fail to set the state due to
        //there potentially being many setState events occuring
    
    // this.setState({
    //     date: new Date()
    // });

        //To deal with this, you can use a second form of 
        //setState which accepts a function instead of an object
        //the function's first argument will be the previousState
        //the 2nd argument can be the current props

    this.setState((prevState, props)=>({
         date: new Date()
        }))
    }

    render() {
        return (
            <div>
                <h1>Hello, world!</h1>
                <h2>It is, {this.state.date.toLocaleTimeString()}</h2>
                <button onClick={this.handleClick.bind(this,'superman')}>{this.state.toggleStatus ? "true" : "false"}</button>
            </div>
        );
    }
}


function App() {
    return (
        <div>
            <Clock />
            <Clock />
            <Clock />
            <LoginControl />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
