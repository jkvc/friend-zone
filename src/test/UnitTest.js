class UnitTest {

    constructor(name, param, expected_err, expected_out) {
        this.name = name;
        this.param = param;
        this.expected_err = expected_err;
        this.expected_out = expected_out;
    }

    run(func) {
        func(this.param, function (err, out) {

            console.log();
            console.log("--------------------------Running test [" + this.name +"]");

            console.log(">> Passing in params:");
            console.log(JSON.stringify(this.param,null,3));

            console.log(">> Expecting err:");
            console.log(JSON.stringify(this.expected_err,null,3));
            console.log(">> Actual err:");
            console.log(JSON.stringify(err,null,3));

            console.log(">> Expecting out:");
            console.log(JSON.stringify(this.expected_out,null,3));
            console.log(">> Actual out:");
            console.log(JSON.stringify(out,null,3));

            console.log(">> Result:");
            if (JSON.stringify(this.expected_err) === JSON.stringify(err) &&
                JSON.stringify(this.expected_out) === JSON.stringify(out) )
                console.log("--------------------------PASSED");
            else
                console.log("--------------------------FAILED");

        }.bind(this))
    }
}

export default UnitTest;