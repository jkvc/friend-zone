import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import SignUp from './SignUp';
import Login from './Login';

import TestCourseManager from '../test/TestCourseManager'


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

    goto_test_course_search(){
        ReactDOM.render(<TestCourseManager/>, document.getElementById('root'));
    }

    render(){
        return (
            <div align={"center"}>
                <img src={"https://res.cloudinary.com/teepublic/image/private/s--8-dGDDZg--/t_Preview/b_rgb:ffffff,c_limit,f_jpg,h_630,q_90,w_630/v1470902298/production/designs/627022_1.jpg"}
                     alt={""} width={"300"}/>

                <h1>{this.title}</h1>

                <form>
                    <button onClick={this.goto_signup.bind(this)}>Sign Up</button>
                </form>
                <br/>
                <form>
                    <button onClick={this.goto_login.bind(this)}>Login</button>
                </form>

                <br/>
                <form>
                    <button onClick={this.goto_test_course_search.bind(this)}>Goto course search test</button>
                </form>

            </div>
        );
    }
}


export default Main;