/**
 * Main Application Logic for CodeBot Translator
 */

// Application State
let app = {
    openaiClient: null,
    selectedLanguages: ['javascript', 'react'],
    suggestedLanguages: [],
    messages: [],
    isLoading: false,
    languagePanelVisible: false,
    currentStreamingMessage: null
};

// Available programming languages
const AVAILABLE_LANGUAGES = [
    { id: 'javascript', name: 'JavaScript', color: '#f7df1e' },
    { id: 'typescript', name: 'TypeScript', color: '#3178c6' },
    { id: 'react', name: 'React', color: '#61dafb' },
    { id: 'vue', name: 'Vue.js', color: '#4fc08d' },
    { id: 'angular', name: 'Angular', color: '#dd0031' },
    { id: 'python', name: 'Python', color: '#3776ab' },
    { id: 'java', name: 'Java', color: '#ed8b00' },
    { id: 'c#', name: 'C#', color: '#239120' },
    { id: 'c++', name: 'C++', color: '#00599c' },
    { id: 'c', name: 'C', color: '#a8b9cc' },
    { id: 'php', name: 'PHP', color: '#777bb4' },
    { id: 'ruby', name: 'Ruby', color: '#cc342d' },
    { id: 'go', name: 'Go', color: '#00add8' },
    { id: 'rust', name: 'Rust', color: '#000000' },
    { id: 'swift', name: 'Swift', color: '#fa7343' },
    { id: 'kotlin', name: 'Kotlin', color: '#7f52ff' },
    { id: 'html', name: 'HTML', color: '#e34f26' },
    { id: 'css', name: 'CSS', color: '#1572b6' },
    { id: 'scss', name: 'SCSS', color: '#cf649a' },
    { id: 'sql', name: 'SQL', color: '#336791' },
];

/**
 * Initialize the application
 */
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

/**
 * Initialize application components
 */
function initializeApp() {
    // Initialize OpenAI client
    app.openaiClient = new OpenAIClient();
    
    // Load initial data
    loadSavedSettings();
    renderLanguagePanel();
    
    // Set up event listeners
    setupEventListeners();
    
    // Show welcome message
    addWelcomeMessage();
    
    console.log('CodeBot Translator initialized successfully');
}

/**
 * Load saved settings from localStorage
 */
function loadSavedSettings() {
    const savedLanguages = localStorage.getItem('selectedLanguages');
    if (savedLanguages) {
        app.selectedLanguages = JSON.parse(savedLanguages);
    }
    
    const savedSuggested = localStorage.getItem('suggestedLanguages');
    if (savedSuggested) {
        app.suggestedLanguages = JSON.parse(savedSuggested);
    }
}

/**
 * Save settings to localStorage
 */
function saveSettingsToStorage() {
    localStorage.setItem('selectedLanguages', JSON.stringify(app.selectedLanguages));
    localStorage.setItem('suggestedLanguages', JSON.stringify(app.suggestedLanguages));
}

/**
 * Set up all event listeners
 */
function setupEventListeners() {
    // Chat input handling
    const messageInput = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendBtn');
    
    messageInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    messageInput.addEventListener('input', function() {
        updateSendButton();
    });
    
    sendBtn.addEventListener('click', sendMessage);
    
    // Auto-resize textarea
    messageInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 200) + 'px';
    });
    
    // File upload handling
    const fileInput = document.getElementById('fileInput');
    fileInput.addEventListener('change', handleFileUpload);
    
    // Language panel toggle
    const languageToggleBtn = document.querySelector('.language-toggle-btn');
    languageToggleBtn.addEventListener('click', toggleLanguagePanel);
    
    // Settings modal
    const settingsBtn = document.querySelector('.settings-btn');
    settingsBtn.addEventListener('click', toggleSettings);
    
    // Modal close handling
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal-overlay')) {
            closeModal(e.target);
        }
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });
}

/**
 * Add welcome message to chat
 */
function addWelcomeMessage() {
    const welcomeMessage = {
        id: Date.now(),
        sender: 'bot',
        text: 'Ciao! Sono CodeBot, il tuo assistente AI per la traduzione di codice. Scrivi il tuo codice e ti aiuterò a convertirlo in qualsiasi linguaggio di programmazione!',
        timestamp: new Date()
    };
    
    app.messages.push(welcomeMessage);
    renderMessages();
}

/**
 * Update send button state based on input
 */
