import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ChatMessage = ({ message, onCopyCode }) => {
  const isUser = message?.sender === 'user';
  
  const formatTimestamp = (timestamp) => {
    return new Date(timestamp)?.toLocaleTimeString('it-IT', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleCopyCode = () => {
    if (message?.code) {
      navigator.clipboard?.writeText(message?.code);
      onCopyCode(message?.id);
    }
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[70%] ${isUser ? 'order-2' : 'order-1'}`}>
        {/* Message Header */}
        <div className={`flex items-center mb-1 ${isUser ? 'justify-end' : 'justify-start'}`}>
          <span className="text-xs font-caption text-text-secondary">
            {isUser ? 'Tu' : 'CodeBot'}
          </span>
          <span className="text-xs font-caption text-text-secondary ml-2">
            {formatTimestamp(message?.timestamp)}
          </span>
        </div>

        {/* Message Content */}
        <div className={`p-3 ${isUser ? 'raised-border bg-primary' : 'sunken-border bg-background'}`}>
          {/* Text Content */}
          {message?.text && (
            <p className="text-sm font-body text-text-primary mb-2">
              {message?.text}
            </p>
          )}

          {/* Code Block */}
          {message?.code && (
            <div className="mt-3">
              {/* Language Badge */}
              {message?.language && (
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="px-2 py-1 sunken-border bg-surface">
                      <span className="text-xs font-caption text-text-primary">
                        {message?.language?.toUpperCase()}
                      </span>
                    </div>
                    {message?.complexity && (
                      <div className="flex items-center space-x-1">
                        {[...Array(3)]?.map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 ${
                              i < message?.complexity 
                                ? 'bg-accent' :'bg-muted'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 ridge-border"
                    onClick={handleCopyCode}
                    iconName="Copy"
                    iconSize={12}
                  >
                    Copia
                  </Button>
                </div>
              )}

              {/* Code Content */}
              <div className="sunken-border bg-background p-3 overflow-x-auto">
                <pre className="text-xs font-data text-text-primary whitespace-pre-wrap">
                  <code>{message?.code}</code>
                </pre>
              </div>
            </div>
          )}

          {/* File Attachment */}
          {message?.attachment && (
            <div className="mt-3 p-2 sunken-border bg-surface">
              <div className="flex items-center space-x-2">
                <Icon name="Paperclip" size={14} />
                <span className="text-xs font-caption text-text-primary">
                  {message?.attachment?.name}
                </span>
                <span className="text-xs font-caption text-text-secondary">
                  ({message?.attachment?.size})
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;