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
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        startAllCountersSequentially(); // Start counters sequentially
        observer.unobserve(entry.target); // Stop observing after triggering
      }
    });
  });

  observer.observe(targetSection);
});

// navlink design
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".nav-link");

  const currentPath = window.location.pathname.split("/").pop();

  links.forEach((link) => {
    const linkPath = link.getAttribute("href");

    if (currentPath === linkPath) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
});

// tab setting
const tabs = document.querySelectorAll(".tab-panel");
const tabButtons = document.querySelectorAll(".tab-button");
// console.log(tabs)
// console.log(tabButtons)
function switchTab(event) {
  // console.log(event.target)
  // console.log("hello")
  const selectedTab = event.target.getAttribute("data-tab");
  tabButtons.forEach((tab) => tab.classList.remove("about-button-active"));
  tabs.forEach((panel) => panel.classList.add("hidden"));
  event.target.classList.add("about-button-active");
  document
    .querySelector(`.tab-panel[data-tab="${selectedTab}"]`)
    .classList.remove("hidden");
}
tabButtons.forEach((tab) => {
  tab.addEventListener("click", switchTab);
});


const specialButton = document.getElementById("special-button");
const specialText = document.getElementById("special-text");
const specialTopDiv = document.getElementById("special-top-div");
const specialBottomDiv = document.getElementById("special-bottom-div");
const specialContainer = document.getElementById("special-top-container");
let buttonShow = true;
function showContainer() {
  if (buttonShow) {
    // specialTopDiv.classList.remove("special-button-traslate-180");
    specialContainer.classList.remove("special-button-traslate-180");
    // specialBottomDiv.classList.remove("special-button-traslate-180");
  } else {
    // specialTopDiv.classList.add("special-button-traslate-180");
    // specialBottomDiv.classList.add("special-button-traslate-180");
    specialContainer.classList.add("special-button-traslate-180");
  
  }
  buttonShow = !buttonShow;
}
specialButton.addEventListener("click", () => showContainer());
showContainer();

let n = 0;
const originalFontSizes = new Map();
// console.log(originalFontSizes)
// Store original font sizes of specific tags
function storeOriginalFontSizes() {
  const tags = ["p", "h1", "h2", "span"];
  tags.forEach((tag) => {
    const elements = document.getElementsByTagName(tag);
    for (let element of elements) {
      if (!originalFontSizes.has(element)) {
        const computedStyle = window.getComputedStyle(element);
        const fontSize = parseFloat(computedStyle.fontSize);
        originalFontSizes.set(element, fontSize);
      }
    }
  });
}
storeOriginalFontSizes();
// console.log(originalFontSizes)
function increaseFontSize() {
  if (n <= 2) {
    n++;
    console.log(n);
  }
  if(n==0){
    document.getElementById("increase-font").classList.remove('active');
    document.getElementById("decrease-font").classList.remove('active');
  }
  if (n <= 2) {
    document.getElementById("increase-font").classList.add('active');
    const tags = ["p", "h1", "h2", "span"];

    tags.forEach((tag) => {
      const elements = document.getElementsByTagName(tag); // Get all elements of this tag
      for (let element of elements) {
        const computedStyle = window.getComputedStyle(element); // Get computed styles
        const fontSize = parseFloat(computedStyle.fontSize); // Get numeric font size
        if (fontSize) {
          element.style.fontSize = `${fontSize * 1.1}px`; // Increase font size by 2px
        }
      }
    });
  }
}
function decreaseFontSize() {
  if (n >= -2) {
    n--;
    console.log(n);
  }
  if (n <= -3) return; // Limit the number of increases to 2
  if(n==0){
    document.getElementById("increase-font").classList.remove('active');
    document.getElementById("decrease-font").classList.remove('active');
  }
  // List of specific tags to adjust
  if(n<0){
    document.getElementById("decrease-font").classList.add('active');
  }
  const tags = ["p", "h1", "h2", "span"];
  tags.forEach((tag) => {
    const elements = document.getElementsByTagName(tag); // Get all elements of this tag
    for (let element of elements) {
      const computedStyle = window.getComputedStyle(element); // Get computed styles
      const fontSize = parseFloat(computedStyle.fontSize); // Get numeric font size
      if (fontSize) {
        element.style.fontSize = `${fontSize / 1.1}px`; // Increase font size by 2px
      }
    }
  });
}
let isNegative = false; // State to track negative mode
let isHighContrast = false; // State to track contrast
let isGrayscale = false; // State to track grayscale mode
let isUnderline = false;
let isFont = false;
let isTheme = false;

