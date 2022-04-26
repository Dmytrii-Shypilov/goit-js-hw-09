import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
   dateInput: document.querySelector('#datetime-picker'),
   startBtn: document.querySelector('[data-start]'), 
   daysEl: document.querySelector('[data-days]'),
   hoursEl: document.querySelector('[data-hours]'),
   minutesEl: document.querySelector('[data-minutes]'),
   secondsEl: document.querySelector('[data-seconds]'),
}

refs.startBtn.addEventListener('click', onBtnClick)
refs.startBtn.setAttribute('disabled', true)

let timeDifference
let timerId = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    
    onClose(selectedDates) {
      const choosenDate = Date.parse(selectedDates[0]) 
      const currentDate = Date.parse(new Date);
      timeDifference = choosenDate - currentDate;

      if (choosenDate < currentDate) {
         return Notiflix.Report.warning('Attention', 'Please choose a date in the future!', 'OK')
      } else {
         refs.startBtn.disabled = false;
      }
    },
  };

const fp = flatpickr(refs.dateInput, options); 

function claculateMs(ms) {
   const days = `${Math.floor(ms / 1000 / 60 / 60 / 24)}`;
   const hours = `${Math.floor(ms / 1000 / 60 / 60) % 24}`;
   const minutes = `${Math.floor(ms / 1000 / 60) % 60}`;
   const seconds = `${Math.floor(ms / 1000) % 60}`;

   return {days, hours, minutes, seconds}
}

function addLeadingZero(value) {
   return String(value).padStart(2,0)
}

function onBtnClick () {
   refs.startBtn.disabled = true;

   timerId = setInterval(()=> {

      timeDifference -= 1000;
     
      const values = claculateMs(timeDifference);

      refs.daysEl.textContent = addLeadingZero(values.days); 
      refs.hoursEl.textContent = addLeadingZero(values.hours); 
      refs.minutesEl.textContent = addLeadingZero(values.minutes); 
      refs.secondsEl.textContent = addLeadingZero(values.seconds);

      if (timeDifference === 0) {
         return clearInterval(timerId)
      }
  }, 1000)
}


