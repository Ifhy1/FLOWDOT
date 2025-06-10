function signIn() {
  const name = document.getElementById("username").value;
  if (!name) return alert("Enter your name first!");
  localStorage.setItem("flowbelle-user", name);
  document.getElementById("user-name").innerText = name;
  document.getElementById("auth-section").style.display = "none";
  document.getElementById("tracker-section").style.display = "block";
}

// Load
window.onload = () => {
  const storedUser = localStorage.getItem("flowbelle-user");
  if (storedUser) {
    document.getElementById("user-name").innerText = storedUser;
    document.getElementById("auth-section").style.display = "none";
    document.getElementById("tracker-section").style.display = "block";
  }

  renderCalendar();
  loadMoodStats();
  loadSymptoms();
  hydrateReminder();

  const savedAvatar = localStorage.getItem("flowbelle-avatar");
  if (savedAvatar) {
    document.querySelector(".heart-fairy").innerText = savedAvatar;
  }
};

function renderCalendar() {
  const calendar = document.getElementById("calendar");
  calendar.innerHTML = "";
  for (let i = 1; i <= 30; i++) {
    const cell = document.createElement("div");
    cell.innerText = i;
    cell.addEventListener("click", () => {
      localStorage.setItem("period-day", i);
      updatePeriodDayMsg(i);
      highlightDate(i);
    });
    calendar.appendChild(cell);
  }

  const savedDay = localStorage.getItem("period-day");
  if (savedDay) {
    updatePeriodDayMsg(savedDay);
    highlightDate(savedDay);
  }
}

function updatePeriodDayMsg(day) {
  const msg = document.getElementById("period-day-msg");
  msg.innerText = `You're on Day ${day} of your period 🌷`;
}

function highlightDate(day) {
  const allCells = document.querySelectorAll(".calendar-grid div");
  allCells.forEach(cell => cell.classList.remove("active"));
  if (allCells[day - 1]) {
    allCells[day - 1].classList.add("active");
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

// Symptom Logging
function saveSymptoms() {
  const symptoms = document.querySelectorAll(".symptom-options input:checked");
  const values = Array.from(symptoms).map(s => s.value);
  localStorage.setItem("symptom-log", JSON.stringify(values));
  loadSymptoms();
  alert("Symptoms saved!");
}

function loadSymptoms() {
  const data = JSON.parse(localStorage.getItem("symptom-log")) || [];
  document.getElementById("symptom-log").innerText = data.length ? data.join(", ") : "No symptoms logged";
}

// Theme
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

// Hydration reminder pop-up
function hydrateReminder() {
  if (Notification && Notification.permission !== "denied") {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        setTimeout(() => {
          new Notification("💧 Hydration Time", {
            body: "Hey love! Don’t forget to drink water 💖",
          });
        }, 8000);
      }
    });
  }
}
