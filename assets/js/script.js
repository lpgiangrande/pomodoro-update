/**
 * POMODORO TIMER
 */

const timerDisplay = document.querySelector('.time-display');
const startButton = document.querySelector('.start-button');
const resetButton = document.querySelector('.reset-button');
const stopButton = document.querySelector('.stop-button');
const pauseButton = document.querySelector('.pause-button');
const alarmSound = new Audio('../assets/oversimplified-alarm-clock.mp3');

let timeLeft; 
let timerId; 

/**
 * This timer is either the work timer of the pause timer, depending of the param
 * @param {number} duration - 25 min default, 5 min for pause
 */
function startTimer(duration = 25 * 60) {
  stopAlarm();
  if (!timerId) { // By checking whether timerId is null or not -> ensure that only one interval is running at a time (or bugs)
    timerId = setInterval(() => {
      timeLeft--;
      updateTimerDisplay();
      if (timeLeft <= 0) {
        clearInterval(timerId);
        timerId = null;
        alarmSound.play(); 
      }
    }, 1000);
    timeLeft = duration;
    updateTimerDisplay();
  }
}

function startPauseTimer() {
  stopAlarm();
  startTimer(5 * 60); // 0.1 * 60 value for test -> 5 sec
  startButton.textContent = 'Start Work';
  startButton.disabled = false;
  pauseButton.disabled = true;
}

function stopAlarm() {
  alarmSound.pause();
  alarmSound.currentTime = 0; // sets the current playback time of the audio to the beginning of the audio file.
}

function resetTimer() {
  clearInterval(timerId);
  timerId = null;
  timeLeft = 25 * 60;
  updateTimerDisplay();
  stopAlarm();
}

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const seconds = (timeLeft % 60).toString().padStart(2, '0');
  timerDisplay.textContent = `${minutes}:${seconds}`;
}

startButton.addEventListener('click', () => {
  startTimer();
  startButton.disabled = true;
  pauseButton.disabled = false;
});
resetButton.addEventListener('click', resetTimer);
stopButton.addEventListener('click', stopAlarm);
pauseButton.addEventListener('click', startPauseTimer);
