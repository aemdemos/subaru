import { createOptimizedPicture } from '../../scripts/aem.js';
let newsFlag = true;
function addEventListenersToNews() {
  if (!newsFlag) {
    return;
  }
  newsFlag = false;
  const news = document.querySelectorAll('body > main > div.section.news.cards-container > div > div > ul > li img');
  news.forEach((item) => {
    item.classList.add('animated-element');
  });
  const h3 = document.querySelectorAll('.news .cards-card-body h3');
  const p = document.querySelectorAll('.news .cards-card-body > p:nth-child(2)');
  const strong = document.querySelectorAll('.news .cards-card-body p.button-container');

  [h3, p, strong].forEach((el) => {
    el.forEach((element) => {
      element.classList.add('animated-element');
    });
  });
}

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });
    ul.append(li);
  });
  ul.querySelectorAll('img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);
  addEventListenersToNews();
}
