import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from 'firebase';
import Account from "./dao/Account";

class App extends Component {

    constructor(props) {
        super(props);

        /*the following is firebase config*/
        var config = {
            apiKey: "AIzaSyABmBOMLTEGtBLrjkwcDu9ab0ExE208R-4",
            authDomain: "friend-zone-9219b.firebaseapp.com",
            databaseURL: "https://friend-zone-9219b.firebaseio.com",
            projectId: "friend-zone-9219b",
            storageBucket: "",
            messagingSenderId: "1002501074461"
        };
        firebase.initializeApp(config);
        /*the above is firebase config*/

        this.state = {
            username:'username',
            password:'pw'
        }

    }


    create_account(){
        var account = new Account(this.state.username, this.state.password);
        account.push();
        alert("Create account "+this.state.username + " " +this.state.password);
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <h1>{this.message}</h1>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>

                <form >
                    <label>Username </label>
                    <input type={"text"} value={this.state.username} onChange={ e=> this.setState({username: e.target.value})}/>
                </form>

                <form>
                    <label>Password </label>
                    <input type={"text"} value={this.state.password} onChange={ e=> this.setState({password: e.target.value})}/>
                </form>

                <form>
                    <button onClick={this.create_account.bind(this)}>Submit</button>
                </form>


            </div>



        );
    }


}

export default App;
