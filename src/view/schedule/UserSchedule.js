import React, {Component} from 'react';
import AddCourse from './AddCourse'
import DropCourse from './DropCourse';
import ReactDOM from 'react-dom';
import CalendarHelper from '../../api/CalendarHelper';
import RecommendedFriends from "../social/RecommendedFriends";
import {lookup_profile_by_user_id} from "../../dao/ProfileManager";
import {lookup_course_by_id} from "../../dao/CourseManager";
import firebase from 'firebase';
import {get_time_numeric} from "../../api/TimeHelper";

class UserSchedule extends Component {

    constructor(props) {
        super(props);
        this.title = "UserSchedule.js";
        this.state = {
            events : [],
            numOfEvents : -1
        };

        this.initialize_events();
    }

    goto_AddCourse() {
        ReactDOM.render(<AddCourse/>, document.getElementById('main-layout'));
    }

    goto_RecommendedFriends() {
        ReactDOM.render(<RecommendedFriends/>, document.getElementById('main-layout'));
    }
    goto_DropCourse(){
        ReactDOM.render(<DropCourse />, document.getElementById('main-layout'));
    }


    // This function will initialize all the events (classes) of the user
    initialize_events() {

        lookup_profile_by_user_id(firebase.auth().currentUser.uid, (err, profile_obj) => {
            let enrolled_obj = profile_obj.enrolled_courses;
            let course_list = Object.keys(enrolled_obj);
            this.setState({numOfEvents : course_list.length});
            let events = [];

            course_list.forEach((course_id) => {

                lookup_course_by_id(course_id, (err, course_obj) => {

                    let event = {
                        "title": course_obj.course_id,
                        "days": course_obj.days,
                        "hours": [get_time_numeric(course_obj.time.split(' - ')[0])
                            , get_time_numeric(course_obj.time.split(' - ')[1])]
                    };
                    events.push(event);
                    this.setState({events : events});
                });
            });
        });
    }


    render() {

        // Wait till all the events are loaded
        if (this.state.numOfEvents !== this.state.events.length)
        {
            // Try to make the Loading more stylistic?
            return <div> Loading... </div>
        }

        return (

            <div align={'center'}>

                <img
                    src={"https://res.cloudinary.com/teepublic/image/private/s--8-dGDDZg--/t_Preview/b_rgb:ffffff,c_limit,f_jpg,h_630,q_90,w_630/v1470902298/production/designs/627022_1.jpg"}
                    alt={""} width={"300"}/>
                <h1>{this.title}</h1>

                <button onClick={this.goto_AddCourse.bind(this)}>Add course</button>
                <button onClick={this.goto_DropCourse.bind(this)}>Drop course</button>
                <button onClick={this.goto_RecommendedFriends.bind(this)}>Recommended Friends</button>

                <br/>

                <CalendarHelper events={this.state.events}/>

                <h4>いつでもダラダラしたいなぁ...</h4>
                <h4> うまるちゃん！遊びやめてください、手伝いましょう </h4>


            </div>

        )
    }
}

export default UserSchedule;