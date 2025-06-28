const text = " Solve";
const typingSpeed = 150;
const erasingSpeed = 100;
const delayBeforeErase = 1000;
const delayBeforeType = 500;
let i = 0;
let typing = true;

function typeLoop() {
  const element = document.getElementById("type-text");

  if (typing) {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(typeLoop, typingSpeed);
    } else {
      typing = false;
      setTimeout(typeLoop, delayBeforeErase);
    }
  } else {
    if (i > 0) {
      element.textContent = text.substring(0, i - 1);
      i--;
      setTimeout(typeLoop, erasingSpeed);
    } else {
      typing = true;
      setTimeout(typeLoop, delayBeforeType);
    }
  }
}

window.onload = typeLoop;
