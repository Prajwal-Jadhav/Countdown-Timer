const input__day = document.getElementById("input__day");
const input__month = document.getElementById("input__month");
const input__year = document.getElementById("input__year");
const input__hours = document.getElementById("input__hours");
const input__minutes = document.getElementById("input__minutes");

const display__days = document.querySelector(".display__days");
const display__hours = document.querySelector(".display__hours");
const display__minutes = document.querySelector(".display__minutes");
const display__seconds = document.querySelector(".display__seconds");

const inputField = document.querySelectorAll(".input");

const start__btn = document.getElementById("start__btn");
const stop__btn = document.getElementById("stop__btn");

let timerId;
let days;
let hours;
let minutes;
let seconds;
let totalSeconds;
let hasCountdownStarted = false;

function compute() {
  let targetDate = new Date(
    input__year.value,
    input__month.value - 1,
    input__day.value,
    input__hours.value || 23,
    input__minutes.value || 59
  );

  totalSeconds = Math.floor((targetDate.getTime() - Date.now()) / 1000);

  days = Math.floor(totalSeconds / (24 * 3600));

  hours = Math.floor((totalSeconds - days * 24 * 3600) / 3600);

  minutes = Math.floor((totalSeconds - days * 24 * 3600 - hours * 3600) / 60);

  seconds = Math.floor(
    totalSeconds - days * 24 * 3600 - hours * 3600 - minutes * 60
  );
}

function countdown() {
  if (seconds === 0) {
    if (hours > 0 || minutes > 0 || days > 0) seconds = 59;
    else clearInterval(timerId);
  } else seconds--;

  if (seconds === 59) {
    if (minutes === 0) {
      if (hours > 0 || days > 0) minutes = 59;
      else minutes = 0;
    } else minutes--;
  }

  if (minutes === 59) {
    if (hours === 0) {
      if (days > 0) hours = 23;
      else hours = 0;
    } else if (seconds === 59) hours--;
  }

  if (hours === 23) {
    if (days === 0) days = 0;
    else if (minutes === 59 && seconds === 59) days--;
  }

  display__days.innerHTML = days < 10 ? "0" + days : days;
  display__hours.innerHTML = hours < 10 ? "0" + hours : hours;
  display__minutes.innerHTML = minutes < 10 ? "0" + minutes : minutes;
  display__seconds.innerHTML = seconds < 10 ? "0" + seconds : seconds;
}

inputField.forEach((i) => {
  i.addEventListener("input", function (e) {
    i.setAttribute("value", e.target.value);
    compute();
  });
});

start__btn.addEventListener("click", () => {
  compute();
  if (totalSeconds < 0) {
    alert("You can set countdown for future dates only, NOT past!!!");
    return;
  } else if (!hasCountdownStarted) {
    hasCountdownStarted = true;
    timerId = setInterval(countdown, 1000);
  }
});

stop__btn.addEventListener("click", () => {
  clearInterval(timerId);
  hasCountdownStarted = false;
});
