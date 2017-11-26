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

                            <div className="logo"> FriendZone </div>
                            <br/>

                            <div className="subtitle-text"><p className="text">Sign up or log in to make friends in your classes.</p></div>
                            <br/>
                            <br/>

                            <button namme = "Signup" className="button-text" onClick={this.goto_signup.bind(this)}>Sign up</button>
                            <br/>
                            <img className="separator" src={blue_line} alt=""/>
                            <br/>
                            <button name = "Login" className="button-text" onClick={this.goto_login.bind(this)}>Log in</button>
                            <br/>


                            <br/>
                            <form>
                                <a className="buttonStyle" onClick={this.goto_test_course_search.bind(this)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="25" x="10" y="10">
                                        <path d="M175,50H25C11.2,50,0,38.8,0,25v0C0,11.2,11.2,0,25,0h150c13.7,0,25,11.2,25,25v0
	                                    C200,38.8,188.8,50,175,50z" class="path" fill="transparent" stroke="#ffffff"/>
                                    </svg>
                                    <p>Go to Search Course</p>
                                </a>
                            </form>

                        </div>
                    </div>
                </div>
            </div>

        );
    }
}


export default Welcome;