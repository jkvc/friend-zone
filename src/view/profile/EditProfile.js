import React, {Component} from 'react';
import Profile from '../../dao/Profile'
import {lookup_profile_by_user_id} from '../../dao/ProfileManager'
import firebase from 'firebase';

class EditProfile extends Component{

    constructor(props){
        super(props);
        let user_id = firebase.auth().currentUser.uid;
        this.title = "EditProfile.js";
        this.profile_obj = new Profile(user_id,"","","","","","");

        this.state = {
            user_id: user_id,
            message: "",
            first_name: "",
            last_name: "",
            major: "",
            current_year: "",
            profile_pic: "",
            description: ""
        };

        this.initialized = false;
    }

    initialize(){
        lookup_profile_by_user_id(this.state.user_id, function(err, profile){
            this.initialized = true;
            if (err){
                this.setState({message: "Profile not found for this user, creating new."})
            } else {
                this.profile_obj = profile;
                this.setState({
                    first_name: profile.first_name,
                    last_name: profile.last_name,
                    major: profile.major,
                    current_year: profile.current_year,
                    profile_pic: profile.profile_pic,
                    description: profile.description
                });
            }
        }.bind(this))
    }

    handle_update(){
        this.profile_obj.first_name = this.state.first_name;
        this.profile_obj.last_name = this.state.last_name;
        this.profile_obj.major = this.state.major;
        this.profile_obj.current_year = this.state.current_year;
        this.profile_obj.first_name = this.state.first_name;
        this.profile_obj.profile_pic = "";
        this.profile_obj.description = this.state.description;
        this.profile_obj.push();
    }


    upload_image(e) {
        e.preventDefault();
        var file = e.target.files[0];
        // upload the profile picture to firebase storage
        var storageRef = firebase.storage().ref('profile_pic/' + file.name);
        var uploadTask = storageRef.put(file);

        uploadTask.on('state_changed', function(snapshot){

        }, function(error) {
        // Handle unsuccessful uploads
        }, function() {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        var downloadURL = uploadTask.snapshot.downloadURL;

        //handle update the url inside the user here
        firebase.database().ref('Profile').child(firebase.auth().currentUser.uid)
        .update({ "profile_pic": downloadURL});

        });



    }

    render(){
        if (!this.initialized) this.initialize();

        return(

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
                <button onClick={this.handle_update.bind(this)}> Update </button>


                <br/>

                <br/>
                <br/>

                {/*NOTED: issue with the upload image, you have to first update the profile and seperately submit
                the profile picture in another button to change it, it should not be put into the update profile
                form all together*/}
                <br/>

                submit Picture:<input type="file" name="myImage" accept="image/*"
                               onChange={e=> this.upload_image(e)} />
                
                <br/>
                <br/>
                state:
                <pre>{JSON.stringify(this.state, null, 2)}</pre>

            </div>

        )
    }
}

export default EditProfile;