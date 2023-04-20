import {getData} from './api.js';
import {getRandomInteger} from './utils.js';

const container = document.querySelector('.pictures.container');
const template = document.querySelector('#picture').content;
const otherUsersPhotoFragment = document.createDocumentFragment();
let timerIndex;

const generateOtherUsersPhoto = (array) => {
  array.forEach(({url, comments, likes}) => {
    const picture = template.cloneNode(true);
    picture.querySelector('.picture__img').src = url;
    picture.querySelector('.picture__comments').textContent = comments.length;
    picture.querySelector('.picture__likes').textContent = likes;
    otherUsersPhotoFragment.appendChild(picture);
    container.appendChild(otherUsersPhotoFragment);
  });
};

getData().then((data) => generateOtherUsersPhoto(data));

const defaultFilter = document.querySelector('#filter-default');
const randomFilter = document.querySelector('#filter-random');
const discussedFilter = document.querySelector('#filter-discussed');

defaultFilter.addEventListener('click', () => {
  const dataPhoto = [];
  clearTimeout(timerIndex);

  timerIndex = setTimeout(() => {
    getData().then((data) => {
      dataPhoto.push(...data);
    }).then(() => {
      container.querySelectorAll('a.picture').forEach((el) => el.remove());
      generateOtherUsersPhoto(dataPhoto);
    });
  }, 500);

  defaultFilter.classList.add('img-filters__button--active');
  randomFilter.classList.remove('img-filters__button--active');
  discussedFilter.classList.remove('img-filters__button--active');
});

randomFilter.addEventListener('click', () => {
  const dataPhoto = [];
  let index = 0;
  clearTimeout(timerIndex);

  timerIndex = setTimeout(() => {
    getData().then((data) => {
      for (let i = 0; i < 10; i++) {
        index = getRandomInteger(0, data.length - 1);
        dataPhoto.push(data[index]);
        delete data.splice(index, 1);
      }
    }).then(() => {
      container.querySelectorAll('a.picture').forEach((el) => el.remove());
      generateOtherUsersPhoto(dataPhoto);
    });
  }, 500);

  defaultFilter.classList.remove('img-filters__button--active');
  randomFilter.classList.add('img-filters__button--active');
  discussedFilter.classList.remove('img-filters__button--active');
});

discussedFilter.addEventListener('click', () => {
  const dataPhoto = [];
  clearTimeout(timerIndex);

  timerIndex = setTimeout(() => {
    getData().then((data) => {
      dataPhoto.push(...data);
      dataPhoto.sort((a, b) => b.likes - a.likes);
    }).then(() => {
      container.querySelectorAll('a.picture').forEach((el) => el.remove());
      generateOtherUsersPhoto(dataPhoto);
    });
  }, 500);

  defaultFilter.classList.remove('img-filters__button--active');
  randomFilter.classList.remove('img-filters__button--active');
  discussedFilter.classList.add('img-filters__button--active');
});
