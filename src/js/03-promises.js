import Notiflix, { Notify } from 'notiflix';

const refs = {
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
  form: document.querySelector('.form')
}


refs.form.addEventListener('submit', (event) => {
  event.preventDefault()
  let delay = Number(refs.delay.value)
  const step = Number(refs.step.value);
  const amount = Number(refs.amount.value);

  for (let i = 1; i <= amount; i+=1) {
    createPromise(i, delay)
    delay += step;
  }
})


function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) =>  {
    
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`)
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`)
      }
    }, delay);
  });

  promise.then((result) => {
    Notify.success(result)
  }).catch ((result) => {
    Notify.failure(result)
  })
}



