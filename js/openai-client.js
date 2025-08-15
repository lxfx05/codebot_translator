class OpenAIClient {
    constructor() {
        // API Key inserita direttamente qui
        this.apiKey = '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';

        this.model = this.getModel();
        this.baseURL = 'https://api.openai.com/v1';
        this.includeComments = this.getSetting('includeComments', true);
        this.includeExamples = this.getSetting('includeExamples', true);
    }

    /**
     * Metodo disabilitato: ora non prende più la chiave da localStorage
     */
    getApiKey() {
        return this.apiKey;
    }

    /**
     * Resto del codice (senza modifiche)...
     * Puoi lasciare tutte le funzioni così come sono
     */

    getModel() {
        return localStorage.getItem('openai_model') || 'gpt-4o';
    }

    getSetting(key, defaultValue) {
        const stored = localStorage.getItem(key);
        return stored !== null ? JSON.parse(stored) : defaultValue;
    }

    setApiKey(apiKey) {
        this.apiKey = apiKey;
        if (apiKey) {
            localStorage.setItem('openai_api_key', apiKey);
        } else {
            localStorage.removeItem('openai_api_key');
        }
    }

    setModel(model) {
        this.model = model;
        localStorage.setItem('openai_model', model);
    }

    setSettings(settings) {
        Object.keys(settings)?.forEach(key => {
            this[key] = settings?.[key];
            localStorage.setItem(key, JSON.stringify(settings?.[key]));
        });
    }

    isConfigured() {
        return !!this.apiKey;
    }

    createSystemPrompt() {
        let prompt = `You are CodeBot, an expert AI assistant specialized in code translation and programming. Your task is to help users translate code between different programming languages while maintaining functionality and following best practices.

Key guidelines:
- Provide accurate and functional code translations
- Follow the coding conventions and best practices of the target language
- Explain key differences and considerations when translating
- Ensure the translated code is production-ready and well-structured`;

        if (this.includeComments) {
            prompt += `\n- Include helpful comments in the translated code to explain logic and important sections`;
        }

        if (this.includeExamples) {
            prompt += `\n- Provide usage examples when appropriate`;
        }

        prompt += `\n\nAlways respond in Italian and structure your responses clearly with explanations followed by the code.`;

        return prompt;
    }

    async generateChatCompletion(userMessage, selectedLanguages = []) {
        if (!this.isConfigured()) {
            throw new Error('OpenAI API key non configurata. Vai nelle impostazioni per configurarla.');
        }

        try {
            const languageContext = selectedLanguages?.length > 0 
                ? `\n\nI linguaggi di programmazione selezionati dall'utente sono: ${selectedLanguages?.join(', ')}.`
                : '';

            const response = await fetch(`${this.baseURL}/chat/completions`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: this.model,
                    messages: [
                        {
                            role: 'system',
                            content: this.createSystemPrompt() + languageContext
                        },
                        {
                            role: 'user',
                            content: userMessage
                        }
                    ],
                    temperature: 0.7,
                    max_tokens: 2000,
                }),
            });

            if (!response?.ok) {
                const errorData = await response?.json()?.catch(() => ({}));
                throw new Error(`API Error (${response.status}): ${errorData.error?.message || 'Errore sconosciuto'}`);
            }

            const data = await response?.json();
            return this.parseResponse(data?.choices?.[0]?.message?.content);
        } catch (error) {
            console.error('Error calling OpenAI API:', error);
            throw error;
        }
    }

    // ... (resto delle funzioni generateStreamingCompletion, parseResponse, normalizeLanguageName, detectLanguage, testConnection rimangono inalterate)

}

// Esportazione per uso globale
window.OpenAIClient = OpenAIClient;