function updateSendButton() {
    const messageInput = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendBtn');
    
    const hasContent = messageInput.value.trim().length > 0;
    sendBtn.disabled = !hasContent || app.isLoading;
}

/**
 * Send a message to the chat
 */
async function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const text = messageInput.value.trim();
    
    if (!text || app.isLoading) return;
    
    // Clear input
    messageInput.value = '';
    messageInput.style.height = 'auto';
    updateSendButton();
    
    // Add user message
    const userMessage = {
        id: Date.now(),
        sender: 'user',
        text: text,
        timestamp: new Date()
    };
    
    app.messages.push(userMessage);
    renderMessages();
    
    // Set loading state
    setLoadingState(true);
    
    try {
        // Check if OpenAI is configured
        if (!app.openaiClient.isConfigured()) {
            showToast('Configura prima la tua API key OpenAI nelle impostazioni.', 'error');
            setLoadingState(false);
            return;
        }
        
        // Create streaming message placeholder
        const botMessage = {
            id: Date.now() + 1,
            sender: 'bot',
            text: '',
            codeBlocks: [],
            timestamp: new Date(),
            streaming: true
        };
        
        app.messages.push(botMessage);
        app.currentStreamingMessage = botMessage;
        renderMessages();
        
        // Generate response with streaming
        let fullText = '';
        const response = await app.openaiClient.generateStreamingCompletion(
            text,
            app.selectedLanguages,
            (chunk) => {
                fullText += chunk;
                botMessage.text = fullText;
                renderMessages();
            }
        );
        
        // Update message with final parsed response
        botMessage.text = response.text;
        botMessage.codeBlocks = response.codeBlocks;
        botMessage.streaming = false;
        
        // Update suggested languages if new language detected
        if (response.detectedLanguage) {
            updateSuggestedLanguages(response.detectedLanguage);
        }
        
        renderMessages();
        
    } catch (error) {
        console.error('Error sending message:', error);
        showToast(error.message || 'Errore durante l\'invio del messaggio', 'error');
        
        // Remove the streaming message on error
        app.messages = app.messages.filter(msg => msg.id !== app.currentStreamingMessage?.id);
        renderMessages();
    } finally {
        setLoadingState(false);
        app.currentStreamingMessage = null;
    }
}

/**
 * Handle file upload
 */
function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const content = e.target.result;
        const messageInput = document.getElementById('messageInput');
        
        const fileMessage = `Ho caricato il file "${file.name}". Ecco il contenuto:\n\n${content}\n\nPuoi aiutarmi a tradurre questo codice?`;
        messageInput.value = fileMessage;
        messageInput.dispatchEvent(new Event('input'));
    };
    
    reader.readAsText(file);
    event.target.value = ''; // Reset file input
}

/**
 * Set loading state
 */
function setLoadingState(loading) {
    app.isLoading = loading;
    const loadingIndicator = document.getElementById('loadingIndicator');
    const sendBtn = document.getElementById('sendBtn');
    
    if (loading) {
        loadingIndicator.style.display = 'flex';
        sendBtn.disabled = true;
    } else {
        loadingIndicator.style.display = 'none';
        updateSendButton();
    }
}

/**
 * Render all messages in the chat
 */
function renderMessages() {
    const chatMessages = document.getElementById('chatMessages');
    
    chatMessages.innerHTML = app.messages.map(message => {
        if (message.sender === 'user') {
            return renderUserMessage(message);
        } else {
            return renderBotMessage(message);
        }
    }).join('');
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Highlight code blocks
    Prism.highlightAll();
}

/**
 * Render user message
 */
function renderUserMessage(message) {
    const timeString = formatTime(message.timestamp);
    
    return `
        <div class="message user-message">
            <div class="message-content">
                <div class="message-header">
                    <span class="message-sender">Tu</span>
                    <span class="message-time">${timeString}</span>
                </div>
                <div class="message-text">${escapeHtml(message.text)}</div>
            </div>
        </div>
    `;
}

/**
 * Render bot message
 */
function renderBotMessage(message) {
    const timeString = formatTime(message.timestamp);
    
    let content = '';
    
    if (message.text) {
        content += `<div class="message-text">${escapeHtml(message.text)}</div>`;
    }
    
    if (message.codeBlocks && message.codeBlocks.length > 0) {
        message.codeBlocks.forEach(codeBlock => {
            content += renderCodeBlock(codeBlock, message.id);
        });
    }
    
    if (message.streaming) {
        content += '<div class="loading-dots"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div>';
    }
    
    return `
        <div class="message bot-message">
            <div class="message-content">
                <div class="message-header">
                    <span class="message-sender">CodeBot Assistant</span>
                    <span class="message-time">${timeString}</span>
                </div>
                ${content}
            </div>
        </div>
    `;
}

