import {lookup_course} from '../../dao/CourseManager';
import {add_course_to_profile} from "../../dao/ProfileManager";
import {add_user_to_enrollment} from "../../dao/EnrollmentManager";
import React, {Component} from 'react';
import firebase from 'firebase';
import PageTitle from "../components/PageTitle";
import './AddCourse.css'
import type_instru_img from '../../image/TypeInstructionImg.gif'
import {get_self_profile} from "../../api/StaticData";


class AddCourse extends Component {

    constructor(props) {
        super(props);
        this.title = "AddCourse.js";
        this.state = {
            result: [],
            search_key: "",
            course_id_to_add: "",
            enrolled: get_self_profile().enrolled_courses
        };
    }

    lookup(search_key) {
        if (search_key.length > 2) lookup_course(search_key, this.callback_lookup_result.bind(this));
        else this.setState({result: []})

    }

    callback_lookup_result(err, data) {
        this.setState({result: data});
    }

    handle_add_course() {
        add_course_to_profile(firebase.auth().currentUser.uid, this.state.course_id_to_add);
        add_user_to_enrollment(firebase.auth().currentUser.uid, this.state.course_id_to_add);

        let enrolled = this.state.enrolled;
        enrolled[this.state.course_id_to_add] = true;
        this.setState({enrolled:enrolled})
    }

    render() {
        var search_result = (
            <div className='instruction-message'>
                <br/>
                <br/>
                <br/>
                <img src={type_instru_img} alt=""/>
                <br/>
                Type in course code or professor's last name to begin search (e.g. "CSE11" or "Gillespie")
            </div>
        );

        if (this.state.result.length !== 0)


            search_result = (
                <table className='course-search-result'>
                    <tbody>
                    {this.state.result.map((entry, index) => {

                        let enroll_button = (
                            <div>
                                <button className='add-button'
                                        onClick={() => {
                                            this.setState({course_id_to_add: entry.course_id}, () => {
                                                this.handle_add_course();
                                            });
                                        }}>Add this course
                                </button>
                            </div>
                        );
                        if (this.state.enrolled[entry.course_id] === true)
                            enroll_button = (<div className='already-enrolled-label'>Already enrolled</div>);

                        return (
                            <tr key={"course-search-result" + index}>
                                <td>
                                    <div className='course-title'>
                                        {entry.course_code} [{entry.section}]: {entry.course_name}
                                    </div>
                                    <div className='course-subtitle'>
                                        {entry.instructor} | {entry.days} {entry.time} | {entry.location}
                                    </div>
                                </td>

                                <td>
                                    {enroll_button}
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            )


        return (
            <div align='center' className='add-course-body'>

                <PageTitle title="Add Course"/>

                <div>
                    <input type={"text"} value={this.state.search_key}
                           className='search-course-input'
                           placeholder={'Search Course Here'}
                           onChange={function (e) {
                               this.setState({search_key: e.target.value});
                               this.lookup(e.target.value);
                           }.bind(this)}/>
                </div>
                <br/>

                {search_result}

                <br/>
                {/*Raw JSON:*/}
                {/*<pre>{JSON.stringify(this.state.result, null, 2)}</pre>*/}

            </div>
        )
    }

}

export default AddCourse;