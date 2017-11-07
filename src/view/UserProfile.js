import React, {Component} from 'react';
import firebase from 'firebase';
import ReactDOM from 'react-dom';
import Main from './Main';


class UserProfile extends Component{

    constructor(props){
        super(props);

        this.title = "UserProfile.js";
    }

    logout(){
        firebase.auth().signOut()
            .then(function() {
            ReactDOM.render(<Main />, document.getElementById('root'));
        })
            .catch(function(error){
            alert(error.message);
        });
    }

    render(){
        return(


            <div>
                <h1>{this.title}</h1>
                <form>
                    <button onClick={this.logout.bind(this)}>Logout</button>
                </form>
            </div>


        )
    }
}

export default UserProfile;