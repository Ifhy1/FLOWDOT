document.addEventListener("DOMContentLoaded", () => {
  const loginScreen = document.getElementById("login-screen");
  const usernameInput = document.getElementById("username-input");
  const loginButton = document.getElementById("login-button");
  const greeting = document.getElementById("greeting");
  const avatarImgs = document.querySelectorAll(".avatar-selection img");
  const calendarGrid = document.querySelector(".calendar-grid");
  const themeToggle = document.getElementById("theme-toggle");
  const moodStats = document.getElementById("mood-stats");
  const symptomList = document.getElementById("symptom-list");
  const affirmations = [
    "You are strong and capable!",
    "Your body is amazing.",
    "Take a deep breath, you're doing great!",
    "Hydrate and glow today 🌸",
    "Rest is productive too 💫",
    "You're in tune with your cycle 🌙"
  ];

  const storedName = localStorage.getItem("username");
  const storedAvatar = localStorage.getItem("avatar");
  const storedTheme = localStorage.getItem("theme");

  if (storedTheme === "dark") {
    document.body.classList.add("dark-mode");
  }

  if (storedName) {
    greeting.textContent = `Hi, ${storedName}!`;
    loginScreen.style.display = "none";
  }

  if (storedAvatar) {
    avatarImgs.forEach(img => {
      if (img.src === storedAvatar) {
        img.classList.add("selected");
      }
    });
  }

  loginButton.addEventListener("click", () => {
    const name = usernameInput.value.trim();
    if (name !== "") {
      localStorage.setItem("username", name);
      greeting.textContent = `Hi, ${name}!`;
      loginScreen.style.display = "none";
    }
  });

  avatarImgs.forEach(img => {
    img.addEventListener("click", () => {
      avatarImgs.forEach(i => i.classList.remove("selected"));
      img.classList.add("selected");
      localStorage.setItem("avatar", img.src);
    });
  });

  for (let i = 1; i <= 30; i++) {
    const day = document.createElement("div");
    day.textContent = i;
    day.addEventListener("click", () => {
      if (day.classList.contains("selected")) {
        day.classList.remove("selected");
      } else {
        day.classList.add("selected");
      }
    });
    calendarGrid.appendChild(day);
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });

  const moodButtons = document.querySelectorAll(".mood-options button");
  moodButtons.forEach(button => {
    button.addEventListener("click", () => {
      const mood = button.textContent;
      moodStats.textContent = `Today's mood: ${mood}`;
      localStorage.setItem("mood", mood);
    });
  });

  const saveSymptoms = document.getElementById("save-symptoms");
  saveSymptoms.addEventListener("click", () => {
    const checked = document.querySelectorAll(".symptom-options input:checked");
    const symptoms = Array.from(checked).map(i => i.value);
    symptomList.textContent = `Logged symptoms: ${symptoms.join(", ")}`;
    localStorage.setItem("symptoms", JSON.stringify(symptoms));
  });

  function showAffirmation() {
    const affirmation = affirmations[Math.floor(Math.random() * affirmations.length)];
    alert(affirmation);
  }
  setTimeout(showAffirmation, 3000); 

  document.getElementById("logout").addEventListener("click", () => {
    localStorage.clear();
    window.location.reload();
  });
});
