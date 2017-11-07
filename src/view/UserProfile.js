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

            <div align={'center'}>
                <img src={"https://res.cloudinary.com/teepublic/image/private/s--8-dGDDZg--/t_Preview/b_rgb:ffffff,c_limit,f_jpg,h_630,q_90,w_630/v1470902298/production/designs/627022_1.jpg"} alt={""}/>

                <h1>{this.title}</h1>

                <h2>これがうまるちゃんのプロファイルだ！</h2>

                <form>
                    <button onClick={this.logout.bind(this)}>Logout</button>
                </form>
            </div>


        )
    }
}

export default UserProfile;