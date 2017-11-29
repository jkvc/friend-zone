import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import SignUp from './SignUp';
import Login from './Login';
import './MainLoginSignup.css'
import blue_line from '../../image/BlueLine.png'

import TestCourseManager from '../../TempViews/TestCourseManager'


class Welcome extends Component {

    constructor(props) {
        super(props);
        this.title = "Welcome.js";
    }

    goto_signup() {
        ReactDOM.render(<SignUp/>, document.getElementById('root'));
    }

    goto_login() {
        ReactDOM.render(<Login/>, document.getElementById('root'));
    }

    goto_test_course_search() {
        ReactDOM.render(<TestCourseManager/>, document.getElementById('root'));
    }

    render() {
        return (

            <div className="body">
                <div className="mid-container">

                    <div className="mid-column-left">
                        <img className="image-strip"
                             src="https://umad.com/img/2015/7/city-light-blur-wallpaper-background-2709-2855-hd-wallpapers.jpg"
                             alt="left-strip"/>
                    </div>

                    <div className="mid-column-right">
                        <div className="right-middle" align={"center"}>

                            <div className="logo"> FriendZoned </div>
                            <br/>

                            <div className="subtitle-text"><p>Ready to be FriendZoned?</p></div>
                            <br/>
                            <br/>

                            <button name = "Signup" className="button-text" onClick={this.goto_signup.bind(this)}>Sign up</button>
                            <br/>
                            <img className="separator" src={blue_line} alt=""/>
                            <br/>
                            <button name = "Login" className="button-text" onClick={this.goto_login.bind(this)}>Log in</button>
                            <br/>


                            <br/>

                        </div>
                    </div>
                </div>
            </div>

        );
    }
}


export default Welcome;