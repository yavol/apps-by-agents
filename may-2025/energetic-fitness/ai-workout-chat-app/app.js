// DOM Elements
const chatContainer = document.getElementById('chatContainer');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');

// App state
let chatHistory = [];
let isTyping = false;

// Motivational quotes
const motivationalQuotes = [
    "The only bad workout is the one that didn't happen.",
    "Your body can stand almost anything. It's your mind that you have to convince.",
    "Fitness is not about being better than someone else. It's about being better than you used to be.",
    "The pain you feel today will be the strength you feel tomorrow.",
    "Don't stop when you're tired. Stop when you're done.",
    "No matter how slow you go, you're still lapping everyone on the couch.",
    "Sweat is just fat crying.",
    "The hardest lift of all is lifting your butt off the couch.",
    "You don't have to be extreme, just consistent.",
    "The only place where success comes before work is in the dictionary."
];

// Workout responses based on keywords
const workoutResponses = {
    // Body parts
    legs: [
        "Here's a quick leg workout for you:\n- 3 sets of 15 squats\n- 3 sets of 12 lunges per leg\n- 3 sets of 15 calf raises\n- 2 sets of 30-second wall sits",
        "Try this leg routine:\n- 4 sets of 10 goblet squats\n- 3 sets of 12 Romanian deadlifts\n- 3 sets of 15 leg extensions\n- 3 sets of 15 hamstring curls"
    ],
    arms: [
        "Here's an arm-focused workout:\n- 3 sets of 12 bicep curls\n- 3 sets of 12 tricep dips\n- 3 sets of 10 hammer curls\n- 3 sets of 10 overhead tricep extensions",
        "Try this arm blaster:\n- 3 sets of 10 push-ups\n- 4 sets of 12 tricep kickbacks\n- 3 sets of 12 concentration curls\n- 3 sets of 10 diamond push-ups"
    ],
    abs: [
        "Here's an ab workout to strengthen your core:\n- 3 sets of 20 crunches\n- 3 sets of 30-second planks\n- 3 sets of 15 leg raises\n- 3 sets of 20 Russian twists",
        "Try this core routine:\n- 3 sets of 30-second side planks (each side)\n- 3 sets of 15 bicycle crunches\n- 3 sets of 10 V-ups\n- 2 sets of 30-second hollow holds"
    ],
    back: [
        "Here's a back workout to improve posture:\n- 3 sets of 10 bent-over rows\n- 3 sets of 10 supermans\n- 3 sets of 10 lat pulldowns (or band pulls)\n- 3 sets of 10 reverse flies",
        "Try this back strengthener:\n- 3 sets of 8 pull-ups (or assisted pull-ups)\n- 3 sets of 12 single-arm rows per arm\n- 3 sets of 15 good mornings\n- 3 sets of 10 face pulls"
    ],
    chest: [
        "Here's a chest workout:\n- 4 sets of 10 push-ups\n- 3 sets of 12 chest flies\n- 3 sets of 10 incline push-ups\n- 3 sets of 12 chest presses",
        "Try this chest builder:\n- 3 sets of 8 decline push-ups\n- 3 sets of 12 dumbbell chest presses\n- 3 sets of 15 svend presses\n- 3 sets of 10 chest dips"
    ],
    shoulders: [
        "Here's a shoulder workout:\n- 3 sets of 12 lateral raises\n- 3 sets of 12 front raises\n- 3 sets of 10 overhead presses\n- 3 sets of 10 reverse flies",
        "Try this shoulder routine:\n- 3 sets of 12 arnold presses\n- 3 sets of 15 face pulls\n- 3 sets of 12 upright rows\n- 3 sets of 10 pike push-ups"
    ],
    
    // Duration
    quick: [
        "Here's a quick 10-minute full body workout:\n- 45 seconds jumping jacks\n- 45 seconds push-ups\n- 45 seconds squats\n- 45 seconds plank\n- 45 seconds mountain climbers\n- 45 seconds lunges\n- 45 seconds tricep dips\n- 45 seconds high knees\n- 45 seconds burpees\n- 45 seconds rest\nRepeat if you have time!",
        "Try this 7-minute HIIT workout:\n- 30 seconds burpees\n- 10 seconds rest\n- 30 seconds squats\n- 10 seconds rest\n- 30 seconds push-ups\n- 10 seconds rest\n- 30 seconds mountain climbers\n- 10 seconds rest\n- 30 seconds plank\n- 10 seconds rest\n- 30 seconds jumping jacks\n- 10 seconds rest\n- 30 seconds high knees\n- 10 seconds rest"
    ],
    
    // Time constraints
    "10 minutes": [
        "Perfect for your 10 minutes! Try this:\n- 45 seconds jumping jacks\n- 45 seconds push-ups\n- 45 seconds squats\n- 45 seconds plank\n- 45 seconds mountain climbers\n- 45 seconds lunges\n- 45 seconds tricep dips\n- 45 seconds high knees\n- 45 seconds burpees\n- 45 seconds rest",
        "Here's a quick 10-minute routine:\n- 60 seconds run in place\n- 60 seconds squats\n- 60 seconds push-ups\n- 60 seconds plank\n- 60 seconds jumping jacks\n- 60 seconds lunges\n- 60 seconds tricep dips\n- 60 seconds bicycle crunches\n- 60 seconds high knees\n- 60 seconds cool down stretching"
    ],
    "20 minutes": [
        "Here's a solid 20-minute workout:\n- 5 min warm-up (light cardio)\n- 3 rounds of:\n  * 45 sec push-ups\n  * 45 sec squats\n  * 45 sec plank\n  * 45 sec lunges\n  * 30 sec rest\n- 5 min cool down stretching",
        "Try this 20-minute circuit:\n- 5 min warm-up\n- 4 rounds of:\n  * 40 sec jumping jacks\n  * 40 sec mountain climbers\n  * 40 sec squats\n  * 40 sec push-ups\n  * 20 sec rest\n- 3 min cool down"
    ],
    "30 minutes": [
        "Here's a complete 30-minute workout:\n- 5 min warm-up\n- 20 min circuit (4 rounds):\n  * 60 sec squats\n  * 60 sec push-ups\n  * 60 sec lunges\n  * 60 sec plank\n  * 30 sec rest\n- 5 min cool down stretching",
        "Try this 30-minute full body routine:\n- 5 min cardio warm-up\n- 3 rounds of:\n  * 45 sec squats\n  * 45 sec push-ups\n  * 45 sec lunges\n  * 45 sec plank\n  * 45 sec mountain climbers\n  * 45 sec tricep dips\n  * 45 sec bicycle crunches\n  * 45 sec rest\n- 5 min cool down"
    ],
    
    // Equipment
    "no equipment": [
        "Here's a bodyweight-only workout:\n- 3 sets of 15 squats\n- 3 sets of 10 push-ups\n- 3 sets of 10 lunges per leg\n- 3 sets of 30-second planks\n- 3 sets of 15 glute bridges\n- 3 sets of 10 tricep dips (using a chair or couch)",
        "Try this equipment-free routine:\n- 3 sets of 12 jump squats\n- 3 sets of 10 pike push-ups\n- 3 sets of 15 mountain climbers\n- 3 sets of 12 reverse lunges per leg\n- 3 sets of 15 bicycle crunches\n- 3 sets of 10 burpees"
    ],
    "dumbbells": [
        "Here's a dumbbell workout:\n- 3 sets of 12 goblet squats\n- 3 sets of 10 dumbbell rows\n- 3 sets of 12 dumbbell chest presses\n- 3 sets of 10 dumbbell lunges per leg\n- 3 sets of 12 dumbbell shoulder presses\n- 3 sets of 12 dumbbell bicep curls",
        "Try this dumbbell routine:\n- 3 sets of 10 Romanian deadlifts\n- 3 sets of 12 dumbbell bench presses\n- 3 sets of 10 renegade rows\n- 3 sets of 12 lateral raises\n- 3 sets of 10 dumbbell thrusters\n- 3 sets of 12 hammer curls"
    ],
    "resistance bands": [
        "Here's a resistance band workout:\n- 3 sets of 15 band squats\n- 3 sets of 12 band rows\n- 3 sets of 15 band pull-aparts\n- 3 sets of 12 band chest presses\n- 3 sets of 15 band bicep curls\n- 3 sets of 12 band tricep extensions",
        "Try this band routine:\n- 3 sets of 15 banded lateral walks\n- 3 sets of 12 banded good mornings\n- 3 sets of 15 banded shoulder presses\n- 3 sets of 12 banded face pulls\n- 3 sets of 15 banded squats\n- 3 sets of 12 banded rows"
    ],
    
    // Workout types
    "hiit": [
        "Here's a HIIT workout:\n- 30 sec burpees, 30 sec rest\n- 30 sec mountain climbers, 30 sec rest\n- 30 sec jump squats, 30 sec rest\n- 30 sec high knees, 30 sec rest\n- 30 sec push-ups, 30 sec rest\nRepeat 3-4 times!",
        "Try this HIIT circuit:\n- 40 sec jumping jacks, 20 sec rest\n- 40 sec squat jumps, 20 sec rest\n- 40 sec plank jacks, 20 sec rest\n- 40 sec burpees, 20 sec rest\n- 40 sec mountain climbers, 20 sec rest\nRepeat 3-4 times!"
    ],
    "cardio": [
        "Here's a cardio workout:\n- 5 min jogging in place\n- 3 rounds of:\n  * 45 sec jumping jacks\n  * 45 sec high knees\n  * 45 sec butt kicks\n  * 45 sec jump squats\n  * 30 sec rest\n- 5 min cool down",
        "Try this cardio routine:\n- 5 min warm-up\n- 30 sec sprint/30 sec walk (repeat 10 times)\n- 1 min jumping jacks\n- 1 min high knees\n- 1 min mountain climbers\n- 5 min cool down"
    ],
    "strength": [
        "Here's a strength workout:\n- 3 sets of 8-10 push-ups\n- 3 sets of 12-15 squats\n- 3 sets of 8-10 rows (or band pulls)\n- 3 sets of 12-15 lunges per leg\n- 3 sets of 8-10 tricep dips\n- 3 sets of 12-15 glute bridges",
        "Try this strength routine:\n- 4 sets of 8 squat variations\n- 4 sets of 8 push-up variations\n- 4 sets of 8 row variations\n- 3 sets of 10 lunges per leg\n- 3 sets of 12 core exercises"
    ],
    "yoga": [
        "Here's a yoga flow sequence:\n1. Start in mountain pose\n2. Forward fold\n3. Half lift\n4. High plank\n5. Low plank (chaturanga)\n6. Upward facing dog\n7. Downward facing dog\n8. Warrior I (both sides)\n9. Warrior II (both sides)\n10. Triangle pose (both sides)\n11. Return to mountain pose\nRepeat 3-5 times, holding each pose for 3-5 breaths.",
        "Try this yoga sequence:\n1. Child's pose (5 breaths)\n2. Cat-cow stretches (5 rounds)\n3. Downward dog (5 breaths)\n4. Low lunge (both sides, 3 breaths each)\n5. Warrior II (both sides, 3 breaths each)\n6. Extended side angle (both sides, 3 breaths each)\n7. Tree pose (both sides, 5 breaths each)\n8. Seated forward fold (5 breaths)\n9. Savasana (1-2 minutes)"
    ],
    "pilates": [
        "Here's a Pilates workout:\n1. The Hundred (10 breaths)\n2. Roll-ups (10 reps)\n3. Single leg circles (10 each leg)\n4. Rolling like a ball (10 reps)\n5. Single leg stretch (10 each leg)\n6. Double leg stretch (10 reps)\n7. Spine stretch forward (10 reps)\n8. Saw (5 each side)\n9. Swan dive (5 reps)\n10. Side kicks (10 each leg)",
        "Try this Pilates routine:\n1. Pelvic curls (10 reps)\n2. The Hundred (100 counts)\n3. Roll-ups (8 reps)\n4. Leg circles (10 each direction, each leg)\n5. Rolling like a ball (8 reps)\n6. Single leg stretch (10 each leg)\n7. Criss-cross (10 each side)\n8. Spine stretch (8 reps)\n9. Side plank (30 sec each side)\n10. Teaser (5 reps)"
    ],
    
    // Mood/Energy
    "tired": [
        "When you're tired, try this gentle workout:\n- 5 min light walking in place\n- 2 sets of 10 gentle squats\n- 2 sets of 10 modified push-ups\n- 2 sets of 30-second gentle stretches\n- 5 min relaxation breathing\nRemember, some movement is better than none!",
        "For low energy days, try this:\n- 10 min gentle yoga stretches\n- 5 min light cardio (walking in place)\n- 5 min gentle strength (modified squats, wall push-ups)\n- 5 min final stretching\nBe kind to your body today!"
    ],
    "energetic": [
        "Channel that energy with this workout:\n- 5 min jump rope or high knees\n- 4 rounds of:\n  * 15 burpees\n  * 20 jump squats\n  * 15 push-ups\n  * 20 mountain climbers\n  * 1 min rest\n- 5 min cool down",
        "Use that energy with this challenging routine:\n- 5 min cardio warm-up\n- 5 rounds of:\n  * 10 burpees\n  * 15 jump lunges\n  * 10 push-up variations\n  * 15 squat jumps\n  * 30 sec rest\n- 5 min cool down stretching"
    ],
    "sore": [
        "When you're sore, try this recovery workout:\n- 5 min light cardio to warm up\n- 10 min dynamic stretching\n- 10 min foam rolling (or self-massage)\n- 5 min gentle yoga poses\nFocus on the areas that aren't sore!",
        "For recovery days, try:\n- 10 min light walking\n- 15 min gentle stretching\n- 5 min deep breathing exercises\nRemember to hydrate well and get proper rest!"
    ],
    
    // Goals
    "lose weight": [
        "For weight loss, try this HIIT workout:\n- 5 min warm-up\n- 8 rounds of:\n  * 30 sec high-intensity exercise (burpees, mountain climbers, etc.)\n  * 30 sec rest\n- 5 min cool down\nDo this 3-4 times per week, combined with strength training and proper nutrition.",
        "For weight loss goals, try this circuit:\n- 5 min cardio warm-up\n- 4 rounds of:\n  * 45 sec jumping jacks\n  * 45 sec squats\n  * 45 sec push-ups\n  * 45 sec mountain climbers\n  * 45 sec burpees\n  * 45 sec rest\n- 5 min cool down\nRemember, nutrition plays a huge role in weight loss too!"
    ],
    "build muscle": [
        "For muscle building, try this:\n- 4 sets of 8-12 push-ups (or variations)\n- 4 sets of 8-12 squats (add weight if possible)\n- 4 sets of 8-12 rows (or pull-ups)\n- 3 sets of 8-12 lunges per leg\n- 3 sets of 8-12 dips\nRest 60-90 seconds between sets. Ensure you're eating enough protein!",
        "To build muscle, try this routine:\n- 4 sets of 8 squat variations\n- 4 sets of 8 push-up variations\n- 4 sets of 8 row variations\n- 3 sets of 10 lunges per leg\n- 3 sets of 10 shoulder exercises\n- 3 sets of 10 core exercises\nRest 60-90 seconds between sets and focus on proper form!"
    ],
    "flexibility": [
        "To improve flexibility, try this routine:\n- 5 min light cardio warm-up\n- 30 sec hamstring stretch (each leg)\n- 30 sec quad stretch (each leg)\n- 30 sec calf stretch (each leg)\n- 30 sec chest and shoulder stretch\n- 30 sec tricep stretch (each arm)\n- 30 sec side bend stretch (each side)\n- 30 sec hip flexor stretch (each side)\n- 30 sec butterfly stretch\n- 30 sec child's pose\nHold each stretch and breathe deeply. Repeat 2-3 times.",
        "For flexibility, try this yoga-inspired routine:\n- 5 min warm-up\n- 60 sec forward fold\n- 60 sec downward dog\n- 60 sec low lunge (each side)\n- 60 sec pigeon pose (each side)\n- 60 sec seated forward fold\n- 60 sec butterfly stretch\n- 60 sec spinal twist (each side)\n- 60 sec child's pose\n- 60 sec cobra pose\nHold each pose and focus on breathing into the stretch."
    ],
    
    // Default response
    default: [
        "Here's a balanced full-body workout:\n- 5 min cardio warm-up\n- 3 sets of 12 squats\n- 3 sets of 10 push-ups\n- 3 sets of 10 rows (or band pulls)\n- 3 sets of 12 lunges per leg\n- 3 sets of 30-second planks\n- 5 min cool down stretching",
        "Try this well-rounded workout:\n- 5 min warm-up\n- 3 rounds of:\n  * 45 sec jumping jacks\n  * 45 sec squats\n  * 45 sec push-ups\n  * 45 sec plank\n  * 45 sec lunges\n  * 45 sec mountain climbers\n  * 45 sec rest\n- 5 min cool down"
    ]
};

