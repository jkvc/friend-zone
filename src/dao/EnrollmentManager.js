import Enrollment from './Enrollment'

/*
* add_user(user_id, course_id);
* where user_id is the user to add to the course
* there is no callback because it will always succeed */
export function add_user(user_id, course_id){

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

}

/* callback (err,data)
*  err: null // there is no error
*  data: true or false */
export function is_enrolled(user_id, course_id, callback){

}


