import {getObjects} from './get-objects.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
const bigPictureComments = bigPicture.querySelector('.social__comments');
const bigPictureCommentsTemplate = bigPicture.querySelector('.social__comment');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const documentBody = document.querySelector('body');
const smallPictures = document.querySelectorAll('.picture');
const socialCommentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const bigPictureCancel = document.querySelector('.big-picture__cancel.cancel');

for (let i = 0; i < smallPictures.length; i++) {
  smallPictures[i].addEventListener('click', () => {
    bigPicture.classList.remove('hidden');
    bigPictureImg.src = getObjects[i].url;
    bigPictureLikes.textContent = getObjects[i].likes;
    bigPictureCommentsCount.textContent = getObjects[i].comments.length;
    bigPictureComments.innerHTML = '';
    getObjects[i].comments.forEach((item) => {
      const comment = bigPictureCommentsTemplate.cloneNode(true);
      comment.querySelector('img').src = item.avatar;
      comment.querySelector('img').alt = item.name;
      comment.querySelector('.social__text').textContent = item.message;
      bigPictureComments.appendChild(comment);
    });
    bigPictureDescription.textContent = getObjects[i].description;

    socialCommentCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');
    documentBody.classList.add('modal-open');

    bigPictureCancel.addEventListener('click', () => {
      bigPicture.classList.add('hidden');
      socialCommentCount.classList.remove('hidden');
      commentsLoader.classList.remove('hidden');
      documentBody.classList.remove('modal-open');
    });

    document.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {
        bigPicture.classList.add('hidden');
        socialCommentCount.classList.remove('hidden');
        commentsLoader.classList.remove('hidden');
        documentBody.classList.remove('modal-open');
      }
    });
  });
}
