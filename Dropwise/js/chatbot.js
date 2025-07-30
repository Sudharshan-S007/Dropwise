document.getElementById('chatbot-icon').addEventListener('click', () => {
    const chatWindow = document.getElementById('chatbot-window');
    chatWindow.classList.toggle('hidden');
    if (!chatWindow.classList.contains('hidden')) {
        addBotMessage("Hi! I'm the Dropwise Chatbot. Ask me about water-saving tips or sustainable practices!");
    }
});

document.getElementById('chatbot-close').addEventListener('click', () => {
    document.getElementById('chatbot-window').classList.add('hidden');
});

document.getElementById('chatbot-send').addEventListener('click', () => {
    const input = document.getElementById('chatbot-input');
    const message = input.value.trim();
    if (message) {
        addUserMessage(message);
        processUserMessage(message);
        input.value = '';
    }
});

document.getElementById('chatbot-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        document.getElementById('chatbot-send').click();
    }
});

function addUserMessage(message) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const messageElement = document.createElement('div');
    messageElement.className = 'chatbot-message user';
    messageElement.textContent = message;
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function addBotMessage(message) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const messageElement = document.createElement('div');
    messageElement.className = 'chatbot-message bot';
    messageElement.textContent = message;
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function processUserMessage(message) {
    const lowerMessage = message.toLowerCase();
    let response = "Sorry, I didn't understand that. Try asking about water-saving tips, leaks, or sustainable practices!";

    if (lowerMessage.includes('tip') || lowerMessage.includes('save water')) {
        response = "Here are some water-saving tips: Fix leaks promptly to save up to 3,000 gallons per year, take shorter showers (5 minutes or less), and use water-efficient appliances.";
    } else if (lowerMessage.includes('leak')) {
        response = "A dripping faucet can waste up to 3,000 gallons annually. Check faucets and pipes regularly and repair leaks immediately to save water.";
    } else if (lowerMessage.includes('shower')) {
        response = "Shortening your showers to 5 minutes can save up to 12.5 gallons per shower. Consider installing a low-flow showerhead for even more savings!";
    } else if (lowerMessage.includes('appliance') || lowerMessage.includes('machine')) {
        response = "Water-efficient washing machines and dishwashers can significantly reduce water usage. Look for ENERGY STAR-certified models.";
    } else if (lowerMessage.includes('hi') || lowerMessage.includes('hello')) {
        response = "Hey there! Ask me about water conservation or try keywords like 'tips,' 'leaks,' or 'shower' for specific advice!";
    }

    setTimeout(() => addBotMessage(response), 500);
}