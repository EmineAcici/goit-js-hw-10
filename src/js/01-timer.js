// Kütüphaneri ekleme

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// html dosyasındaki elemanlar
const datePick = document.querySelector('#datetime-picker');
console.log(datePick);

const startBtn = document.querySelector('[data-start]');
startBtn.disabled = true;
console.log(startBtn);

const daySpan = document.querySelector('[data-days]');
const hourSpan = document.querySelector('[data-hours]');
const minuteSpan = document.querySelector('[data-minutes]');
const secondSpan = document.querySelector('[data-seconds]');

// Yardımcı Fonksiyonlar

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateInterface({ days, hours, minutes, seconds }) {
  daySpan.textContent = addLeadingZero(days);
  hourSpan.textContent = addLeadingZero(hours);
  minuteSpan.textContent = addLeadingZero(minutes);
  secondSpan.textContent = addLeadingZero(seconds);
}

// İşlemler

let userSelectedDate = null;
let timerID = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];

    if (userSelectedDate < new Date()) {
      iziToast.error({
        title: 'WARNING',
        message: 'Please choose a date in the future',
        position: 'topRight',
        backgroundColor: '#EF4040',
        progressBarColor: '#B51B1B',

        theme: 'dark',

        onOpening: function (instance, toast) {
          const progressBar = toast.querySelector('.iziToast-progressbar');
          if (progressBar) {
            progressBar.style.backgroundColor = '#FFBEBE';
          }
        },
      });
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
};

flatpickr(datePick, options);

//  datePick.addEventListener("change", event =>{
//   userSelectedDate = new Date(event.target.value);
//   const now =new Date();
//   console.log(userSelectedDate);
//   console.log(now);
//   if(userSelectedDate > now){
//     startBtn.disabled = false;
//     console.log("Geçerli bir tarih seçildi  :  ", userSelectedDate);
//   } else {
//     startBtn.disabled = true;
//     alert("Lütfen geçerli bir tarih seçiniz")
//   }
//  });

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;

  const timerID = setInterval(() => {
    const currentTime = new Date();
    const msDiff = userSelectedDate - currentTime;

    if (msDiff <= 0) {
      clearInterval(timerID);
      console.log('Süre doldu!!!');
      return;
    }
    const timeComponents = convertMs(msDiff);
    updateInterface(timeComponents);
  }, 1000);
});
