import React, {Component} from 'react';
import firebase from 'firebase';
import {lookup_profile_by_user_id} from "../../dao/ProfileManager";
import {lookup_enrollment_by_id} from "../../dao/EnrollmentManager";
import {most_popular_in_list} from "../../api/MostPopularInList";


class RecommendedFriends extends Component{

    constructor(props){
        super(props);
        this.state = {
            recommendation_ids: [],
            recommendation_profiles: [],
            courses_enrolled: [],
            all_classmates: [],
        }
    }

    /*happens before render*/
    componentWillMount(){
        lookup_profile_by_user_id(firebase.auth().currentUser.uid, (err, profile_obj)=>{
            var enrolled_obj = profile_obj.enrolled_courses;
            var course_list = Object.keys(enrolled_obj);
            this.setState({courses_enrolled : course_list});

            /*now we have a list of courses, get all the enrolled people in theses courses*/
            var aggregated_ids = [];

            course_list.forEach((course_id)=>{
                lookup_enrollment_by_id(course_id, (err, enrollment_obj) =>{
                    var enrolled = Object.keys(enrollment_obj.enrolled_users);

                    var self_index = enrolled.indexOf(firebase.auth().currentUser.uid);
                    enrolled.splice(self_index,1);
                    aggregated_ids.push(enrolled);

                    this.setState({all_classmates: aggregated_ids});


                    /*query most_popular_in_list once after finish loading*/
                    if (aggregated_ids.length === course_list.length){
                        var query = {
                            count: 5,
                            list: this.state.all_classmates
                        };

                        most_popular_in_list(query, (err,data)=>{
                            if (err) return alert(err);

                            /*after query we have ids, set it to state.recommended_ids*/
                            this.setState({recommendation_ids:data});

                            /*after getting query result, put result's profile objects in this.state.recommendation_profiles*/
                            var aggregated_profiles = [];
                            for (var j=0; j<data.length; j+=1) {
                                lookup_profile_by_user_id(data[j], (err,data)=>{

                                    aggregated_profiles.push(data);
                                    this.setState({recommendation_profiles: aggregated_profiles})

                                })
                            }

                        }) /*end of callback from most popular in list*/
                    }

                }) /*end of callback from lookup enrollment by id */

            }) /*end of for each course_id in this user's profile*/

        }) /*end of callback from looking up this user's profile*/
    }

    render(){
        return(

            <div>

                {
                    this.state.recommendation_profiles.map((profile)=>{
                        return(
                            <div key={"recommended-friend-"+profile.user_id}>
                                <br/>
                                Friend name: {profile.first_name} {profile.last_name}
                                <button>Send friend request</button>
                            </div>
                        )
                    })
                }

                <pre>{JSON.stringify(this.state,null,2)}</pre>

            </div>

        )
    }


}

export default RecommendedFriends;