// Retrieve saved states from localStorage
document.addEventListener("DOMContentLoaded", function () {
  isNegative = localStorage.getItem("isNegative") === "true";
  isHighContrast = localStorage.getItem("isHighContrast") === "true";
  isGrayscale = localStorage.getItem("isGrayscale") === "true";
  isUnderline = localStorage.getItem("isUnderline") === "true";
  isFont = localStorage.getItem("isFont") === "true";
  isTheme = localStorage.getItem("isTheme") === "true";

  // Apply the settings if retrieved as true
  if (isNegative) {
    Array.from(document.getElementsByClassName("no-invert")).forEach((logo) => {
      logo.classList.add("negative-invert");
    });

    document.getElementById("toggle-negative").classList.add('active');
    document.body.classList.add("negative");
    document.body.classList.remove("light");
    document.body.classList.remove("high-contrast");
    document.body.classList.remove("grayscale-100");
    ["p", "h1", "h2", "button"].forEach((tag) => {
      Array.from(document.getElementsByTagName(tag)).forEach((element) => {
        element.classList.add("negative-invert");
      });
    });
    Array.from(document.getElementsByClassName("font-black-class")).forEach((logo) => {
      logo.classList.remove("font-black");
    });
    Array.from(document.getElementsByClassName("bg-white-class")).forEach((logo) => {
      logo.classList.remove("bg-white");
    });
    ["button"].forEach((tag) => {
      Array.from(document.getElementsByTagName(tag)).forEach((element) => {
        element.classList.remove("light-button");
      });
    });
    document.getElementById("toggle-contrast").classList.remove('active');
    document.getElementById("toggle-grayscale").classList.remove('active');
    document.getElementById("toggle-theme").classList.remove('active');
    specialText.classList.remove("negative-invert");
    specialButton.classList.remove("negative-invert");
  }
  if (isHighContrast) {
    document.getElementById("toggle-contrast").classList.add('active');
    document.getElementById("toggle-negative").classList.remove('active');
    document.getElementById("toggle-grayscale").classList.remove('active');
    document.getElementById("toggle-theme").classList.remove('active');
    document.body.classList.add("high-contrast");
    document.body.classList.remove("grayscale-100");
    document.body.classList.remove("negative");
    document.body.classList.remove("light");
    Array.from(document.getElementsByClassName("font-black-class")).forEach((logo) => {
      logo.classList.remove("font-black");
    });
    Array.from(document.getElementsByClassName("bg-white-class")).forEach((logo) => {
      logo.classList.remove("bg-white");
    });
    Array.from(document.getElementsByClassName("no-invert")).forEach((logo) => {
      logo.classList.remove("negative-invert");
    });
    ["button"].forEach((tag) => {
      Array.from(document.getElementsByTagName(tag)).forEach((element) => {
        element.classList.remove("light-button");
      });
    });
    ["p", "h1", "h2", "button"].forEach((tag) => {
      Array.from(document.getElementsByTagName(tag)).forEach((element) => {
        element.classList.remove("negative-invert");
      });
    });
  }
  if (isGrayscale) {
    document.getElementById("toggle-grayscale").classList.add('active');
    document.body.classList.add("grayscale-100");
    document.body.classList.remove("negative");
    document.body.classList.remove("high-contrast");
    document.body.classList.remove("light");
    document.getElementById("toggle-contrast").classList.remove('active');
    document.getElementById("toggle-negative").classList.remove('active');
    document.getElementById("toggle-theme").classList.remove('active');
    Array.from(document.getElementsByClassName("font-black-class")).forEach((logo) => {
      logo.classList.remove("font-black");
    });
    Array.from(document.getElementsByClassName("bg-white-class")).forEach((logo) => {
      logo.classList.remove("bg-white");
    });
    Array.from(document.getElementsByClassName("no-invert")).forEach((logo) => {
      logo.classList.remove("negative-invert");
    });
    ["p", "h1", "h2", "button"].forEach((tag) => {
      Array.from(document.getElementsByTagName(tag)).forEach((element) => {
        element.classList.remove("negative-invert");
      });
    });
    ["button"].forEach((tag) => {
      Array.from(document.getElementsByTagName(tag)).forEach((element) => {
        element.classList.remove("light-button");
      });
    });
  }
  if (isUnderline) {
    const elements = document.getElementsByTagName("a");
    Array.from(elements).forEach((element) => {
      element.classList.add("underline");
    });
    document.getElementById("toggle-underline").classList.add('active');
  }
  if (isFont) {
    document.body.classList.add("font-inter");
    document.getElementById("toggle-font").classList.add('active');
  }
  if (isTheme) {
    const logo = document.getElementById("logo-img");
    logo.classList.add("logo-bg");
    document.body.classList.add("light");
    document.body.classList.remove("high-contrast");
    document.body.classList.remove("grayscale-100");
    document.body.classList.remove("negative");
    document.getElementById("toggle-theme").classList.add('active');
    document.getElementById("toggle-contrast").classList.remove('active');
    document.getElementById("toggle-negative").classList.remove('active');
    document.getElementById("toggle-grayscale").classList.remove('active');
    Array.from(document.getElementsByClassName("font-black-class")).forEach((logo) => {
      logo.classList.add("font-black");
    });
    Array.from(document.getElementsByClassName("bg-white-class")).forEach((logo) => {
      logo.classList.add("bg-white");
    });
    ["p", "h1", "h2", "button"].forEach((tag) => {
      Array.from(document.getElementsByTagName(tag)).forEach((element) => {
        element.classList.remove("negative-invert");
      });
    });
    ["button"].forEach((tag) => {
      Array.from(document.getElementsByTagName(tag)).forEach((element) => {
        element.classList.add("light-button");
      });
    });
    specialButton.classList.remove("light-button");
  }
});

