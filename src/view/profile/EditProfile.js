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
            upload_status: "",
            newPassword : "",
            repeatPassword : "",
            err_msg: ""
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
        this.profile_obj.push().catch(function(error){
            alert(error);
        });
    }

    handle_update_password() {
        var user = firebase.auth().currentUser;
        
        // Check password strength
        let uppercase_count = 0;
        let lowercase_count = 0;
        let numeric = 0;
        let total = 0;
        let password = this.state.newPassword;

        for (let i = 0; i < password.length; i++)
        {
            if (password[i] >= 'A' && password[i] <= 'Z')
            {
                uppercase_count++;
            }
            else if (password[i] >= 'a' && password[i] <= 'z')
            {
                lowercase_count++;
            }
            else if (password[i] >= '0' && password[i] <= '9')
            {
                numeric++;
            }
            total++;
        }

        // Check if they are valid passwords or not
        if (uppercase_count < 1)
        {
            let error_msg = "There must be at least one uppercase letter in the password";
            this.setState({err_msg:error_msg, newPassword:"", repeatPassword:""});

        }
        else if (lowercase_count < 1)
        {
            let error_msg = "There must be at least one lowercase letter in the password";
            this.setState({err_msg:error_msg, newPassword:"", repeatPassword:""});

        }
        else if (numeric< 1)
        {
            let error_msg = "There must be at least one number in the password";
            this.setState({err_msg:error_msg, newPassword:"", repeatPassword:""});

        }
        else if (total < 8)
        {
            let error_msg = "The password is not long enough";
            this.setState({err_msg:error_msg, newPassword:"", repeatPassword:""});

        }
        else if (password !== this.state.repeatPassword)
        {
            let error_msg = "The passwords entered do not match each other";
            this.setState({err_msg:error_msg, newPassword:"", repeatPassword:""});
        }

        else{
            this.setState({err_msg:"", newPassword:"", repeatPassword:""});
            user.updatePassword(password).then(function(){
                alert("Password Changed Successfully");
            }).catch(function(error){
                alert(error);
            })
        }
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
                <button onClick={this.handle_update.bind(this)}> Update Profile</button>


                <br/>
                <h3> Change Password </h3>
                New Password<input type="text" value={this.state.newPassword}
                                    onChange={e =>this.setState({newPassword: e.target.value})}/>
                <br />
                Confirm Password<input type="text" value={this.state.repeatPassword}
                                       onChange={e =>this.setState({repeatPassword: e.target.value})}/>
                <h3> {this.state.err_msg} </h3>
                <br/>

                <form>
                    <button type="button" onClick={this.handle_update_password.bind(this)}>Update Password</button>
                </form>

                <br />
                <br/>
                <br/>
                <h3>Profile Picture</h3>
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