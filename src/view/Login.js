import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import UserProfile from './UserProfile';


class Login extends Component{

    constructor(props){
        super(props);
        this.title = "Login.js";
        this.state = {
            user_email:'Put user_email here',
            password:'put password here',
            err_msg: "",
            success_msg:""
        };

    }

    handle_login_button(event){
        event.preventDefault(); /* to make react happy */

        firebase.auth().signInWithEmailAndPassword(this.state.user_email, this.state.password) /* login with firebase */

            /* handles login success */
            .then(function(){
                this.setState({
                   success_msg:"login success!",
                   err_msg:""
                });
                ReactDOM.render(<UserProfile />, document.getElementById('root'))
            }.bind(this))

            /* handles failure, show err message*/
            .catch(function(error){
                this.setState({
                    err_msg:error.message
                });
            }.bind(this));
    }

    render(){
        return(
            <div align={'center'}>
                <img src={"https://res.cloudinary.com/teepublic/image/private/s--8-dGDDZg--/t_Preview/b_rgb:ffffff,c_limit,f_jpg,h_630,q_90,w_630/v1470902298/production/designs/627022_1.jpg"} alt={""}/>

                <h1>{this.title}</h1>

                <form >
                    <label>user_email </label>
                    <input type={"text"} value={this.state.user_email}
                           onChange={e=> this.setState({user_email: e.target.value})}/>
                    <label>{this.state.err_msg}</label>
                </form>

                <form>
                    <label>password </label>
                    <input type={"text"} value={this.state.password}
                           onChange={ e=> this.setState({password: e.target.value})}/>
                    <label>{this.state.success_msg}</label>
                </form>
                <br/>

                <form>
                    <button onClick={this.handle_login_button.bind(this)}>login</button>
                </form>

            </div>
        )
    }
}

export default Login;