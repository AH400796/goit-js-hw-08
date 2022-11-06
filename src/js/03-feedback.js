import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  emailInput: document.querySelector('input[type="email"]'),
  textarea: document.querySelector('textarea[name="message"]'),
  submBtn: document.querySelector('button[type="submit"]'),
};

let localStorageData;
try {
  localStorageData = JSON.parse(localStorage.getItem('feedback-form-state'));
} catch (error) {
  alert('Ooops! ERROR! (Something wrong with localStorage data)');
}

refs.emailInput.value =
  !localStorageData || !localStorageData.hasOwnProperty('email')
    ? ''
    : localStorageData.email;

refs.textarea.value =
  !localStorageData || !localStorageData.hasOwnProperty('message')
    ? ''
    : localStorageData.message;

let feedbackContent = { ...localStorageData };
refs.form.addEventListener('input', throttle(onTextInput, 500));
refs.submBtn.addEventListener('click', onSubmit);

function onTextInput(event) {
  feedbackContent[event.target.getAttribute('name')] = event.target.value;
  localStorage.setItem('feedback-form-state', JSON.stringify(feedbackContent));
}

function onSubmit(event) {
  event.preventDefault();
  localStorage.clear();
  console.log(feedbackContent);
  feedbackContent = {};
  refs.form.reset();
}
