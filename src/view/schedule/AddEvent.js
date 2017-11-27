import {add_event_to_profile} from "../../dao/ProfileManager";
import React, {Component} from 'react';
import firebase from 'firebase';


class AddEvent extends Component{

    constructor(props){
        super(props);
        this.title = "AddEvent.js";
        this.state = {
            //result: [],
            event_name: "",
            day: "",
            start_time: "00:00",
            end_time: "23:59",
            location: ""
        };

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
            this.setState( {event_name : "", day : "", start_time : "00:00", end_time : "23:59", location : ""} );
        }

    }
    render(){
        return(
            <div>

                <br/>

                <label>Event_Name:</label>
                <input type={"text"} value={this.state.event_name}
                       onChange={function(e){
                           this.setState({event_name:e.target.value});
                       }.bind(this)}/>

                <br />

                <label>Day:</label>
                <input type={"date"} value={this.state.day}
                       onChange={function(e){
                           this.setState({day:e.target.value})
                       }.bind(this)}/>

                <br />

                <label>Start Time:</label>
                <input type={"time"} value={this.state.start_time}
                       onChange={function(e){
                           this.setState({start_time:e.target.value})
                       }.bind(this)}/>

                <br />

                <label>End Time:</label>
                <input type={"time"} value={this.state.end_time}
                       onChange={function(e){
                           this.setState({end_time:e.target.value})
                       }.bind(this)}/>

                <br />

                <label>Location</label>
                <input type={"text"} value={this.state.location}
                       onChange={function(e){
                           this.setState({location:e.target.value})
                       }.bind(this)}/>

                <br />

                <button onClick={()=>{
                    this.handle_add_event();
                }} > Add Event</button>

                <br />
                Raw JSON:
                <pre>{JSON.stringify(this.state,null,2)}</pre>

            </div>
        )
    }

}

export default  AddEvent;