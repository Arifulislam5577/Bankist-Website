'use strict';

///////////////////////////////////////
// All Variable

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const navLink = document.querySelectorAll('.nav__link');
const operations = document.querySelectorAll('.operations');
const operationTabContainer = document.querySelector(
  '.operations__tab-container'
);
const operationTab = document.querySelectorAll('.operations__tab');
const operationContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btnOpenM =>
  btnOpenM.addEventListener('click', openModal)
);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//Smooth Scrolling

btnScrollTo.addEventListener('click', () => {
  section1.scrollIntoView({ behavior: 'smooth' });
});

navLink.forEach(element => {
  element.addEventListener('click', e => {
    e.preventDefault();
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  });
});

//=======Tab

operationTabContainer.addEventListener('click', e => {
  const clicked = e.target.closest('.operations__tab');

  if (!clicked) return;

  operationTab.forEach(tab => tab.classList.remove('operations__tab--active'));

  clicked.classList.add('operations__tab--active');

  operationContent.forEach(tc => {
    tc.classList.remove('operations__content--active');
  });

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//Nav fade

const eventHandler = (e, opacity) => {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const sibling = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    sibling.forEach(ele => {
      if (ele !== link) {
        ele.style.opacity = opacity;
      }
    });
    logo.style.opacity = opacity;
  }
};

nav.addEventListener('mouseover', e => {
  eventHandler(e, 0.5);
});
nav.addEventListener('mouseout', e => {
  eventHandler(e, 1);
});

// Sticky Header

const intCo = section1.getBoundingClientRect();

window.addEventListener('scroll', () => {
  if (window.scrollY > intCo.top) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
});

//Section Animation

const allSection = document.querySelectorAll('.section');

const revealSection = (entries, observer) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserver(entry, target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSection.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

//Lazy Loaded Img

const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, obeserver) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', () => {
    entry.target.classList.remove('lazy-img');
  });
};
const Imgobserve = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '-200px',
});
imgTargets.forEach(img => Imgobserve.observe(img));

//Slider

const slider = document.querySelector('.slider');
const slide = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');
let currentSlide = 0;
const maxSlide = slide.length - 1;

const createDot = () => {
  slide.forEach((_, i) => {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class='dots__dot' data-slide="${i}"></button>`
    );
  });
};
createDot();

dotContainer.addEventListener('click', e => {
  e.preventDefault();
  if (e.target.classList.contains('dots__dot')) {
    const { slide } = e.target.dataset;
    goToslide(slide);
    activeDot(slide);
  }
});

const activeDot = slide => {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};
activeDot(0);
const goToslide = sl => {
  slide.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - sl)}%)`;
  });
};
goToslide(0);

const nextSlide = () => {
  currentSlide === maxSlide ? (currentSlide = 0) : currentSlide++;
  goToslide(currentSlide);
  activeDot(currentSlide);
};

const prevSlide = () => {
  currentSlide === 0 ? (currentSlide = maxSlide) : currentSlide--;
  goToslide(currentSlide);
  activeDot(currentSlide);
};

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

//KeyBoard

document.addEventListener('keydown', e => {
  e.preventDefault();
  if (e.key === 'ArrowLeft') prevSlide();
  if (e.key === 'ArrowRight') nextSlide();
});
