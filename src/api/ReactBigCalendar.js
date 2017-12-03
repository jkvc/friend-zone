/*
 * @author: Yiming Cai, Tianhui
 */

import firebase from 'firebase';
import {add_event_to_profile, edit_existing_event, remove_course_from_profile, remove_event_from_profile} from "../dao/ProfileManager";
import React, {Component} from 'react';
import BigCalendar from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment';
import './ReactBigCalendar.css';
import Dialog from 'react-dialog';
import '../dao/ProfileManager.js';
import '../view/schedule/AddEvent.js';
import '../view/schedule/AddEvent.css';
import '../dao/ProfileManager.js'
import ReactDOM from 'react-dom';
import ViewClassmates from '../view/social/ViewClassmates';
import UserSchedule from "../view/schedule/UserSchedule";
import {init_data} from './StaticData'
// import Popup from 'react-popup';

var this_id = 0;

BigCalendar.setLocalizer(
    BigCalendar.momentLocalizer(moment)
);

let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);

// To use this: make sure you have installed react-big-calendar and moment in the work directory
// You can do this by running:
//      npm install react-big-calendar --save
//      npm install moment --save
// at the root directory of the project (inside friend-zone)
//
// In order to react the calendar, simply use a ReactDOM.render( <BasicCalendar />, document.getElementById(... ) );
// The styles of the calendar are found in "friend-zone/node-module/react-big-calendar/lib/css/react-big-calendar.css"
// For more information, go to http://intljusticemission.github.io/react-big-calendar/examples/index.html
//      and scroll down to find the official documentations
// For source code example, go to https://github.com/intljusticemission/react-big-calendar
//
// If you want to be able to do something with the Calendar when the user clicks on an event, modify the
//      prop "onSelectEvent={ some_function }, where you pass in a function that tells the program what to do.
//      For more, read the official documentation on the link provided above.
class Selectable extends Component{

    constructor(props)
    {
        super(props);
        this.state = {
            events : props.events,
            isNewEventDialogOpen: false,
            isEditEventDialogOpen: false,
            isViewLecture: false,

            // for new event dialog box only
            event_id: "",
            event_name: "",
            day: "",
            start_time: "00:00",
            end_time: "23:59",
            location: "",
            event: null,

            // for the lecture
            course_code: "",
            course_id: "",
            course_name: "",
            days: "",
            instructor: "",
            lecture_location: "",
            time: ""
        };
        this_id++;
    }

    handle_add_event(){

        // Check for validity of the event entered
        if (this.state.event_name === "")
        {
            alert("Event Name is not entered!");
        }
        else if (this.state.day === "" )
        {
            alert("Event Day is not entered!");
        }
        else if (this.state.start_time === "")
        {
            alert("Start Time is not specified!");
        }
        else if (this.state.end_time === "")
        {
            alert("End Time is not specified!");
        }
        else if ( this.state.start_time > this.state.end_time )
        {
            alert("Start time must be greater than end time!");
        }
        else {
            add_event_to_profile(firebase.auth().currentUser.uid, this.state.event_name, this.state.day, this.state.start_time, this.state.end_time, this.state.location);
            alert("The event \""+ this.state.event_name + "\" was successfully added to your schedule!");
            this.setState( {event_name : this.state.event_name, day : this.state.day, start_time : this.state.start_time, end_time : this.state.end_time, location : this.state.location} );
        }
    }

    refresh()
    {
        init_data(profile => {
            ReactDOM.render(<UserSchedule key={this_id}/>,document.getElementById('main-layout'));
        });
    }

