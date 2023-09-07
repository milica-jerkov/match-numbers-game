function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createElement(
  elementType,
  parentElement,
  classes = [],
  textContent = ''
) {
  const element = document.createElement(elementType);
  if (classes.length > 0) {
    element.classList.add(...classes);
  }
  if (textContent !== '') {
    element.textContent = textContent;
  }
  if (parentElement) {
    parentElement.appendChild(element);
  }
  return element;
}

function populateGrid() {
  const grid = document.getElementById('grid');
  for (let i = 0; i < 10; i++) {
    const column = createElement('div', grid, ['column']);

    for (let j = 0; j < 10; j++) {
      const field = document.createElement('div');
      const randomNumber = generateRandomNumber(1, 5);
      const box = createElement(
        'div',
        column,
        ['box', 'clickable'],
        randomNumber
      );
    }
  }

  const lastBoxes = document.querySelectorAll('.column .box:last-child');
  lastBoxes.forEach((box) => {
    box.classList.add('clickable');
    box.addEventListener('click', function () {
      removeAndEnableNext(this);
    });
  });
}
populateGrid();
let collectedNumbers = [];

function removeAllBoxesByValue() {
  const resultsDiv = document.getElementById('results');
  const resultBoxes = resultsDiv.getElementsByClassName('box');

  const valueCounts = {};

  for (const box of resultBoxes) {
    const value = box.textContent;
    if (valueCounts[value]) {
      valueCounts[value]++;
    } else {
      valueCounts[value] = 1;
    }
  }

  for (let i = resultBoxes.length - 1; i >= 0; i--) {
    const box = resultBoxes[i];
    const value = box.textContent;
    if (valueCounts[value] === 3) {
      resultsDiv.removeChild(box);
    }
  }
}

function removeAndEnableNext(element) {
  const column = element.parentElement;
  const boxes = column.getElementsByClassName('box');

  const clickedValue = element.textContent;
  collectedNumbers.push(clickedValue);

  column.removeChild(element);

  const resultsDiv = document.getElementById('results');
  const resultBox = createElement(
    'div',
    resultsDiv,
    ['box', 'red'],
    clickedValue
  );

  removeAllBoxesByValue();

  const nextBox = boxes[boxes.length - 1];
  nextBox.classList.add('clickable');
  nextBox.removeEventListener('click', removeAndEnableNext);
  nextBox.addEventListener('click', function () {
    removeAndEnableNext(this);
  });
}
