import React, {Component} from 'react';

import './MainLayout.css'
import PageTitle from "./components/PageTitle";

class FAQ extends Component{
    /* set prop to state, must check all props, and give it a default value if prop not passed in */
    constructor(props) {
        super(props);
    }

    render (){
        return(
        <div>

            <PageTitle title="FAQ"/>

            <div>
            <center><h2 >Why use FriendZone?</h2></center>
            <center><p>If you are a busy student then FriendZone is the perfect app for you!</p></center>
            </div>
            <br />

            <div>
                <center><h2>How do I find friends?</h2></center>
                <center><p>Add the classes you are taking to get to know your classmates!</p></center>
            </div>

            <div align="center">
                <p>For more questions: <a href="mailto:while.true.sleep.wts@gmail.com">
                    <button>Email Us!</button>    </a></p>
            </div>
            <br />
            <br />
            <br />
            <div align="center"><h2>Happy FriendZoning!</h2></div>
        </div>
        )
    }
}

export default FAQ;