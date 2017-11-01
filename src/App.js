import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from 'firebase';

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

    }


    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
            </div>
        );
    }


}

export default App;
