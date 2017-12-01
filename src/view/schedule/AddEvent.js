import {add_event_to_profile} from "../../dao/ProfileManager";
import React, {Component} from 'react';
import firebase from 'firebase';
import PageTitle from "../components/PageTitle";
import './AddEvent.css'

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

    handle_keyPress(event)
    {
        if (event.key === 'Enter')
        {
            this.handle_add_event();
        }
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
            <div align="center">

                <PageTitle title="Add Event"/>

                <br/>
                <form onKeyPress={this.handle_keyPress.bind(this)}>
                    <label>Event Name:</label>
                    <input className="addEventinputfield" type="text" value={this.state.event_name}
                           onChange={function(e){
                               this.setState({event_name:e.target.value});
                           }.bind(this)}/>

                    <br />

                    <label>Day:</label>
                    <input className="addEventinputfield" type="date" value={this.state.day}
                           onChange={function(e){
                               this.setState({day:e.target.value})
                           }.bind(this)}/>

                    <br />

                    <label>Start Time:</label>
                    <input className="addEventinputfield" type="time" value={this.state.start_time}
                           onChange={function(e){
                               this.setState({start_time:e.target.value})
                           }.bind(this)}/>

                    <br />

                    <label>End Time:</label>
                    <input className="addEventinputfield" type="time" value={this.state.end_time}
                           onChange={function(e){
                               this.setState({end_time:e.target.value})
                           }.bind(this)}/>

                    <br />

                    <label>Location</label>
                    <input className="addEventinputfield" value={this.state.location}
                           onChange={function(e){
                               this.setState({location:e.target.value})
                           }.bind(this)}/>

                    <br />
                </form>
                <button className="eventButton" onClick={()=>{
                    this.handle_add_event();
                }} > Add Event</button>
                <div className="flowercontainer">
                    <div className="droplet" id="no1"></div>
                    <div className="droplet" id="no2"></div>
                    <div className="droplet" id="no3"></div>
                    <div className="droplet" id="no4"></div>
                    <div className="droplet" id="no5"></div>
                    <div className="droplet" id="no6"></div>
                    <div className="droplet" id="no7"></div>
                    <div className="droplet" id="no8"></div>
                    <div className="droplet" id="no9"></div>
                    <div className="droplet" id="no10"></div>

                </div>


            </div>

        )
    }

}

export default  AddEvent;