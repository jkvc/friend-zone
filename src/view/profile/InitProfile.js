import React, {Component} from 'react';
import firebase from 'firebase';
import Profile from '../../dao/Profile'
import ReactDOM from 'react-dom';
import MainLayout from '../../view/MainLayout';


class InitProfile extends Component{

    constructor(props){
        super(props)
        this.title = "InitProfile.js";
        this.user_id = firebase.auth().currentUser.uid;
        this.state = {
            first_name: "",
            last_name: "",
            major: "",
            current_year: "",
            description: "",
            verified_email: ""
        };
    }

    handle_create(){
        var profile = new Profile(
            this.user_id,
            this.state.first_name,
            this.state.last_name,
            this.state.major,
            this.state.current_year,
            null,  /*profile pic field should be null*/
            this.state.description,
            this.state.verified_email
        );
        profile.push();
        ReactDOM.render(<MainLayout/>, document.getElementById('root'));
    }

    render(){
        return (
            <div>
                <br/>
                <h1>{this.title}</h1>

                first_name:<input type="text" value={this.state.first_name}
                                  onChange={e=> this.setState({first_name:e.target.value})} />
                <br/>
                last_name:<input type="text" value={this.state.last_name}
                                 onChange={e=> this.setState({last_name:e.target.value})} />
                <br/>
                major:<input type="text" value={this.state.major}
                             onChange={e=> this.setState({major:e.target.value})} />
                <br/>
                current_year:<input type="text" value={this.state.current_year}
                                    onChange={e=> this.setState({current_year:e.target.value})} />
                <br/>
                description:<input type="text" value={this.state.description}
                                   onChange={e=> this.setState({description:e.target.value})} />
                <br/>
                <button onClick={this.handle_create.bind(this)}> Create Profile </button>


                <br/>

                state:
                <pre>{JSON.stringify(this.state, null, 2)}</pre>

            </div>
        )
    }



}

export default InitProfile;