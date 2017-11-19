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
            time: "",
            location: ""
        };

    }

    handle_add_event(){
        add_event_to_profile(firebase.auth().currentUser.uid, this.state.event_name);
    }
    render(){
        return(
            <div>

                <br/>

                <form >
                    <label>Event_Name:</label>
                    <input type={"text"} value={this.state.event_name}
                           onChange={function(e){
                               this.setState({event_name:e.target.value});
                           }.bind(this)}/>
                </form>

                <form>
                    <label>Day:</label>
                    <input type={"text"} value={this.state.day}
                           onChange={function(e){
                               this.setState({day:e.target.value})
                           }.bind(this)}/>
                </form>

                <form>
                    <label>Time:</label>
                    <input type={"text"} value={this.state.time}
                           onChange={function(e){
                               this.setState({time:e.target.value})
                           }.bind(this)}/>
                </form>

                <form>
                <label>Location</label>
                <input type={"text"} value={this.state.location}
                       onChange={function(e){
                           this.setState({location:e.target.value})
                       }.bind(this)}/>
                </form>

                <button onClick={()=>{
                    this.handle_add_event();
                }} > Add Event</button>




            </div>
        )
    }

}

export default  AddEvent;