// Initialize chat with welcome message
function initChat() {
    // Check if there's saved chat history
    const savedChat = localStorage.getItem('workoutChatHistory');
    const lastInput = localStorage.getItem('lastWorkoutInput');
    
    if (savedChat) {
        chatHistory = JSON.parse(savedChat);
        renderChatHistory();
    } else {
        // Add welcome message if no history
        addAssistantMessage("Hi there! I'm your AI workout assistant. Tell me what kind of workout you're looking for today, or mention specific body parts, equipment, or time constraints.");
    }
    
    // Restore last input if available
    if (lastInput) {
        userInput.value = lastInput;
    }
}

// Render existing chat history
function renderChatHistory() {
    chatContainer.innerHTML = '';
    chatHistory.forEach(message => {
        if (message.type === 'user') {
            addUserMessageToDOM(message.text);
        } else if (message.type === 'assistant') {
            addAssistantMessageToDOM(message.text);
        } else if (message.type === 'quote') {
            addQuoteMessageToDOM(message.text);
        }
    });
    scrollToBottom();
}

// Add user message to chat
function addUserMessage(text) {
    chatHistory.push({ type: 'user', text });
    addUserMessageToDOM(text);
    saveChat();
}

// Add user message to DOM
function addUserMessageToDOM(text) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', 'user-message');
    messageElement.textContent = text;
    chatContainer.appendChild(messageElement);
    scrollToBottom();
}

