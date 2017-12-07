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
    fb_link;

    /*the following fields are not required to initialize with constructor because
    * they can be null(empty) upon creating this new entry */
    enrolled_courses;
    friend_list;
    outgoing_request;
    incoming_request;
    upcoming_events;
    blocked_user;
    verified_email;

    constructor(user_id, first_name, last_name, major, current_year, description, fb_link, verified_email, profile_pic){
        this.user_id = user_id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.major = major;
        this.current_year = current_year;
        this.description = description;
        this.fb_link = fb_link;
        this.verified_email = verified_email;

        this.enrolled_courses = {};
        this.friend_list = {};
        this.outgoing_request = {};
        this.incoming_request = {};
        this.upcoming_events = {};
        this.blocked_user = {};
        this.profile_pic = profile_pic || "";

    }


    /* add self to table */
    async push(){

        firebase.database().ref('Profile').child(this.user_id).set({
            user_id: this.user_id,
            first_name: this.first_name,
            last_name: this.last_name,
            major: this.major,
            current_year: this.current_year,
            profile_pic: this.profile_pic,
            description: this.description,
            fb_link:this.fb_link,
            enrolled_courses: this.enrolled_courses,
            friend_list: this.friend_list,
            outgoing_request: this.outgoing_request,
            incoming_request: this.incoming_request,
            upcoming_events: this.upcoming_events,
            blocked_user : this.blocked_user,
            verified_email : this.verified_email
        }).then( ()=> {
            return;
        })

    }

    push_non_async() {
        firebase.database().ref('Profile').child(this.user_id).set({
            user_id: this.user_id,
            first_name: this.first_name,
            last_name: this.last_name,
            major: this.major,
            current_year: this.current_year,
            profile_pic: this.profile_pic,
            description: this.description,
            fb_link: this.fb_link,
            enrolled_courses: this.enrolled_courses,
            friend_list: this.friend_list,
            outgoing_request: this.outgoing_request,
            incoming_request: this.incoming_request,
            upcoming_events: this.upcoming_events,
            blocked_user: this.blocked_user,
            verified_email: this.verified_email
        })
    }

}

export default Profile;