/**
 * Render code block
 */
function renderCodeBlock(codeBlock, messageId) {
    const language = codeBlock.language || 'text';
    const code = escapeHtml(codeBlock.code);
    const copyId = `copy-${messageId}-${Math.random().toString(36).substr(2, 9)}`;
    
    return `
        <div class="code-block">
            <div class="code-header">
                <span class="code-language">${language}</span>
                <button class="copy-code-btn" onClick="copyCode('${copyId}', '${messageId}')">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
                    </svg>
                    Copia
                </button>
            </div>
            <div class="code-content">
                <pre><code id="${copyId}" class="language-${language}">${code}</code></pre>
            </div>
        </div>
    `;
}

/**
 * Copy code to clipboard
 */
function copyCode(codeId, messageId) {
    const codeElement = document.getElementById(codeId);
    if (!codeElement) return;
    
    const code = codeElement.textContent;
    
    navigator.clipboard.writeText(code).then(() => {
        showToast('Codice copiato negli appunti!', 'success');
        
        // Visual feedback
        const button = event.target.closest('.copy-code-btn');
        const originalText = button.innerHTML;
        button.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20,6 9,17 4,12"/>
            </svg>
            Copiato!
        `;
        
        setTimeout(() => {
            button.innerHTML = originalText;
        }, 2000);
    }).catch(() => {
        showToast('Errore durante la copia del codice', 'error');
    });
}

/**
 * Toggle language selection panel
 */
function toggleLanguagePanel() {
    const panel = document.getElementById('languagePanel');
    app.languagePanelVisible = !app.languagePanelVisible;
    
    if (app.languagePanelVisible) {
        panel.classList.remove('hidden');
        panel.style.display = 'flex';
    } else {
        panel.classList.add('hidden');
        if (window.innerWidth <= 1024) {
            panel.style.display = 'none';
        }
    }
}

/**
 * Render language selection panel
 */
function renderLanguagePanel() {
    renderSelectedLanguages();
    renderAvailableLanguages();
    renderSuggestedLanguages();
}

/**
 * Render selected languages
 */
function renderSelectedLanguages() {
    const container = document.getElementById('selectedLanguageTags');
    
    container.innerHTML = app.selectedLanguages.map(langId => {
        const language = AVAILABLE_LANGUAGES.find(l => l.id === langId);
        if (!language) return '';
        
        return `
            <span class="language-tag active" onClick="toggleLanguage('${langId}')">
                ${language.name}
            </span>
        `;
    }).join('');
}

/**
 * Render available languages
 */
function renderAvailableLanguages() {
    const container = document.getElementById('languageGrid');
    
    container.innerHTML = AVAILABLE_LANGUAGES.map(language => {
        const isSelected = app.selectedLanguages.includes(language.id);
        const className = isSelected ? 'language-tag active' : 'language-tag';
        
        return `
            <span class="${className}" onClick="toggleLanguage('${language.id}')">
                ${language.name}
            </span>
        `;
    }).join('');
}

/**
 * Render suggested languages
 */
function renderSuggestedLanguages() {
    const container = document.getElementById('suggestedLanguages');
    const tagsContainer = document.getElementById('suggestedLanguageTags');
    
    if (app.suggestedLanguages.length === 0) {
        container.style.display = 'none';
        return;
    }
    
    container.style.display = 'block';
    tagsContainer.innerHTML = app.suggestedLanguages.map(langId => {
        const language = AVAILABLE_LANGUAGES.find(l => l.id === langId);
        if (!language) return '';
        
        const isSelected = app.selectedLanguages.includes(langId);
        const className = isSelected ? 'language-tag active' : 'language-tag';
        
        return `
            <span class="${className}" onClick="toggleLanguage('${langId}')">
                ${language.name}
            </span>
        `;
    }).join('');
}

/**
 * Toggle language selection
 */
function toggleLanguage(languageId) {
    if (app.selectedLanguages.includes(languageId)) {
        app.selectedLanguages = app.selectedLanguages.filter(id => id !== languageId);
    } else {
        app.selectedLanguages.push(languageId);
    }
    
    saveSettingsToStorage();
    renderLanguagePanel();
}

/**
 * Update suggested languages based on detected language
 */
function updateSuggestedLanguages(detectedLanguage) {
    if (!app.suggestedLanguages.includes(detectedLanguage)) {
        app.suggestedLanguages.push(detectedLanguage);
        // Keep only last 3 suggestions
        app.suggestedLanguages = app.suggestedLanguages.slice(-3);
        saveSettingsToStorage();
        renderSuggestedLanguages();
    }
}

/**
 * Toggle settings modal
 */
function toggleSettings() {
    const modal = document.getElementById('settingsModal');
    modal.style.display = modal.style.display === 'none' ? 'flex' : 'none';
    
    if (modal.style.display === 'flex') {
        loadSettingsModal();
    }
}

/**
 * Close settings modal
 */
function closeSettings() {
    const modal = document.getElementById('settingsModal');
    modal.style.display = 'none';
}

/**
 * Load settings into modal
 */
function loadSettingsModal() {
    const apiKeyInput = document.getElementById('apiKeyInput');
    const modelSelect = document.getElementById('modelSelect');
    const includeComments = document.getElementById('includeComments');
    const includeExamples = document.getElementById('includeExamples');
    
    apiKeyInput.value = app.openaiClient.getApiKey() || '';
    modelSelect.value = app.openaiClient.getModel();
    includeComments.checked = app.openaiClient.getSetting('includeComments', true);
    includeExamples.checked = app.openaiClient.getSetting('includeExamples', true);
}

/**
 * Save settings from modal
 */
async function saveSettingsFromModal() {
    const apiKey = document.getElementById('apiKeyInput').value.trim();
    const model = document.getElementById('modelSelect').value;
    const includeComments = document.getElementById('includeComments').checked;
    const includeExamples = document.getElementById('includeExamples').checked;
    
    try {
        // Save API key and model
        app.openaiClient.setApiKey(apiKey);
        app.openaiClient.setModel(model);
        app.openaiClient.setSettings({
            includeComments,
            includeExamples
        });
        
        // Test connection if API key provided
        if (apiKey) {
            showToast('Verifica connessione...', 'info');
            await app.openaiClient.testConnection();
            showToast('Impostazioni salvate e connessione verificata!', 'success');
        } else {
            showToast('Impostazioni salvate!', 'success');
        }
        
        closeSettings();
        
    } catch (error) {
        console.error('Error saving settings:', error);
        showToast('Errore nel salvare le impostazioni: ' + error.message, 'error');
    }
}

/**
 * Close all modals
 */
function closeAllModals() {
    const modals = document.querySelectorAll('.modal-overlay');
    modals.forEach(modal => modal.style.display = 'none');
}

/**
 * Close specific modal
 */
function closeModal(modal) {
    modal.style.display = 'none';
}

/**
 * Show toast notification
 */
function showToast(message, type = 'info') {
    const toast = document.getElementById('errorToast');
    const toastMessage = toast.querySelector('.toast-message');
    
    toastMessage.textContent = message;
    toast.className = `toast toast-${type}`;
    toast.style.display = 'block';
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        hideToast();
    }, 5000);
}

/**
 * Hide toast notification
 */
function hideToast() {
    const toast = document.getElementById('errorToast');
    toast.style.display = 'none';
}

/**
 * Utility function to escape HTML
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Format timestamp for display
 */
function formatTime(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) {
        return 'Ora';
    } else if (diffInMinutes < 60) {
        return `${diffInMinutes}m fa`;
    } else if (diffInMinutes < 24 * 60) {
        const hours = Math.floor(diffInMinutes / 60);
        return `${hours}h fa`;
    } else {
        return date.toLocaleDateString('it-IT', {
            day: '2-digit',
            month: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
}

// Handle responsive language panel
window.addEventListener('resize', function() {
    const panel = document.getElementById('languagePanel');
    if (window.innerWidth > 1024) {
        panel.style.display = 'flex';
        panel.classList.remove('hidden');
        app.languagePanelVisible = true;
    } else if (!app.languagePanelVisible) {
        panel.style.display = 'none';
    }
});

// Initialize responsive state
if (window.innerWidth > 1024) {
    app.languagePanelVisible = true;
} else {
    const panel = document.getElementById('languagePanel');
    if (panel) {
        panel.classList.add('hidden');
        panel.style.display = 'none';
    }
}