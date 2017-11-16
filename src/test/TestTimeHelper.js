import {get_weekday_array, get_time_percentage,get_time_numeric} from '../api/TimeHelper'

// Writing testers manually here, view console for outputs
export function test_time_helper()
{
    /* ------------- Testing get_weekday_array ------------------- */
    // Test 1 for get_weekday_array
    var input = "MWF";
    var expectedOut = [false, true, false, true, false, true, false];
    var actualOut = get_weekday_array(input);

    console.log("Expected Out:" + expectedOut.toString());
    console.log("Actual Out:" + actualOut.toString());
    if ( compare_arrays(actualOut, expectedOut) )
    {
        console.log("----------PASS------------");
    }
    else
    {
        console.log("---------!!FAIL!!----------");
    }

    // Test 2, check if Sa, Su Tu and Th are parsed correctly
    input = "TuThSaSu";
    expectedOut = [true, false, true, false, true, false, true];
    actualOut = get_weekday_array(input);
    console.log("Expected Out:" + expectedOut.toString());
    console.log("Actual Out:" + actualOut.toString());
    if ( compare_arrays(actualOut, expectedOut) )
    {
        console.log("----------PASS------------");
    }
    else
    {
        console.log("---------!!FAIL!!----------");
    }

    // Test 3, check if empty string is parsed correctly
    input = "";
    expectedOut = [false, false, false, false, false, false, false];
    actualOut = get_weekday_array(input);
    console.log("Expected Out:" + expectedOut.toString());
    console.log("Actual Out:" + actualOut.toString());
    if ( compare_arrays(actualOut, expectedOut) )
    {
        console.log("----------PASS------------");
    }
    else
    {
        console.log("---------!!FAIL!!----------");
    }

    /* ----------------Testing get_time_percentage---------------- */
    // Test 1, check when time is in the middle of the range
    var input_time = "1200";
    var input_range_begin = "0800";
    var input_range_end = "1600";
    expectedOut = 0.5;
    actualOut = get_time_percentage(input_time, input_range_begin, input_range_end);
    console.log("Expected Out:" + expectedOut.toString());
    console.log("Actual Out:" + actualOut.toString());
    if ( Math.abs(expectedOut - actualOut) < 0.01 )
    {
        console.log("----------PASS------------");
    }
    else
    {
        console.log("---------!!FAIL!!----------");
    }

    // Test 2, check when time is right at the range_begin
    input_time = "1800";
    input_range_begin = "1800";
    input_range_end = "1900";
    expectedOut = 0;
    actualOut = get_time_percentage(input_time, input_range_begin, input_range_end);
    console.log("Expected Out:" + expectedOut.toString());
    console.log("Actual Out:" + actualOut.toString());
    if ( Math.abs(expectedOut - actualOut) < 0.01 )
    {
        console.log("----------PASS------------");
    }
    else
    {
        console.log("---------!!FAIL!!----------");
    }

    // Test 3, check when time is right at the range_end
    input_time = "1900";
    input_range_begin = "1800";
    input_range_end = "1900";
    expectedOut = 1;
    actualOut = get_time_percentage(input_time, input_range_begin, input_range_end);
    console.log("Expected Out:" + expectedOut.toString());
    console.log("Actual Out:" + actualOut.toString());
    if ( Math.abs(expectedOut - actualOut) < 0.01 )
    {
        console.log("----------PASS------------");
    }
    else
    {
        console.log("---------!!FAIL!!----------");
    }

    // Test 4, check when the inputs are out of range
    input_time = "2000";
    input_range_begin = "1800";
    input_range_end = "1900";
    expectedOut = null;
    try
    {
        actualOut = get_time_percentage(input_time, input_range_begin, input_range_end);
        console.log("Expected Error but didn't caught, FAIL");
        console.log("---------!!FAIL!!----------");
    }
    catch (e)
    {
        console.log(e.toString())
        console.log("Expected Error and caught, PASS");
        console.log("----------PASS------------");
    }

    /* --------------- test get_time_numeric(time_string) --------- */
    // Test a normal PM input
    input = "6:31 PM";
    expectedOut = "1831";
    actualOut = get_time_numeric(input);
    console.log("Expected Out:" + expectedOut.toString());
    console.log("Actual Out:" + actualOut.toString());
    if ( expectedOut === actualOut )
    {
        console.log("----------PASS------------");
    }
    else
    {
        console.log("---------!!FAIL!!----------");
    }

    // Test a normal AM input
    input = "6:31 AM";
    expectedOut = "0631";
    actualOut = get_time_numeric(input);
    console.log("Expected Out:" + expectedOut.toString());
    console.log("Actual Out:" + actualOut.toString());
    if ( expectedOut === actualOut )
    {
        console.log("----------PASS------------");
    }
    else
    {
        console.log("---------!!FAIL!!----------");
    }

    // Test 12 pm case
    input = "12:31 PM";
    expectedOut = "1231";
    actualOut = get_time_numeric(input);
    console.log("Expected Out:" + expectedOut.toString());
    console.log("Actual Out:" + actualOut.toString());
    if ( expectedOut === actualOut )
    {
        console.log("----------PASS------------");
    }
    else
    {
        console.log("---------!!FAIL!!----------");
    }

    // Test 12 am
    input = "12:31 AM";
    expectedOut = "0031";
    actualOut = get_time_numeric(input);
    console.log("Expected Out:" + expectedOut.toString());
    console.log("Actual Out:" + actualOut.toString());
    if ( expectedOut === actualOut )
    {
        console.log("----------PASS------------");
    }
    else
    {
        console.log("---------!!FAIL!!----------");
    }
}

function compare_arrays(a, b)
{
    if (typeof a !== typeof b) return false;
    if (a.length !== b.length)
    {
        return false;
    }

    for (var i = 0; i < a.length; i++)
    {
        if (a[i] !== b[i]) return false;
    }
    return true;
}