    handle_select_slot(slotInfo)
    {
        if (this.state.isEditEventDialogOpen || this.state.isViewLecture || this.state.isNewEventDialogOpen) return;


        let start_hour = slotInfo.start.getHours().toString();
        if (start_hour.length < 2) start_hour = '0' + start_hour;
        let start_minute = slotInfo.start.getMinutes().toString();
        if (start_minute.length < 2) start_minute = '0' + start_minute;

        let end_hour = slotInfo.end.getHours().toString();
        if (end_hour.length < 2) end_hour = '0' + end_hour;
        let end_minute = slotInfo.end.getMinutes().toString();
        if (end_minute.length < 2) end_minute = '0' + end_minute;

        let month = (slotInfo.start.getMonth()+1).toString();
        if (month.length < 2) month = '0' + month;
        let day = slotInfo.start.getDate().toString();
        if (day.length < 2) day = '0' + day;

        this.setState({
            isNewEventDialogOpen: true,
            start_time: start_hour + ":" + start_minute,
            end_time: end_hour + ":" + end_minute,
            day: slotInfo.start.getFullYear().toString() + "-" + month + "-" + day
        });

    }

    //openDialog = () => this.setState({ isEditEventDialogOpen: true })
    handleClose() {
        this.setState({ isNewEventDialogOpen: false });
    }

    handle_btn_add_event(event)
    {
        // do something with the fields entered by the user, and when the button is pressed, create a new event
        //let event = {event_name : "", day : "", start_time : "00:00", end_time : "23:59", location : "" };

        // set the event to something...
        // ..............................


        // Check for validity of the event entered
        if (this.state.event_name === "")
        {
            alert("Event Name is not entered!");
        }
        else if (this.state.day === "" )
        {
            alert("Event Day is not entered!");
        }
        else if (this.state.start_time === "")
        {
            alert("Start Time is not specified!");
        }
        else if (this.state.end_time === "")
        {
            alert("End Time is not specified!");
        }
        else if ( this.state.start_time > this.state.end_time )
        {
            alert("Start time must be greater than end time!");
        }
        else {
            add_event_to_profile(firebase.auth().currentUser.uid,
                this.state.event_name,
                this.state.day,
                this.state.start_time,
                this.state.end_time,
                this.state.location,
                (err,data) =>
                {
                    alert("Successfully Added Event!");
                    this.refresh();
                }
            );


            // alert("The event \""+ this.state.event_name + "\" was successfully added to your schedule!");
            //
            // // Reset the fields of the dialogue box
            // let temp = this.state.events;
            // temp.push({
            //     day: this.state.day,
            //     end_time: this.state.end_time,
            //     event_name: this.state.event_name,
            //     location:this.state.location,
            //     start_time: this.state.start_time
            // });
            //
            // this.setState({ events : temp, isNewEventDialogOpen: false });
        }

        // console.log(event);

    }

    // edit, only when user want to edit it will click on an existing event
    handle_onSelectEvent(event)
    {
        if (this.state.isEditEventDialogOpen || this.state.isViewLecture || this.state.isNewEventDialogOpen) return;

        // handle if event type is other
        if (event.type === "other")
        {
            let event_obj = event.event_obj;

            // Call this.setState over here, to render the dialogue box
            this.setState({
                isEditEventDialogOpen: true,
                day: event_obj.day,
                start_time: event_obj.start_time,
                end_time: event_obj.end_time,
                event_name :event_obj.event_name,
                event_id:event.event_id,
                location:event_obj.location,
                event : event
            });

        }
        // hand if event type is lecture
        else if (event.type === 'lecture')
        {
            let lecture = event.event_obj;
            this.setState( {
                // for the lecture
                isViewLecture : true,
                course_code: lecture.course_code,
                course_id: lecture.course_id,
                course_name: lecture.course_name,
                days: lecture.days,
                instructor: lecture.instructor,
                lecture_location: lecture.location,
                time: lecture.time
            })
        }

        // Event object has these fields:
        // title
        // start
        // end
        // type (can be either "lecture" or "other")
        // event_id (if type === "other")
        // event_obj
        console.log(event);
    }

