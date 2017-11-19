import React, {Component} from 'react';
import Profile from '../../dao/Profile'
import {lookup_profile_by_user_id} from '../../dao/ProfileManager'
import firebase from 'firebase';

class EditProfile extends Component {

    constructor(props) {
        super(props);
        let user_id = firebase.auth().currentUser.uid;
        this.title = "EditProfile.js";
        this.profile_obj = new Profile(user_id, "", "", "", "", "", "");

        this.state = {
            user_id: user_id,
            message: "",
            first_name: "",
            last_name: "",
            major: "",
            current_year: "",
            profile_pic: "",
            description: "",
            upload_status: ""
        };

        this.initialized = false;
    }

    initialize() {
        lookup_profile_by_user_id(this.state.user_id, function (err, profile) {
            this.initialized = true;
            if (err) {
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

    handle_update() {
        this.profile_obj.first_name = this.state.first_name;
        this.profile_obj.last_name = this.state.last_name;
        this.profile_obj.major = this.state.major;
        this.profile_obj.current_year = this.state.current_year;
        this.profile_obj.first_name = this.state.first_name;
        this.profile_obj.profile_pic = this.state.profile_pic;
        this.profile_obj.description = this.state.description;
        this.profile_obj.push();
    }


    upload_image(e) {
        e.preventDefault();
        var file = e.target.files[0];

        /*store the file as: /profile_pic/user_id */

        var storageRef = firebase.storage().ref('profile_pic/' + firebase.auth().currentUser.uid);
        var uploadTask = storageRef.put(file);

        uploadTask.on('state_changed',

            function in_progress(snapshot) {
                var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                this.setState({upload_status: percentage})
            }.bind(this),

            function error(error) {
                this.setState({upload_status: "Upload failed: " + error.message})
            }.bind(this),

            function complete() {
                var downloadURL = uploadTask.snapshot.downloadURL;
                this.setState({
                    profile_pic: downloadURL,
                    upload_status: "Upload Complete"
                }, ()=>{
                    /*after upload finish and setting url to this.state, push the profile*/
                    this.handle_update();
                } );
            }.bind(this));
    }

    render() {
        if (!this.initialized) this.initialize();

        return (

            <div>
                <br/>
                <h1>{this.title}</h1>

                first_name:<input type="text" value={this.state.first_name}
                                  onChange={e => this.setState({first_name: e.target.value})}/>
                <br/>
                last_name:<input type="text" value={this.state.last_name}
                                 onChange={e => this.setState({last_name: e.target.value})}/>
                <br/>
                major:<input type="text" value={this.state.major}
                             onChange={e => this.setState({major: e.target.value})}/>
                <br/>
                current_year:<input type="text" value={this.state.current_year}
                                    onChange={e => this.setState({current_year: e.target.value})}/>
                <br/>
                description:<input type="text" value={this.state.description}
                                   onChange={e => this.setState({description: e.target.value})}/>


                <br/>
                <button onClick={this.handle_update.bind(this)}> Update</button>


                <br/>

                <br/>
                <br/>
                <br/>

                submit Picture:<input type="file" name="myImage" accept="image/*"
                                      onChange={e => this.upload_image(e)}/>
                upload status : {this.state.upload_status}

                <br/>
                <br/>
                state:
                <pre>{JSON.stringify(this.state, null, 2)}</pre>

            </div>

        )
    }
}

export default EditProfile;