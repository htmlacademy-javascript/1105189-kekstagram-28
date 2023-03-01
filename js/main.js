let id = 1;
let commentId = 1;

const descriptions = [
  'Первое',
  'Второе',
  'Третье',
  'Последнее'
];

const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const names = [
  'Атос',
  'Портос',
  'Арамис',
  'Милледи'
];

function getRandomInteger(min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

const getRandomComment = () => {
  const result = {
    id: commentId,
    avatar: `img/avatar-${commentId}.svg`,
    message: messages[getRandomInteger(0, messages.length - 1)],
    name: names[getRandomInteger(0, names.length - 1)]
  };
  commentId += 1;
  return result;
};


const array = () => {
  const result = {
    id: id,
    url: `photos/${id}.jpg`,
    description: descriptions[getRandomInteger(0, descriptions.length - 1)],
    likes: getRandomInteger(15, 200),
    comments: Array.from({length: getRandomInteger(1, 3)}, getRandomComment)
  };
  id += 1;
  return result;
};

const getObjects = Array.from({length: 3}, array);

console.log(getObjects);
