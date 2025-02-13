document.addEventListener("DOMContentLoaded", () => {
    const musicToggleBtnBtn = document.getElementById("musicToggleBtn");
    const toggleMessageBtn = document.getElementById("toggleMessageBtn");
    const personalMessage = document.getElementById("personalMessage");
    const valentineMusic = document.getElementById("valentineMusic");

    let isMusicPlaying = false;
    let isMessageVisible = false;
  
    // 1. Play Music Button
    musicToggleBtn.addEventListener("click", () => {
        if (isMusicPlaying) {
          valentineMusic.pause();
          valentineMusic.currentTime = 0;
          musicToggleBtn.textContent = "Play Music";
        } else {
            valentineMusic.currentTime = 0;
            valentineMusic.play();
            musicToggleBtn.textContent = "Pause Music";
        }
        //Flip state
        isMusicPlaying = !isMusicPlaying;  
    });
  
    // 2. Reveal Message Button
    toggleMessageBtn.addEventListener("click", () => {
        if(isMessageVisible) {  
            //If message is visible, hide it
            personalMessage.style.display = "none";
            toggleMessageBtn.textContent = "Show Message";
        } else {
            //If message is hidden, show it
            personalMessage.style.display = "block";
            toggleMessageBtn.textContent = "Hide Message";
        }
        //Flip state
        isMessageVisible = !isMessageVisible;
    });

    // 3. Generate floating hearts & sparkles
    generateHearts(20);
    generateSparkles(15);
    startImageSpinCycle();
  });
  
  /**
   * Generate floating hearts
   * @param {number} count - Number of hearts to generate
   */
  function generateHearts(count) {
    const container = document.querySelector(".background-animations");
    for (let i = 0; i < count; i++) {
      const heart = document.createElement("div");
      heart.classList.add("heart");
      // Random horizontal start position
      heart.style.left = Math.random() * 100 + "vw";
      // Random delay so hearts don't all float at once
      heart.style.animationDelay = Math.random() * 5 + "s";
      // Random duration for variety
      heart.style.animationDuration = 8 + Math.random() * 5 + "s";
  
      container.appendChild(heart);
    }
  }
  
  /**
   * Generate sparkles
   * @param {number} count - Number of sparkles to generate
   */
  function generateSparkles(count) {
    const container = document.querySelector(".background-animations");
    for (let i = 0; i < count; i++) {
      const sparkle = document.createElement("div");
      sparkle.classList.add("sparkle");
      sparkle.style.left = Math.random() * 100 + "vw";
      sparkle.style.top = Math.random() * 100 + "vh";
      // Random delay & duration for variety
      sparkle.style.animationDelay = Math.random() * 5 + "s";
      sparkle.style.animationDuration = 3 + Math.random() * 3 + "s";
  
      container.appendChild(sparkle);
    }
  }



    function startImageSpinCycle() {
    const galleryImages = document.querySelectorAll(".photo-gallery img");
    // All possible image paths
    const imageSources = [
        "images/IMG_0114.jpg",
        "images/cabo.jpg",
        "images/IMG_1443.jpg",
        "images/IMG_0575.jpg",
        "images/aspen_selfie.jpg",
        "images/IMG_0613.jpg",
        "images/abbi.jpg",
        // ... Add more if you'd like
    ];
    
    // If you have fewer total images in imageSources than you do <img> tags,
    // you'll need to add more images or reduce the number of <img> tags.
    if (imageSources.length < galleryImages.length) {
        console.warn("Not enough images to guarantee uniqueness per cycle!");
        // You can handle that scenario differently if desired
    }
    
    // (Optional) You can initialize the images randomly once at page load
    assignUniqueRandomImages(galleryImages, imageSources);
    
    // Every 4 seconds, flip all images and pick new unique ones
    setInterval(() => {
        // 1. Apply spin to all images
        galleryImages.forEach(img => img.classList.add("spin"));
    
        // 2. Halfway into the spin (500ms), swap to new unique images
        setTimeout(() => {
        assignUniqueRandomImages(galleryImages, imageSources);
        }, 500);
    
        // 3. After the spin is done (1 second), remove the class
        setTimeout(() => {
        galleryImages.forEach(img => img.classList.remove("spin"));
        }, 1000);
    
    }, 4000); // Change 4000 to your desired interval in milliseconds
    }
    
    /**
     * Assigns a unique random image from 'imageSources' to each <img> in 'galleryImages'.
     * No two <img> elements get the same image in the same cycle.
     */
    function assignUniqueRandomImages(galleryImages, imageSources) {
    // 1. Generate an array of indexes [0, 1, 2, ..., imageSources.length - 1]
    const allIndexes = Array.from(imageSources.keys());
    // 2. Shuffle that array randomly
    shuffleArray(allIndexes);
    
    // 3. Assign each <img> one of the first 'n' indexes (where n = number of images in .photo-gallery)
    for (let i = 0; i < galleryImages.length; i++) {
        const index = allIndexes[i];
        galleryImages[i].src = imageSources[index];
    }
    }
    
    /**
     * Shuffles array in-place using the Fisher-Yates algorithm.
     */
    function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    }