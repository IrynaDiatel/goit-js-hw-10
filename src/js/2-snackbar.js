// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';
// ---------------------------------------------------
const form = document.querySelector('.form');
form.addEventListener('submit', handlerFormSubmit);
//
function setPromise(delay, isFulfilled) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isFulfilled === 'fulfilled') {
        resolve(delay);
      } else if (isFulfilled === 'rejected') {
        reject(delay);
      }
    }, delay);
  });
}
// ---------------------------------------------
function handlerFormSubmit(event) {
  event.preventDefault();
  const delay = parseInt(event.target.delay.value);
  const state = event.target.state.value;
  setPromise(delay, state)
    .then(delay => {
      iziToast.success({
        message: `✅ Fulfilled promise in ${delay}ms`,
        backgroundColor: 'lightgreen',
        messageColor: 'white',
        position: 'center',
      });
    })
    .catch(delay => {
      iziToast.error({
        message: `❌ Rejected promise in ${delay}ms`,
        backgroundColor: 'yellow',
        messageColor: 'red',
        position: 'center',
      });
    });
}
//---------------------------------------
