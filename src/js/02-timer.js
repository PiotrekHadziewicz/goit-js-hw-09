import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from "notiflix";
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() <= new Date().getTime()) {
      Notiflix.Notify.failure("Please choose a date in the future");
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
      startBtn.addEventListener("click", () => { 
        startBtn.disabled = true;
        inputPicker.disabled = true;
        let ms = selectedDates[0].getTime() - new Date().getTime();
        let result;
        timerId = setInterval(() => { 
          ms = selectedDates[0].getTime() - new Date().getTime();
          result = convertMs(ms);
          daysSpan.textContent = addLeadingZero(result.days);
          hoursSpan.textContent = addLeadingZero(result.hours);
          minutesSpan.textContent = addLeadingZero(result.minutes);
          secondsSpan.textContent = addLeadingZero(result.seconds);
          if (result.days == 0 && result.hours == 0 && result.minutes == 0 && result.seconds == 0)clearInterval(timerId);
        }, 1000);
      });
    }
  },
};
function addLeadingZero(value) {
  if (value < 10) {
    return "0" + value;
  }
  return value;
}
let timerId = null;
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
const daysSpan = document.querySelector('span[data-days]');
const hoursSpan = document.querySelector('span[data-hours]');
const minutesSpan = document.querySelector('span[data-minutes]');
const secondsSpan = document.querySelector('span[data-seconds]');
const inputPicker = document.querySelector("#datetime-picker");
flatpickr(inputPicker, options);
const startBtn = document.querySelector('button[data-start]');
startBtn.disabled = true;
const divTimer = document.querySelector(".timer");
divTimer.style.display = "flex";
divTimer.style.flexDirection = "row";
divTimer.style.gap = "10px";

const helper = divTimer.children;
const divField = [...helper];
divField.forEach(function (div) { 
  div.style.display = "flex";
  div.style.flexDirection = "column";
  div.style.alignItems = "center";
});