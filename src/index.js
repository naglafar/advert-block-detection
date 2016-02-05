const R = require('ramda');

const mainContent = document.getElementById('mainContent'),
  topBanner = document.getElementById('topBanner'),
  bottomBanner = document.getElementById('bottomBanner');

let noAddCounter = 0;

const createDiv = () => document.createElement('div');

const bootApp = () => {
  var face = document.createElement('img');
  face.src = 'https://pbs.twimg.com/profile_images/454962828600803328/jXG0H97g.png';
  face.className = 'troll';
  face.id = 'troll';
  mainContent.appendChild(face);
};

const createAdd = () => {
  var add = createDiv();
  add.className = 'advert';
  return add;
};

const createSomeAdverts = (count) => {

  const someAdds = R.map(
    createAdd,
    R.range(1, count)
  );

  const adverts = createDiv();
  adverts.className = 'adverts';

  R.forEach(
    add => adverts.appendChild(add),
    someAdds
  );

  return adverts;
};

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const removeChildren = (el) => {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
};

const displaySomeAdds = () => {
  return new Promise((resolve) => {
    removeChildren(topBanner);
    removeChildren(bottomBanner);
    topBanner.appendChild(createSomeAdverts(getRandomInt(1, 10)));
    bottomBanner.appendChild(createSomeAdverts(getRandomInt(1, 10)));
    resolve();
  });
};

const pauseForAddBlocker = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), 500);
  });
};

const addsVissable = () => R.reduce(
  (acc, el) => {
    const computedStyles = getComputedStyle(el);
// rule engine for deciding if adds are actaully visable
    if (computedStyles.display === 'none') {
      return false;
    }
    return acc;
  },
  true,
  document.getElementsByClassName('adverts')
);

const checkAddsDisplayed = () => {
  return new Promise((resolve) => {
    if (addsVissable()) {
      noAddCounter = 0;
      resolve();
    } else {
      throw new Error('no adds detected');
    }
  });
};

const incNoAddCounter = () => {
  console.warn('cant find adverts');
  noAddCounter += 1;
  return noAddCounter;
};

const dealWithAddBlocker = () => {
  if (noAddCounter > 5) {
    console.error('Unable to display adds after 5 attemps');
    document.getElementById('troll').classList.add('unhappy');
  }
};

const annoyUserWithAdds = () => {
  Promise.resolve()
    .then(displaySomeAdds)
    .then(pauseForAddBlocker)
    .then(checkAddsDisplayed)
    .catch(incNoAddCounter)
    .then(dealWithAddBlocker);
};

bootApp();

setInterval(
  () => annoyUserWithAdds(),
  3000
);
