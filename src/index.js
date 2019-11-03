import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';


function Mailbox(props) {
    const unreadMessages = props.messages;
    return(
        <div>
            <h1>Mail</h1>
            {unreadMessages.length > 0 && <h2>You have some undead mail ({props.messages.length})...brains!</h2>}
        </div>
    );
}



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

function ListItem(props) {
    const value = props.value;
    return (
      // Wrong! There is no need to specify the key here:
      <li key={value.toString()}>
        {value}
      </li>
    );
  }

function NumberList(props){
    //FYI: Using 'index' as the...well...index. Is suboptimal, because
    //these indeces get reused upon re-rendering and that can
    //lead to a number of UI errors.
    const numbers = props.numbers;
            // const listItems = numbers.map((number, index)=>
            //     <li key={index}>{number}</li>
            // );

            // return (
            //     <ul>
            //         {listItems}
            //     </ul>
            // );
    //It is also possible to embed the expression in curly
    //braces in side the JSX like so:
    return(
        <ul>
            {numbers.map((number)=>{
                return <ListItem key={number.toString()} value={number} />
            })}
        </ul>
    )
}


const messages = ["Spiderman", "Batman", "Superman"]
const numbers = [1,2,3,4,5,6,7,8,9];



class NameFormControlledComponent extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            value: ''
        };
    }

    handleChange(event) {
        this.setState({
            value: event.target.value.toUpperCase()
        })
    }

    handleSubmit(event) {
        console.log(this.state.value);
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit.bind(this)}>
                <label>
                    Name:
                    <input type="text" value={this.state.value} onChange={this.handleChange.bind(this)} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        )
    }
}

class FlavorFormControlledComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: 'coconut'
        }
    }

    handleChange(event) {
        this.setState({
            value: event.target.value
        })
    }

    handleSubmit(event) {
        alert('Your favorite flavor is: ' + this.state.value);
        event.preventDefault();
    }
//You can set the select's default choice by seting the attr 'value'
//to the value of an option which matches it. Here we auto set "Coconut"
//Yum
    render(){
        return(
            <form onSubmit={this.handleSubmit.bind(this)}>
                <label>
                    Pick your favorite flavor:
                    
                    <select multiple={true} value={[this.state.value, 'lime']} onChange={this.handleChange.bind(this)}>

                        <option value="grapefruit">GRAPEFRUIT</option>
                        <option value="lime">LIME</option>
                        <option value="coconut">COCONUT</option>
                        <option value="mango">MANGO</option>
                    </select>
                </label>
                <input value="kale" readOnly/>
                 <input type="submit" value="Submit Flavor" />
                 
            </form>
        );
    }
}

function toCelsius(fahrenheit){
    return (fahrenheit - 32) * 5/9;
}
function toFahrenheit(celsius){
    return (celsius * 9/5) + 32;
}

function tryConvert(temperature, convert){
    const input = parseFloat(temperature);
    if(Number.isNaN(input)){
        return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000)/1000;
    return rounded.toString();
}

function BoilingVerdict(props) {
    if(props.celsius >= 100) {
        return <p>Water boils</p>
    } 
    return <p>the water dont boil</p>
}

class Calculator extends React.Component {
   constructor(props){
       super(props);
       this.state = {
        temperature: '',
        scale: "c"
       };
   }

   handleCelsiusChange(temperature) {
       this.setState({scale: 'c', temperature})
   }

   handleFahrenheitChange(temperature){
       this.setState({scale:'f', temperature});
   }
    render(){
        const scale = this.state.scale;
        const temperature = this.state.temperature;
        const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
        const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;
        return(
            <div>
                <TemperatureInput scale="c"  temperature={celsius} onTemperatureChange={this.handleCelsiusChange.bind(this)}/>
                <TemperatureInput scale="f" temperature={fahrenheit}  onTemperatureChange={this.handleFahrenheitChange.bind(this)}/>
                <BoilingVerdict celsius={parseFloat(celsius)} />
            </div>
        )
    }
}


const scaleNames = {
    c: "Celsius",
    f: "Fahrenheit"
};

class TemperatureInput extends React.Component {
    constructor(props){
        super(props);
        
    }

    handleChange(e) {
        // this.setState({temperature: e.target.value});
        this.props.onTemperatureChange(e.target.value);
    }


    render(){
        const temperature = this.props.temperature;
        const scale= this.props.scale;
        return(
            <fieldset>
                <legend>Enter temperature in {scaleNames[scale]}:</legend>
                <input value={temperature} onChange={this.handleChange.bind(this)}/>
            </fieldset>
        );
    }
}

function WelcomeDialog(){
    return(
        <FancyBorder color="blue">
            <h1 className="Dialog-title">
                Welcome
            </h1>
            <p className="Dialog-message">
                Thank you for visiting our spacecraft!
            </p>
        </FancyBorder>
    );
}

function FancyBorder(props){
    return(
        <div className={'FancyBorder FancyBorder-' + props.color}>
            {props.children}
            <h1>Hen god</h1>
        </div>
    )
}

function App() {
    return (
        <div>
            <WelcomeDialog />
            <Clock />
            <Clock />
            <Clock />
            <LoginControl />
            <Mailbox messages={messages}/>
            <NumberList numbers={numbers} />
            <NameFormControlledComponent />
            <FlavorFormControlledComponent />
            <Calculator />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
