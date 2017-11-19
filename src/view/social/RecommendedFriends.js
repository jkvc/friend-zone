import React, {Component} from 'react';
import firebase from 'firebase';
import {create_friend_request, lookup_profile_by_user_id} from "../../dao/ProfileManager";
import {lookup_enrollment_by_id} from "../../dao/EnrollmentManager";
import {most_popular_in_list} from "../../api/MostPopularInList";
import {get_self_profile} from "../../api/StaticData";

const recommendation_count = 100;

class RecommendedFriends extends Component {

    constructor(props) {
        super(props);
        this.state = {
            recommendation_ids: [],
            recommendation_profiles: [],
            courses_enrolled: Object.keys(get_self_profile().enrolled_courses),
            all_classmates: [],
            self_profile: get_self_profile()
    }
    }

    /* happens before render */
    componentWillMount() {

        var course_list = this.state.courses_enrolled;

        /*an array of array containing enrolled ids of each course*/
        var aggregated_ids = [];

        /*iterate thru all enrolled courses and get all their enrolled students*/
        course_list.forEach((course_id) => {
            lookup_enrollment_by_id(course_id, (err, enrollment_obj) => {
                var enrolled = Object.keys(enrollment_obj.enrolled_users);

                /*remove self from the enrolled students*/
                var self_index = enrolled.indexOf(firebase.auth().currentUser.uid);
                enrolled.splice(self_index, 1);
                aggregated_ids.push(enrolled);

                /*set it to the state*/
                this.setState({all_classmates: aggregated_ids});

                /*query most_popular_in_list once after finish loading*/
                if (aggregated_ids.length === course_list.length) {
                    var query = {
                        count: recommendation_count,
                        list: this.state.all_classmates
                    };

                    most_popular_in_list(query, (err, data) => {
                        if (err) return alert(err);

                        /*after query we have ids, set it to state.recommended_ids*/
                        this.setState({recommendation_ids: data});

                        /*from list of ids, get ist of profiles, skip those who are already friends*/
                        var aggregated_profiles = [];
                        for (var j = 0; j < data.length; j += 1) {
                            var friend_id = data[j];

                            /*skip already friends*/
                            if (this.state.self_profile.friend_list[friend_id] === true) continue;

                            lookup_profile_by_user_id(friend_id, (err, data) => {
                                aggregated_profiles.push(data);
                                this.setState({recommendation_profiles: aggregated_profiles})
                            })
                        }

                    })
                    /*end of callback from most popular in list*/
                }

            })
            /*end of callback from lookup enrollment by id */

        })
        /*end of for each course_id in this user's profile*/


    }

    render() {
        return (

            <div>

                {
                    this.state.recommendation_profiles.map((profile) => {
                        return (
                            <div key={"recommended-friend-" + profile.user_id}>
                                <br/>
                                Friend name: {profile.first_name} {profile.last_name}

                                <button onClick={() => {
                                    create_friend_request(firebase.auth().currentUser.uid, profile.user_id);
                                }}>
                                    Send friend request
                                </button>

                            </div>
                        )
                    })
                }

                <pre>{JSON.stringify(this.state, null, 2)}</pre>

            </div>

        )
    }


}

export default RecommendedFriends;