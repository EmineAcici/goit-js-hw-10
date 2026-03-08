import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formElement = document.querySelector('.form');

formElement.addEventListener('submit', event => {
  event.preventDefault();

  const delay = Number(event.currentTarget.elements.delay.value);

  if (delay < 0) {
    iziToast.warning({
      title: 'CAUTION ',
      message: 'Please enter a value greater than or equal to 0',
      position: 'topRight',

      backgroundColor: '#FFA000',
      progressBarColor: '#BB7B10',

      theme:"dark",

      onOpening: function (instance, toast) {
        const progressBar = toast.querySelector('.iziToast-progressbar');
        if (progressBar) {
          progressBar.style.backgroundColor = '#FFE0AC';
        }
      },
    });
    return;
  }

  const state = event.currentTarget.elements.state.value;

  createPromise(delay, state)
    .then(value => {
      iziToast.success({
        title: 'SUCCESS ',
        message: `✅ Fulfilled promise in ${value}ms`,
        position: 'topRight',

        backgroundColor: '#59A10D',
        progressBarColor: '#326101',
        theme:"dark",

        onOpening: function (instance, toast) {
          const progressBar = toast.querySelector('.iziToast-progressbar');
          if (progressBar) {
            progressBar.style.backgroundColor = '#B5EA7C';
          }
        },
      });
    })
    .catch(error => {
      iziToast.error({
        title: 'ERROR ',
        message: `❌ Rejected promise in ${error}ms`,
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
    });

  formElement.reset();
});

function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}
