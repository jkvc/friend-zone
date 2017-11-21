import React, {Component} from 'react';
import {get_friend_profiles} from "../../api/StaticData";
import {lookup_profile_by_user_id} from "../../dao/ProfileManager";


class OtherProfile extends Component {

    constructor(props) {
        super(props);
        this.title = "OtherProfile.js"
        this.state = {
            user_id: props.user_id,
            profile_obj: get_friend_profiles()[props.user_id]
        }
    }

    componentWillMount() {
        if (this.state.profile_obj === null || this.state.profile_obj === undefined) {
            lookup_profile_by_user_id(this.state.user_id, (err, data) => {
                if (!err) {
                    this.setState({profile_obj: data})
                }
            })
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