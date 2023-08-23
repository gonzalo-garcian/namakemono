const timerWorker = new Worker("timer.js");
const timer = document.getElementById("timer");

const startButton = document.getElementById("start-button");
const pauseButton = document.getElementById("pause-button");
const stopButton = document.getElementById("stop-button");

const timers = document.getElementById("timers");

let start = false;


/**
 *
 * @type {{saveTimer: saveTimer, updateTimer: timerActions.updateTimer}}
 */
const timerActions = {
    updateTimer: (value) => { timer.innerText = value },
    saveTimer: saveTimer,
}

/**
 * timerWorker => onMessage
 *
 * @param e
 */
timerWorker.onmessage = (e) => {
    for (const key in e.data) {
        timerActions[key](e.data[key]);
    }
};


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

    timerWorker.postMessage({
        pause: false,
    });
}

/**
 * pauseTimer
 */
function pauseTimer() {
    activateButton(startButton);

    disableButton(pauseButton);

    timerWorker.postMessage({
        pause: true,
    });
}

/**
 * stopTimer
 */
function stopTimer() {
    timerWorker.postMessage({
        saveTimer: null
    });
    resetTimer();
    clearTimersElement();
}

/**
 * saveTimer
 */
function saveTimer(currentTimer) {
    let tmpTimers = JSON.parse(localStorage.getItem('timers'));

    if (!tmpTimers){
        tmpTimers = [];
    }

    tmpTimers.push(currentTimer);
    localStorage.setItem('timers', JSON.stringify(tmpTimers));
    loadTimers();
}

/**
 * resetTimer
 */
function resetTimer() {
    timer.innerText = "00 : 00 : 00";

    disableButton(pauseButton);
    disableButton(stopButton);

    activateButton(startButton);

    timerWorker.postMessage({
        seconds: 0,
        minutes: 0,
        hours: 0,
        pause: true
    });

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
function clearTimersElement() {
    while (timers.firstChild){
        timers.removeChild(timers.firstChild);
    }
}

loadTimers();

