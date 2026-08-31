// ================================
// EDIT YOUR PROFILE HERE
// ================================

const profile = {
  name: "prey",
  username: "@p",
  bio: "welcome to my little corner of the internet ♡",
  songTitle: "your song",
  songArtist: "your artist",

  // Add/remove links as you want.
  links: [
    { icon: "◉", name: "Discord", url: "https://discord.com/" },
    { icon: "◈", name: "Roblox", url: "https://www.roblox.com/" },
    { icon: "◎", name: "Instagram", url: "https://instagram.com/" },
    { icon: "✦", name: "TikTok", url: "https://www.tiktok.com/" }
  ]
};

// ================================
// PAGE LOGIC
// ================================

document.title = `${profile.name} — bio`;

document.getElementById("name").textContent = profile.name;
document.getElementById("username").textContent = profile.username;
document.getElementById("bio").textContent = profile.bio;
document.getElementById("songTitle").textContent = profile.songTitle;
document.getElementById("songArtist").textContent = profile.songArtist;
document.getElementById("year").textContent = new Date().getFullYear();

const links = document.getElementById("links");

profile.links.forEach(link => {
  const a = document.createElement("a");
  a.className = "link";
  a.href = link.url;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  a.innerHTML = `<span class="link-icon">${link.icon}</span>${link.name}`;
  links.appendChild(a);
});

// Simple local view counter.
// It counts visits on the same browser/device.
const viewKey = "my-bio-page-views";
let views = Number(localStorage.getItem(viewKey) || 0) + 1;
localStorage.setItem(viewKey, views);
document.getElementById("views").textContent = String(views).padStart(6, "0");

// Music player.
// Browsers normally block automatic audio playback, so the user must tap Play.
const audio = document.getElementById("audio");
const musicBtn = document.getElementById("musicBtn");
const card = document.getElementById("profileCard");

musicBtn.addEventListener("click", async () => {
  if (audio.paused) {
    try {
      await audio.play();
      musicBtn.textContent = "❚❚";
      card.classList.add("playing");
    } catch {
      musicBtn.textContent = "▶";
      alert("Add your music file as assets/music.mp3 first.");
    }
  } else {
    audio.pause();
    musicBtn.textContent = "▶";
    card.classList.remove("playing");
  }
});
