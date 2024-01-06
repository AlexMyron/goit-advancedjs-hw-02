const refs = {
  body: document.querySelector('body'),
  startButton: document.querySelector('[data-start]'),
  stopButton: document.querySelector('[data-stop]'),
};
let switcherInterval;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function handleClick(action) {
  const isStarting = action === 'start';

  refs.startButton.disabled = isStarting;
  refs.stopButton.disabled = !isStarting;

  if (isStarting) {
    refs.body.style.backgroundColor = getRandomHexColor();
    switcherInterval = setInterval(() => {
      refs.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
  } else {
    clearInterval(switcherInterval);
  }
}

refs.startButton.addEventListener('click', handleClick.bind(null, 'start'));
refs.stopButton.addEventListener('click', handleClick.bind(null, 'stop'));
