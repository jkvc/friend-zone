import Enrollment from './Enrollment'
import firebase from 'firebase';

/*should callback an Enrollment object*/
export function lookup_enrollment_by_id(course_id, callback){
    let db = firebase.database()
    db.ref('Enrollment/'+ course_id).once('value').then(function (snapshot){
        let content = snapshot.val();

        //course not found
        if( content === null ){
            callback( {err: "Course not found"}, null);
        }
        //course is found
        else {
            var enrolled_users = content.enrolled_users || {}; /*handle when there is nobody enrolled and content.enrolled_users give you null*/
            callback(null, new Enrollment(course_id,enrolled_users));
        }
    })
}



/*
* add_user(user_id, course_id);
* where user_id is the user to add to the course
* there is no callback because it will always succeed */
export function add_user_to_enrollment(user_id, course_id){

    //delegate to lookup
    lookup_enrollment_by_id( course_id , function ( err, enrollment_obj ){

        //add user to list as property, where key is the user id and value is true
        enrollment_obj.enrolled_users[user_id] = true;

        //update course in db
        enrollment_obj.push();
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
export function remove_user_from_enrollment(user_id, course_id, callback) {
    // is_enrolled(user_id, course_id, function (err, enrolled) {
    //     //if user is enrolled
    //     if (enrolled) {
    //         //delegate to lookup to find course
    //         lookup_enrollment_by_id(course_id, function (err, list) {
    //             //remove user
    //             list.user_id = null;
    //             let enrollment = new Enrollment(course_id, list);
    //             enrollment.push();
    //             callback(null, {msg: "Enrollment.remove_user(): remove success"});
    //         })
    //     }
    //     //user is not enrolled
    //     else {
    //         callback({msg: "Enrollment.remove_user(): user_id DNE"}, null)
    //     }
    // })
    /*this is very inefficient, youre making the same query twice on the enrollment entry*/

    lookup_enrollment_by_id(course_id, function (err, enrollment_obj) {
        if (err)
            callback(err,null);

        else{ /* else lookup enrollment succeed */

            if (enrollment_obj.enrolled_users[user_id] === null ) /* if user not enrolled */
                callback({ msg: "Enrollment.remove_user(): user_id DNE" }, null);

            else{ /* else user enrolled, remove user and callback succeed */
                enrollment_obj.enrolled_users[user_id] = null;
                enrollment_obj.push();
            }
        }
    })
}

/* callback (err,data)
*  err: null // there is no error or message when course_id doesnt exist
*  data: true or false */
export function is_enrolled(user_id, course_id, callback){

    //delegate to lookup
    lookup_enrollment_by_id(course_id, function( err, enrollment_obj) {

        //handle errors
        if (err) {
            //pass in err thrown by lookup
            callback(err, null);
        }
        else {
            var enrolled = enrollment_obj.enrolled_users[user_id] === true; /* data value for callback doesnt have to be object */
            callback(null, enrolled );
        }

    })
}


