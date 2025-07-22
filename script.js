const orientationContainer = document.getElementById("orientationContainer");
const countdownElement = document.getElementById("Countdown-Containor");
const wishContainer = document.getElementById("bWishContainer");
const letterContainer = document.getElementById("letterContainer");
const cardContainer = document.getElementById("cardContainer");
const CardtoLetterButton = document.getElementById("CardtoLetterButton");

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
      "https://files.catbox.moe/z4l8j0.mp3",
      "https://files.catbox.moe/edv654.mp3"
    ];

    let loadedAssets = 0;
    const totalAssets = images.length + audios.length;

     function updateProgress() {
      const progress = ((loadedAssets / totalAssets) * 100).toFixed(0);
      document.getElementById("progress-bar").style.width = `${progress}%`;
    }

    function assetLoaded() {
      updateProgress();
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

countdownMusic.pause();
startMusic("https://files.catbox.moe/z4l8j0.mp3");

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
function startMusic(Source){
audioSource.src = Source;
music.load();
music.volume = 0.3;
music.play();
console.log("Music started");
console.log("Music source set to: " + audioSource.src);
}

// funtion to go to letter page

function toLetterPage() {
    wishContainer.style.display = "none";
    letterContainer.style.display = "flex";
    CardtoLetterButton.style.display = "none";
    cardContainer.style.height = "0";
    typeWriter()
    
}

// Function to go back to the countdown page
function toWishPage() {
    letterContainer.style.display = "none";
    wishContainer.style.display = "flex";
    
}
// Function to go back to the card page
function toCardPage() {
    letterContainer.style.display = "none";
    cardContainer.style.height = "100vh";
    CardtoLetterButton.style.display = "block";
    startMusic("https://files.catbox.moe/edv654.mp3")

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

// audio play function

let originalRect = null;
    let clonedSection = null;

    function expandSection(button) {
      const section = button.parentElement;
      originalRect = section.getBoundingClientRect();
      document.querySelectorAll('.section').forEach(s => s.style.visibility = 'hidden');

      clonedSection = section.cloneNode(true);
      clonedSection.classList.add('fullscreen-section');
      clonedSection.style.top = originalRect.top + 'px';
      clonedSection.style.left = originalRect.left + 'px';
      clonedSection.style.width = originalRect.width + 'px';
      clonedSection.style.height = originalRect.height + 'px';

      const oldButton = clonedSection.querySelector('button');
      if (oldButton) oldButton.remove();

      const backBtn = document.createElement('button');
      backBtn.className = 'back-btn';
      backBtn.innerText = 'Back';
      backBtn.onclick = collapseSection;
      clonedSection.appendChild(backBtn);

      document.body.appendChild(clonedSection);

      gsap.to(clonedSection, {
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        visibility: 'visible',
        duration: 0.6,
        ease: 'power3.inOut'
      });
    }

    function collapseSection() {
      if (!clonedSection || !originalRect) return;

      gsap.to(clonedSection, {
        top: originalRect.top + 'px',
        left: originalRect.left + 'px',
        width: originalRect.width + 'px',
        height: originalRect.height + 'px',
        duration: 0.5,
        ease: 'power3.inOut',
        onComplete: () => {
          clonedSection.remove();
          clonedSection = null;
          document.querySelectorAll('.section').forEach(s => s.style.visibility = 'visible');
        }
      });
    }

    document.querySelectorAll('.section').forEach(section => {
      const video = section.querySelector('video');
      section.addEventListener('mouseenter', () => { if (video) video.play(); });
      section.addEventListener('mouseleave', () => { if (video) video.pause(); });
    });

    // Drag logic
    const card = document.getElementById('popupCard');
    
    let offsetX = 0, offsetY = 0, isDragging = false;

    const startDrag = (e) => {
      isDragging = true;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      offsetX = clientX - card.offsetLeft;
      offsetY = clientY - card.offsetTop;
      card.style.cursor = 'grabbing';
    };

    const stopDrag = () => {
      isDragging = false;
      card.style.cursor = 'grab';
    };

    const onDrag = (e) => {
      if (!isDragging) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      card.style.left = `${clientX - offsetX}px`;
      card.style.top = `${clientY - offsetY}px`;
    };

    card.addEventListener('mousedown', startDrag);
    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('mousemove', onDrag);

    card.addEventListener('touchstart', startDrag, { passive: false });
    document.addEventListener('touchend', stopDrag);
    document.addEventListener('touchmove', onDrag, { passive: false });

    // Minimize + Restore
    const restoreTab = document.getElementById('restoreTab');
    function minimizeCard() {
      card.style.left = '-200px';
      restoreTab.style.display = 'flex';
    }

    function restoreCard() {
      card.style.left = '20px';
      restoreTab.style.display = 'none';
    }


    function minimizeCard() {
  gsap.to(card, {
    opacity: 0,
    duration: 0.4,
    ease: 'power2.inOut',
    onComplete: () => {
      card.style.display = 'none';
      document.getElementById('showCardBtn').style.display = 'flex';
    }
  });
}

function showCard() {
  card.style.display = 'block';
  gsap.fromTo(card,
    { opacity: 0 },
    {
      opacity: 1,
      duration: 0.4,
      ease: 'power2.inOut'
    }
  );
  document.getElementById('showCardBtn').style.display = 'none';
}

 const countdownMusic = document.getElementById('countdownAudio');
    const playPauseBtn = document.getElementById('playPause');
    const slider = document.getElementById('slider');
    const current = document.getElementById('current');
    const duration = document.getElementById('duration');
    const songTitle = document.getElementById('songTitle');
    const playlistBox = document.getElementById('playlistBox');
    const playlistUl = document.getElementById('playlist');
    const playIcon = document.getElementById("playBtn");
    const pauseIcon = document.getElementById("pauseBtn");

    const songs = [
      { title: "Sunflower", src: "https://files.catbox.moe/ebjqtx.mp3" },
      { title: "Take on me", src: "https://files.catbox.moe/v7kmvu.mp3" },
      { title: "Tilted", src: "https://files.catbox.moe/6859cg.mp3"},
      { title: "Borderline", src: "https://files.catbox.moe/n53g9o.mp3" },
      { title: "Forever Young", src: "https://files.catbox.moe/jffftr.mp3" },
      { title: "Save Room", src: "https://files.catbox.moe/kmua8b.mp3" }
      
    ];



    let currentSongIndex = 0;

    function loadSong(index) {
      const song = songs[index];
      countdownMusic.src = song.src;
      songTitle.innerText = song.title;
      countdownMusic.load();
      pauseIcon.style.display = 'none';
    }

    function playPause() {
      if (countdownMusic.paused) {
        countdownMusic.play();
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
      } else {
        countdownMusic.pause();
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
      }
    }

    function restart() {
      countdownMusic.currentTime = 0;
    }

    function nextSong() {
      currentSongIndex = (currentSongIndex + 1) % songs.length;
      loadSong(currentSongIndex);
      countdownMusic.play();
      playIcon.style.display = 'none';
      pauseIcon.style.display = 'block';
    }

    function prevSong() {
      currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
      loadSong(currentSongIndex);
      countdownMusic.play();
      playIcon.style.display = 'none';
      pauseIcon.style.display = 'block';
    }

    function togglePlaylist() {
      playlistBox.classList.toggle('active');
    }

    function formatTime(sec) {
      let m = Math.floor(sec / 60);
      let s = Math.floor(sec % 60);
      return `${m}:${s < 10 ? '0' + s : s}`;
    }

    playPauseBtn.onclick = playPause;

    countdownMusic.onloadedmetadata = () => {
      slider.max = Math.floor(countdownMusic.duration);
      duration.innerText = formatTime(countdownMusic.duration);
    };

    countdownMusic.ontimeupdate = () => {
      slider.value = Math.floor(countdownMusic.currentTime);
      current.innerText = formatTime(countdownMusic.currentTime);
    };

    slider.oninput = () => {
      countdownMusic.currentTime = slider.value;
    };

    // Load initial song
    loadSong(currentSongIndex);

    // Load playlist
    songs.forEach((song, index) => {
      const li = document.createElement('li');
      li.innerText = song.title;
      li.onclick = () => {
        currentSongIndex = index;
        loadSong(currentSongIndex);
        countdownMusic.play();
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
        playlistBox.classList.remove('active');
      };
      playlistUl.appendChild(li);
    });