// Save states to localStorage
function saveToLocalStorage() {
  localStorage.setItem("isNegative", JSON.stringify(isNegative));
  localStorage.setItem("isHighContrast", JSON.stringify(isHighContrast));
  localStorage.setItem("isGrayscale", JSON.stringify(isGrayscale));
  localStorage.setItem("isUnderline", JSON.stringify(isUnderline));
  localStorage.setItem("isFont", JSON.stringify(isFont));
  localStorage.setItem("isTheme", JSON.stringify(isTheme));
  console.log("inside the save localStorage");
}

// Function to toggle contrast
function toggleContrast() {
  if (!isHighContrast) {
    document.getElementById("toggle-contrast").classList.add('active');
    document.getElementById("toggle-negative").classList.remove('active');
    document.getElementById("toggle-grayscale").classList.remove('active');
    document.getElementById("toggle-theme").classList.remove('active');
    document.body.classList.add("high-contrast");
    document.body.classList.remove("grayscale-100");
    document.body.classList.remove("negative");
    document.body.classList.remove("light");
    Array.from(document.getElementsByClassName("font-black-class")).forEach((logo) => {
      logo.classList.remove("font-black");
    });
    Array.from(document.getElementsByClassName("bg-white-class")).forEach((logo) => {
      logo.classList.remove("bg-white");
    });
    Array.from(document.getElementsByClassName("no-invert")).forEach((logo) => {
      logo.classList.remove("negative-invert");
    });
    ["button"].forEach((tag) => {
      Array.from(document.getElementsByTagName(tag)).forEach((element) => {
        element.classList.remove("light-button");
      });
    });
    ["p", "h1", "h2", "button"].forEach((tag) => {
      Array.from(document.getElementsByTagName(tag)).forEach((element) => {
        element.classList.remove("negative-invert");
      });
    });
  } else {
    document.getElementById("toggle-contrast").classList.remove('active');
    document.body.classList.remove("high-contrast");
  }
  isHighContrast = !isHighContrast;
  isGrayscale = false;
  isNegative = false;
  isTheme=false;
  saveToLocalStorage(); // Save state
}

// Function to toggle grayscale
function toggleGrayscale() {
  if (!isGrayscale) {
    document.getElementById("toggle-grayscale").classList.add('active');
    document.body.classList.add("grayscale-100");
    document.body.classList.remove("negative");
    document.body.classList.remove("high-contrast");
    document.body.classList.remove("light");
    Array.from(document.getElementsByClassName("font-black-class")).forEach((logo) => {
      logo.classList.remove("font-black");
    });
    Array.from(document.getElementsByClassName("bg-white-class")).forEach((logo) => {
      logo.classList.remove("bg-white");
    });
    Array.from(document.getElementsByClassName("no-invert")).forEach((logo) => {
      logo.classList.remove("negative-invert");
    });
    ["p", "h1", "h2", "button"].forEach((tag) => {
      Array.from(document.getElementsByTagName(tag)).forEach((element) => {
        element.classList.remove("negative-invert");
      });
    });
    ["button"].forEach((tag) => {
      Array.from(document.getElementsByTagName(tag)).forEach((element) => {
        element.classList.remove("light-button");
      });
    });
    document.getElementById("toggle-contrast").classList.remove('active');
    document.getElementById("toggle-negative").classList.remove('active');
    document.getElementById("toggle-theme").classList.remove('active');
  } else {
    document.getElementById("toggle-grayscale").classList.remove('active');
    document.body.classList.remove("grayscale-100");
  }
  isGrayscale = !isGrayscale;
  isNegative = false;
  isHighContrast = false;
  isTheme=false;
  saveToLocalStorage(); // Save state
}

