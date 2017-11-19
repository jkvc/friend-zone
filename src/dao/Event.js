import firebase from 'firebase';

/*The events are objects only accessible from the user's profile, we don't need to have an event_participants
list where we store the user given the sheer amount of events possible
 */
class Event {

    event_id;    /*CSE GBM-M*/
    event_name; /*CSES GBM*/
    day; /*M*/
    time; /*4:00 PM - 4:50 PM*/
    location; /*WLH 2001*/

    constructor( event_name,  day, time, location ){
        this.event_id = event_name +"-"+day;
        this.event_name = event_name;
        this.day = day;
        this.time = time;
        this.location = location;
    }

    /* I am not quite sure how we are handling the events objects,
     *we probably are not making users search events but just add them to their schedule*/

    push(){
        firebase.database().ref('Profile').child(firebase.auth().currentUser.uid).upcoming_events.event_id.set({
            event_id : this.event_id,
            event_name: this.event_name,
            day: this.day,
            time: this.time,
            location: this.location
        });
    }

}

export default Event;