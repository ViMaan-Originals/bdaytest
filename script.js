const orientationContainer = document.getElementById("orientationContainer");
const countdownElement = document.getElementById("Countdown-Containor");
const wishContainer = document.getElementById("bWishContainer");
const letterContainer = document.getElementById("letterContainer");
const cardContainer = document.getElementById("cardContainer");
const CardtoLetterButton = document.getElementById("CardtoLetterButton");
const CardtoVideoMsgButton = document.getElementById("CardtoVideoMsgButton");
const videoMsgContainer = document.getElementById("videoMsgContainer");
const video = document.getElementById('videoMessage');

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
    CardtoVideoMsgButton.style.display = "none";
    typeWriter()
    
}

// Function to go back to the bday wishpage
function toWishPage() {
    letterContainer.style.display = "none";
    wishContainer.style.display = "flex";
    
}
// Function to go back to the card page
function toCardPage() {
    letterContainer.style.display = "none";
    cardContainer.style.height = "100vh";
    CardtoLetterButton.style.display = "block";
    CardtoVideoMsgButton.style.display = "block";

}

function toVideoMsgPage() {
    CardtoVideoMsgButton.style.display = "none";
    videoMsgContainer.style.display = "flex";
    cardContainer.style.height = "0";
    CardtoLetterButton.style.display = "none";
    CardtoLetterButton.style.display = "none";
    video.play();
    // Add any additional logic to show the video message page
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
    const MusicCard = document.getElementById('popupMusicCard');
    const MessageCard = document.getElementById('popupMessageCard');
  
    
    let offsetXMusic = 0, offsetYMusic = 0, isDraggingMusic = false;
    let offsetXMessage = 0, offsetYMessage = 0, isDraggingMessage = false;

    const startDragMessage = (e) => {
      isDraggingMessage = true;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      offsetXMessage = clientX - MessageCard.offsetLeft;
      offsetYMessage = clientY - MessageCard.offsetTop;
      MessageCard.style.cursor = 'grabbing';
    }
    const stopDragMessage = () => {
      isDraggingMessage = false;
      MessageCard.style.cursor = 'grab';
    }

    const onDragMessage = (e) => {
      if (!isDraggingMessage) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      MessageCard.style.left = `${clientX - offsetXMessage}px`;
      MessageCard.style.top = `${clientY - offsetYMessage}px`;
    }

    MessageCard.addEventListener('mousedown', startDragMessage);
    document.addEventListener('mouseup', stopDragMessage);
    document.addEventListener('mousemove', onDragMessage);
    MessageCard.addEventListener('touchstart', startDragMessage, { passive: false });
    document.addEventListener('touchend', stopDragMessage);
    document.addEventListener('touchmove', onDragMessage, { passive: false });


    const startDragMusic = (e) => {
      isDraggingMusic = true;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      offsetXMusic = clientX - MusicCard.offsetLeft;
      offsetYMusic = clientY - MusicCard.offsetTop;
      MusicCard.style.cursor = 'grabbing';
    };

    const stopDragMusic = () => {
      isDraggingMusic = false;
      MusicCard.style.cursor = 'grab';
    };

    const onDragMusic = (e) => {
      if (!isDraggingMusic) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      MusicCard.style.left = `${clientX - offsetXMusic}px`;
      MusicCard.style.top = `${clientY - offsetYMusic}px`;
    };

    MusicCard.addEventListener('mousedown', startDragMusic);
    document.addEventListener('mouseup', stopDragMusic);
    document.addEventListener('mousemove', onDragMusic);

    MusicCard.addEventListener('touchstart', startDragMusic, { passive: false });
    document.addEventListener('touchend', stopDragMusic);
    document.addEventListener('touchmove', onDragMusic, { passive: false });

    // Minimize + Restore
    const restoreTab = document.getElementById('showMusicCardBtn');
    function minimizeCard() {
      MusicCard.style.left = '-200px';
      restoreTab.style.display = 'flex';
    }

    function restoreCard() {
      MusicCard.style.left = '20px';
      restoreTab.style.display = 'none';
    }


function minimizeMusicCard() {
  gsap.to(MusicCard, {
    opacity: 0,
    duration: 0.4,
    ease: 'power2.inOut',
    onComplete: () => {
      MusicCard.style.display = 'none';
      document.getElementById('showMusicCardBtn').style.display = 'flex';
    }
  });
}

function minimizeMsgCard() {
  gsap.to(MessageCard, {
    opacity: 0,
    duration: 0.4,
    ease: 'power2.inOut',
    onComplete: () => {
      MessageCard.style.display = 'none';
      document.getElementById('showMsgBtn').style.display = 'flex';
    }
  });
}

function showMusicCard() {
    MusicCard.style.display = 'block';
  gsap.fromTo(MusicCard,
    { opacity: 0 },
    {
      opacity: 1,
      duration: 0.4,
      ease: 'power2.inOut'
    }
  );

  document.getElementById('showMusicCardBtn').style.display = 'none';
}

function showMsgCard() {
    MessageCard.style.display = 'flex';
  gsap.fromTo(MessageCard,
    { opacity: 0 },
    {
      opacity: 1,
      duration: 0.4,
      ease: 'power2.inOut'
    }
  );

  animate(); // Start the progress circle animation
   animateCount(); // Start the sunrise count animation

  document.getElementById('showMsgBtn').style.display = 'none';
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



     // 🎂 set your birthday (month is 0-indexed, so 0 = January)
  const birthMonth = 10; // Jan
  const birthDay = 10;

  function getPersonalYearProgress() {
    const now = new Date();
    const currentYear = now.getFullYear();

    // determine last birthday and next birthday
    let lastBirthday = new Date(currentYear, birthMonth, birthDay);
    let nextBirthday = new Date(currentYear + 1, birthMonth, birthDay);

    if (now < lastBirthday) {
      // if birthday hasn’t come yet this year, go one year back
      lastBirthday = new Date(currentYear - 1, birthMonth, birthDay);
      nextBirthday = new Date(currentYear, birthMonth, birthDay);
    }

    const total = nextBirthday - lastBirthday;
    const passed = now - lastBirthday;
    return (passed / total) * 100;
  }

  const progressCircle = document.querySelector('.progress');
  const text = document.querySelector('.text');
  const totalLength = 2 * Math.PI * 60;
  const targetPercent = getPersonalYearProgress();
  let currentPercent = 0;

  function animate() {
    if (currentPercent < targetPercent) {
      currentPercent += 0.5;
      if (currentPercent > targetPercent) currentPercent = targetPercent;

      const offset = totalLength - (totalLength * currentPercent) / 100;
      progressCircle.style.strokeDashoffset = offset;
      text.textContent = currentPercent.toFixed(1) + '%';
      requestAnimationFrame(animate);
    }
  }

  
  // 💓 set your birth date and average heart rate
  const birthDate = new Date("2007-01-15T00:00:00"); // change yours
  const avgBPM = 72; // average beats per minute

  const beatsEl = document.getElementById("beats");

  function updateBeats() {
    const now = new Date();
    const diffMs = now - birthDate; // total milliseconds since birth
    const totalMinutes = diffMs / (1000 * 60);
    const totalBeats = totalMinutes * avgBPM;

    beatsEl.textContent = Math.floor(totalBeats).toLocaleString();
  }

  // initial render
  updateBeats();

  // update every second to keep counting live
  setInterval(updateBeats, 1000);
  const now = new Date();
  const diffTime = now - birthDate;
  const daysAlive = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const target = daysAlive;
  let curren = 0;

  function animateCount() {
    if (curren < target) {
      curren += Math.ceil((target - curren) / 25);
      if (curren > target) current = target;
      document.getElementById("sunrises").textContent = curren.toLocaleString();
      requestAnimationFrame(animateCount);
    }
  }

function updateBloodPumped() {

  const litersPerBeat = 0.07 / 1000 * 1000; // 70 ml per beat (0.07 L)

  
  const bloodEl = document.getElementById("bloodLiters");
    const now = new Date();
    const diffMs = now - birthDate;
    const totalMinutes = diffMs / (1000 * 60);
    const totalLiters = totalMinutes * (avgBPM * litersPerBeat);
    bloodEl.textContent = totalLiters.toLocaleString(undefined, {maximumFractionDigits: 0}) + " L";
    
  }

  updateBloodPumped();
  setInterval(updateBloodPumped, 1000);
 
// Date-based text display

  const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1; // months are 0-indexed

    let textt = '';

    // You can add whatever you want for each day
    const messages = {
  '6-11': 'Hello babes! Happy New Year!🎉 The most charming month of the year has finally arrived  hehehe.',
  '2-1': 'Hello',
  '3-1': 'How you doin?',
};

const key = `${day}-${month}`;
textt = messages[key] || 'Just another day 😎';

const dailyMsgs = document.getElementById('messages');

dailyMsgs.textContent = textt;



    dailyMsgs.addEventListener('mouseenter', () => {
      dailyMsgs.style.opacity = '0';
      setTimeout(() => {
        dailyMsgs.textContent = 'Lovee youuu 💖';
        dailyMsgs.style.opacity = '1';
      }, 400); // same as transition duration
    });

    dailyMsgs.addEventListener('mouseleave', () => {
      dailyMsgs.style.opacity = '0';
      setTimeout(() => {
        dailyMsgs.textContent = textt;
      dailyMsgs.style.opacity = '1';
      }, 400);
    });

    
