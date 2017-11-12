// import Course from './Course'
import firebase from 'firebase';

/* precise lookup by id*/
export function lookup_course_by_code(course_code, callback){
    let db = firebase.database().ref();
    db.child("Catalog").orderByChild("course_code").equalTo(course_code)
        .on("value", function(snapshot){

            var ret = [];
            snapshot.forEach(function(entry){
                ret.push(entry);
            });

            callback(null, ret);
        })
}

/* fuzzy lookup */
export function lookup_course_code_contains(substring, callback){

}

/* precise lookup by instructor */
export function lookup_course_by_instructor(instructor, callback){

}

/* fuzzy lookup by instructor name contains substring */
export function lookup_course_instructor_contains(substring, callback){

}

/* combine fuzzy lookup by id and by instructor */
export function lookup_course(keyword, callback){

}