// Function to toggle negative mode
function toggleNegative() {
  // console.log("inside neg")
  if (!isNegative) {
    Array.from(document.getElementsByClassName("no-invert")).forEach((logo) => {
      logo.classList.add("negative-invert");
    });
    document.getElementById("toggle-negative").classList.add('active');
    document.body.classList.add("negative");
    document.body.classList.remove("light");
    document.body.classList.remove("high-contrast");
    document.body.classList.remove("grayscale-100");
    document.getElementById("toggle-contrast").classList.remove('active');
    document.getElementById("toggle-grayscale").classList.remove('active');
    document.getElementById("toggle-theme").classList.remove('active');
    Array.from(document.getElementsByClassName("font-black-class")).forEach((logo) => {
      logo.classList.remove("font-black");
    });
    Array.from(document.getElementsByClassName("bg-white-class")).forEach((logo) => {
      logo.classList.remove("bg-white");
    });
    ["p", "h1", "h2", "button"].forEach((tag) => {
      Array.from(document.getElementsByTagName(tag)).forEach((element) => {
        element.classList.add("negative-invert");
      });
    });
    ["button"].forEach((tag) => {
      Array.from(document.getElementsByTagName(tag)).forEach((element) => {
        element.classList.remove("light-button");
      });
    });
    specialText.classList.remove("negative-invert");
    specialButton.classList.remove("negative-invert");
  } else {
    document.getElementById("toggle-negative").classList.remove('active');
    Array.from(document.getElementsByClassName("no-invert")).forEach((logo) => {
      logo.classList.remove("negative-invert");
    });
    document.body.classList.remove("negative");
    ["p", "h1", "h2", "button"].forEach((tag) => {
      Array.from(document.getElementsByTagName(tag)).forEach((element) => {
        element.classList.remove("negative-invert");
      });
    });
  }
  isNegative = !isNegative;
  isGrayscale = false;
  isHighContrast = false;
  isTheme=false;
  saveToLocalStorage(); // Save state
}

// Function to toggle underline
function toggleUnderline() {
  const elements = document.getElementsByTagName("a");
  if (!isUnderline) {
    Array.from(elements).forEach((element) => {
      element.classList.add("underline");
    });
     document.getElementById("toggle-underline").classList.add('active');
  } else {
    document.getElementById("toggle-underline").classList.remove('active');
    Array.from(elements).forEach((element) => {
      element.classList.remove("underline");
    });
  }
  isUnderline = !isUnderline;
  saveToLocalStorage(); // Save state
}

// Function to toggle font
function toggleFont() {
  if (!isFont) {
    document.body.classList.add("font-inter");
    document.getElementById("toggle-font").classList.add('active');
  } else {
    document.body.classList.remove("font-inter");
    document.getElementById("toggle-font").classList.remove('active');
  }
  isFont = !isFont;
  saveToLocalStorage(); // Save state
}

// Function to toggle theme
function toggleTheme() {
  const logo = document.getElementById("logo-img");
  if (!isTheme) {
    logo.classList.add("logo-bg");
    document.getElementById("toggle-theme").classList.add('active');
    document.body.classList.add("light");
    document.body.classList.remove("high-contrast");
    document.body.classList.remove("grayscale-100");
    document.body.classList.remove("negative");
    ["p", "h1", "h2", "button"].forEach((tag) => {
      Array.from(document.getElementsByTagName(tag)).forEach((element) => {
        element.classList.remove("negative-invert");
      });
    });
    Array.from(document.getElementsByClassName("no-invert")).forEach((logo) => {
      logo.classList.remove("negative-invert");
    });
    Array.from(document.getElementsByClassName("font-black-class")).forEach((logo) => {
      logo.classList.add("font-black");
    });
    Array.from(document.getElementsByClassName("bg-white-class")).forEach((logo) => {
      logo.classList.add("bg-white");
    });
    ["button"].forEach((tag) => {
      Array.from(document.getElementsByTagName(tag)).forEach((element) => {
        element.classList.add("light-button");
      });
    });
    specialButton.classList.remove("light-button");
    document.getElementById("toggle-contrast").classList.remove('active');
    document.getElementById("toggle-negative").classList.remove('active');
    document.getElementById("toggle-grayscale").classList.remove('active');
  } else {
    document.getElementById("toggle-theme").classList.remove('active');
    logo.classList.remove("logo-bg");
    document.body.classList.remove("light");
    Array.from(document.getElementsByClassName("font-black-class")).forEach((logo) => {
      logo.classList.remove("font-black");
    });
    Array.from(document.getElementsByClassName("bg-white-class")).forEach((logo) => {
      logo.classList.remove("bg-white");
    });
    ["button"].forEach((tag) => {
      Array.from(document.getElementsByTagName(tag)).forEach((element) => {
        element.classList.remove("light-button");
      });
    });
  }
  isTheme = !isTheme;
  isGrayscale = false;
  isNegative = false;
  isHighContrast= false;
  saveToLocalStorage(); // Save state
}

