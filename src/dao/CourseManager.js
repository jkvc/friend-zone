import Course from './Course'
import firebase from 'firebase';

/* precise lookup by id, callback list of json */
export function lookup_course_by_code(course_code, callback){
    let db = firebase.database().ref();
    db.child("Catalog").orderByChild("course_code").equalTo(course_code)
        .on("value", function(snapshot){

            var ret = [];
            snapshot.forEach(function(entry){
                var entry_json = entry.toJSON();
                ret.push(new Course(
                    entry_json.course_id,
                    entry_json.course_code,
                    entry_json.course_name,
                    entry_json.section,
                    entry_json.days,
                    entry_json.time,
                    entry_json.location,
                    entry_json.instructor
                ))
            });


            callback(null, ret);
        });
}

/* fuzzy lookup. NEED IMPROVEMENT dont use this for now */
export function lookup_course_code_prefix(prefix, callback){
    let db = firebase.database().ref();
    db.child("Catalog").orderByChild("course_code")
        .startAt(prefix).endAt(prefix +"\uf8ff")
        .on("value", function(snapshot){

            var ret = [];
            snapshot.forEach(function(entry){
                ret.push(entry);

            });

            callback(null, ret);
        })
}

/* precise lookup by instructor, callback list of json */
export function lookup_course_by_instructor(instructor, callback){
    let db = firebase.database().ref();
    db.child("Catalog").orderByChild("instructor").equalTo(instructor)
        .on("value", function(snapshot){

            var ret = [];
            snapshot.forEach(function(entry){
                var entry_json = entry.toJSON();
                ret.push(new Course(
                    entry_json.course_id,
                    entry_json.course_code,
                    entry_json.course_name,
                    entry_json.section,
                    entry_json.days,
                    entry_json.time,
                    entry_json.location,
                    entry_json.instructor
                ))
            });

            callback(null, ret);
        });
}


/* combine lookup by code and by instructor, callback list of Course objects */
export function lookup_course(keyword, callback){
    var by_code_result = [];
    var by_instructor_result = [];
    var done = 0;

    lookup_course_by_code(keyword, function(err,data){
        by_code_result = data;
        done += 1;
        if (done === 2)
            callback(null, by_code_result.concat(by_instructor_result));
    });

    lookup_course_by_instructor(keyword, function(err,data){
        by_instructor_result = data;
        done += 1;
        if (done === 2)
            callback(null, by_code_result.concat(by_instructor_result));
    });

}
