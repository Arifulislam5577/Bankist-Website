const btn = document.createElement('button');
btn.className='btn';
btn.textContent = 'Learn More'



const container = document.querySelector('.container');
const box = document.querySelector('.box');

// console.log(box.parentNode);
// console.log(box.parentElement);

// console.log(box.closest('.container').style.background = 'orangered');

for (let i = 0; i < 10; i++) {
    container.append(box.cloneNode(true));  
}

// box.prepend(btn)
// box.append(btn)
// box.prepend(btn.cloneNode(true))


// box.after(btn.cloneNode(true));
// box.prepend(btn.cloneNode(true));
// box.append(btn.cloneNode(true));
// box.before(btn)

box.addEventListener('click', () => {
    // btn.remove(); 
    btn.getAttribute();
    
})
console.log(this);

//====Don't do it
// box.setAttribute('class', 'box bg');