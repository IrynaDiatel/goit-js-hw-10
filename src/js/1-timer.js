import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const startButton = document.querySelector('[data-start]');
const dateInput = document.querySelector('#datetime-picker');
const daysElem = document.querySelector('[data-days]');
const hoursElem = document.querySelector('[data-hours]');
const minutesElem = document.querySelector('[data-minutes]');
const secondsElem = document.querySelector('[data-seconds]');

startButton.disabled = true;

let userSelectedDate = null;
let intervalTime = null;

/* ---------- flatpickr ---------- */
flatpickr(dateInput, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    const chosenDate = selectedDates[0];

    // дата повинна бути СТРОГО в майбутньому
    if (chosenDate.getTime() <= Date.now()) {
      startButton.disabled = true;

      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });

      return;
    }

    userSelectedDate = chosenDate;
    startButton.disabled = false;
  },
});

/* ---------- запуск таймера ---------- */
startButton.addEventListener('click', onStartTimer);

function onStartTimer(event) {
  clearInterval(intervalTime);

  dateInput.disabled = true;
  event.currentTarget.disabled = true;

  intervalTime = setInterval(() => {
    const timeLeft = userSelectedDate.getTime() - Date.now();

    // якщо час закінчився
    if (timeLeft <= 0) {
      clearInterval(intervalTime);
      updateTimerFace(0);
      dateInput.disabled = false;
      return;
    }

    updateTimerFace(timeLeft);
  }, 1000);
}

/* ---------- оновлення інтерфейсу ---------- */
function updateTimerFace(ms) {
  const { days, hours, minutes, seconds } = convertMs(ms);

  daysElem.textContent = addLeadingZero(days);
  hoursElem.textContent = addLeadingZero(hours);
  minutesElem.textContent = addLeadingZero(minutes);
  secondsElem.textContent = addLeadingZero(seconds);
}

/* ---------- допоміжні функції ---------- */
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor((ms % hour) / minute);
  const seconds = Math.floor((ms % minute) / second);

  return { days, hours, minutes, seconds };
}
