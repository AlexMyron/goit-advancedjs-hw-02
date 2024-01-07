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
    setTimeout(() => {
      createPromise(i, delay)
        .then(data =>
          iziToast.show({
            message: data,
            close: false,
            closeOnClick: true,
            position: 'topRight',
            messageColor: '#fff',
            backgroundColor: '#11bd14',
          })
        )
        .catch(e =>
          iziToast.show({
            message: e,
            close: false,
            closeOnClick: true,
            position: 'topRight',
            messageColor: '#fff',
            backgroundColor: '#d60808',
          })
        );
    }, step * i);
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}
