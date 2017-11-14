import {most_popular_in_list} from '../api/MostPopularInList';
import UnitTest from './UnitTest'

/* todo add more test cases */
export function test_most_popular_in_list() {

    /* A normal test with non error parameters */
    var param1 = {
        "count": 5,
        "list": [
                    ["a", "b", "c", "d", "e"],
                    ["a", "b", "c", "d", "f"],
                    ["a", "b", "c", "d", "f", "g"]
                ]
    }
    var expected_err1 = null;
    var expected_out1 = ["a","b","c","d","f"];

    var test1 = new UnitTest("test1", param1, expected_err1, expected_out1);
    test1.run(most_popular_in_list);

    /* A test that passes in bad count */
    var param2 = {
        "count": "5a",
        "list": [
                    ["a", "b", "c", "d", "e"],
                    ["a", "b", "c", "d", "f"],
                    ["a", "b", "c", "d", "f", "g"]
                ]
    }
    var expected_err2 = new Error("param.count is not a number!", 13);
    var expected_out2 = null;

    var test2 = new UnitTest("test2: note that error messages are expected on the console",
        param2, expected_err2, expected_out2);

    test2.run(most_popular_in_list);

    /* A test that passes in empty list */
     var param3 = {
        "count": 5,
        "list": [ ]
    }
    var expected_err3 = new Error("Invalid Inputs to most_popular_in_list", 11);
    var expected_out3 = null;

    var test3 = new UnitTest("test3: note that error messages are expected on the console.",
        param3, expected_err3, expected_out3);

    test3.run(most_popular_in_list);

    /* A test that passes in a list of empty lists */
    var param4 = {
        "count": 5,
        "list": [ [], [] ]
    }
    var expected_err4 = null;
    var expected_out4 = [];

    var test4 = new UnitTest("test4", param4, expected_err4, expected_out4);

    test4.run(most_popular_in_list);

    /* A test that requires more names to be returned than count */
    var param5 = {
        "count": 15,
        "list": [
                    ["a", "b", "c", "d", "e"],
                    ["a", "b", "c", "d", "f"],
                    ["a", "b", "c", "d", "f", "g"]
                ]
    }
    var expected_err5 = null;
    var expected_out5 = ["a","b","c","d","f", "e", "g"];

    var test5 = new UnitTest("test5", param5, expected_err5, expected_out5);
    test5.run(most_popular_in_list);

    /* A test where the required states do not exist in the parameter */
    var param6 = {
        "gibberish": 15,
        "list": [
                    ["a", "b", "c", "d", "e"],
                    ["a", "b", "c", "d", "f"],
                    ["a", "b", "c", "d", "f", "g"]
                ]
    }
    var expected_err6 = new Error("Missing states in param to most_popular_in_list", 9);
    var expected_out6 = null;

    var test6 = new UnitTest("test6: note that error messages are expected on the console",
        param6, expected_err6, expected_out6);

    test6.run(most_popular_in_list);

    /* A test where names with uppercase and lowercase are compared */
    var param7 = {
        "count": 15,
        "list": [
                    ["Abraham", "beck", "Cat", "d", "E"],
                    ["Abraham", "beck", "Cat", "d", "f"],
                    ["a", "Beck", "cat", "d", "f", "g"]
                ]
    }
    var expected_err7 = null;
    var expected_out7 = ["d", "Abraham", "beck", "Cat", "f", "a", "Beck", "cat", "E", "g"];

    var test7 = new UnitTest("test7",
        param7, expected_err7, expected_out7);

    test7.run(most_popular_in_list);
}