// Function to clear all settings
function clearAll() {
  isGrayscale = false;
  isHighContrast = false;
  isFont = false;
  isUnderline = false;
  isNegative = false;
  isTheme = false;

  document.body.classList.remove("high-contrast");
  document.body.classList.remove("grayscale-100");
  document.body.classList.remove("font-inter");
  document.body.classList.remove("negative");
  document.body.classList.remove("light");
  document.getElementById("logo-img").classList.remove("logo-bg");
  document.getElementById("toggle-contrast").classList.remove('active');
  document.getElementById("toggle-negative").classList.remove('active');
  document.getElementById("toggle-grayscale").classList.remove('active');
  document.getElementById("toggle-theme").classList.remove('active');
  document.getElementById("increase-font").classList.remove('active');
  document.getElementById("decrease-font").classList.remove('active');
  document.getElementById("toggle-underline").classList.remove('active');
  document.getElementById("toggle-font").classList.remove('active');
  const elements = document.getElementsByTagName("a");
  Array.from(elements).forEach((element) => {
    element.classList.remove("underline");
  });
  Array.from(document.getElementsByClassName("no-invert")).forEach((logo) => {
    logo.classList.remove("negative-invert");
  });
  ["p", "h1", "h2", "button"].forEach((tag) => {
    Array.from(document.getElementsByTagName(tag)).forEach((element) => {
      element.classList.remove("negative-invert");
    });
  });
  ["button"].forEach((tag) => {
    Array.from(document.getElementsByTagName(tag)).forEach((element) => {
      element.classList.remove("light-button");
    });
  });
  Array.from(document.getElementsByClassName("font-black-class")).forEach((logo) => {
    logo.classList.remove("font-black");
  });
  Array.from(document.getElementsByClassName("bg-white-class")).forEach((logo) => {
    logo.classList.remove("bg-white");
  });
  originalFontSizes.forEach((originalSize, element) => {
    element.style.fontSize = `${originalSize}px`;
  });
  saveToLocalStorage();
}

// Add click events to buttons
document
  .getElementById("increase-font")
  .addEventListener("click", increaseFontSize);
document
  .getElementById("decrease-font")
  .addEventListener("click", decreaseFontSize);
document
  .getElementById("toggle-contrast")
  .addEventListener("click", toggleContrast);
document
  .getElementById("toggle-grayscale")
  .addEventListener("click", toggleGrayscale);
document
  .getElementById("toggle-negative")
  .addEventListener("click", toggleNegative);
document
  .getElementById("toggle-underline")
  .addEventListener("click", toggleUnderline);
document.getElementById("toggle-font").addEventListener("click", toggleFont);
document.getElementById("clear-all").addEventListener("click", clearAll);
document.getElementById("toggle-theme").addEventListener("click", toggleTheme);

function showSpinner() {
  const spinner = document.getElementById("spinner");
  spinner.classList.add("active");
}

// Function to hide the spinner
function hideSpinner() {
  const spinner = document.getElementById("spinner");
  spinner.classList.remove("active");
}

// Add event listeners for loading state
document.addEventListener("DOMContentLoaded", () => {
  const loadingOverlay = document.getElementById("loading-overlay");

  // Simulate loading time (replace this with your logic)
  setTimeout(() => {
    loadingOverlay.classList.add("hidden"); // Hide the overlay
  }, 100); // 2 seconds loading time
});


setTimeout(() => {
  loadingOverlay.remove(); // Completely remove the overlay from the DOM
}, 100); 