// Generate calendar
const calendarGrid = document.querySelector('.calendar-grid');
const todayDate = new Date();
const daysInMonth = 30;

for (let i = 1; i <= daysInMonth; i++) {
  const day = document.createElement('div');
  day.textContent = i;
  if (i === todayDate.getDate()) {
    day.classList.add('active');
  }

  day.addEventListener('click', () => {
    savePeriodDay(i);
    day.classList.add('active');
  });

  calendarGrid.appendChild(day);
}

// Ovulation forecast
const ovulationSpan = document.getElementById("ovulation-day");
const ovulationDate = new Date();
ovulationDate.setDate(todayDate.getDate() + 12);
ovulationSpan.textContent = ovulationDate.toDateString();

// Notification reminder
setTimeout(() => {
  alert("💡 Reminder: Stay hydrated and gentle today. You're still in your period phase.");
}, 5000);

// Mood logger
function logMood(mood) {
  localStorage.setItem("moodToday", mood);
  document.getElementById("saved-mood").textContent = mood;
  alert("Mood saved: " + mood);
}

// Save symptoms
function saveSymptoms() {
  const symptoms = document.querySelectorAll('.symptom-options input:checked');
  let selected = [];
  symptoms.forEach(symptom => selected.push(symptom.value));
  localStorage.setItem("symptomsToday", selected.join(", "));
  document.getElementById("saved-symptoms").textContent = selected.join(", ");
  alert("Saved symptoms: " + selected.join(", "));
}

// Load stats on start
window.onload = () => {
  const savedMood = localStorage.getItem("moodToday") || "—";
  const savedSymptoms = localStorage.getItem("symptomsToday") || "—";
  document.getElementById("saved-mood").textContent = savedMood;
  document.getElementById("saved-symptoms").textContent = savedSymptoms;
  loadSavedPeriodDays();
};

// Period days saved
function savePeriodDay(day) {
  let saved = JSON.parse(localStorage.getItem("periodDays")) || [];
  if (!saved.includes(day)) {
    saved.push(day);
    localStorage.setItem("periodDays", JSON.stringify(saved));
  }
}

function loadSavedPeriodDays() {
  const saved = JSON.parse(localStorage.getItem("periodDays")) || [];
  const grid = document.querySelectorAll('.calendar-grid div');
  saved.forEach(day => {
    if (grid[day - 1]) {
      grid[day - 1].classList.add('active');
    }
  });
}

// Play fairy sound
function playFairySound() {
  document.getElementById("fairy-sound").play();
  alert("💖 Your body is magical. You're doing amazing, girl!");
}