     handle_btn_edit_event()
     {
         edit_existing_event(
             firebase.auth().currentUser.uid,
             this.state.event_id,
             this.state.event_name,
             this.state.day,
             this.state.start_time,
             this.state.end_time,
             this.state.location,
             (err,data) =>
             {
                 alert("Successfully editted event!");
                 this.refresh();
             }
         );
         // this.setState({isEditEventDialogOpen:false});

     }

     handle_edit_event_close()
     {
         this.setState({isEditEventDialogOpen:false})
     }

    handle_btn_delete_event() {
        if( window.confirm("Are you sure you want to remove \""+this.state.event_name+"\" from your calendar?")) {
        remove_event_from_profile(firebase.auth().currentUser.uid, this.state.event_id, (err, data) => {
            this.refresh();
        });
        }
    }

    handle_keyPress(event)
    {
        if (event.key === 'Enter')
        {
            this.handle_btn_add_event(event);
        }
    }

    handle_btn_drop_course() {
        if(window.confirm("Are you sure you want to drop "+this.state.course_id + "?")){
            remove_course_from_profile(firebase.auth().currentUser.uid, this.state.course_id, (err, data) => {
                alert("Successfully Dropped course!");
                this.refresh();
            });
            this.setState({isViewLecture: false});
        }
    }

    handle_edit_view_classmates() {
        ReactDOM.render(<ViewClassmates course_id={this.state.course_id}/>, document.getElementById('main-layout'));
    }

    handle_edit_lecture_close() {
        this.setState({isViewLecture:false})
    }

    componentDidMount()
    {

    }

