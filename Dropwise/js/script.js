// Ripple effect for buttons
document.querySelectorAll('.ripple-effect').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
        ripple.style.top = e.clientY - rect.top - size / 2 + 'px';
        button.appendChild(ripple);
        setTimeout(() => ripple.remove(), 1000);
    });
});

// Scroll-triggered fade-in animations
const fadeInElements = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.animationPlayState = 'running';
        }
    });
}, { threshold: 0.2 });

fadeInElements.forEach(element => observer.observe(element));

// Water Usage Calculator
let totalWater = 0;
document.getElementById('calculate').addEventListener('click', function() {
    const showers = parseInt(document.getElementById('shower').value) || 0;
    const toiletFlushes = parseInt(document.getElementById('toilet').value) || 0;
    const laundryLoads = parseInt(document.getElementById('laundry').value) || 0;

    // Approximate water usage (gallons)
    const showerWater = showers * 12.5; // 2.5 gallons per minute for 5 minutes
    const toiletWater = toiletFlushes * 1.6 * 7; // 1.6 gallons per flush, per week
    const laundryWater = laundryLoads * 20; // 20 gallons per load

    totalWater = showerWater + toiletWater + laundryWater;
    document.getElementById('result').innerText = `Estimated weekly water usage: ${totalWater.toFixed(1)} gallons`;
    updateWaterFootprint(totalWater);
});

// Water Footprint Visualizer
function updateWaterFootprint(waterUsage) {
    const canvas = document.getElementById('water-footprint-canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw water droplets
    const maxDrops = 50;
    const drops = Math.min(Math.floor(waterUsage / 50), maxDrops); // 1 drop per 50 gallons
    ctx.fillStyle = 'rgba(59, 130, 246, 0.7)';
    for (let i = 0; i < drops; i++) {
        const x = 20 + (i % 10) * 40;
        const y = 20 + Math.floor(i / 10) * 40;
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Interactive Quiz
const quizQuestions = [
    {
        question: "How much water can a low-flow showerhead save per minute?",
        options: ["1 gallon", "2.5 gallons", "5 gallons", "10 gallons"],
        correct: 1
    },
    {
        question: "What is the average water usage per toilet flush in modern toilets?",
        options: ["0.8 gallons", "1.6 gallons", "3 gallons", "5 gallons"],
        correct: 1
    },
    {
        question: "How many gallons can a leaky faucet waste annually?",
        options: ["500 gallons", "1,000 gallons", "3,000 gallons", "5,000 gallons"],
        correct: 2
    }
];

let currentQuestion = 0;
function loadQuiz() {
    const quizContainer = document.getElementById('quiz-options');
    const questionElement = document.getElementById('quiz-question');
    const resultElement = document.getElementById('quiz-result');
    const nextButton = document.getElementById('next-question');

    questionElement.innerText = quizQuestions[currentQuestion].question;
    quizContainer.innerHTML = '';
    resultElement.innerText = '';

    quizQuestions[currentQuestion].options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'quiz-option bg-blue-200 text-blue-800 px-6 py-3 rounded-lg text-lg w-full transition-transform duration-300';
        button.innerText = option;
        button.addEventListener('click', () => checkAnswer(index));
        quizContainer.appendChild(button);
    });

    nextButton.classList.add('hidden');
}

function checkAnswer(selectedIndex) {
    const resultElement = document.getElementById('quiz-result');
    const nextButton = document.getElementById('next-question');
    if (selectedIndex === quizQuestions[currentQuestion].correct) {
        resultElement.innerText = "Correct! Great job!";
        resultElement.className = 'mt-6 text-lg font-semibold text-green-600';
    } else {
        resultElement.innerText = `Incorrect. The correct answer is: ${quizQuestions[currentQuestion].options[quizQuestions[currentQuestion].correct]}`;
        resultElement.className = 'mt-6 text-lg font-semibold text-red-600';
    }
    nextButton.classList.remove('hidden');
}

document.getElementById('next-question').addEventListener('click', () => {
    currentQuestion = (currentQuestion + 1) % quizQuestions.length;
    loadQuiz();
});

loadQuiz();

// Newsletter Signup (Mock)
document.getElementById('newsletter-signup').addEventListener('click', () => {
    const email = document.getElementById('newsletter-email').value;
    const message = document.getElementById('newsletter-message');
    if (email) {
        message.innerText = `Thank you for signing up with ${email}!`;
        message.className = 'mt-4 text-lg text-green-600';
    } else {
        message.innerText = 'Please enter a valid email address.';
        message.className = 'mt-4 text-lg text-red-600';
    }
});