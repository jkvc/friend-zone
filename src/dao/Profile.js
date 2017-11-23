import firebase from 'firebase';

/* class contains an Account object, used to access data in the Account table */
class Profile {

    user_id;
    first_name;
    last_name;
    major;
    current_year;
    profile_pic;
    description;

    /*the following fields are not required to initialize with constructor because
    * they can be null(empty) upon creating this new entry */
    enrolled_courses;
    friend_list;
    outgoing_request;
    incoming_request;
    upcoming_events;
    blocked_user;

    constructor(user_id, first_name, last_name, major, current_year, profile_pic, description){
        this.user_id = user_id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.major = major;
        this.current_year = current_year;
        this.profile_pic = profile_pic;
        this.description = description;

        this.enrolled_courses = {};
        this.friend_list = {};
        this.outgoing_request = {};
        this.incoming_request = {};
        this.upcoming_events = {};
        this.blocked_user = {};
    }


    /* add self to table */
    async push(){
        await firebase.database().ref('Profile').child(this.user_id).set({
            user_id: this.user_id,
            first_name: this.first_name,
            last_name: this.last_name,
            major: this.major,
            current_year: this.current_year,
            profile_pic: this.profile_pic,
            description: this.description,
            enrolled_courses: this.enrolled_courses,
            friend_list: this.friend_list,
            outgoing_request: this.outgoing_request,
            incoming_request: this.incoming_request,
            upcoming_events: this.upcoming_events,
            blocked_user : this.blocked_user
        });
        return;
    }

}

export default Profile;
