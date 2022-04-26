const startBtn = document.querySelector('[data-start]')
const stopBtn = document.querySelector('[data-stop]')
const body = document.querySelector('body')

let timerId = null;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

startBtn.addEventListener('click', () => {
    startBtn.setAttribute('disabled', true);
    timerId = setInterval(() => {
        body.style.cssText =`background-color: ${getRandomHexColor()} ;`
    }, 1000)

})

stopBtn.addEventListener('click', () => {
    clearInterval(timerId)
    startBtn.disabled = false;
})