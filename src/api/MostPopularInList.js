
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

    var count = param.count;
    var list = param.list;
    var result = [];

    /*do something with result*/


    callback(null, result);
}