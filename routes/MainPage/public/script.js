
// Select the div that contains the list of objects
const animateOnScroll = document.querySelector('.List');

// Function to check if an element is in the viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Function to add the 'show' class to the div when it is scrolled upon
function addShowClass() {
  if (isInViewport(animateOnScroll)) {
    animateOnScroll.classList.add('show');
    animateOnScroll.classList.remove('hide');
  }
}

window.addEventListener("scroll", addShowClass);


// Add the event listener to trigger the animation when the div is scrolled upon



var input = document.querySelector('input');
input.addEventListener('focus', function() {
  document.body.classList.add('stop-scrolling');
});
input.addEventListener('blur', function() {
  document.body.classList.remove('stop-scrolling');
});


document.getElementById("Input").addEventListener("focus", function() {
  document.body.classList.add('stop-scrolling');
});


window.addEventListener('keydown',function(e){if(e.keyIdentifier=='U+000A'||e.keyIdentifier=='Enter'||e.keyCode==13){if(e.target.nodeName=='INPUT'&&e.target.type=='text'){e.preventDefault();return false;}}},true);


