import React, { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import Icon from '../../../components/AppIcon';

const ChatWindow = ({ messages, onCopyCode, isLoading }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-3 bg-surface ridge-border">
        <div className="flex items-center space-x-2">
          <Icon name="Bot" size={16} color="var(--color-accent)" />
          <span className="text-sm font-heading text-text-primary">
            CodeBot Translator
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full"></div>
          <span className="text-xs font-caption text-text-secondary">
            Online
          </span>
        </div>
      </div>
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 sunken-border bg-background min-h-0">
        {messages?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="mb-4 p-4 ridge-border bg-surface">
              <Icon name="MessageSquare" size={48} color="var(--color-muted)" />
            </div>
            <h3 className="text-lg font-heading text-text-primary mb-2">
              Benvenuto in CodeBot Translator
            </h3>
            <p className="text-sm font-body text-text-secondary max-w-md">
              Descrivi il codice che vuoi generare in linguaggio naturale e 
              io lo tradurrò in codice eseguibile per te.
            </p>
            <div className="mt-4 p-3 sunken-border bg-background">
              <p className="text-xs font-caption text-text-secondary">
                Esempi di richieste:
              </p>
              <ul className="text-xs font-caption text-text-primary mt-2 space-y-1">
                <li>• "Crea una funzione JavaScript per validare email"</li>
                <li>• "Genera un componente React per un form di login"</li>
                <li>• "Scrivi CSS per un layout responsive a 3 colonne"</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages?.map((message) => (
              <ChatMessage
                key={message?.id}
                message={message}
                onCopyCode={onCopyCode}
              />
            ))}
            
            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[70%]">
                  <div className="flex items-center mb-1">
                    <span className="text-xs font-caption text-text-secondary">
                      CodeBot
                    </span>
                    <span className="text-xs font-caption text-text-secondary ml-2">
                      sta scrivendo...
                    </span>
                  </div>
                  <div className="p-3 sunken-border bg-background">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-accent rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                      <span className="text-xs font-caption text-text-secondary">
                        Generando codice...
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatWindow;