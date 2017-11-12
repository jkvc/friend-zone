import {lookup_course_by_code} from '../dao/CourseManager';
import React, {Component} from 'react';

class TestCourseManager extends Component{

    constructor(props){
        super(props);
        this.title = "TestCourseManager.js";
        this.state = {
            result: [],
            course_code: ""
        };
    }

    lookup(course_code){
        lookup_course_by_code(course_code, this.callback_lookup_result.bind(this));
    }

    callback_lookup_result(err, data){
        this.setState({result:data});
    }

    render(){
        return(
            <div>

                <br/>

                <form >
                    <label>course_code </label>
                    <input type={"text"} value={this.state.course_code}
                           onChange={function(e){
                               this.setState({course_code:e.target.value});
                               this.lookup(e.target.value);
                           }.bind(this)}/>
                </form>

                <pre>{JSON.stringify(this.state.result,null,2)}</pre>

            </div>
        )
    }
}

export default TestCourseManager;