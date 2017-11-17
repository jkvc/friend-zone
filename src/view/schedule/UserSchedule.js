import React, {Component} from 'react';
import AddCourse from './AddCourse'
import ReactDOM from 'react-dom';
import CalendarHelper from '../../api/CalendarHelper';
import RecommendedFriends from "../social/RecommendedFriends";
import {lookup_profile_by_user_id} from "../../dao/ProfileManager";
import {lookup_course_by_code} from "../../dao/CourseManager";
import firebase from 'firebase';
import {get_time_numeric} from "../../api/TimeHelper";

class UserSchedule extends Component{

    constructor(props){
        super(props);
        this.title = "UserSchedule.js";
        this.events = [];
    }

    goto_AddCourse(){
        ReactDOM.render(<AddCourse />, document.getElementById('main-layout'));
    }

    goto_RecommendedFriends(){
        ReactDOM.render(<RecommendedFriends />, document.getElementById('main-layout'));
    }

    initialize_events()
    {
        lookup_profile_by_user_id(firebase.auth().currentUser.uid, (err, profile_obj)=> {
            let enrolled_obj = profile_obj.enrolled_courses;
            let course_list = Object.keys(enrolled_obj);

            course_list.forEach((course_id)=>{

                // It is currently returning all the courses with the same course code (CSE30)
                // Should replace this with course_id (CSE30_B00)
                lookup_course_by_code(course_id.split('_')[0], (err, course_obj) =>{
                    for (let j in course_obj)
                    {
                        if (course_obj[j].course_id === course_id) {
                            let event = {
                                "title":course_obj[j].course_id,
                                "days":course_obj[j].days,
                                "hours": [ get_time_numeric(course_obj[j].time.split(' - ')[0])
                                    , get_time_numeric(course_obj[j].time.split(' - ')[1]) ]
                            };
                            this.events.push(event);
                            console.log(event.title);
                        }
                    }
                });
            });
        });

        // Replace this with a DB get and parse the data into this format
        // let events = [
        //     {"days":"MWF", "hours":["1130", "1230"], "title":"A" },
        //     {"days":"TTh", "hours":["1020", "1120"], "title":"B"},
        //     {"days":"MWT", "hours":["0010", "1100"], "title":"C"},
        //     {"days":"MT", "hours":["1030","1800"], "title":"D"}
        // ];
        // this.events = events;
    }

    render(){

        this.initialize_events();

        return(

            <div align={'center'}>

                <img src={"https://res.cloudinary.com/teepublic/image/private/s--8-dGDDZg--/t_Preview/b_rgb:ffffff,c_limit,f_jpg,h_630,q_90,w_630/v1470902298/production/designs/627022_1.jpg"}
                     alt={""} width={"300"}/>
                <h1>{this.title}</h1>

                <button onClick={this.goto_AddCourse.bind(this)}>Add course</button>
                <button onClick={this.goto_RecommendedFriends.bind(this)}>Recommended Friends</button>

                <br/>

                <CalendarHelper events={this.events}/>

                <h4>いつでもダラダラしたいなぁ...</h4>
                <h4> うまるちゃん！遊びやめてください、手伝いましょう </h4>


            </div>

        )
    }
}

export default UserSchedule;