// Add assistant message to chat
function addAssistantMessage(text) {
    chatHistory.push({ type: 'assistant', text });
    addAssistantMessageToDOM(text);
    saveChat();
}

// Add assistant message to DOM
function addAssistantMessageToDOM(text) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', 'assistant-message');
    messageElement.textContent = text;
    chatContainer.appendChild(messageElement);
    scrollToBottom();
}

// Add motivational quote to chat
function addQuoteMessage() {
    const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    chatHistory.push({ type: 'quote', text: randomQuote });
    addQuoteMessageToDOM(randomQuote);
    saveChat();
}

// Add quote message to DOM
function addQuoteMessageToDOM(text) {
    const quoteElement = document.createElement('div');
    quoteElement.classList.add('quote-message');
    quoteElement.textContent = `"${text}"`;
    chatContainer.appendChild(quoteElement);
    scrollToBottom();
}

// Show typing indicator
function showTypingIndicator() {
    if (isTyping) return;
    
    isTyping = true;
    const typingElement = document.createElement('div');
    typingElement.classList.add('typing-indicator');
    typingElement.id = 'typingIndicator';
    
    for (let i = 0; i < 3; i++) {
        const dot = document.createElement('span');
        typingElement.appendChild(dot);
    }
    
    chatContainer.appendChild(typingElement);
    scrollToBottom();
}

