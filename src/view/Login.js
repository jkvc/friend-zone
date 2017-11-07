import React, {Component} from 'react';

class LogIn extends Component{

    constructor(props){
        super(props);
        this.title = "Login.js";

    }

    render(){
        return(
            <div>
                <h1>{this.title}</h1>

                <form>
                    <button onClick={this.goto_signup.bind(this)}>Sign Up</button>
                </form>

            </div>
        )
    }
}