(function() {
  const ML_PER_OZ = 29.5735;
  const $ = (sel) => document.querySelector(sel);
  const todayKey = () => `waterIntake_${new Date().toISOString().split('T')[0]}`;

  const intakeText = $('#intake-text');
  const goalText = $('#goal-text');
  const unitText = $('#unit-text');
  const addBtn = $('#add-water-btn');
  const settingsBtn = $('#settings-btn');
  const modal = $('#settings-modal');
  const closeBtn = $('#close-settings-btn');
  const saveBtn = $('#save-settings-btn');
  const resetBtn = $('#reset-data-btn');
  const dailyGoalInput = $('#daily-goal-input');
  const unitSelect = $('#unit-select');
  const intervalInput = $('#interval-input');

  let settings = { goal: 2000, unit: 'ml', interval: 60 };
  let intake = 0;
  let reminderTimer;

  const circle = document.querySelector('.progress-ring__circle');
  const radius = circle.r.baseVal.value;
  const circumference = 2 * Math.PI * radius;
  circle.style.strokeDasharray = `${circumference} ${circumference}`;
  circle.style.strokeDashoffset = circumference;

  function setProgress(percent) {
    const offset = circumference - percent / 100 * circumference;
    circle.style.strokeDashoffset = offset;
  }

  function loadSettings() {
    const saved = JSON.parse(localStorage.getItem('waterSettings') || 'null');
    if (saved) settings = saved;
  }

  function saveSettings() {
    localStorage.setItem('waterSettings', JSON.stringify(settings));
  }

  function loadIntake() {
    intake = parseFloat(localStorage.getItem(todayKey()) || '0');
  }

  function saveIntake() {
    localStorage.setItem(todayKey(), intake);
  }

  function updateUI() {
    const goal = settings.goal;
    intakeText.textContent = intake;
    goalText.textContent = goal;
    unitText.textContent = settings.unit;
    const percent = Math.min((intake / goal) * 100, 100);
    setProgress(percent);
  }

  function askNotificationPermission() {
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }

  function scheduleReminder() {
    clearTimeout(reminderTimer);
    reminderTimer = setTimeout(() => {
      if (Notification.permission === 'granted') {
        new Notification('Water Reminder', { body: 'Time to drink water!' });
      }
      scheduleReminder();
    }, settings.interval * 60 * 1000);
  }

  function openModal() {
    dailyGoalInput.value = settings.goal;
    unitSelect.value = settings.unit;
    intervalInput.value = settings.interval;
    modal.style.display = 'flex';
  }

  function closeModal() {
    modal.style.display = 'none';
  }

  document.addEventListener('DOMContentLoaded', () => {
    loadSettings();
    loadIntake();
    updateUI();
    askNotificationPermission();
    scheduleReminder();
  });

  addBtn.addEventListener('click', () => {
    const amount = settings.unit === 'oz'
      ? parseFloat((250 / ML_PER_OZ).toFixed(2))
      : 250;
    intake = parseFloat((intake + amount).toFixed(2));
    saveIntake();
    updateUI();
  });

  addBtn.addEventListener('mousedown', () => {
    addBtn._interval = setInterval(() => {
      const amount = settings.unit === 'oz'
        ? 250 / ML_PER_OZ
        : 250;
      intake = parseFloat((intake + amount).toFixed(2));
      saveIntake();
      updateUI();
    }, 200);
  });

  addBtn.addEventListener('mouseup', () => clearInterval(addBtn._interval));
  addBtn.addEventListener('mouseleave', () => clearInterval(addBtn._interval));

  settingsBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  saveBtn.addEventListener('click', () => {
    settings.goal = parseFloat(dailyGoalInput.value);
    settings.unit = unitSelect.value;
    settings.interval = parseFloat(intervalInput.value);
    saveSettings();
    updateUI();
    scheduleReminder();
    closeModal();
  });
  resetBtn.addEventListener('click', () => {
    intake = 0;
    saveIntake();
    updateUI();
  });
})();