// Hide typing indicator
function hideTypingIndicator() {
    const typingElement = document.getElementById('typingIndicator');
    if (typingElement) {
        typingElement.remove();
    }
    isTyping = false;
}

// Process user input and generate response
function processUserInput(input) {
    // Save input to localStorage
    localStorage.setItem('lastWorkoutInput', '');
    
    // Add user message to chat
    addUserMessage(input);
    
    // Show typing indicator
    showTypingIndicator();
    
    // Process input after a delay to simulate thinking
    setTimeout(() => {
        // Hide typing indicator
        hideTypingIndicator();
        
        // Generate response based on keywords
        const response = generateResponse(input.toLowerCase());
        
        // Add assistant response
        addAssistantMessage(response);
        
        // 30% chance to add a motivational quote
        if (Math.random() < 0.3) {
            setTimeout(() => {
                addQuoteMessage();
            }, 1000);
        }
    }, 1500 + Math.random() * 1000); // Random delay between 1.5-2.5 seconds
}

// Generate response based on keywords in user input
function generateResponse(input) {
    // Check for keywords and generate appropriate response
    for (const [keyword, responses] of Object.entries(workoutResponses)) {
        if (input.includes(keyword)) {
            return responses[Math.floor(Math.random() * responses.length)];
        }
    }
    
    // If no keywords match, return default response
    return workoutResponses.default[Math.floor(Math.random() * workoutResponses.default.length)];
}

// Save chat history to localStorage
function saveChat() {
    localStorage.setItem('workoutChatHistory', JSON.stringify(chatHistory));
}

// Scroll chat to bottom
function scrollToBottom() {
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Event listeners
sendButton.addEventListener('click', () => {
    const text = userInput.value.trim();
    if (text) {
        processUserInput(text);
        userInput.value = '';
    }
});

userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const text = userInput.value.trim();
        if (text) {
            processUserInput(text);
            userInput.value = '';
        }
    }
});

// Save input as user types
userInput.addEventListener('input', () => {
    localStorage.setItem('lastWorkoutInput', userInput.value);
});

// Initialize chat when page loads
document.addEventListener('DOMContentLoaded', initChat);