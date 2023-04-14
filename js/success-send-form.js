const container = document.querySelector('body::after');
const template = document.querySelector('#success').content;
const successFragment = document.createDocumentFragment();
const message = template.cloneNode(true);

const showSuccessMessage = () => {
  successFragment.appendChild(message);
  container.appendChild(successFragment);
};

export {showSuccessMessage};
