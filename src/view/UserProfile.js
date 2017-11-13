import React, {Component} from 'react';
import NavBar from './MainLayout'

class UserProfile extends Component{

    constructor(props){
        super(props);
        this.title = "UserProfile.js";
    }

    render(){
        return(

            <div align={'center'}>


                <NavBar tab="profile"/>

                <h4>これがうまるのプロファイルだ！</h4>


            </div>

        )
    }
}

export default UserProfile;