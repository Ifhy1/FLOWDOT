// Show login
window.onload = () => {
  const name = localStorage.getItem("username");
  if (name) {
    document.getElementById("login-screen").style.display = "none";
    document.getElementById("app").style.display = "block";
    document.getElementById("greeting").textContent = `Hi, ${name}! 🌸`;
  }

  document.getElementById("saved-mood").textContent = localStorage.getItem("moodToday") || "—";
  document.getElementById("saved-symptoms").textContent = localStorage.getItem("symptomsToday") || "—";
  loadSavedPeriodDays();
  updateOvulationDate();

  setTimeout(showAffirmation, 3000);
};

function saveName() {
  const name = document.getElementById("nameInput").value.trim();
  if (name) {
    localStorage.setItem("username", name);
    document.getElementById("login-screen").style.display = "none";
    document.getElementById("app").style.display = "block";
    document.getElementById("greeting").textContent = `Hi, ${name}! 🌸`;
  }
}

function editName() {
  const newName = prompt("Edit your name:");
  if (newName) {
    localStorage.setItem("username", newName);
    document.getElementById("greeting").textContent = `Hi, ${newName}! 🌸`;
  }
}

function resetApp() {
  localStorage.clear();
  location.reload();
}

function logMood(mood) {
  localStorage.setItem("moodToday", mood);
  document.getElementById("saved-mood").textContent = mood;
  alert("Mood saved: " + mood);
}

function saveSymptoms() {
  const symptoms = Array.from(document.querySelectorAll('.symptom-options input:checked')).map(input => input.value);
  localStorage.setItem("symptomsToday", symptoms.join(", "));
  document.getElementById("saved-symptoms").textContent = symptoms.join(", ");
  alert("Saved symptoms: " + symptoms.join(", "));
}

// Calendar
const calendarGrid = document.querySelector('.calendar-grid');
for (let i = 1; i <= 30; i++) {
  const day = document.createElement('div');
  day.textContent = i;
  day.addEventListener('click', () => toggleDaySelection(i, day));
  calendarGrid.appendChild(day);
}

function toggleDaySelection(day, element) {
  const saved = JSON.parse(localStorage.getItem("periodDays")) || [];
  const index = saved.indexOf(day);
  if (index !== -1) {
    saved.splice(index, 1);
    element.classList.remove("active", "selected");
  } else {
    saved.push(day);
    element.classList.add("active", "selected");
  }
  localStorage.setItem("periodDays", JSON.stringify(saved));
}

function loadSavedPeriodDays() {
  const saved = JSON.parse(localStorage.getItem("periodDays")) || [];
  const days = document.querySelectorAll(".calendar-grid div");
  saved.forEach(day => {
    if (days[day - 1]) days[day - 1].classList.add("active", "selected");
  });
}

function updateOvulationDate() {
  const today = new Date();
  today.setDate(today.getDate() + 12);
  document.getElementById("ovulation-day").textContent = today.toDateString();
}

function playFairySound() {
  document.getElementById("fairy-sound").play();
  alert("💖 Your body is magical. You're doing amazing, girl!");
}

function showAffirmation() {
  const affirmations = [
    "You are strong and beautiful.",
    "Your cycle does not define your worth.",
    "Every day is a new chance to bloom.",
    "Be kind to yourself today.",
    "Your body is working wonders."
  ];
  const random = affirmations[Math.floor(Math.random() * affirmations.length)];
  alert("💬 Daily Affirmation: " + random);
}

function toggleMode() {
  document.body.classList.toggle("dark");
}
