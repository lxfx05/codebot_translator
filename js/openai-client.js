/**
 * OpenAI Client for CodeBot Translator
 * Handles all interactions with the OpenAI API
 */

class OpenAIClient {
    constructor() {
        this.apiKey = this.getApiKey();
        this.model = this.getModel();
        this.baseURL = 'https://api.openai.com/v1';
        this.includeComments = this.getSetting('includeComments', true);
        this.includeExamples = this.getSetting('includeExamples', true);
    }

    /**
     * Get API key from localStorage or environment
     */
    getApiKey() {
        const stored = localStorage.getItem('openai_api_key');
        if (stored) return stored;
        
        // Check if there's a global variable for development
        if (typeof window !== 'undefined' && window.VITE_OPENAI_API_KEY) {
            return window.VITE_OPENAI_API_KEY;
        }
        
        return null;
    }

    /**
     * Get selected model from localStorage
     */
    getModel() {
        return localStorage.getItem('openai_model') || 'gpt-4o';
    }

    /**
     * Get setting from localStorage
     */
    getSetting(key, defaultValue) {
        const stored = localStorage.getItem(key);
        return stored !== null ? JSON.parse(stored) : defaultValue;
    }

    /**
     * Set API key
     */
    setApiKey(apiKey) {
        this.apiKey = apiKey;
        if (apiKey) {
            localStorage.setItem('openai_api_key', apiKey);
        } else {
            localStorage.removeItem('openai_api_key');
        }
    }

    /**
     * Set model
     */
    setModel(model) {
        this.model = model;
        localStorage.setItem('openai_model', model);
    }

    /**
     * Set settings
     */
    setSettings(settings) {
        Object.keys(settings)?.forEach(key => {
            this[key] = settings?.[key];
            localStorage.setItem(key, JSON.stringify(settings?.[key]));
        });
    }

    /**
     * Check if API key is configured
     */
    isConfigured() {
        return !!this.apiKey;
    }

    /**
     * Create system prompt for code translation
     */
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

    /**
     * Generate chat completion with OpenAI
     */
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

    /**
     * Generate streaming chat completion
     */
    async generateStreamingCompletion(userMessage, selectedLanguages = [], onChunk) {
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
                    stream: true,
                }),
            });

            if (!response?.ok) {
                const errorData = await response?.json()?.catch(() => ({}));
                throw new Error(`API Error (${response.status}): ${errorData.error?.message || 'Errore sconosciuto'}`);
            }

            const reader = response?.body?.getReader();
            const decoder = new TextDecoder();
            let buffer = '';
            let fullResponse = '';

            while (true) {
                const { done, value } = await reader?.read();
                if (done) break;

                buffer += decoder?.decode(value, { stream: true });
                const lines = buffer?.split('\n');
                buffer = lines?.pop(); // Keep the last incomplete line

                for (const line of lines) {
                    if (line?.startsWith('data: ')) {
                        const data = line?.slice(6);
                        if (data === '[DONE]') continue;

                        try {
                            const parsed = JSON.parse(data);
                            const content = parsed?.choices?.[0]?.delta?.content || '';
                            if (content) {
                                fullResponse += content;
                                onChunk(content);
                            }
                        } catch (e) {
                            // Ignore JSON parsing errors for incomplete chunks
                        }
                    }
                }
            }

            return this.parseResponse(fullResponse);
        } catch (error) {
            console.error('Error calling OpenAI streaming API:', error);
            throw error;
        }
    }

    /**
     * Parse the AI response to extract code and language information
     */
    parseResponse(content) {
        const codeBlocks = [];
        const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
        let match;
        let hasCodeBlocks = false;

        // Extract code blocks
        while ((match = codeBlockRegex?.exec(content)) !== null) {
            hasCodeBlocks = true;
            const language = match?.[1] || 'text';
            const code = match?.[2]?.trim();
            
            codeBlocks?.push({
                language: this.normalizeLanguageName(language),
                code: code
            });
        }

        // Remove code blocks from content to get the text explanation
        const textContent = content?.replace(codeBlockRegex, '')?.trim();

        // If no code blocks found, try to detect if the entire content is code
        if (!hasCodeBlocks) {
            const detectedLanguage = this.detectLanguage(content);
            if (detectedLanguage) {
                codeBlocks?.push({
                    language: detectedLanguage,
                    code: content
                });
                return {
                    text: '',
                    codeBlocks: codeBlocks,
                    detectedLanguage: detectedLanguage
                };
            }
        }

        return {
            text: textContent,
            codeBlocks: codeBlocks
        };
    }

    /**
     * Normalize language names for consistency
     */
    normalizeLanguageName(language) {
        const languageMap = {
            'js': 'javascript',
            'jsx': 'react',
            'ts': 'typescript',
            'tsx': 'typescript',
            'py': 'python',
            'rb': 'ruby',
            'cpp': 'c++',
            'c++': 'c++',
            'csharp': 'c#',
            'cs': 'c#',
            'php': 'php',
            'java': 'java',
            'kt': 'kotlin',
            'swift': 'swift',
            'go': 'go',
            'rust': 'rust',
            'html': 'html',
            'css': 'css',
            'scss': 'scss',
            'sql': 'sql',
            'json': 'json',
            'xml': 'xml',
            'yaml': 'yaml',
            'yml': 'yaml',
            'md': 'markdown',
            'bash': 'bash',
            'sh': 'bash',
        };

        const normalizedInput = language?.toLowerCase();
        return languageMap?.[normalizedInput] || normalizedInput;
    }

    /**
     * Simple language detection for code without explicit language markers
     */
    detectLanguage(code) {
        const trimmedCode = code?.trim();
        
        // JavaScript/TypeScript patterns
        if (/\b(function|const|let|var|=>|\{|\}|console\.log|document\.|window\.)/i?.test(trimmedCode)) {
            return 'javascript';
        }
        
        // Python patterns
        if (/\b(def|import|from|print|if\s+__name__|:\s*$)/m?.test(trimmedCode)) {
            return 'python';
        }
        
        // HTML patterns
        if (/<[^>]+>/g?.test(trimmedCode)) {
            return 'html';
        }
        
        // CSS patterns
        if (/\{[^}]*\}/g?.test(trimmedCode) && /:\s*[^;]+;/g?.test(trimmedCode)) {
            return 'css';
        }
        
        // SQL patterns
        if (/\b(SELECT|FROM|WHERE|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP)\b/i?.test(trimmedCode)) {
            return 'sql';
        }
        
        return null;
    }

    /**
     * Test the API connection
     */
    async testConnection() {
        if (!this.isConfigured()) {
            throw new Error('OpenAI API key non configurata.');
        }

        try {
            const response = await fetch(`${this.baseURL}/chat/completions`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [
                        {
                            role: 'user',
                            content: 'Test connection. Please respond with "Connection successful".'
                        }
                    ],
                    max_tokens: 10,
                }),
            });

            if (!response?.ok) {
                const errorData = await response?.json()?.catch(() => ({}));
                throw new Error(`API Error (${response.status}): ${errorData.error?.message || 'Test di connessione fallito'}`);
            }

            return true;
        } catch (error) {
            console.error('Connection test failed:', error);
            throw error;
        }
    }
}

// Export for use in other scripts
window.OpenAIClient = OpenAIClient;