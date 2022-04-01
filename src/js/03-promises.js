import Notiflix from "notiflix";
function createPromise(position, delay) {
  return new Promise((resolve, reject) => { 
  const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      // Fulfill
      resolve(`Fulfilled promise ${position} in ${delay}ms`);
    } else {
      // Reject
      reject(`Rejected promise ${position} in ${delay}ms`);
    }
  });
}
const form = document.querySelector(".form");
const delayInput = document.querySelector('input[name="delay"]');
const stepInput = document.querySelector('input[name="step"]');
const amountInput = document.querySelector('input[name="amount"]');
form.addEventListener("submit", (event) => {
  event.preventDefault();
  setTimeout(() => { 
    let timeId = null;
    let delay = parseInt(delayInput.value);
    let position = 1;
    createPromise(position, delay)
        .then((trueValue) => {
    Notiflix.Notify.success(trueValue);
  })
  .catch((falseValue) => {
    Notiflix.Notify.failure(falseValue);
  });
    timeId = setInterval(() => { 
      position += 1;
      delay += parseInt(stepInput.value);
      createPromise(position, delay)
        .then((trueValue) => {
    Notiflix.Notify.success(trueValue);
  })
  .catch((falseValue) => {
    Notiflix.Notify.failure(falseValue);
  });
      if (position == parseInt(amountInput.value)) clearInterval(timeId);
    }, parseInt(stepInput.value));
  }, parseInt(delayInput.value));
});