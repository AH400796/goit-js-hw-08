import throttle from 'lodash.throttle';
const LSTORAGE_KEY = 'feedback-form-state';

let Obj;
let userData = { ...Obj };
const stateForm = document.querySelector('.feedback-form');

stateForm.addEventListener('input', throttle(onFormInput, 500));
stateForm.addEventListener('submit', onFormSubmit);
addTextToInput();
function onFormInput(evt) {
  userData[evt.target.name] = evt.target.value;
  localStorage.setItem(LSTORAGE_KEY, JSON.stringify(userData));
}
function onFormSubmit(evt) {
  evt.preventDefault();

  evt.currentTarget.reset();
  localStorage.removeItem(LSTORAGE_KEY);
}
function addTextToInput() {
  if (JSON.parse(localStorage.getItem(LSTORAGE_KEY))) {
    stateForm.email.value =
      JSON.parse(localStorage.getItem(LSTORAGE_KEY)).email || '';
    stateForm.message.value =
      JSON.parse(localStorage.getItem(LSTORAGE_KEY)).message || '';
  }
}

Obj = JSON.parse(localStorage.getItem(LSTORAGE_KEY));

// import throttle from 'lodash.throttle';

// const refs = {
//   form: document.querySelector('.feedback-form'),
//   emailInput: document.querySelector('input[type="email"]'),
//   textarea: document.querySelector('textarea[name="message"]'),
//   submBtn: document.querySelector('button[type="submit"]'),
// };

// const STORAGE_KEY = 'feedback-form-state';
// let localStorageObj;

// refs.form.addEventListener('input', throttle(onTextInput, 500));
// refs.submBtn.addEventListener('click', onSubmit);

// readLocalStorageData();

// writeDataFromLocalStorage();

// let feedbackContent = { ...localStorageObj };

// function onTextInput(event) {
//   feedbackContent[event.target.getAttribute('name')] = event.target.value;
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(feedbackContent));
// }

// function onSubmit(event) {
//   event.preventDefault();
//   localStorage.removeItem(STORAGE_KEY);
//   console.log(feedbackContent);
//   feedbackContent = {};
//   refs.form.reset();
// }

// function readLocalStorageData() {
//   try {
//     localStorageObj = JSON.parse(localStorage.getItem(STORAGE_KEY));
//   } catch (error) {
//     alert('Ooops! ERROR! (Something wrong with localStorage data)');
//   }
// }

// function writeDataFromLocalStorage() {
//   if (localStorageObj) {
//     refs.emailInput.value = localStorageObj.email || '';
//     refs.textarea.value = localStorageObj.message || '';
//   }
// }
