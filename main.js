"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const header = document.querySelector(".header");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const body = document.querySelector("body");
const section1 = document.querySelector("#section--1");
const section2 = document.querySelector("#section--2");
const section3 = document.querySelector("#section--3");
const tabs = document.querySelectorAll(".operations__tab");
const tabsConintainer = document.querySelector(".operations__tab-container");
const tabscontent = document.querySelectorAll(".operations__content");
const nav = document.querySelector(".nav");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};
btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));
overlay.addEventListener("click", closeModal);
btnCloseModal.addEventListener("click", closeModal);

body.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeModal();
  }
});

const message = document.createElement("div");
message.classList.add("cookie-message");
message.innerHTML =
  'We use cookies to improve our web site. <button class="btn btn--close-cookie">Got it</button>';

header.append(message);

document
  .querySelector(".btn--close-cookie")
  .addEventListener("click", function (e) {
    message.remove();
  });

document
  .querySelector(".btn--scroll-to")
  .addEventListener("click", function (e) {
    section1.scrollIntoView({ behavior: "smooth" });
  });

document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav__link")) {
    const target = e.target.getAttribute("href");
    document.querySelector(target).scrollIntoView({ behavior: "smooth" });
  }
});

tabsConintainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");
  if (!clicked) return;
  tabs.forEach((t) => t.classList.remove("operations__tab--active"));
  tabscontent.forEach((el) =>
    el.classList.remove("operations__content--active")
  );
  clicked.classList.add("operations__tab--active");
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

const handleover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");
    siblings.forEach((el) => {
      if (el !== link) {
        el.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
};
nav.addEventListener("mouseover", handleover.bind(0.5));
nav.addEventListener("mouseout", handleover.bind(1));

const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);
/// observing sections
const allSections = document.querySelectorAll(".section");

const revealItems = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealItems, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});
// End
const imgTarget = document.querySelectorAll("img[data-src]");

const revealReal = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });
  observer.unobserve(entry.target);
};
const imgObserve = new IntersectionObserver(revealReal, {
  root: null,
  threshold: 0,
  rootMargin: "-200px",
});
imgTarget.forEach((img) => imgObserve.observe(img));

const slides = document.querySelectorAll(".slide");
let currSlid = 0;
const goSlide = function (slide) {
  slides.forEach(function (s, i) {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
    // console.log(i, slide);
  });
};

goSlide(0);

const maxLength = slides.length;

const btnRight = document.querySelector(".slider__btn--right");
const btnLeft = document.querySelector(".slider__btn--left");

const nextSlide = function () {
  if (currSlid === maxLength - 1) {
    currSlid = 0;
  } else {
    currSlid++;
  }
  goSlide(currSlid);
};
const prevSlide = function () {
  if (currSlid === 0) {
    currSlid = maxLength - 1;
  } else {
    currSlid--;
  }
  goSlide(currSlid);
};
btnRight.addEventListener("click", nextSlide);

btnLeft.addEventListener("click", prevSlide);

body.addEventListener("keydown", function (e) {
  if (e.key === "ArrowRight") {
    nextSlide();
  } else if (e.key === "ArrowLeft") {
    prevSlide();
  }
});

const dotsContainer = document.querySelector(".dots");

const createDots = function () {
  slides.forEach(function (_, i) {
    dotsContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};
createDots();
const allDots = document.querySelectorAll(".dots__dot");
allDots[0].classList.add("dots__dot--active");

const changeActive = function (e) {
  if (e.target.classList.contains("dots__dot")) {
    allDots.forEach((dot) => dot.classList.remove("dots__dot--active"));
    const { slide } = e.target.dataset;
    e.target.classList.add("dots__dot--active");
    goSlide(slide);
  }
};
dotsContainer.addEventListener("click", changeActive);
