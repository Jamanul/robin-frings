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
    startCountUp(20, "tiktok", 30, () => {
      startCountUp(25, "instagram", 30, () => {
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
  



//   gsap
 