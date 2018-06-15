document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('index').addEventListener('keydown', function (event) {
        //debugger;
        if (parseInt(event.key)) {
            findPrimeID(event.key);
        } else {
            alert(event.key + ' is not a number. Please enter a number.');
        }
    });
});

//#region Callbacks
function findPrimeID(number) {
    function createIDNumber(err, primeString) {
        if (err) {
            console.log(err);
            alert(err);
        } else {
            displayToUser(primeString);
        }
    }

    function displayToUser(primeString) {
        // Find Prime String ID
        number--;
        idString = '';
        for (k = 0; k < 5; k++) {
            idString = idString + primeString.charAt(number);
            number++;
        }

        // Cast the found string to an int
        idString = parseInt(idString);

        // Display to User
        document.getElementById('minionId').innerHTML = idString;
    }
    generatePrimeString(createIDNumber);
}
//#endregion

function generatePrimeString(callback) {
    // Generate the prime string up to 1005, then call the callback
    var checkIfWhole;
    var whole;
    var primeString = '';
    for (i = 2; i <= 1993; i++) {
        whole = 0;
        for (j = 2; j < i; j++) {
            checkIfWhole = i / j;
            if (checkIfWhole % 1 === 0) {
                whole++;
            }
        }
        if (whole == 0) {
            primeString = primeString + i;
        }
    }
    callback(null, primeString);
}