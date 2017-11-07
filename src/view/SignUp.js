import React, {Component} from 'react';
import firebase from 'firebase';
import Account from "../dao/Account";

class SignUp extends Component {

    constructor(props) {
        super(props);


        this.state = {
            user_email:'Put user_email here',
            password:'put password here',
            email_msg: "",
            password_msg: "",
        };
        this.title = "SignUp.js";

    }

    handle_submit_button(event){
        event.preventDefault();
        let table = firebase.database().ref('Account');

        table.once('value').then(function (snapshot) {

            if (snapshot.hasChild(this.state.user_email) )
                this.setState({email_msg: "User already exist, user another email."})
            else
                this.create_account();

        }.bind(this));
    }

    create_account(){
        let acc = new Account(this.state.user_email, this.state.password);
        acc.push();
        this.setState({email_msg: "Sign up success. [link to login page]"});
    }

    render() {
        return (
            <div>
                <h1>{this.title}</h1>
                <form >
                    <label>user_email </label>
                    <input type={"text"} value={this.state.user_email}
                           onChange={e=> this.setState({user_email: e.target.value})}/>
                    <label>{this.state.email_msg}</label>
                </form>

                <form>
                    <label>password </label>
                    <input type={"text"} value={this.state.password}
                           onChange={ e=> this.setState({password: e.target.value})}/>
                    <label>{this.state.password_msg}</label>
                </form>

                <form>
                    <button onClick={this.handle_submit_button.bind(this)}>Submit</button>
                </form>

            </div>
        );
    }
}



export default SignUp;
