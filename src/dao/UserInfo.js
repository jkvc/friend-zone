import firebase from 'firebase';

/* class contains an Account object, used to access data in the Account table */
class UserInfo {

    user_id;
    first_name; 
    last_name;
    major;
    current_year;
    profile_pic;
    user_description;

    constructor(userID, firstname, lastname, major, currentyear, profileURL, mydescription){
        this.user_id = userID;
        this.first_name = firstname;
        this.last_name = lastname;
        this.major = major;
        this.current_year = currentyear;
        this.profile_pic = profileURL;
        this.user_description = mydescription;
    }


    /* add self to table, create step */
    push(){
        firebase.database().ref('UserInfo').child(this.user_id).set({
            userID: this.user_id,
            firstname: this.first_name,
            lastname: this.lastname,
            major: this.major, 
            currentyear: this.current_year, 
            profileURL: this.profile_pic,
            mydescription: this.user_description
        });
    }

    /* efit info */

}

export default Account;
