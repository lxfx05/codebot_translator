import React, { useState, useRef } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const ChatInput = ({ onSendMessage, onFileUpload, disabled }) => {
  const [message, setMessage] = useState('');
  const [attachedFile, setAttachedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (message?.trim() || attachedFile) {
      onSendMessage({
        text: message?.trim(),
        attachment: attachedFile
      });
      setMessage('');
      setAttachedFile(null);
    }
  };

  const handleFileSelect = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      // Validate file type and size
      const allowedTypes = [
        'text/plain', 'text/javascript', 'text/html', 'text/css',
        'application/json', 'text/markdown', 'image/png', 'image/jpeg'
      ];
      
      if (allowedTypes?.includes(file?.type) && file?.size <= 5 * 1024 * 1024) { // 5MB limit
        setAttachedFile({
          name: file?.name,
          size: `${(file?.size / 1024)?.toFixed(1)} KB`,
          type: file?.type,
          file: file
        });
        onFileUpload(file);
      } else {
        alert('Tipo di file non supportato o file troppo grande (max 5MB)');
      }
    }
  };

  const removeAttachment = () => {
    setAttachedFile(null);
    if (fileInputRef?.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="bg-surface ridge-border p-4">
      {/* Status Bar */}
      <div className="flex items-center justify-between mb-3 p-2 sunken-border bg-background">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full"></div>
          <span className="text-xs font-caption text-text-secondary">
            Pronto per tradurre
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs font-caption text-text-secondary">
            Caratteri: {message?.length}/2000
          </span>
        </div>
      </div>
      {/* File Attachment Display */}
      {attachedFile && (
        <div className="mb-3 p-2 sunken-border bg-background">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Paperclip" size={14} />
              <span className="text-xs font-caption text-text-primary">
                {attachedFile?.name}
              </span>
              <span className="text-xs font-caption text-text-secondary">
                ({attachedFile?.size})
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 ridge-border"
              onClick={removeAttachment}
              iconName="X"
              iconSize={10}
            />
          </div>
        </div>
      )}
      {/* Input Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Message Input */}
        <div className="relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e?.target?.value)}
            onKeyPress={handleKeyPress}
            placeholder="Descrivi il codice che vuoi generare... (es: 'Crea una funzione JavaScript per validare email')"
            disabled={disabled}
            maxLength={2000}
            rows={3}
            className="w-full p-3 sunken-border bg-background text-text-primary font-body text-sm resize-none focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {/* File Upload */}
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileSelect}
              accept=".txt,.js,.html,.css,.json,.md,.png,.jpg,.jpeg"
              className="hidden"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 px-3 ridge-border"
              onClick={() => fileInputRef?.current?.click()}
              disabled={disabled}
              iconName="Upload"
              iconSize={14}
            >
              File
            </Button>

            {/* Language Selection Shortcut */}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 px-3 ridge-border"
              onClick={() => window.location.href = '/language-selection-modal'}
              disabled={disabled}
              iconName="Settings"
              iconSize={14}
            >
              Linguaggi
            </Button>
          </div>

          {/* Send Button */}
          <Button
            type="submit"
            variant="default"
            size="sm"
            className="h-8 px-4 ridge-border bg-accent text-accent-foreground"
            disabled={disabled || (!message?.trim() && !attachedFile)}
            iconName="Send"
            iconSize={14}
          >
            Invia
          </Button>
        </div>
      </form>
      {/* Help Text */}
      <div className="mt-3 p-2 bg-muted/20">
        <p className="text-xs font-caption text-text-secondary">
          💡 Suggerimento: Sii specifico nella tua richiesta. Includi il linguaggio desiderato, 
          la funzionalità richiesta e eventuali vincoli o requisiti speciali.
        </p>
      </div>
    </div>
  );
};

export default ChatInput;