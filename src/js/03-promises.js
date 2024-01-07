import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
  e.preventDefault();

  const {
    delay: { value: delay },
    step: { value: step },
    amount: { value: amount },
  } = e.target.elements;

  for (let i = 1; i <= Number(amount); i++) {
    const promiseDelay =
      i === 1 ? Number(delay) : Number(delay) + Number(step) * (i - 1);

    createPromise(i, promiseDelay)
      .then(({ position, timeDelay }) =>
        iziToast.show({
          message: `Fulfilled promise ${position} in ${timeDelay}ms`,
          close: false,
          closeOnClick: true,
          position: 'topRight',
          messageColor: '#fff',
          backgroundColor: '#11bd14',
        })
      )
      .catch(({ position, timeDelay }) =>
        iziToast.show({
          message: `Rejected promise ${position} in ${timeDelay}ms`,
          close: false,
          closeOnClick: true,
          position: 'topRight',
          messageColor: '#fff',
          backgroundColor: '#d60808',
        })
      );
  }

  [...e.target.elements].forEach(el => {
    if (el.name) el.value = '';
  });
}

function createPromise(position, timeDelay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, timeDelay });
      } else {
        reject({ position, timeDelay });
      }
    }, timeDelay);
  });
}
