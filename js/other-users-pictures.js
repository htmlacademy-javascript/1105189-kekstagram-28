import {getData} from './api.js';

const container = document.querySelector('.pictures.container');
const template = document.querySelector('#picture').content;
const otherUsersPhotoFragment = document.createDocumentFragment();

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
  getData().then((data) => {
    dataPhoto.push(...data);
  }).then(() => {
    container.querySelectorAll('a.picture').forEach((el) => el.remove());
    generateOtherUsersPhoto(dataPhoto);
  });
});

randomFilter.addEventListener('click', () => {
  const dataPhoto = [];
  let index = 0;
  const getRandomInteger = (min, max) => {
    const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
    const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
    const result = Math.random() * (upper - lower + 1) + lower;
    return Math.floor(result);
  };
  getData().then((data) => {
    for (let i = 0; i < 10; i++) {
      index = getRandomInteger(0, data.length - 1);
      dataPhoto.push(data[index]);
      delete data.splice(index, 1);
    }
  }).then(() => {
    container.querySelectorAll('a.picture').forEach((el) => el.remove());
    let timeoutId;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => generateOtherUsersPhoto(dataPhoto), 2000);
  });
});

discussedFilter.addEventListener('click', () => {
  const dataPhoto = [];
  getData().then((data) => {
    dataPhoto.push(...data);
    dataPhoto.sort((a, b) => b.likes - a.likes);
  }).then(() => {
    container.querySelectorAll('a.picture').forEach((el) => el.remove());
    generateOtherUsersPhoto(dataPhoto);
  });
});
