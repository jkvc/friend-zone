import React, {Component} from 'react';
import {get_friend_profiles, get_self_profile} from "../../api/StaticData";
import OtherProfile from "../profile/FriendProfile";
import ReactDOM from 'react-dom';
import {unblock_friend, delete_friend, block_friend} from "../../dao/ProfileManager";
import './UserFriends.css'
import PageTitle from "../components/PageTitle";

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

    // This will simply call block/unblock, since the algorithm for those
    // functions are exactly the same
    //      Just treat this as a facade and take it a face value =_=
    undelete_a_friend(friend_id)
    {
        if (friend_id in this.state.profile_obj.blocked_user)
        {
            this.block_a_friend(friend_id);
        }
        else
        {
            this.unblock_a_friend(friend_id);
        }
    }

    render() {

        return (

            <div align = "center">

                <img
                    align={"center"}
                    src={"https://res.cloudinary.com/teepublic/image/private/s--8-dGDDZg--/t_Preview/b_rgb:ffffff,c_limit,f_jpg,h_630,q_90,w_630/v1470902298/production/designs/627022_1.jpg"}
                    alt={""} width={"300"}/>
                <PageTitle title="うまるの友達!我的朋友很少"/>


            <table>
                    <tbody>
                        <tr>

                            <th></th>
                        </tr>
                        {
                            Object.keys(this.state.friend_profiles).map((friend_id, index) => {
                                return (
                                    <tr key={"friend-profile-" + index}>
                                        <td>
                                            <img className={"img"} src={this.state.friend_profiles[friend_id].profile_pic} alt="" width=" 250" height="250"/>
                                        </td>
                                        <td>
                                            <p className={"name"}>{this.state.friend_profiles[friend_id].first_name}{" "}{this.state.friend_profiles[friend_id].last_name}{" "}SameClasses: {" "}</p>
                                        </td>
                                        <td>
                                            <div className={"group"}>
                                            <button className={"button"} onClick={() => {
                                                this.goto_other_profile(friend_id);
                                            }}>
                                                Goto profile
                                            </button>


                                        {   friend_id in this.state.profile_obj.friend_list &&
                                            this.state.profile_obj.friend_list[friend_id] && ( // render block button here

                                                    <button className={"button"} onClick={() => {
                                                        this.block_a_friend(friend_id);
                                                    }}>
                                                        Block friend
                                                    </button>

                                            )
                                        }

                                        {   friend_id in this.state.profile_obj.friend_list &&
                                            !this.state.profile_obj.friend_list[friend_id] && ( // render block button here

                                                        <button className={"button"} onClick={() => {
                                                            this.unblock_a_friend(friend_id);
                                                        }}>
                                                            Unblock friend
                                                        </button>

                                            )
                                        }
                                            </div>
                                            </td>
                                        <td>
                                                <td>

                                        {friend_id in this.state.profile_obj.friend_list ? (

                                                    <button className={"button_red"} onClick={() => {
                                                        this.delete_a_friend(friend_id);
                                                    }}>
                                                        Delete friend
                                                    </button>

                                            ) : ( // Note that the undelete button is a trick, since unblock does the same


                                                    <button className={"button_red"} onClick={() => {
                                                        this.undelete_a_friend(friend_id);
                                                    }}>
                                                        Undelete friend
                                                    </button>

                                            )
                                        }

                                                </td>
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