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

    constructor(user_id, first_name, last_name, major, current_year, profile_pic, description){
        this.user_id = user_id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.major = major;
        this.current_year = current_year;
        this.profile_pic = profile_pic;
        this.description = description;
    }


    /* add self to table */
    push(){
        firebase.database().ref('Profile').child(this.user_id).set({
            user_id: this.user_id,
            first_name: this.first_name,
            last_name: this.last_name,
            major: this.major,
            current_year: this.current_year,
            profile_pic: this.profile_pic,
            description: this.description
        });
    }

}

export default Profile;
