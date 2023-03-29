const uploadImgForm = document.forms.uploadImage;
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const hashtagField = uploadImgForm.querySelector('.text__hashtags');
const commentField = uploadImgForm.querySelector('.text__description');

const MAX_HASHTAG_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const TAG_ERROR_TEXT = 'Ошибка валидации';
const pristine = new Pristine(uploadImgForm,
  {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'span',
    errorTextClass: 'error_validation'
  }
);
const hideModal = () => {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadImgForm.reset();
  pristine.reset();
};

uploadImgForm.addEventListener('input', (evt) => {
  evt.preventDefault();

  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  document.querySelector('.img-upload__cancel.cancel').addEventListener('click', () => {
    hideModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (!(document.activeElement === hashtagField ||
        document.activeElement === commentField)) {
        hideModal();
      };
    };
  });

  const preview = uploadImgForm.querySelector('.img-upload__preview img');
  const file = uploadImgForm.querySelector('#upload-file').files[0];
  const reader = new FileReader();

  reader.onloadend = () => {
    preview.src = reader.result;
  };

  file ? reader.readAsDataURL(file) : preview.src = '';
});

const isValidTag = (tag) => VALID_SYMBOLS.test(tag);

const hasValidCount = (value) => value.length <= MAX_HASHTAG_COUNT;

const hasUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const validateTags = (value) => {
  const tags = value.trim().split(' ').filter((tag) => tag.trim().length);
  return hasValidCount(tags) && hasUniqueTags(tags) && tags.every(isValidTag);
};

pristine.addValidator(
  hashtagField,
  validateTags,
  TAG_ERROR_TEXT
);

const onFormSubmit = (evt) => {
  evt.preventDefault();
  if(pristine.validate()) {
    uploadImgForm.submit();
  };
};

uploadImgForm.addEventListener('submit', onFormSubmit);
