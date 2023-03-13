import {getObjects} from './get-objects.js';

const container = document.querySelector('.pictures.container');
const template = document.querySelector('#picture').content;
const otherUsersPhotoFragment = document.createDocumentFragment();

getObjects.forEach(({url, comments, likes}) => {
  const picture = template.cloneNode(true);
  picture.querySelector('.picture__img').src = url;
  picture.querySelector('.picture__comments').textContent = comments.length;
  picture.querySelector('.picture__likes').textContent = likes;

  otherUsersPhotoFragment.appendChild(picture);
});

container.appendChild(otherUsersPhotoFragment);

export {container};
