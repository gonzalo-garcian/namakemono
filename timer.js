let seconds = 0;
let minutes = 0;
let hours = 0;

let pause = true;

const timerActions = {
    pause: (value) => { pause = value},
    seconds: (value) => { seconds = value},
    minutes: (value) => { minutes = value},
    hours: (value) => { hours = value},
    timerToString: getTimerToString,
    saveTimer: saveTimer
}

/**
 *
 * @param e
 */
onmessage = (e) => {
    for (const key in e.data) {
        timerActions[key](e.data[key]);
    }
}

/**
 * countTimer
 */
function countTimer() {
    if (pause) {
        return;
    }

    if (seconds + 1 === 60) {
        seconds = 0;
        if (minutes + 1 === 60) {
            minutes = 0;
            hours++;
        } else {
            minutes++;
        }
    } else {
        seconds++;
    }

    postMessage({
        updateTimer: timerToString()
    });
}

/**
 * timerToString
 *
 * @returns {string}
 */
function timerToString() {
    let strHours = hours.toString();
    strHours = strHours.length === 2 ? strHours : '0' + strHours;

    let strMinutes = minutes.toString();
    strMinutes = strMinutes.length === 2 ? strMinutes : '0' + strMinutes;

    let strSeconds = seconds.toString();
    strSeconds = strSeconds.length === 2 ? strSeconds : '0' + strSeconds;

    return strHours + " : " + strMinutes + " : " + strSeconds;
}

/**
 *
 */
function getTimerToString() {
    postMessage({
        updateTimer: timerToString()
    })
}

function saveTimer() {
    postMessage({
        saveTimer: timerToString()
    })
}


setInterval(countTimer, 1000);