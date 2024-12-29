const videoSources = [
    "./public/video/0.mp4",
    "./public/video/1.mp4",
    "./public/video/2.mp4",
    "./public/video/3.mp4",
    "./public/video/4.mp4",
    "./public/video/5.mp4",
    "./public/video/6.mp4",
    "./public/video/7.mp4",
    "./public/video/8.mp4",
    "./public/video/9.mp4",
  ];
  
  // DOM elements
  const addMoreButton = document.getElementById("add-more");
  const removeButton = document.getElementById("remove");
  const outputDiv = document.getElementById("video-container");
  
  // Initial display
  let array = videoSources.slice(0, 3); // Show first 3 videos
  
  // Function to add hover play/pause functionality
  function addVideoHoverEvents() {
    const videos = document.querySelectorAll("#video-container video"); // Target videos inside the container
    videos.forEach((video) => {
      video.addEventListener("mouseenter", () => {
        video.play();
      });
      video.addEventListener("mouseleave", () => {
        video.pause();
        video.currentTime = 0; // Reset to the beginning
      });
    });
  }
  
  // Function to update output
  function updateOutput(withAnimation = true) {
    const existingVideoSources = Array.from(
      outputDiv.querySelectorAll("video")
    ).map((video) => {
      // Use the relative `src` to compare
      const srcPath = new URL(video.src).pathname;
      return `.${srcPath}`;
    });
  
    // Add new elements if needed
    array.forEach((src) => {
      if (!existingVideoSources.includes(src)) {
        const videoElement = document.createElement("div");
        videoElement.classList.add("col-md-4");
        videoElement.classList.add("video-container"); // For animation
        videoElement.innerHTML = `
          <video 
            src="${src}" 
            style="width: 100%; display: block; border-radius: 12px;" 
            muted
          ></video>`;
        if (withAnimation) {
          videoElement.style.animation = "fadeIn 0.5s ease";
        }
        outputDiv.appendChild(videoElement);
      }
    });
  
    // Remove extra elements beyond the array
    Array.from(outputDiv.children).forEach((child) => {
      const videoSrc = `.${new URL(child.querySelector("video").src).pathname}`;
      if (!array.includes(videoSrc)) {
        if (withAnimation) {
          child.style.animation = "fadeOut 0.5s ease";
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
    button.style.display = "inline-block"; // Ensure it's visible
  }
  // Function to hide a button with a fade-out effect
  function hideButton(button) {
    setTimeout(() => {
      button.style.display = "none"; // Hide after animation
    }, 500); // Match the duration of the fade-out animation
  }
  const buttonContainer = document.getElementById("controls");
  // Add More functionality
  addMoreButton.addEventListener("click", () => {
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
  removeButton.addEventListener("click", () => {
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
  const toggleButton = document.getElementById("toggle-button");
  const hiddenItems = document.querySelectorAll(".media-hidden");
  
  let isVisible = false; // Track visibility state
  
  toggleButton.addEventListener("click", () => {
    if (isVisible) {
      // Hide items
      hiddenItems.forEach((item) => {
        item.classList.add("media-hidden-anim"); // Apply fadeOut animation
        item.addEventListener(
          "animationend",
          () => {
            item.classList.remove("media-visible", "media-hidden-anim"); // Cleanup classes
            item.style.display = "none"; // Hide completely
          },
          { once: true }
        );
      });
      toggleButton.textContent = "Alles bekijken";
    } else {
      // Show items
      hiddenItems.forEach((item) => {
        item.style.display = "block"; // Ensure items are displayed
        item.classList.add("media-visible"); // Apply fadeIn animation
      });
      toggleButton.textContent = "Minder bekijken"; // Change button text
    }
    isVisible = !isVisible; // Toggle visibility state
  });