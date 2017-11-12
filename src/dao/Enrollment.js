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



    /* add/update self to table on Firebase */
    push(){
        firebase.database().ref('Enrollment').child(this.course_id).set({
           course_id: this.course_id,
           enrolled_users: this.enrolled_users
        });
    }
}

export default Enrollment;
