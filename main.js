const timer = document.getElementById("timer");

const startButton = document.getElementById("start-button");
const pauseButton = document.getElementById("pause-button");
const stopButton = document.getElementById("stop-button");

const timers = document.getElementById("timers");


let start = false;
let pause = true;

let seconds = 0;
let minutes = 0;
let hours = 0;


/**
 * disableButton
 *
 * @param button
 */
function disableButton(button) {
    button.classList.add('disabled');
    button.setAttribute('disabled', 'true');
}

/**
 * activateButton
 *
 * @param button
 */
function activateButton(button) {
    button.classList.remove('disabled');
    button.removeAttribute('disabled');
}

/**
 * startTimer
 */
function startTimer(){
    disableButton(startButton);

    activateButton(pauseButton);

    if(!start) {
        activateButton(stopButton)
        start = true;
    }

    pause = false;
}

/**
 * pauseTimer
 */
function pauseTimer() {
    activateButton(startButton);

    disableButton(pauseButton);

    pause = true;
}

/**
 * stopTimer
 */
function stopTimer() {
    saveTimer();
    resetTimer();
    clearTimers();
    loadTimers();
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

    timer.innerText = timerToString();
}

/**
 * saveTimer
 */
function saveTimer() {
    let tmpTimers = JSON.parse(localStorage.getItem('timers'));

    if (!tmpTimers){
        tmpTimers = [];
    }

    tmpTimers.push(timerToString());
    localStorage.setItem('timers', JSON.stringify(tmpTimers));
}

/**
 * resetTimer
 */
function resetTimer() {
    timer.innerText = "00 : 00 : 00";

    seconds = 0;
    minutes = 0;
    hours = 0;

    disableButton(pauseButton);
    disableButton(stopButton);

    activateButton(startButton);

    pause = true;
    start = false;
}

/**
 * loadTimers
 */
function loadTimers() {
    const stringTimers = JSON.parse(localStorage.getItem('timers'));
    stringTimers.forEach((stringTimer) => {
        const timerListItem = document.createElement("li");
        const timerTextNode = document.createTextNode(stringTimer);

        timerListItem.appendChild(timerTextNode);

        timers.appendChild(timerListItem);
    })
}

/**
 * clearTimers
 */
function clearTimers() {
    while (timers.firstChild){
        timers.removeChild(timers.firstChild);
    }
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

loadTimers();
setInterval(countTimer, 1000);