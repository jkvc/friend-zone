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
            <center><h2 >Why use FriendZoned?</h2></center>
            <center><p>If you are a shy and introverted student then FriendZoned is the perfect app for you!
                <br /> It will help you create bonds with your classmates and so much more! </p></center>
            </div>


            <div>
                <center><h2>How do I find friends?</h2></center>
                <center><p>Add the classes you are taking to get to know your classmates!</p></center>
            </div>
            <div>
                <center><h2>Can anyone else see my calendar?</h2></center>
                <center><p>No, we value our dear customers privacy and we keep it accessible only to themselves!</p></center>
            </div>
            <div>
                <center><h2>How do I report a user for indecent behavior? </h2></center>
                <center><p>Block the user and report them to us through the button below.</p></center>
            </div>
            <div>
                <center><h2>This app is amazing! Will you make a mobile version of FriendZone?</h2></center>
                <center><p>Probably not, but if we get enough support we shall!</p></center>
            </div>



            <div align="center">
                <p>For more questions and concerns: <a href="mailto:while.true.sleep.wts@gmail.com">
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