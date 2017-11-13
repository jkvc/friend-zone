import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import SignUp from './SignUp';
import Login from './Login';
import './Main.css'

import TestCourseManager from '../TempViews/TestCourseManager'


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

            <div className="body">
                <div className="mid-container">

                    <div className="mid-column-left">
                        <img className="image-strip" src="https://umad.com/img/2015/7/city-light-blur-wallpaper-background-2709-2855-hd-wallpapers.jpg" alt="Geisel"/>
                    </div>

                    <div className="mid-column-right">
                        <div className="right-middle" align={"center"}>

                            <br/>
                            <h1>FriendZone</h1>
                            <h5>Sign up or log in to make friends in your classes.</h5>

                            <h4 className="button-text" onClick={this.goto_signup.bind(this)}>Sign up</h4>
                            <h4 className="button-text" onClick={this.goto_login.bind(this)}>Log in</h4>

                        </div>
                    </div>
                </div>
            </div>
            //
            // <div align={"center"}>
            //
            //     <form>
            //         <button onClick={this.goto_signup.bind(this)}>Sign Up</button>
            //     </form>
            //     <br/>
            //     <form>
            //         <button onClick={this.goto_login.bind(this)}>Login</button>
            //     </form>
            //
            //     <br/>
            //     <form>
            //         <button onClick={this.goto_test_course_search.bind(this)}>Goto course search test</button>
            //     </form>
            //
            // </div>
        );
    }
}


export default Main;