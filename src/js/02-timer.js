import flatpickr from 'flatpickr';
import iziToast from 'izitoast';
import 'flatpickr/dist/flatpickr.min.css';
import 'izitoast/dist/css/iziToast.min.css';

import { convertMs, addLeadingZero } from './tools';

const STORAGE_KEY = 'timer-data';
const currentTime = new Date().getTime();
const savedTimerData = localStorage.getItem(STORAGE_KEY);
let alarmTime = 0;
let timerInterval;

const refs = {
  startButton: document.querySelector('[data-start]'),
  input: document.getElementById('datetime-picker'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    alarmTime = selectedDates[0].getTime();

    if (alarmTime < currentTime)
      return iziToast.show({
        title: 'info: ',
        message: 'Please choose a date in the future',
        theme: 'dark',
        close: false,
        position: 'topRight',
        closeOnClick: true,
      });

    refs.startButton.disabled = false;
  },
};

function startTimer(e) {
  const finalTime = savedTimerData && !e ? Number(savedTimerData) : alarmTime;
  let timeLeft = finalTime - currentTime;

  e && localStorage.setItem(STORAGE_KEY, alarmTime);
  timerInterval && clearInterval(timerInterval);
  renderTime(timeLeft);
  refs.startButton.disabled = true;
  refs.input.disabled = true;

  timerInterval = setInterval(() => {
    if (timeLeft < 1000) {
      localStorage.removeItem(STORAGE_KEY);
      refs.input.disabled = false;
      return clearInterval(timerInterval);
    }
    timeLeft -= 1000;
    renderTime(timeLeft);
  }, 1000);
}

function renderTime(time) {
  const { days, hours, minutes, seconds } = convertMs(time);

  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}

flatpickr(refs.input, options);
refs.startButton.addEventListener('click', startTimer);

if (savedTimerData && savedTimerData > currentTime) startTimer();
else localStorage.removeItem(STORAGE_KEY);
