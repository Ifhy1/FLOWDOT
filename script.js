// DOM elements
const loginScreen = document.getElementById('login-screen');
const appScreen = document.getElementById('app-screen');
const usernameInput = document.getElementById('username');
const greeting = document.getElementById('greeting');
const dayCounter = document.getElementById('day-counter');
const ovulationDay = document.getElementById('ovulation-day');
const calendarGrid = document.getElementById('calendar-grid');
const dailyAffirmation = document.getElementById('daily-affirmation');

// Data
const userData = {
  name: '',
  periodDays: [],
  moods: {},
  symptoms: {}
};

function startApp() {
  const name = usernameInput.value.trim();
  if (!name) {
    alert("Please enter your name.");
    return;
  }

  userData.name = name;
  localStorage.setItem('flowBelle', JSON.stringify(userData));
  loginScreen.classList.add('hidden');
  appScreen.classList.remove('hidden');

  greeting.textContent = `Hi, ${name}! 🌸`;
  generateCalendar();
  setAffirmation();
}

function toggleTheme() {
  document.body.classList.toggle('dark');
}

function editName() {
  const newName = prompt("Enter a new name:");
  if (newName) {
    userData.name = newName.trim();
    greeting.textContent = `Hi, ${newName}! 🌸`;
    localStorage.setItem('flowBelle', JSON.stringify(userData));
  }
}

function resetApp() {
  localStorage.removeItem('flowBelle');
  location.reload();
}

function generateCalendar() {
  calendarGrid.innerHTML = '';
  for (let i = 1; i <= 30; i++) {
    const day = document.createElement('div');
    day.textContent = i;
    if (userData.periodDays.includes(i)) {
      day.classList.add('selected');
    }
    day.onclick = () => toggleDaySelection(i, day);
    calendarGrid.appendChild(day);
  }
  updateCycleInfo();
}

function toggleDaySelection(day, el) {
  const index = userData.periodDays.indexOf(day);
  if (index > -1) {
    userData.periodDays.splice(index, 1);
    el.classList.remove('selected');
  } else {
    userData.periodDays.push(day);
    el.classList.add('selected');
  }
  localStorage.setItem('flowBelle', JSON.stringify(userData));
  updateCycleInfo();
}

function updateCycleInfo() {
  if (userData.periodDays.length) {
    const today = Math.max(...userData.periodDays);
    const day = 30 - today + 1;
    dayCounter.textContent = day;
    if (day >= 12 && day <= 16) {
      ovulationDay.textContent = "Ovulation likely happening now 🌼";
    } else {
      ovulationDay.textContent = "Not in ovulation window.";
    }
  } else {
    dayCounter.textContent = "—";
    ovulationDay.textContent = "—";
  }
}

function logMood(emoji) {
  const today = new Date().toISOString().split('T')[0];
  userData.moods[today] = emoji;
  localStorage.setItem('flowBelle', JSON.stringify(userData));
  document.getElementById('saved-mood').textContent = emoji;
}

function saveSymptoms() {
  const checkboxes = document.querySelectorAll('.symptom-options input[type="checkbox"]');
  const selected = [];
  checkboxes.forEach(cb => {
    if (cb.checked) selected.push(cb.value);
    cb.checked = false;
  });
  const today = new Date().toISOString().split('T')[0];
  userData.symptoms[today] = selected;
  localStorage.setItem('flowBelle', JSON.stringify(userData));
  document.getElementById('saved-symptoms').textContent = selected.join(', ') || "—";
}

function setAffirmation() {
  const affirmations = [
    "You're strong, capable, and growing.",
    "Each cycle is a new beginning.",
    "Honor your rhythm. Rest is strength.",
    "You bloom in your own time.",
    "You are more than your cycle — you're magic."
  ];
  const random = Math.floor(Math.random() * affirmations.length);
  dailyAffirmation.textContent = affirmations[random];
}

function playFairySound() {
  document.getElementById('fairy-sound').play();
}
