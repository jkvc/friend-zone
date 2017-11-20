import React, {Component} from 'react';
import {get_friend_profiles} from "../../api/StaticData";


class OtherProfile extends Component {

    constructor(props) {
        super(props);
        this.title = "OtherProfile.js"
        this.state = {
            profile_obj: get_friend_profiles()[props.user_id]
        }
    }

    render() {
        return (
            <div>
                <h1>{this.title}</h1>
                <pre>{JSON.stringify(this.state, null, 2)}</pre>
            </div>
        )
    }
}


export default OtherProfile;