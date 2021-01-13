console.log('it is in js')
const h1 = document.querySelector('h1')
const p = document.getElementById("text");
console.log(h1)
setTimeout(() => {
    h1.style.color = "lightgreen"
    p.style.color = "orange"
}, 1000)