import React, {Component} from 'react';
import Profile from '../../dao/Profile'
import firebase from 'firebase';

class EditProfile extends Component{

    constructor(props){
        super(props);
        this.title = "EditProfile.js";
        this.state = {
            user_id: firebase.auth().currentUser.uid,
        }
        this.profile = new Profile(this.state.user_id,"","","","","","");
    }

    get_profile(){

    }

    render(){
        return(

            <div align={'center'}>



            </div>

        )
    }
}

export default EditProfile;