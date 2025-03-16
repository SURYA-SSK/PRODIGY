let hours = 0, minutes = 0, seconds = 0, milliseconds = 0;
let interval;
let running = false;

const hoursDisplay = document.getElementById("hours");
const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const millisecondsDisplay = document.getElementById("milliseconds");
const startStopButton = document.getElementById("startStop");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");
const lapsContainer = document.getElementById("laps");

function startStopwatch() {
    interval = setInterval(() => {
        milliseconds += 10;
        if (milliseconds === 1000) {
            milliseconds = 0;
            seconds++;
        }
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
        if (minutes === 60) {
            minutes = 0;
            hours++;
        }

        hoursDisplay.textContent = hours.toString().padStart(2, '0');
        minutesDisplay.textContent = minutes.toString().padStart(2, '0');
        secondsDisplay.textContent = seconds.toString().padStart(2, '0');
        millisecondsDisplay.textContent = (milliseconds / 10).toString().padStart(2, '0');
    }, 10);
}

startStopButton.addEventListener("click", () => {
    if (running) {
        clearInterval(interval);
        startStopButton.textContent = "Start";
    } else {
        startStopwatch();
        startStopButton.textContent = "Stop";
    }
    running = !running;
});

resetButton.addEventListener("click", () => {
    clearInterval(interval);
    running = false;
    hours = minutes = seconds = milliseconds = 0;
    hoursDisplay.textContent = "00";
    minutesDisplay.textContent = "00";
    secondsDisplay.textContent = "00";
    millisecondsDisplay.textContent = "00";
    startStopButton.textContent = "Start";
    lapsContainer.innerHTML = "";
});

lapButton.addEventListener("click", () => {
    if (running) {
        const lapTime = `${hoursDisplay.textContent}:${minutesDisplay.textContent}:${secondsDisplay.textContent}:${millisecondsDisplay.textContent}`;
        const li = document.createElement("li");
        li.textContent = `Lap: ${lapTime}`;
        lapsContainer.appendChild(li);
    }
});
