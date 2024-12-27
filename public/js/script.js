// count function
function startCountUp(targetNumber, elementId, intervalTime, callback) {
    let currentNumber = 1;
    const counterElement = document.getElementById(elementId);
    const interval = setInterval(() => {
      counterElement.innerText = currentNumber.toLocaleString(); // Add commas for large numbers
      currentNumber++;
      // Clean-up function
      if (currentNumber > targetNumber) {
        clearInterval(interval);
        if (callback) callback(); // Call the next counter when done
      }
    }, intervalTime);
  }
  
  // Special function for fast counting
  function startFastCountUp(targetNumber, elementId, duration, callback) {
    let currentNumber = 0;
    const counterElement = document.getElementById(elementId);
    const increment = Math.ceil(targetNumber / (duration / 10)); // Calculate increment per 10ms
  
    const interval = setInterval(() => {
      currentNumber += increment;
      if (currentNumber > targetNumber) {
        currentNumber = targetNumber; // Ensure the final value is exact
      }
      counterElement.innerText = currentNumber.toLocaleString(); // Add commas for large numbers
  
      // Clean-up function
      if (currentNumber >= targetNumber) {
        clearInterval(interval);
        if (callback) callback();
      }
    }, 10); // Update every 10ms for smooth animation
  }
  
  // Function to start all counters sequentially
  function startAllCountersSequentially() {
    startCountUp(20, "tiktok", 100, () => {
      startCountUp(25, "instagram", 100, () => {
        startFastCountUp(1000000, "followers", 1000); // 1 second for fast counting
      });
    });
  }
  
  // Observer Setup
  document.addEventListener("DOMContentLoaded", function () {
    const targetSection = document.querySelector("#stats-section"); // Replace with the correct section ID
  
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          startAllCountersSequentially(); // Start counters sequentially
          observer.unobserve(entry.target); // Stop observing after triggering
        }
      });
    });
  
    observer.observe(targetSection);
  });
  


// navlink design
  document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.nav-link');
  
    
    const currentPath = window.location.pathname.split('/').pop();
  
    links.forEach(link => {
      const linkPath = link.getAttribute('href');
  
     
      if (currentPath === linkPath) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  });

  // tab setting 
  const tabs = document.querySelectorAll(".tab-panel");
  const tabButtons =document.querySelectorAll(".tab-button")
  // console.log(tabs)
  // console.log(tabButtons)
  function switchTab(event){
    // console.log(event.target)
    // console.log("hello")
    const selectedTab = event.target.getAttribute('data-tab');
    tabButtons.forEach(tab => tab.classList.remove('about-button-active'));
    tabs.forEach(panel => panel.classList.add('hidden'));
    event.target.classList.add('about-button-active');
    document.querySelector(`.tab-panel[data-tab="${selectedTab}"]`).classList.remove('hidden');
  }
  tabButtons.forEach(tab => {
    tab.addEventListener('click', switchTab);
});


const videoSources = [
  './public/video/0.mp4',
  './public/video/1.mp4',
  './public/video/2.mp4',
  './public/video/3.mp4',
  './public/video/4.mp4',
  './public/video/5.mp4',
  './public/video/6.mp4',
  './public/video/7.mp4',
  './public/video/8.mp4',
  './public/video/9.mp4'
];

// DOM elements
const addMoreButton = document.getElementById('add-more');
const removeButton = document.getElementById('remove');
const outputDiv = document.getElementById('video-container');

// Initial display
let array = videoSources.slice(0, 3); // Show first 3 videos

// Function to add hover play/pause functionality
function addVideoHoverEvents() {
  const videos = document.querySelectorAll('#video-container video'); // Target videos inside the container
  videos.forEach(video => {
    video.addEventListener('mouseenter', () => {
      video.play();
    });
    video.addEventListener('mouseleave', () => {
      video.pause();
      video.currentTime = 0; // Reset to the beginning
    });
  });
}

// Function to update output
function updateOutput(withAnimation = true) {
  const existingVideoSources = Array.from(outputDiv.querySelectorAll('video')).map(video => {
    // Use the relative `src` to compare
    const srcPath = new URL(video.src).pathname;
    return `.${srcPath}`;
  });

  // Add new elements if needed
  array.forEach(src => {
    if (!existingVideoSources.includes(src)) {
      const videoElement = document.createElement('div');
      videoElement.classList.add('col-md-4');
      videoElement.classList.add('video-container'); // For animation
      videoElement.innerHTML = `
        <video 
          src="${src}" 
          style="width: 100%; display: block; border-radius: 12px;" 
          muted
        ></video>`;
      if (withAnimation) {
        videoElement.style.animation = 'fadeIn 0.5s ease';
      }
      outputDiv.appendChild(videoElement);
    }
  });

  // Remove extra elements beyond the array
  Array.from(outputDiv.children).forEach(child => {
    const videoSrc = `.${new URL(child.querySelector('video').src).pathname}`;
    if (!array.includes(videoSrc)) {
      if (withAnimation) {
        child.style.animation = 'fadeOut 0.5s ease';
        setTimeout(() => child.remove(), 500); // Wait for animation to finish
      } else {
        child.remove();
      }
    }
  });

  // Add hover events for new videos
  addVideoHoverEvents();
}

