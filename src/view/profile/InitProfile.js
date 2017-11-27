import React, {Component} from 'react';
import firebase from 'firebase';
import Profile from '../../dao/Profile'
import ReactDOM from 'react-dom';
import MainLayout from '../../view/MainLayout';
import '../credentials/MainLoginSignup.css'
import './InitProfile.css'
import default_profile_pic from '../../image/DefaultProfilePic.jpg'

class InitProfile extends Component {

    constructor(props) {
        super(props)
        this.title = "InitProfile.js";
        this.user_id = firebase.auth().currentUser.uid;
        this.state = {
            first_name: "",
            last_name: "",
            major: "",
            current_year: "",
            description: "",
            verified_email: "",
            profile_pic: null
        };
    }

    handle_create() {
        var profile = new Profile(
            this.user_id,
            this.state.first_name,
            this.state.last_name,
            this.state.major,
            this.state.current_year,
            this.state.description,
            this.state.verified_email,
            this.state.profile_pic
        );
        profile.push();
        ReactDOM.render(<MainLayout/>, document.getElementById('root'));
    }

    upload_profile_pic(e) {
        e.preventDefault();
        var file = e.target.files[0];
        var storageRef = firebase.storage().ref('profile_pic/' + firebase.auth().currentUser.uid);
        var uploadTask = storageRef.put(file);
        uploadTask.on('state_changed',
            null,
            null,
            () => {
                var url = uploadTask.snapshot.downloadURL;
                this.setState({profile_pic: url})
            });
    }

    render() {
        return (

            <div className="body">
                <div className="mid-container">

                    <div className="mid-column-left">
                        <img className="image-strip"
                             src="https://umad.com/img/2015/7/city-light-blur-wallpaper-background-2709-2855-hd-wallpapers.jpg"
                             alt="left-strip"/>
                    </div>

                    <div className="mid-column-right">
                        <div className="right-middle" align={"center"}>


                            <div className="subtitle-text">
                                Tell others about you
                            </div>
                            <br/>

                            <div className='profile-pic-container'>
                                <img src={this.state.profile_pic || default_profile_pic} alt=""
                                     className='profile-pic'/>
                            </div>


                            {/*upload profile pic button*/}
                            <label htmlFor="profile-pic-upload" className='chat-edit-button'>
                                Upload image &nbsp;
                                <svg viewBox="0 0 32 32" width="20" height="20"
                                     fill="none" stroke="#2f5597"
                                     strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                                    <path d="M20 24 L12 16 2 26 2 2 30 2 30 24 M16 20 L22 14 30 22 30 30 2 30 2 24"/>
                                    <circle cx="10" cy="9" r="3"/>
                                </svg>
                            </label>
                            <input id='profile-pic-upload' type='file' name='New Profile Picture' accept='image/*'
                                   onChange={e => this.upload_profile_pic(e)}/>
                            <br/>


                            <table className='init-profile-table'>
                                <tbody>
                                <tr>
                                    <td>First name</td>
                                    <td>
                                        <input type="text" value={this.state.first_name}
                                               onChange={e => this.setState({first_name: e.target.value})}/>
                                    </td>
                                </tr>

                                <tr>
                                    <td>Last name</td>
                                    <td>
                                        <input type="text" value={this.state.last_name}
                                               onChange={e => this.setState({last_name: e.target.value})}/>
                                    </td>
                                </tr>

                                <tr>
                                    <td>Major</td>
                                    <td>
                                        <input type="text" value={this.state.major}
                                               onChange={e => this.setState({major: e.target.value})}/>
                                    </td>
                                </tr>

                                <tr>
                                    <td>Current year</td>
                                    <td>
                                        <select name="current-year" id="current-year"
                                                value={this.state.current_year}
                                                onChange={e => {
                                                    this.setState({current_year: e.target.value})
                                                }}
                                        >
                                            <option value="Other">..</option>
                                            <option value="Freshman">Freshman</option>
                                            <option value="Sophomore">Sophomore</option>
                                            <option value="Junior">Junior</option>
                                            <option value="Senior">Senior</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </td>
                                </tr>

                                <tr>
                                    <td>Description</td>
                                    <td>
                                        <input type="text" value={this.state.description}
                                               onChange={e => this.setState({description: e.target.value})}/>
                                    </td>
                                </tr>

                                </tbody>
                            </table>

                            <div>
                                <button className='create-profile-button'
                                        onClick={this.handle_create.bind(this)}
                                >
                                    Create Profile
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
                state:
                <pre>{JSON.stringify(this.state, null, 2)}</pre>
            </div>


        )
    }


}

export default InitProfile;