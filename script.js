const orientationContainer = document.getElementById("orientationContainer");
const countdownElement = document.getElementById("Countdown-Containor");
const wishContainer = document.getElementById("bWishContainer");
const letterContainer = document.getElementById("letterContainer");

// Preload images and audio files
// Note: Add your image URLs in the images array and audio URLs in the audios array

    const images = [
      "https://files.catbox.moe/ao2tyy.jpg",
      "https://files.catbox.moe/lpl3uc.png",
      "https://files.catbox.moe/i3k3kl.jpg",
      "https://files.catbox.moe/sxm6bz.webp",
      "https://files.catbox.moe/mf6wjf.png"
    ];

    const audios = [
      "https://files.catbox.moe/z4l8j0.mp3"
    ];

    let loadedAssets = 0;
    const totalAssets = images.length + audios.length;

    function assetLoaded() {
      loadedAssets++;
      if (loadedAssets === totalAssets) {
        document.getElementById("loading-screen").style.display = "none";
        console.log("All assets loaded successfully!");

      }
    }

    // Preload images
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = assetLoaded;
      img.onerror = assetLoaded;
    });

    // Preload audio
    audios.forEach((src) => {
      const audio = new Audio();
      audio.src = src;
      audio.preload = "auto";
      audio.oncanplaythrough = assetLoaded;
      audio.onerror = assetLoaded;
    });

// Function to check the orientation and show/hide the message
function checkOrientation() {
    
    if (window.innerHeight > window.innerWidth) {
        orientationContainer.style.display = "flex";
        //countdownElement.style.display = "none";
    } else {
        orientationContainer.style.display = "none";
        //countdownElement.style.display = "flex";
    }
}

// Add event listeners for resize and orientation change
window.addEventListener("resize", checkOrientation);
window.addEventListener("orientationchange", checkOrientation);
window.addEventListener("load", checkOrientation);


//Countdown Timer
const targetDate = new Date("2025-01-19T00:00:00").getTime();

const countdownInterval = setInterval(() => {
const now = new Date().getTime();
const diff = targetDate - now;

if (diff < 0) {
clearInterval(countdownInterval);

document.getElementById("startParty").style.display = "block";
document.getElementById("countdown").textContent = "Time's up!";
return;

}

const days = Math.floor(diff / (1000 * 60 * 60 * 24));
const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
const seconds = Math.floor((diff % (1000 * 60)) / 1000);

document.getElementById("countdown").textContent =
`${days}d ${hours}h ${minutes}m ${seconds}s`;
}, 1000);


//funtion to show date time
function updateDateTime() {
      const now = new Date();
      document.getElementById("dateTime").innerHTML = now.toLocaleString();
    }

    // Update every second
    setInterval(updateDateTime, 1000);
    updateDateTime(); // initial call



  
// Function to trigger confetti
function triggerConfetti() {
confetti({
particleCount: 300,
spread: 100,
origin: { y: 0.6 },
colors: ['#ff80ab', '#f06292', '#fce4ec', '#ff4081']
});

countdownElement.style.display = "none";
wishContainer.style.display = "flex";


startMusic();

}


// Function to enter fullscreen mode
function enterFullscreen() {
const elem = document.documentElement;
if (elem.requestFullscreen) {
elem.requestFullscreen();
} else if (elem.webkitRequestFullscreen) {
elem.webkitRequestFullscreen(); // Safari
} else if (elem.msRequestFullscreen) {
elem.msRequestFullscreen(); // IE11
}
}
// Function to start music
const music = document.getElementById("bgMusic");
const audioSource = document.getElementById("audioSource");
function startMusic(){
audioSource.src = "https://files.catbox.moe/z4l8j0.mp3";
music.load();
music.volume = 0.3;
music.play();
}

// funtion to go to letter page

function toLetterPage() {
    wishContainer.style.display = "none";
    letterContainer.style.display = "flex";
    typeWriter()
    
}

// Function to go back to the countdown page
function toWishPage() {
    letterContainer.style.display = "none";
    wishContainer.style.display = "flex";
    
}

// letter animation
const faders = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, {
    threshold: 0.1
  });

  faders.forEach(fadeEl => {
    observer.observe(fadeEl);
  });



var i = 0;
var txt = 'Dear Friend,\\n\\nI hope this letter finds you in great spirits! As we approach the New Year, I wanted to take a moment to express my heartfelt wishes for you. May this coming year be filled with joy, success, and countless blessings.\\n\\nLet’s make unforgettable memories together!\\n\\nWith warm regards,\\nYour Friend';
var speed = 50;

function typeWriter() {
  if (i < txt.length) {
    document.getElementById("letterText").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}
