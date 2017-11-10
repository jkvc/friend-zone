import md5 from 'md5';
import firebase from 'firebase';

/* Class contains Enrollment object associated to a Course */
/* Contains the course_id and an expandable, reducible list of users enrolled in the course */
class Enrollment {

    course_id;
    enrolled_users; /* Stores hashed user_id's in an list*/

    constructor(course, user_list) {
        this.course_id = course;
        this.enrolled_users = user_list;
    }

    /*
    * add_user(user_id);
    * where user_id is the user to add to the course described by "this"
    * there is no callback function because it will always succeed */
    add_user(user_id){

    }

    /*
    * remove_user(user_id, callback)
    * where user_id is the user to remove from the course described by "this"
    * where callback(err, data) is a function expecting 2 params:
    *   err: null - if no error
    *        { msg: "Enrollment.remove_user(): user_id DNE" } - if error (in this case user_id not in enrolled_users)
    *   data: null - if any error
    *         { msg: "Enrollment.remove_user(): remove success" } - if no error */
    remove_user(user_id, callback){

    }

    /* add/update self to table on Firebase */
    push(){
        firebase.database().ref('Enrollment').child(this.course_id).set({
           course_id: this.course_id,
           enrolled_users: this.enrolled_users
        });
    }
}

export default Enrollment;
