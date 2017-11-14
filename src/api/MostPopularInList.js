
/* TODO
* given a list of lists of user_id's, return the most popular user_id in these lists, sorted descending by popularity
* params: param
*   {
*       "count": 5,
*       "list":    [
*                       [ "a","b","c","d","e"],
*                       [ "a","b","c","d","f"],
*                       [ "a","b","c","d","f","g"]
*                   ]
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
*   3. etc
*/
export function most_popular_in_list(param, callback){

    /*handle some error*/
    if ( !("count" in param && "list" in param) )
    {
        callback(new Error("Missing states in param to most_popular_in_list", 9));
    }
    if (param.count < 1 || param.list.length == 0)
    {
        callback(new Error("Invalid Inputs to most_popular_in_list", 11));
    }
    if (typeof param.count !== 'number')
    {
        callback(new Error("param.count is not a number!", 13));
    }
    if (typeof param.list !== 'object' || param.list.constructor !== Array)
    {
        callback(new Error("param.list is not an array!", 15));
    }

    var count = param.count;
    var list = param.list;
    var result = [];
    var dict = {};

    /*do something with result*/

    // For each list
    for (var i = 0; i < list.length; i++)
    {
        // For each list in the list
        for (var j = 0; j < list[i].length; j++)
        {

            // Add a new student into the list, with count of 1
            if ( ! (list[i][j] in dict) )
            {
                dict [list[i][j]] = 1;
            }

            // Increment the student count by 1 if he is already added
            else
            {
                dict [list[i][j]] += 1;
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
        if (a[0] == b[0])
        {
            return a[1] > b[1];
        }
        else return a[0] < b[0];
    });

    for (var i = 0; i < count; i++)
    {
        result.push(array[i][1]);
    }

    callback(null, result);
}