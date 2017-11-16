import Enrollment from './Enrollment'

export function lookup_enrollment_by_id(course_id, callback){
    let db = firebase.database()
    db.ref('Enrollment/'+ course_id).on('value').then(function (snapshot){
        let content = snapshot.val();

        //course not found
        if( content === null ){
            callback( {err: "Course not found"}, null);
        }

        //course is found
        else {

            callback(null, content.enrolled_users);
        }
    })
}



/*
* add_user(user_id, course_id);
* where user_id is the user to add to the course
* there is no callback because it will always succeed */
export function add_user(user_id, course_id){

    //delegate to lookup
    lookup_enrollment_by_id( course_id , function ( err, list ){

        //add user to list as property, where key is the user id and value is true
        list.user_id = true;
        let enrollment = new Enrollment( course_id, list);

        //update course in db
        enrollment.push();
    })



}

/*
* remove_user(user_id, course_id, callback)
* where user_id is the user to remove from the course
* where callback(err, data) is a function expecting 2 params:
*   err: null - if no error
*        { msg: "Enrollment.remove_user(): user_id DNE" } - if error (in this case user_id not in enrolled_users)
*   data: null - if any error
*         { msg: "Enrollment.remove_user(): remove success" } - if no error */
export function remove_user(user_id, course_id, callback) {
    is_enrolled(user_id, course_id, function (err, data) {
        //if user is enrolled
        if (data.value) {
            //delegate to lookup to find course
            lookup_enrollment_by_id(course_id, function (err, list) {
                //remove user
                list.user_id = null;
                let enrollment = new Enrollment(course_id, list);
                enrollment.push();
                callback(null, {msg: "Enrollment.remove_user(): remove success"});
            })
        }
        //user is not enrolled
        else {
            callback({msg: "Enrollment.remove_user(): user_id DNE"}, null)
        }
    })
}

/* callback (err,data)
*  err: null // there is no error
*  data: true or false */
export function is_enrolled(user_id, course_id, callback){
    let enrolledList = {};

    //delegate to lookup
    lookup_enrollment_by_id(course_id, function( err, list) {

        //handle errors
        if (err) {
            //pass in err thrown by lookup
            callback(err, null);
        }
        else {
            enrolledList = list;
            let data = { value: false};
            if (user_id in enrolledList) {
                data.value = true;
            }
            callback(null, data);
        }

    })
}