// Function to show a button with a fade-in effect
function showButton(button) {
  button.style.display = 'inline-block'; // Ensure it's visible
}
// Function to hide a button with a fade-out effect
function hideButton(button) {
  setTimeout(() => {
    button.style.display = 'none';     // Hide after animation
  }, 500); // Match the duration of the fade-out animation
}
const buttonContainer = document.getElementById('controls')
// Add More functionality
addMoreButton.addEventListener('click', () => {
  // Add 3 more elements to the array
  const newElements = videoSources.slice(array.length, array.length + 3);
  array.push(...newElements);

  // Update output
  updateOutput();

  // Show the remove button if the array has more than 3 elements
  if (array.length > 3) {
    showButton(removeButton);
  }

  // Hide the Add More button after reaching the limit
  if (array.length >= videoSources.length) {
    hideButton(addMoreButton);
  }
});

// Remove functionality
removeButton.addEventListener('click', () => {
  // Calculate the number of items to remove
  const itemsToRemove = array.length % 3 === 0 ? 3 : array.length % 3;

  // Remove the calculated number of elements from the array
  array.splice(-itemsToRemove, itemsToRemove);

  // Update output
  updateOutput();

  // Hide the Remove button if no extra elements are left
  if (array.length <= 3) {
    hideButton(removeButton);
  }

  // Show the Add More button if hidden
  if (array.length < videoSources.length) {
    showButton(addMoreButton);
  }
});


// Initial setup for buttons
updateOutput();
if (array.length <= 3) {
  hideButton(removeButton);
}

//its fot the about card
const toggleButton = document.getElementById('toggle-button');
const hiddenItems = document.querySelectorAll('.media-hidden');

let isVisible = false; // Track visibility state

toggleButton.addEventListener('click', () => {
  if (isVisible) {
    // Hide items
    hiddenItems.forEach((item) => {
      item.classList.add('media-hidden-anim'); // Apply fadeOut animation
      item.addEventListener('animationend', () => {
        item.classList.remove('media-visible', 'media-hidden-anim'); // Cleanup classes
        item.style.display = 'none'; // Hide completely
      }, { once: true });
    });
    toggleButton.textContent = 'Alles bekijken';
  } else {
    // Show items
    hiddenItems.forEach((item) => {
      item.style.display = 'block'; // Ensure items are displayed
      item.classList.add('media-visible'); // Apply fadeIn animation
    });
    toggleButton.textContent = 'Minder bekijken'; // Change button text
  }
  isVisible = !isVisible; // Toggle visibility state
});


const specialButton= document.getElementById("special-button")
const specialTopDiv= document.getElementById("special-top-div")
const specialBottomDiv= document.getElementById("special-bottom-div")
let buttonShow = true;
function showContainer (){
  if(buttonShow){
    specialTopDiv.classList.remove("special-button-traslate-180")
    specialBottomDiv.classList.remove("special-button-traslate-180")
  }
  else{
    specialTopDiv.classList.add("special-button-traslate-180")
    specialBottomDiv.classList.add("special-button-traslate-180")
  }
  buttonShow = !buttonShow
  
}
specialButton.addEventListener("click",()=>showContainer())
showContainer ();

let n = 0;

function increaseFontSize() {
  if(n<=2){
    n++;
    console.log(n)
  }
  
  if (n <= 2) 
  {const tags = ["p", "h1", "h2","span"];

  tags.forEach((tag) => {
    const elements = document.getElementsByTagName(tag); // Get all elements of this tag
    for (let element of elements) {
      const computedStyle = window.getComputedStyle(element); // Get computed styles
      const fontSize = parseFloat(computedStyle.fontSize); // Get numeric font size
      if (fontSize) {
        element.style.fontSize = `${fontSize *1.1}px`; // Increase font size by 2px
      }
    }
  });
}
}
function decreaseFontSize() {
  if(n>= -2){
    n--;
    console.log(n)
  }
  if (n <= -3) return; // Limit the number of increases to 2

  // List of specific tags to adjust
  const tags = ["p", "h1", "h2","span"];

  tags.forEach((tag) => {
    const elements = document.getElementsByTagName(tag); // Get all elements of this tag
    for (let element of elements) {
      const computedStyle = window.getComputedStyle(element); // Get computed styles
      const fontSize = parseFloat(computedStyle.fontSize); // Get numeric font size
      if (fontSize) {
        element.style.fontSize = `${fontSize /1.1}px`; // Increase font size by 2px
      }
    }
  });
}
// console.log(n)
let isHighContrast = false; // State to track contrast
function toggleContrast() {
  if (!isHighContrast) {
    // Enable high contrast
    // Enable high contrast
    document.body.style.setProperty("background-color", "black", "important");
    document.body.style.setProperty("color", "#090909", "important");
    document.body.style.setProperty("filter", "contrast(1.5)", "important");
  } else {
    // Reset to default
    document.body.style.setProperty("background-color", "#090909", "important");
    document.body.style.setProperty("color", "black", "important");
    document.body.style.setProperty("filter", "contrast(1)", "important");
  }
  isHighContrast = !isHighContrast; // Toggle state
}
let isGrayscale = false; // State to track grayscale mode

function toggleGrayscale() {
  if (!isGrayscale) {
    // Apply grayscale
    document.body.style.filter = "grayscale(100%)";
  } else {
    // Remove grayscale
    document.body.style.filter = "none";
  }
  isGrayscale = !isGrayscale; // Toggle state
}
let isNegative = false; // State to track negative mode
function toggleNegative() {
  document.body.classList.toggle('negative', isNegative);
  isNegative = !isNegative;
}

// Add click event to the button
document.getElementById("increase-font").addEventListener("click", increaseFontSize);
document.getElementById("decrease-font").addEventListener("click", decreaseFontSize);
document.getElementById("toggle-contrast").addEventListener("click", toggleContrast);
document.getElementById("toggle-grayscale").addEventListener("click", toggleGrayscale);
document.getElementById("toggle-negative").addEventListener("click", toggleNegative);
