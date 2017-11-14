import Enrollment from './Enrollment'

export function lookup_enrollment_by_id(course_id, callback){
    let listOfUsers = firebase.database().ref('Enrollment').child(course_id);
    callback(null, listOfUsers);
}

/*
* add_user(user_id, course_id);
* where user_id is the user to add to the course
* there is no callback because it will always succeed */
export function add_user(user_id, course_id){
    //get enrollment object associated with course_id
    let course = firebase.database().ref('Enrollment').child(course_id);

    let listOfUsers = course.enrolled_users;
    //push in user_id
    listOfUsers.push(user_id);
    course.push();

}

/*
* remove_user(user_id, course_id, callback)
* where user_id is the user to remove from the course
* where callback(err, data) is a function expecting 2 params:
*   err: null - if no error
*        { msg: "Enrollment.remove_user(): user_id DNE" } - if error (in this case user_id not in enrolled_users)
*   data: null - if any error
*         { msg: "Enrollment.remove_user(): remove success" } - if no error */
export function remove_user(user_id, course_id, callback){
    let course = firebase.database().ref('Enrollment').child(course_id);

    let listOfUsers = course.enrolled_users;
    let indexOfUser = listOfUsers.indexOf(user_id);
    let errMessage = "";
    let successMsg = "";
    if( indexOfUser === -1 ){
        errMessage = 'Enrollment.remove)user(): user_id DNE';
        successMsg = null;
    }
    else{
        //remove one element ( the selected user ) from the list at given index
        listOfUsers.splice(indexOfUser,1);
        errMessage = null;
        successMsg = 'Enrollment.remove_user(): remove success';
        //update
        firebase.database().ref('Enrollment').child(course_id).set({
            course_id: this.course_id,
            enrolled_users: listOfUsers
        });
    }
    callback( errMessage, successMsg);



}



/* callback (err,data)
*  err: null // there is no error
*  data: true or false */
export function is_enrolled(user_id, course_id, callback){
    let enrolledList = [];
    lookup_enrollment_by_id(course_id, function( list){
        enrolledList = list;
    });
    let data = true;
    if( enrolledList.indexOf(user_id) === -1){
        data = false;
    }
    callback(null, data );
}


