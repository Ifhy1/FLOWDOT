// Sign-in
function signIn() {
  const name = document.getElementById("username").value;
  if (!name) return alert("Enter your name first!");
  localStorage.setItem("flowbelle-user", name);
  document.getElementById("user-name").innerText = name;
  document.getElementById("auth-section").style.display = "none";
  document.getElementById("tracker-section").style.display = "block";
}

// Load username
window.onload = () => {
  const storedUser = localStorage.getItem("flowbelle-user");
  if (storedUser) {
    document.getElementById("user-name").innerText = storedUser;
    document.getElementById("auth-section").style.display = "none";
    document.getElementById("tracker-section").style.display = "block";
  }

  renderCalendar();
  loadMoodStats();
};

// Calendar
function renderCalendar() {
  const calendar = document.getElementById("calendar");
  calendar.innerHTML = "";
  for (let i = 1; i <= 30; i++) {
    const cell = document.createElement("div");
    cell.innerText = i;
    if (i === 13 || i === 14 || i === 15) {
      cell.classList.add("active");
    }
    calendar.appendChild(cell);
  }
}

// Mood Tracking
const moods = document.querySelectorAll("#mood-options button");
let moodHistory = JSON.parse(localStorage.getItem("mood-log")) || [];

moods.forEach(btn => {
  btn.addEventListener("click", () => {
    moodHistory.push({ mood: btn.innerText, date: new Date().toLocaleDateString() });
    localStorage.setItem("mood-log", JSON.stringify(moodHistory));
    loadMoodStats();
  });
});

function loadMoodStats() {
  const log = moodHistory.map(entry => `${entry.date}: ${entry.mood}`).join("<br>");
  document.getElementById("mood-log").innerHTML = log || "No data yet";
}

// Theme Toggle
document.getElementById("toggle-theme").addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
});

// Avatar
document.getElementById("avatar-btn").addEventListener("click", () => {
  document.getElementById("avatar-popup").classList.toggle("show");
});

function setAvatar(emoji) {
  document.querySelector(".heart-fairy").innerText = emoji;
  document.getElementById("avatar-popup").classList.remove("show");
  localStorage.setItem("flowbelle-avatar", emoji);
}

// Restore Avatar
const savedAvatar = localStorage.getItem("flowbelle-avatar");
if (savedAvatar) {
  document.querySelector(".heart-fairy").innerText = savedAvatar;
}

// Notifications (basic reminder)
if (Notification && Notification.permission !== "denied") {
  Notification.requestPermission().then(permission => {
    if (permission === "granted") {
      setTimeout(() => {
        new Notification("💖 Reminder", {
          body: "Don't forget to track your mood today on FlowBelle!",
        });
      }, 5000);
    }
  });
}

