//pets

let isLeft = false;
let isRight = false;
let isScroll = false;
const carouselTablet = document.getElementsByClassName("pets__content")[0]
const cardsTablet = document.getElementsByClassName("pets__card")

function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex != 0) {
      randomIndex = Math.floor((Math.random() * (currentIndex)));
      currentIndex--;
      [array[currentIndex].innerHTML, array[randomIndex].innerHTML] = [
          array[randomIndex].innerHTML, array[currentIndex].innerHTML];
  }
  return array;
}

function slideLeft() {
  if (isScroll) return
  isScroll = true;
  const carousel = document.getElementsByClassName("pets__content")[0]
  const nodes = document.getElementsByClassName("pets__card")
  const length = carousel.clientWidth <= 600 ? 4 : 6
  const leftOffset = carousel.clientWidth <= 1160 ? 1185 :
    carousel.clientWidth <= 940 ? 1027 :
      carousel.clientWidth <= 600 ? 628 : 0

  if (isRight) {
    while (nodes.length > length) {
      nodes[0].remove()
    }
  }
  let images = []
  for (let index = 0; index < length; index++) {
    images.push(nodes[index].cloneNode(true))
  }
  shuffle(images)
  for (let index = 0; index < length; index++) {
    carousel.prepend(images[index])
  }
  carousel.scrollLeft = carousel.clientWidth <= 1160 ? 1185 :
    carousel.clientWidth <= 940 ? 940 :
      carousel.clientWidth <= 600 ? 600 : 0
  carousel.scrollBy({
    top: 0,
    left: 0 - leftOffset,
    behavior: "smooth"
  });
  isLeft = true;
  isRight = false;
  setTimeout(() => { isScroll = false }, 600)
}

function slideRight() {
  if (isScroll) return
  isScroll = true;
  const carousel = document.getElementsByClassName("pets__content")[0]
  const nodes = document.getElementsByClassName("pets__card")
  const length = carousel.clientWidth <= 600 ? 4 : 6

  const leftOffset = carousel.clientWidth <= 1160 ? 1185 :
    carousel.clientWidth <= 940 ? 1027 :
      carousel.clientWidth <= 600 ? 628 : 0
  if (isLeft) {
    while (nodes.length > length) {
      nodes[nodes.length - 1].remove()
    }
  }
  let images = []
  for (let index = 0; index < length; index++) {
    images.push(nodes[index].cloneNode(true))
  }
  shuffle(images)
  for (let index = 0; index < length; index++) {
    carousel.prepend(images[index])
  }
  carousel.scrollBy({
    top: 0,
    left: leftOffset,
    behavior: "smooth"
  });
  isRight = true;
  isLeft = false;
  setTimeout(() => { isScroll = false }, 600)
}


 //testimonials

const testimonialsLine = document.querySelector('.testimonials__feeds')
const testimonialsTrigger = document.querySelector('.testimonials__scroll-progress')
let step = 0
let check = [0]
let stepWidth = 0

if (window.screen.width > 1599) {
    stepWidth = 296
} else {
    stepWidth = 325
    testimonialsTrigger.setAttribute('max', 8)
}

testimonialsTrigger.addEventListener('input', () => {
    check.push(testimonialsTrigger.value)

    if (testimonialsTrigger.value <= 7 && check[check.length - 1] > check[check.length - 2]) {
        step += stepWidth * (check[check.length - 1] - check[check.length - 2])
    } else if (testimonialsTrigger.value > -1) {
        step -= stepWidth * (check[check.length - 2] - check[check.length - 1])
    }

    testimonialsLine.style.transform = `translateX(-${step}px)`

    if (check.length > 2) {
        check.splice(0, 1)
    }

})

// popup

const popupTrigger = document.querySelectorAll('.testimonials__block')
const popup = document.querySelector('.popup')
const popupWindow = document.querySelector('.popup__window')

popupTrigger.forEach(item => {

    item.addEventListener('click', () => {
        if (window.screen.width < 1000) {

            popup.style.display = 'block'
            popupWindow.innerHTML += `${item.outerHTML}`
            popupWindow.querySelector('.testimonials__block').style.display = 'block'
            popupWindow.querySelector('.testimonials__block').style.height = '100%'
            popupWindow.querySelectorAll('.testimonials__block-feedback')
                .forEach(p => p.style.cssText = 'overflow: hidden; line-height:20px;')
        }
    });
});

popup.addEventListener('click', (e) => {
    if (e.target === e.currentTarget || e.target.classList.contains('popup__close')) {
        popup.style.display = 'none'
        popupWindow.querySelector('.testimonials__block').remove()
    }
});
