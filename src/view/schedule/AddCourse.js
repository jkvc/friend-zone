import {lookup_course} from '../../dao/CourseManager';
import {add_course_to_profile} from "../../dao/ProfileManager";
import {add_user_to_enrollment} from "../../dao/EnrollmentManager";
import React, {Component} from 'react';
import firebase from 'firebase';


class AddCourse extends Component{

    constructor(props){
        super(props);
        this.title = "AddCourse.js";
        this.state = {
            result: [],
            search_key: "",
            course_id_to_add: ""
        };
    }

    lookup(course_code){
        lookup_course(course_code, this.callback_lookup_result.bind(this));
    }

    callback_lookup_result(err, data){
        this.setState({result:data});
    }

    handle_add_course(){
        add_course_to_profile(firebase.auth().currentUser.uid, this.state.course_id_to_add);
        add_user_to_enrollment(firebase.auth().currentUser.uid, this.state.course_id_to_add)
    }

    render(){
        return(
            <div>

                <br/>

                <form >
                    <label>lookup_course</label>
                    <input type={"text"} value={this.state.search_key}
                           onChange={function(e){
                               this.setState({search_key:e.target.value});
                               this.lookup(e.target.value);
                           }.bind(this)}/>
                </form>

                {this.state.result.map(function(entry){
                    return (
                        <div key={"course-search-result"+entry.course_id}>
                            <br/>
                            <h2>{entry.course_code} [{entry.section}]: {entry.course_name}</h2>
                            <h5>{entry.instructor} | {entry.days} {entry.time} | {entry.location}</h5>

                            <button onClick={()=> {

                                this.setState({course_id_to_add: entry.course_id}, ()=>{
                                    this.handle_add_course();
                                })

                            }} >Add this course</button>

                        </div>
                    )
                }.bind(this))}

                <br/>
                Raw JSON:
                <pre>{JSON.stringify(this.state.result,null,2)}</pre>

            </div>
        )
    }

}

export default  AddCourse;