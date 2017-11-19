/*
 * @author: Yiming Cai
 */

// Note that all the functions below might throw errors if invalid inputs are detected
// They might also return nonsensical outputs depending on how broken the inputs are

// return an array of 7 elements of true/false, starting sunday to saturday
// Example: input "MWF", return [f, t, f, t, f, t, f], where f is false and t is true
//                               Su M  Th W  Th F  Sa
export function get_weekday_array(weekday_string) {
    // if (typeof weekday_string !== 'string')
    // {
    //     callback(new Error("Param passed in get_weekday_array is not a String", 21));
    //     return null;
    // }

    var s_days = weekday_string;
    var dayArray = [false, false, false, false, false, false, false];

    // For each letter in the days string
    for (var j = 0; j < s_days.length; j++) {
        if (s_days[j] === 'M') {
            dayArray[1] = true;
        }
        else if (s_days[j] === 'T') {
            j++;
            if (s_days[j] === 'h') {
                dayArray[4] = true;
            }
            else {
                j--;
                dayArray[2] = true;
            }
        }
        else if (s_days[j] === 'W') {
            dayArray[3] = true;
        }
        else if (s_days[j] === 'F') {
            dayArray[5] = true;
        }
        else if (s_days[j] === 'S') {
            j++;
            if (s_days[j] === 'a') {
                dayArray[6] = true;
            }
            else if (s_days[j] === 'u') {
                dayArray[0] = true;
            }
        }
    }

    //callback(null);
    return dayArray;
}

// Takes in 3 string in the format "hhmm" (must be length 4)
// return (time-range_begin)/(range_end-range_begin) percentage (between 0 and 1)
export function get_time_percentage(time, range_begin, range_end) {
    // if (typeof time !== 'string' || typeof range_begin !== 'string' || typeof range_end !== 'string')
    // {
    //     callback(new Error("Param passed in get_time_percentage is not a String", 22));
    //     return null;
    // }

    let timeh = parseInt(time.substring(0, 2), 10);
    let timem = parseInt(time.substring(2, 4), 10);
    let beginh = parseInt(range_begin.substring(0, 2), 10);
    let beginm = parseInt(range_begin.substring(2, 4), 10);
    let endh = parseInt(range_end.substring(0, 2), 10);
    let endm = parseInt(range_end.substring(2, 4), 10);

    let beginVal = beginh * 60 + beginm;
    let endVal = endh * 60 + endm;
    let timeVal = timeh * 60 + timem;

    // if (beginVal > timeVal || timeVal > endVal)
    // {
    //     callback(new Error("get_time_percentage: time is not between range_begin and range_end", 23));
    //     return null;
    // }

    // callback(null);
    return (timeVal - beginVal) / (endVal - beginVal);
}

// Example: Takes in a string of the format "3:41 PM" and covert it to "1541"
// Returning a string, not a number
// It assumes that the string passed in has at least 2 numbers separated by a ":"
//      and that if it after 1159 there will be a 'pm' (case insensitive) somewhere in the string
// Note that "12:xx PM" is converted to 12xx
// and that "12:xx AM" is converted to 00xx
export function get_time_numeric(timestring, callback) {
    if (typeof timestring !== 'string') {
        callback(new Error("Param passed in get_time_numeric is not a String", 24));
        return null;
    }

    let s_time = timestring;
    let hour = "";
    let min = "";
    let pm = false;
    let is_min = false;

    for (let i = 0; i < s_time.length; i++) {
        if (s_time[i] >= '0' && s_time[i] <= '9') {
            if (is_min) {
                min += s_time[i];
            }
            else {
                hour += s_time[i];
            }
        }
        else if (s_time[i] === ':') {
            is_min = true;
        }
        else if (s_time[i].toLowerCase() === 'p') {
            if (i + 1 < s_time.length) {
                if (s_time[i + 1].toLowerCase() === 'm') {
                    pm = true;
                }
            }
        }
    }

    let n_hour = parseInt(hour, 10);
    let n_min = parseInt(min, 10);
    if (pm) {
        // avoid 12pm -> 24
        if (n_hour !== 12)
            n_hour += 12;
    }
    if (!pm) {
        if (n_hour === 12) {
            n_hour = 0;
        }
    }

    if (n_hour < 10) {
        hour = '0' + n_hour.toString();
    }
    else {
        hour = n_hour.toString();
    }

    if (n_min < 10) {
        min = '0' + n_min.toString();
    }
    else {
        min = n_min.toString();
    }

    callback(null);
    return hour + min;
}

