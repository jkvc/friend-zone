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

    // Adding a User_id to enrolled class

    // Remove a User_id in enrolled class

    /* add self to table on Firebase */
    push(){
        firebase.database().ref('Enrolled_Users').child(this.course_id).set({
           course_id = this.course_id,
           enrolled_users = this.enrolled_users
        });
    }
}

export default Enrollment;
