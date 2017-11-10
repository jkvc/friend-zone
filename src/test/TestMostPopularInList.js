import most_popular_in_list from '../api/MostPopularInList';
import UnitTest from './UnitTest'

/* todo add more test cases */
export default function test_most_popular_in_list() {
    var param = {
        "count": 5,
        "list": [
                    ["a", "b", "c", "d", "e"],
                    ["a", "b", "c", "d", "f"],
                    ["a", "b", "c", "d", "f", "g"]
                ]
    }
    var expected_err = null;
    var expected_out = ["a","b","c","d","f"];

    var test1 = new UnitTest("test1", param, expected_err, expected_out);
    test1.run(most_popular_in_list);
}