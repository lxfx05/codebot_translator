import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FileList = ({ files, onRemoveFile }) => {
  const getFileIcon = (fileName) => {
    const extension = fileName?.split('.')?.pop()?.toLowerCase();
    const iconMap = {
      'png': 'Image',
      'jpg': 'Image',
      'jpeg': 'Image',
      'pdf': 'FileText',
      'txt': 'FileText',
      'js': 'Code',
      'py': 'Code',
      'html': 'Code',
      'css': 'Code',
      'json': 'Code',
      'xml': 'Code'
    };
    return iconMap?.[extension] || 'File';
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const getFilePreview = (file) => {
    if (file?.type?.startsWith('image/')) {
      return URL.createObjectURL(file);
    }
    return null;
  };

  const getTextPreview = (file) => {
    if (file?.type === 'text/plain' || file?.name?.endsWith('.js') || file?.name?.endsWith('.py') || 
        file?.name?.endsWith('.html') || file?.name?.endsWith('.css')) {
      return `Anteprima del contenuto del file ${file?.name}...`;
    }
    return null;
  };

  if (files?.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="mb-3 p-3 bg-muted ridge-border inline-block">
          <Icon name="FileX" size={24} color="var(--color-muted-foreground)" />
        </div>
        <p className="text-sm font-caption text-text-secondary">
          Nessun file caricato
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3 max-h-64 overflow-y-auto sunken-border bg-background p-3">
      {files?.map((file, index) => {
        const preview = getFilePreview(file);
        const textPreview = getTextPreview(file);
        
        return (
          <div key={index} className="flex items-start space-x-3 p-2 bg-surface ridge-border">
            {/* File Icon/Preview */}
            <div className="flex-shrink-0">
              {preview ? (
                <div className="w-12 h-12 border border-border overflow-hidden">
                  <img 
                    src={preview} 
                    alt={file?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-12 h-12 bg-background ridge-border flex items-center justify-center">
                  <Icon name={getFileIcon(file?.name)} size={20} color="var(--color-accent)" />
                </div>
              )}
            </div>
            {/* File Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold font-heading text-text-primary truncate">
                    {file?.name}
                  </p>
                  <p className="text-xs font-caption text-text-secondary">
                    {formatFileSize(file?.size)} • {file?.type || 'Tipo sconosciuto'}
                  </p>
                  
                  {textPreview && (
                    <p className="text-xs font-data text-text-secondary mt-1 truncate">
                      {textPreview}
                    </p>
                  )}
                </div>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemoveFile(index)}
                  className="ml-2 w-6 h-6 p-0 hover:bg-destructive/20"
                  title="Rimuovi file"
                >
                  <Icon name="X" size={12} />
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FileList;