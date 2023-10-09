const refs = {
  startBtn: document.querySelector('.start-btn'),
  stopBtn: document.querySelector('.stop-btn'),
  body: document.querySelector('body'),
};

let timerId = 0;

refs.startBtn.addEventListener('click', onStart);

function onStart() {
  refs.startBtn.disabled = true;
  timerId = setInterval(() => {
    const currentColor = getRandomHexColor();
    refs.body.style.backgroundColor = currentColor;
  }, 1000);
}

function onStop() {
  clearInterval(timerId);
  refs.startBtn.disabled = false;
}
refs.stopBtn.addEventListener('click', onStop);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
