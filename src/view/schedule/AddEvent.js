import {add_event_to_profile} from "../../dao/ProfileManager";
import React, {Component} from 'react';
import firebase from 'firebase';
import './AddEvent.css'
//import PageTitle from "../components/PageTitle";
import Dialog from 'react-dialog';

class AddEvent extends Component{

    constructor(props){
        super(props);
        this.title = "AddEvent.js";

        // used for closing the dialog box
        this.closefunc = props.closefunc;

        // used for updating a new event, and then closing dialog box
        this.updatefunc = props.updatefunc;

        this.state = {
            //result: [],
            event_name: "",
            day: "",
            start_time: "06:00",
            end_time: "22:00",
            location: "",
            err_msg: ""
        };

    }

    handle_keyPress(event)
    {
        if (event.key === 'Enter')
        {
            this.handle_add_event();
        }
        else
        {
            this.setState({err_msg: ""});
        }
    }

    handle_add_event(){

        let string = "";

        // Check for validity of the event entered
        if (this.state.event_name === "")
        {
            string = "Event Name is not entered!";
        }
        else if (this.state.day === "" )
        {
            string = "Event Day is not entered!";
        }
        else if (this.state.start_time === "")
        {
            string = "Start Time is not specified!";
        }
        else if (this.state.end_time === "")
        {
            string = "End Time is not specified!";
        }
        else if ( this.state.start_time > this.state.end_time )
        {
            string = "Start time must be greater than end time!";
        }
        else {
            add_event_to_profile(firebase.auth().currentUser.uid, this.state.event_name, this.state.day, this.state.start_time, this.state.end_time, this.state.location);
            string = "The event \""+ this.state.event_name + "\" was successfully added to your schedule!";
            this.setState( {event_name : "", day : "", start_time : "06:00", end_time : "22:00", location : ""} );
            this.updatefunc();
        }
        this.setState({err_msg: string});
    }


    render(){

        return (
            <Dialog
                open={true}
                // style={{width: '200px', marginLeft: '40%', backgroundColor: 'white'}}
                overlayStyle={{backgroundColor: 'white'}}
                title=""
                modal={true}
                isDraggable={true}
                buttons={
                    [
                        {
                            text: "Add this event",
                            className:"diaButton",
                            onClick: () => this.handle_add_event()
                        },
                        {
                            text:"Cancel",
                            className:"diaButton",
                            onClick: () => this.closefunc()
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

                <br/>
                <div className={"error-message"}> {this.state.err_msg} </div>

            </Dialog>
        )
    }

}

export default  AddEvent;