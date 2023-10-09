// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  daysField: document.querySelector('[data-days]'),
  hoursField: document.querySelector('[data-hours]'),
  minutesField: document.querySelector('[data-minutes]'),
  secondsField: document.querySelector('[data-seconds]'),
};

refs.startBtn.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      refs.startBtn.disabled = true;
    } else {
      refs.startBtn.disabled = false;
    }
  },
};

const instance = flatpickr('#datetime-picker', options);
refs.startBtn.addEventListener('click', onClickBtn);

function onClickBtn() {
  const selectedDate = instance.selectedDates[0];
  const timeDiff = selectedDate - new Date();
  const timeRemaining = convertMs(timeDiff);
  updateTimerUI(timeRemaining);
  startCountdown(timeDiff);
}

function updateTimerUI(timeRemaining) {
  refs.daysField.textContent = addLeadingZero(timeRemaining.days);
  refs.hoursField.textContent = addLeadingZero(timeRemaining.hours);
  refs.minutesField.textContent = addLeadingZero(timeRemaining.minutes);
  refs.secondsField.textContent = addLeadingZero(timeRemaining.seconds);
}

function startCountdown(timeDiff) {
  updateTimerUI(convertMs(timeDiff));

  const timerInterval = setInterval(() => {
    timeDiff -= 1000;

    if (timeDiff <= 0) {
      clearInterval(timerInterval);
      updateTimerUI({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      Notiflix.Notify.success('Time is up!');
    } else {
      updateTimerUI(convertMs(timeDiff));
    }
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

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
