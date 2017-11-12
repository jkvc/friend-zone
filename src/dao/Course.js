import firebase from 'firebase';

class Course {


    course_id; /*CSE11_A01*/
    course_code; /*CSE11*/
    course_name; /*Introduction to Java*/
    section; /*A01*/
    days; /*MWF*/
    time; /*4:00 PM - 4:50 PM*/
    location; /*WLH 2001*/
    instructor; /*Richard Ord*/

    constructor(course_id, course_code, course_name, section, days,
                time, location, instructor){
        this.course_id = course_id;
        this.course_code = course_code;
        this.course_name = course_name;
        this.section = section;
        this.days = days;
        this.time = time;
        this.location = location;
        this.instructor = instructor;
    }

    /*this should never be called because we arent updating the catalog table ever*/
    push(){
        firebase.database().ref('Catalog').child(this.course_id).set({
            course_id: this.course_id,
            course_code: this.course_code,
            course_name: this.course_name,
            section: this.section,
            days: this.days,
            time: this.time,
            location: this.location,
            instructor: this.instructor
        });
    }

}

export default Course;