    render() {

        return (
            <div {...this.props}>
                <div className='instruction-calendar'>
                    Click an event to see more info, or
                    drag the mouse over the calendar to select a date/time range.
                </div>
                <br/>

                <div id={'react-big-calendar-container'}>
                    <BigCalendar
                        selectable = 'ignoreEvents'
                        events={this.state.events}
                        views={allViews}
                        step={30}
                        // By default this should return current date
                        defaultDate={new Date()}
                        defaultView={'week'}
                        onSelectEvent={ this.handle_onSelectEvent.bind(this) }
                        onSelectSlot={ this.handle_select_slot.bind(this) }
                    />
                </div>

                {this.state.isNewEventDialogOpen &&

                        <Dialog
                            open={true}
                           // style={{width: '200px', marginLeft: '40%', backgroundColor: 'white'}}
                            overlayStyle={{backgroundColor: 'white'}}
                            title=""
                            modal={true}
                            isDraggable={true}
                            buttons={
                                [{
                                    text: "Add this event",
                                    className:"diaButton",
                                    onClick: () => this.handle_btn_add_event()
                                },
                                {
                                    text:"Cancel",
                                    className:"diaButton",
                                    onClick: () => this.handleClose()
                                }]

                        }>

                        <h2> Input Event Details </h2>

                        <br/>
                        <form onKeyPress={this.handle_keyPress.bind(this)}>
                            <label className="alignLabel">Event Name:</label>
                            <input className="addEventInputField" type="text" value={this.state.event_name}
                                   onChange={function (e) {
                                       this.setState({event_name: e.target.value});
                                   }.bind(this)}/>

                            <br/>

                            <label className="alignLabel">Day:</label>
                            <input className="addEventInputField" type="date" value={this.state.day}
                                   onChange={function (e) {
                                       this.setState({day: e.target.value})
                                   }.bind(this)}/>

                            <br/>

                            <label className="alignLabel">Start Time:</label>
                            <input className="addEventInputField" type="time" value={this.state.start_time}
                                   onChange={function (e) {
                                       this.setState({start_time: e.target.value})
                                   }.bind(this)}/>

                            <br/>

                            <label className="alignLabel">End Time:</label>
                            <input className="addEventInputField" type="time" value={this.state.end_time}
                                   onChange={function (e) {
                                       this.setState({end_time: e.target.value})
                                   }.bind(this)}/>

                            <br/>

                            <label className="alignLabel">Location</label>
                            <input className="addEventInputField" value={this.state.location}
                                   onChange={function (e) {
                                       this.setState({location: e.target.value})
                                   }.bind(this)}/>
                            <br/>
                        </form>

                        </Dialog>
                }

                {this.state.isEditEventDialogOpen &&

                    <Dialog className=''
                            modal={true}
                            isDraggable={true}
                            buttons={
                                [
                                    {
                                        text: "Update",
                                        className:"diaButton",
                                        onClick: () => this.handle_btn_edit_event()
                                    },
                                    {
                                        text: "Delete",
                                        className:"diaButton",
                                        onClick: () => this.handle_btn_delete_event()
                                    },
                                    {
                                        text:"Cancel",
                                        className:"diaButton",
                                        onClick: () => this.handle_edit_event_close()
                                    }]
                            }>

                        <h2> Edit Event </h2>

                        <br/>
                        <form onKeyPress={this.handle_keyPress.bind(this)}>
                            <label className="alignLabel">Event Name:</label>
                            <input className="addEventInputField" type="text" value={this.state.event_name}
                                   onChange={function (e) {
                                       this.setState({event_name: e.target.value});
                                   }.bind(this)}/>

                            <br/>

                            <label className="alignLabel">Day:</label>
                            <input className="addEventInputField" type="date" value={this.state.day}
                                   onChange={function (e) {
                                       this.setState({day: e.target.value})
                                   }.bind(this)}/>

                            <br/>

                            <label className="alignLabel">Start Time:</label>
                            <input className="addEventInputField" type="time" value={this.state.start_time}
                                   onChange={function (e) {
                                       this.setState({start_time: e.target.value})
                                   }.bind(this)}/>

                            <br/>

                            <label className="alignLabel">End Time:</label>
                            <input className="addEventInputField" type="time" value={this.state.end_time}
                                   onChange={function (e) {
                                       this.setState({end_time: e.target.value})
                                   }.bind(this)}/>

                            <br/>

                            <label className="alignLabel">Location</label>
                            <input className="addEventInputField" value={this.state.location}
                                   onChange={function (e) {
                                       this.setState({location: e.target.value})
                                   }.bind(this)}/>
                            <br/>
                        </form>

                    </Dialog>

                }

                {this.state.isViewLecture &&

                    <Dialog className=''
                            title=""
                            modal={true}
                            isDraggable={true}
                            buttons={
                                [
                                    {
                                        text: "Drop this course",
                                        className:"diaButton",
                                        onClick: () => this.handle_btn_drop_course()
                                    },
                                    {
                                        text:"View classmates",
                                        className:"diaButton",
                                        onClick: () => this.handle_edit_view_classmates()
                                    },
                                    {
                                        text:"Cancel",
                                        className:"diaButton",
                                        onClick: () => this.handle_edit_lecture_close()
                                    }
                                ]
                            }>

                        <h2> See lecture details </h2>
                        <br/>
                        <table>
                            <tbody>
                                <tr>
                                    <td> Course Code: </td>
                                    <td> {this.state.course_code}</td>
                                </tr>

                                <tr>
                                    <td> Course ID: </td>
                                    <td> {this.state.course_id} </td>
                                </tr>

                                <tr>
                                    <td> Course Name: </td>
                                    <td> {this.state.course_name}</td>
                                </tr>

                                <tr>
                                    <td> Lecture Days: </td>
                                    <td> {this.state.days} </td>
                                </tr>

                                <tr>
                                    <td> Instructor: </td>
                                    <td> {this.state.instructor} </td>
                                </tr>

                                <tr>
                                    <td> Location: </td>
                                    <td> {this.state.lecture_location} </td>
                                </tr>

                                <tr>
                                    <td> Time: </td>
                                    <td> {this.state.time} </td>
                                </tr>

                            </tbody>
                        </table>
                        <br/>

                    </Dialog>

                }

                {/*<div>*/}
                    {/*{JSON.stringify(this.state)}*/}
                {/*</div>*/}
            </div>

        )
    }
}
export default Selectable;