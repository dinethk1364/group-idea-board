// State management
let names = JSON.parse(localStorage.getItem('boardNames')) || [];
let ideas = JSON.parse(localStorage.getItem('boardIdeas')) || [];

// DOM Elements
const nameInput = document.getElementById('nameInput');
const addNameBtn = document.getElementById('addNameBtn');
const nameSelect = document.getElementById('nameSelect');
const ideaInput = document.getElementById('ideaInput');
const addIdeaBtn = document.getElementById('addIdeaBtn');
const ideaList = document.getElementById('ideaList');

// Initialize
function init() {
    updateNameDropdown();
    renderIdeas();
}

// Add a new name
function addName() {
    const name = nameInput.value.trim();
    if (name && !names.includes(name)) {
        names.push(name);
        localStorage.setItem('boardNames', JSON.stringify(names));
        nameInput.value = '';
        updateNameDropdown();
        alert(`Name "${name}" added successfully!`);
    } else if (names.includes(name)) {
        alert('This name already exists.');
    } else {
        alert('Please enter a valid name.');
    }
}

// Update the dropdown menu
function updateNameDropdown() {
    // Keep the first placeholder option
    const placeholder = nameSelect.options[0];
    nameSelect.innerHTML = '';
    nameSelect.appendChild(placeholder);

    names.sort().forEach(name => {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        nameSelect.appendChild(option);
    });
}

// Add a new idea
function addIdea() {
    const selectedName = nameSelect.value;
    const ideaText = ideaInput.value.trim();

    if (!selectedName) {
        alert('Please select a name from the dropdown.');
        return;
    }
    if (!ideaText) {
        alert('Please enter your idea.');
        return;
    }

    const newIdea = {
        id: Date.now(),
        name: selectedName,
        text: ideaText
    };

    ideas.unshift(newIdea); // Add to the beginning of the list
    localStorage.setItem('boardIdeas', JSON.stringify(ideas));
    
    ideaInput.value = '';
    renderIdeas();
}

// Render the list of ideas
function renderIdeas() {
    if (ideas.length === 0) {
        ideaList.innerHTML = '<p class="empty-state">No ideas yet. Be the first to suggest one!</p>';
        return;
    }

    ideaList.innerHTML = '';
    ideas.forEach(idea => {
        const div = document.createElement('div');
        div.className = 'idea-item';
        div.innerHTML = `
            <div class="idea-content">
                <span>"${idea.text}"</span>
                <span class="idea-author"> - suggested by ${idea.name}</span>
            </div>
            <button class="delete-btn" onclick="deleteIdea(${idea.id})">Delete</button>
        `;
        ideaList.appendChild(div);
    });
}

// Delete an idea
function deleteIdea(id) {
    if (confirm('Are you sure you want to delete this idea?')) {
        ideas = ideas.filter(idea => idea.id !== id);
        localStorage.setItem('boardIdeas', JSON.stringify(ideas));
        renderIdeas();
    }
}

// Event Listeners
addNameBtn.addEventListener('click', addName);
addIdeaBtn.addEventListener('click', addIdea);

// Allow Enter key to submit name
nameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addName();
});

// Run init
init();
