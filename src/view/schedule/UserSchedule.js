import React, {Component} from 'react';
import AddCourse from './AddCourse'
import DropCourse from './DropCourse';
import AddEvent from './AddEvent';
import RemoveEvent from './RemoveEvent'
import ReactDOM from 'react-dom';
import CalendarHelper from '../../api/CalendarHelper';
import RecommendedFriends from "../social/RecommendedFriends";
import {lookup_course_by_id} from "../../dao/CourseManager";
import {get_time_numeric} from "../../api/TimeHelper";
import {get_self_profile} from "../../api/StaticData";
import PageTitle from "../components/PageTitle";
import './UserSchedule.css'


class UserSchedule extends Component {

    constructor(props) {
        super(props);
        this.title = "UserSchedule.js";
        this.state = {
            events: [],
            other_events: [],
            finished_adding_lectures: false,
            finished_adding_events: false
        };

    }

    goto_AddCourse() {
        ReactDOM.render(<AddCourse/>, document.getElementById('main-layout'));
    }

    goto_RecommendedFriends() {
        ReactDOM.render(<RecommendedFriends/>, document.getElementById('main-layout'));
    }

    goto_DropCourse() {
        ReactDOM.render(<DropCourse/>, document.getElementById('main-layout'));
    }

    goto_AddEvent() {
        ReactDOM.render(<AddEvent/>, document.getElementById('main-layout'));
    }
    goto_RemoveEvent(){
        ReactDOM.render(<RemoveEvent />, document.getElementById('main-layout'));
    }

    update_event(event_id, curr_event)
    {
        // A backward compatibility check, making sure start_time and end_time are in event
        if (! ("start_time" in curr_event) || !("end_time" in curr_event) )
        {
            return null;
        }

        let parsed_event = { "title":"", "start":null, "end":null };

        if (curr_event.location !== "")
            parsed_event["title"] = curr_event.event_name + " at " + curr_event.location;
        else
            parsed_event["title"] = curr_event.event_name;

        parsed_event["start"] = new Date( curr_event.day + "T" + curr_event.start_time );
        parsed_event["end"] = new Date( curr_event.day + "T" + curr_event.end_time );
        parsed_event["type"] = "other";
        parsed_event["event_id"] = event_id;
        parsed_event["event_obj"] = curr_event;

        return parsed_event;
    }

    componentWillMount()
    {
        this.initialize_events();
    }

    // This function will initialize all the events (classes) of the user
    initialize_events() {

        let profile_obj = get_self_profile();

        let enrolled_obj = {};
        if ("enrolled_courses" in profile_obj) {
            enrolled_obj = profile_obj.enrolled_courses;
        }

        let course_list = Object.keys(enrolled_obj);
        let events = [];

        // This is used to parsed all the other user added events
        let raw_other_events = profile_obj.upcoming_events;
        let events_list = Object.keys(raw_other_events);
        let other_events = [];

        // Use an async function to correctly render the objects
        events_list.forEach( (event_id) => {
        {
            let curr_event = raw_other_events[event_id];

            let parsed_event = this.update_event(event_id, curr_event);
            other_events.push(parsed_event);
            this.setState({other_events:other_events});
            // ReactDOM.render(<CalendarHelper events={this.state.events}
            //                                 other_events={this.state.other_events}
            //                                 key={"calendar-" + (this.state.events.length + this.state.other_events.length) }/>,
            //     document.getElementById('calendar-helper-container')
            // );

        } } );
        this.setState({finished_adding_events:true});

        let i = 0;
        let size = course_list.length;
        if (size === i) this.setState({finished_adding_lectures:true});

        // This is used to parse all the other events
        course_list.forEach((course_id) => {

            lookup_course_by_id(course_id, (err, course_obj) => {

                // prelim check of error
                if (err || course_obj === null) {
                    console.log(err);
                    return;
                }

                // is_error is used to see if the get_time_numeric function has returned an error
                let is_error = false;
                let event = null;
                if (course_obj.time !== null && course_obj.days !== null && course_obj.title !== null) {
                    event = {
                        "title": course_obj.course_id,
                        "days": course_obj.days,
                        "hours":
                            [get_time_numeric(course_obj.time.split(' - ')[0], function (err) {
                                if (err) {
                                    console.log(err);
                                    is_error = true;
                                }
                            }), get_time_numeric(course_obj.time.split(' - ')[1], function (err) {
                                if (err) {
                                    console.log(err);
                                    is_error = true;
                                }

                            })],
                        "event_obj":course_obj
                    };
                }

                // If invalid course_obj is detected
                else {
                    event = {
                        "title": "undefined states in Course Obj is detected",
                        "days": "MTWThF",
                        "hours": ["0600", "2200"],
                        "event_obj": null
                    };
                }

                // If get_time_numeric returns an error, return some random time
                if (is_error) {
                    event.hours = ["0600", "2200"];
                }

                // push the event into the events list
                events.push(event);

                // set the state of UserSchedule
                this.setState({events: events});
                // ReactDOM.render(<CalendarHelper events={this.state.events}
                //                                 other_events={this.state.other_events}
                //                                 key={"calendar-" + (this.state.events.length + this.state.other_events.length) }/>,
                //     document.getElementById('calendar-helper-container')
                // )
                i++;
                if (i===size)
                {
                    this.setState({finished_adding_lectures:true})
                }
            });
        });

    }

    // In case the user did not have any classes
    componentDidMount()
    {
        // ReactDOM.render(<CalendarHelper events={this.state.events}
        //                                 other_events={this.state.other_events}
        //                                 key={"calendar-" + (this.state.events.length + this.state.other_events.length) }/>,
        //     document.getElementById('calendar-helper-container') );
    }

    render() {

        return (

            <div align={'center'}>

                <PageTitle title="My Schedule"/>

                <div className='schedule-button-container'>
                    <button className="buttonHover" onClick={this.goto_AddCourse.bind(this)}>Add course</button>
                    <button className="buttonHover"onClick={this.goto_DropCourse.bind(this)}>Drop course</button>
                    <button className="buttonHover" onClick={this.goto_AddEvent.bind(this)}>Add Event</button>
                    <button className="buttonHover" onClick={this.goto_RemoveEvent.bind(this)}>Remove Event</button>
                    <button className="buttonHover" onClick={this.goto_RecommendedFriends.bind(this)}>Recommended Friends</button>
                </div>
                <br/>

                <div id='calendar-helper-container'>
                    {this.state.finished_adding_lectures && this.state.finished_adding_events ? (
                        <CalendarHelper events={this.state.events}
                                        other_events={this.state.other_events}
                                        key={"calendar-" + (this.state.events.length + this.state.other_events.length)}/>
                    ) : (
                        <div className="sk-cube-grid">
                            <div className="sk-cube sk-cube1"></div>
                            <div className="sk-cube sk-cube2"></div>
                            <div className="sk-cube sk-cube3"></div>
                            <div className="sk-cube sk-cube4"></div>
                            <div className="sk-cube sk-cube5"></div>
                            <div className="sk-cube sk-cube6"></div>
                            <div className="sk-cube sk-cube7"></div>
                            <div className="sk-cube sk-cube8"></div>
                            <div className="sk-cube sk-cube9"></div>
                        </div>
                    )
                    }
                </div>

                <br/>
                <br/>
            </div>


        )
    }
}

export default UserSchedule;