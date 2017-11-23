import React, {Component} from 'react';
import {init_data, get_friend_profiles, get_self_profile} from "../../api/StaticData";
import OtherProfile from "../profile/FriendProfile";
import ReactDOM from 'react-dom';
import {unblock_friend, delete_friend, block_friend} from "../../dao/ProfileManager";


class UserFriends extends Component {

    constructor(props) {
        super(props);
        this.title = "UserFriends.js";
        this.state = {
            profile_obj: get_self_profile(),
            friend_profiles: get_friend_profiles()
        }
    }

    goto_other_profile(friend_id) {
        ReactDOM.render(<OtherProfile user_id={friend_id}/>, document.getElementById('main-layout'));
    }


    // This function simply sets the
    //      profile_obj.friend_list[friend_id] = false;
    // In order to check whether or not the friend is blocked,
    // you will have to manually check if friend_list[friend_list] === false;
    block_a_friend(friend_id) {
        block_friend(this.state.profile_obj.user_id, friend_id, (err, data) =>
        {
            this.setState({profile_obj: data});
        });
    }

    // This function will remove the friend_id from the user's friend_list
    // and remove the user_id from friends' friend_list
    delete_a_friend(friend_id)
    {
        delete_friend(this.state.profile_obj.user_id, friend_id, (err, data) =>
        {
            this.setState({profile_obj: data, friend_profiles:get_friend_profiles()});
        });

    }

    // Simply does the opposite of block
    unblock_a_friend(friend_id)
    {
        unblock_friend(this.state.profile_obj.user_id, friend_id, (err,data) =>
        {
            this.setState({profile_obj: data});
        });
    }

    render() {



        return (

            <div>

                <img
                    src={"https://res.cloudinary.com/teepublic/image/private/s--8-dGDDZg--/t_Preview/b_rgb:ffffff,c_limit,f_jpg,h_630,q_90,w_630/v1470902298/production/designs/627022_1.jpg"}
                    alt={""} width={"300"}/>
                <h1>{this.title}</h1>

                <h4>うまるの友達!</h4>
                <table>
                    <tbody>
                        <tr>
                            <th>Friends</th>
                            <th></th>
                        </tr>
                        {
                            Object.keys(this.state.friend_profiles).map((friend_id, index) => {
                                return (
                                    <tr key={"friend-profile-" + index}>
                                        <td>
                                            {this.state.friend_profiles[friend_id].first_name}
                                            {this.state.friend_profiles[friend_id].last_name}
                                        </td>
                                        <td>
                                            <button onClick={() => {
                                                this.goto_other_profile(friend_id);
                                            }}>
                                                goto profile
                                            </button>
                                        </td>

                                        {this.state.profile_obj.friend_list[friend_id] ? ( // render block button here
                                                <td>
                                                    <button onClick={() => {
                                                        this.block_a_friend(friend_id);
                                                    }}>
                                                        Block friend
                                                    </button>
                                                </td>
                                            )
                                            : (  // render unblock button here
                                                <td>
                                                    <button onClick={() => {
                                                        this.unblock_a_friend(friend_id);
                                                    }}>
                                                        Unblock friend
                                                    </button>
                                                </td>
                                            )
                                        }

                                        <td>
                                            <button onClick={() => {
                                                this.delete_a_friend(friend_id);
                                            }}>
                                                Delete friend
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>

                <pre>{JSON.stringify(this.state, null, 2)}</pre>

            </div>

        )

    }
}

export default UserFriends;