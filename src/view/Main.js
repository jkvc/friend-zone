import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import SignUp from './SignUp';
import Login from './Login'
import firebase from 'firebase';


class Main extends Component{

    constructor(props){
        super(props);
        this.title = "Main.js";
    }

    goto_signup(){
        ReactDOM.render(<SignUp />, document.getElementById('root'));
    }

    goto_login(){
        ReactDOM.render(<Login />, document.getElementById('root'));
    }

    render(){
        return(


            <div>
                <h1>{this.title}</h1>

                <form>
                    <button onClick={this.goto_signup.bind(this)}>Sign Up</button>
                </form>


                <form>
                    <button onClick={this.goto_login.bind(this)}>Login</button>
                </form>

            </div>


        );
    }
}

export default Main;