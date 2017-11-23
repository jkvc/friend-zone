/*
 * @author: Yiming Cai and Kevin Chen
 */
/* Done
* given a list of lists of user_id's, return the most popular user_id in these lists, sorted descending by popularity
* params: param
*   {
*       "count": 5,
*       "list":    [
*                       [ "a","b","c","d","e"],
*                       [ "a","b","c","d","f"],
*                       [ "a","b","c","d","f","g"]
*                   ]
*       "blocked_list": { "a" }    // NOTE: optional; not an array, but associative array
*       "friend_list": { "b" }     // NOTE; optional; not an array, but associative array
*   }
* given this param, this function should call the callback function with:
*   err = null,
*   data = ["a","b","c","d","f" ]   //because f is one more popular than e
*
* handle errors accordingly by calling callback function with:
*   err = {"msg": "some error message explaining why" }
*   data = null
* document all error handling here:
*   1. param doesnt contain count
*   2. param doesnt contain lists
*   3. count is not a number
*   4. list is not an array
*   5. any object in list is not an array
*   6. if count is less than 0 or list is empty
*/
export function most_popular_in_list(param, callback){

    let checkBlock = ("blocked_list" in param);
    let checkFriend = ("friend_list" in param);

    /*handle some error, each error message will be printed out to the console*/
    /*comment out 'console.log' if error messages are not desired */
    let err = null;
    if ( !("count" in param && "list" in param) ) { 
        callback(err = new Error("Missing states in param to most_popular_in_list", 9), null);
        console.log(err);
        return;
    }

    if (typeof param.count !== 'number')
    {
        callback( err = new Error("param.count is not a number!", 13), null);
        console.log(err);
        return;
    }

    if (typeof param.list !== 'object' || param.list.constructor !== Array)
    {
        callback( err = new Error("param.list is not an array!", 15), null);
        console.log(err);
        return;
    }

    for (var i = 0; i < param.list.length; i++)
    {
        if (typeof param.list[i] !== 'object' || param.list.constructor !== Array)
        {
            callback( err = new Error("an elemenet in param.list is not an array!", 16), null);
            console.log(err);
        }
    }

    if (param.count < 0 || param.list.length <= 0)
    {
        callback( err = new Error("Invalid Inputs to most_popular_in_list", 11), null);
        console.log(err);
        return;
    }


    // Some variables to store the temp variables/data structures for the algorithm
    var count = param.count;
    var list = param.list;
    var result = [];
    var dict = {};

    /*do something with result*/

    // For each list
    for (i = 0; i < list.length; i++)
    {
        // For each list in the list
        for (var j = 0; j < list[i].length; j++)
        {

            // Add a new student into the list, with count of 1
            if ( ! (list[i][j] in dict) )
            {
                dict[ list[i][j] ] = 1;
            }

            // Increment the student count by 1 if he is already added
            else
            {
                dict[ list[i][j] ] += 1;
            }
        }
    }

    // For each student in the dict, push the [sameClassCount, studentName] onto the array
    var array = [];
    for (var key in dict)
    {
        array.push( [dict[key], key] );
    }

    // Sort the [sameClassCount, studentName] by:
    //  1. their sameClassCount in decreasing order
    //  2. their studentName in increasing alphabetical order
    array.sort(function(a, b)
    {
        if (a[0] === b[0])
        {
            // Note that when comparing names/IDs for sorting order, it will be changed to lowercase first
            return a[1].toLowerCase() > b[1].toLowerCase();
        }
        else return a[0] < b[0];
    });

    // Push the student names onto the list based on the count specified
    let c = 0;
    if (count === 0 || count > array.length)
    {
        c = array.length;
    }
    else
    {
        c = count;
    }

    for (i = 0; i < c; i++)
    {
        if (checkBlock)
        {
            if (array[i][1] in param.blocked_list) continue;
        }

        if (checkFriend)
        {
            if (array[i][1] in param.friend_list) continue;
        }

        result.push(array[i][1]);
    }

    callback(err, result);
}

/*
* given a list of lists of user_id's, return the most popular user_id in the class param, sorted by
*   the popularity
* params: param
*   {
*       "count": 5,
*       "list":    [
*                       [ "a","b","c","d","e"],
*                       [ "a","b","c","d","f"],
*                       [ "a","b","c","d","f","g"]
*                   ]
*       "class":    [ "a", "b", "c", "d", "e" ]
*       "blocked_list": { "a" }    // NOTE: not an array, but associative array
*       "friend_list": { "b" }     // NOTE; not an array, but associative array
*   }
*
* given this param, this function should call the callback function with:
*   err = null,
*   data = ["b","c","d","e" ]   //because f is not in 'class' even though its more popular
*
* handle errors accordingly by calling callback function with:
*   err = {"msg": "some error message explaining why" }
*   data = null
* document all error handling here:
*   1. param doesnt contain count
*   2. param doesnt contain lists
*   3. param doesnt contain class
*   4. count is not a number
*   5. list is not an array
*   6. class is not an array
*   7. any object in list is not an array
*   8. if count is less than 0 or list is empty
*/
export function most_popular_in_class(param, callback){

    let err = null;


    // Initial error checkings
    if ( !("count" in param && "class" in param) ) {
        callback(err = new Error("Missing states in param to most_popular_in_list", 9), null);
        console.log(err);
        return;
    }

    if (typeof param.class !== 'object' || param.class.constructor !== Array)
    {
        callback( err = new Error("param.class is not an array!", 15), null);
        console.log(err);
        return;
    }

    if (typeof param.count !== 'number')
    {
        callback( err = new Error("param.count is not a number!", 13), null);
        console.log(err);
        return;
    }

    if (param.count < 0)
    {
        callback( err = new Error("Invalid param.count value to most_popular_in_class", 11), null);
        console.log(err);
        return;
    }

    // Find the list of most popular students
    let delegateParam = { "count":0, "list":param.list };

    most_popular_in_list(delegateParam, function(err, data)
    {
        let c = 0;
        let result = [];

        let dict = {};
        for (let u = 0; u < param.class.length; u++)
        {
            dict[param.class[u]] = true;
        }

        for (let i = 0; i < data.length; i++)
        {
            if (data[i] in dict)
            {
                result.push(data[i]);
                c += 1;
            }

            if (c >= param.count)
            {
                break;
            }
        }

        callback(err, result);
    });
}