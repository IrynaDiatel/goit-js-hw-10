// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

//
const startButton = document.querySelector('[data-start]');
const dateInput = document.querySelector('#datetime-picker');
const daysElem = document.querySelector('[data-days]');
const hoursElem = document.querySelector('[data-hours]');
const minutesElem = document.querySelector('[data-minutes]');
const secondsEleent = document.querySelector('[data-seconds]');
//
startButton.disabled = true;
let userSelectedDate = null;
//
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (Date.now() > selectedDates[0].getTime()) {
      startButton.disabled = true;
      iziToast.show({
        title: 'Error',
        message: 'Please choose a date in the future',
        backgroundColor: 'red',
        messageColor: 'white',
      });
    } else {
      startButton.disabled = false;
      userSelectedDate = selectedDates[0];
    }
  },
};
//
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
//
function addLeadingZero(value) {
  value = String(value);
  return value.padStart(2, 0);
}
//
flatpickr(dateInput, options);
//
startButton.addEventListener('click', onStartTimer);

let intervalTime = null;

function onStartTimer(event) {
  clearInterval(intervalTime);
  dateInput.disabled = true;
  event.currentTarget.disabled = true;
  let time = userSelectedDate.getTime() - Date.now();
  intervalTime = setInterval(() => {
    if (time >= 1000) {
      time -= 1000;
      let timeObj = convertMs(time);
      daysElem.textContent = addLeadingZero(timeObj.days);
      hoursElem.textContent = addLeadingZero(timeObj.hours);
      minutesElem.textContent = addLeadingZero(timeObj.minutes);
      secondsEleent.textContent = addLeadingZero(timeObj.seconds);
    } else {
      dateInput.disabled = false;
    }
  }, 1000);
}
//
