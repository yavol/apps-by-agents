// DeepPersona App Logic
const questions = [
  { key: 'social', labelLeft: 'Introversion', labelRight: 'Extraversion', keywordsLeft: ['Reflective','Reserved','Focused'], keywordsRight: ['Outgoing','Energetic','Friendly'] },
  { key: 'logic', labelLeft: 'Emotion', labelRight: 'Logic', keywordsLeft: ['Empathetic','Compassionate','Intuitive'], keywordsRight: ['Analytical','Rational','Objective'] },
  { key: 'creativity', labelLeft: 'Practicality', labelRight: 'Creativity', keywordsLeft: ['Grounded','Structured','Organized'], keywordsRight: ['Innovative','Imaginative','Curious'] },
  { key: 'planning', labelLeft: 'Spontaneous', labelRight: 'Planned', keywordsLeft: ['Flexible','Adaptable','Impulsive'], keywordsRight: ['Methodical','Organized','Disciplined'] },
  { key: 'adventure', labelLeft: 'Cautious', labelRight: 'Adventurous', keywordsLeft: ['Prudent','Careful','Analytical'], keywordsRight: ['Bold','Daring','Curious'] },
  { key: 'independence', labelLeft: 'Social', labelRight: 'Independent', keywordsLeft: ['Cooperative','Supportive','Friendly'], keywordsRight: ['Self-reliant','Autonomous','Determined'] },
  { key: 'intuitive', labelLeft: 'Analytical', labelRight: 'Intuitive', keywordsLeft: ['Logical','Detail-oriented','Systematic'], keywordsRight: ['Holistic','Imaginative','Innovative'] },
  { key: 'stability', labelLeft: 'Anxious', labelRight: 'Calm', keywordsLeft: ['Sensitive','Vigilant','Restless'], keywordsRight: ['Serene','Collected','Composed'] },
  { key: 'detail', labelLeft: 'Big-picture', labelRight: 'Detail-oriented', keywordsLeft: ['Visionary','Strategic','Broad-minded'], keywordsRight: ['Precise','Thorough','Meticulous'] },
  { key: 'decision', labelLeft: 'Feeling', labelRight: 'Thinking', keywordsLeft: ['Compassionate','Empathetic','Harmonious'], keywordsRight: ['Objective','Logical','Analytical'] }
];

let currentIndex = 0;
const answers = [];

// DOM Elements
const questionHolder = document.getElementById('question-holder');
const questionText = document.getElementById('question-text');
const labelLeft = document.getElementById('label-left');
const labelRight = document.getElementById('label-right');
const answerSlider = document.getElementById('answer-slider');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const questionnaire = document.getElementById('questionnaire');
const summaryEl = document.getElementById('summary');

function showQuestion(index) {
  const q = questions[index];
  questionText.textContent = `Question ${index + 1} of ${questions.length}: How do you usually see yourself?`;
  labelLeft.textContent = q.labelLeft;
  labelRight.textContent = q.labelRight;
  answerSlider.value = answers[index] !== undefined ? answers[index] : 50;
  prevBtn.disabled = index === 0;
  nextBtn.textContent = index === questions.length - 1 ? 'View Results' : 'Next';
  questionHolder.classList.remove('opacity-0');
  questionHolder.classList.add('opacity-100');
}

prevBtn.addEventListener('click', () => {
  answers[currentIndex] = parseInt(answerSlider.value, 10);
  currentIndex--;
  questionHolder.classList.add('opacity-0');
  setTimeout(() => showQuestion(currentIndex), 300);
});

nextBtn.addEventListener('click', () => {
  answers[currentIndex] = parseInt(answerSlider.value, 10);
  if (currentIndex < questions.length - 1) {
    currentIndex++;
    questionHolder.classList.add('opacity-0');
    setTimeout(() => showQuestion(currentIndex), 300);
  } else {
    questionnaire.classList.add('hidden');
    summaryEl.classList.remove('hidden');
    displaySummary();
  }
});

// Initialize
showQuestion(currentIndex);

function displaySummary() {
  fetch('mock/personality_responses.json')
    .then(res => res.json())
    .then(data => {
      document.getElementById('avatar').src = data.avatar;
      const analysisContainer = document.getElementById('analysis');
      data.paragraphs.forEach(p => {
        const para = document.createElement('p');
        para.textContent = p;
        analysisContainer.appendChild(para);
      });
      const strengthsList = document.getElementById('strengths-list');
      data.strengths.forEach(s => {
        const li = document.createElement('li');
        li.textContent = s;
        strengthsList.appendChild(li);
      });
      const weaknessesList = document.getElementById('weaknesses-list');
      data.weaknesses.forEach(w => {
        const li = document.createElement('li');
        li.textContent = w;
        weaknessesList.appendChild(li);
      });
      const keywordsContainer = document.getElementById('keywords-list');
      data.keywords.forEach(k => {
        const span = document.createElement('span');
        span.className = 'keyword';
        span.textContent = k;
        keywordsContainer.appendChild(span);
      });
    })
    .catch(err => {
      console.error('Failed to load mock data', err);
    });
}