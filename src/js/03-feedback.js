import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  emailInput: document.querySelector('input[type="email"]'),
  textarea: document.querySelector('textarea[name="message"]'),
  submBtn: document.querySelector('button[type="submit"]'),
};

const STORAGE_KEY = 'feedback-form-state';
let localStorageObj;

refs.form.addEventListener('input', throttle(onTextInput, 500));
refs.submBtn.addEventListener('click', onSubmit);

readLocalStorageData();

writeDataFromLocalStorage();

let feedbackContent = { ...localStorageObj };

function onTextInput(event) {
  feedbackContent[event.target.getAttribute('name')] = event.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(feedbackContent));
}

function onSubmit(event) {
  event.preventDefault();
  localStorage.removeItem(STORAGE_KEY);
  console.log(feedbackContent);
  feedbackContent = {};
  refs.form.reset();
}

function readLocalStorageData() {
  try {
    localStorageObj = JSON.parse(localStorage.getItem(STORAGE_KEY));
  } catch (error) {
    alert('Ooops! ERROR! (Something wrong with localStorage data)');
  }
}

function writeDataFromLocalStorage() {
  if (localStorageObj) {
    refs.emailInput.value = localStorageObj.email || '';
    refs.textarea.value = localStorageObj.message || '';
  }
}
