//amount

window.addEventListener('DOMContentLoaded', () => {
    'use strict'


    const amount = document.querySelectorAll('.donate__circle'),
            numbers = document.querySelectorAll('.donate__sum > div'),
                input = document.querySelector('#donate__input')

    amount.forEach((item, i) => {
        item.addEventListener('click', () => {
            amount.forEach(pick => {
                pick.classList.remove('donate__circle-active')
            })
            item.classList.add('donate__circe-active')

            numbers.forEach(num => {
                num.classList.remove('donate__item-active')
            })

            numbers[i].classList.add('donate__item-active')
            input.value = `${numbers[i].textContent}`
        })
    })

    input.addEventListener('input', () => {
        if (input.value > 9999) {
            input.value = `${[...input.value].filter((item, i) => i < 4).join('')}`
        }
    })

    input.addEventListener('input', () => {
        for (let i = 0; i < numbers.length; i++) {

            if (input.value == numbers[i].textContent) {
                numbers.forEach((num, k) => {
                    num.classList.remove('donate__circe-active')
                    amount[k].classList.remove('donate__circe-active')
                });

                amount[i].classList.add('donate__circe-active');
                numbers[i].classList.add('donate__item-active');

                break;

            } else {
                numbers.forEach((num, k) => {
                    num.classList.remove('donate__item-active');
                    amount[k].classList.remove('donate__circe-active');
                });
            }
        }
    })
})