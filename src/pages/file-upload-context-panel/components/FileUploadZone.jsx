import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FileUploadZone = ({ onFilesUpload, acceptedTypes = ".png,.jpg,.jpeg,.pdf,.txt,.js,.py,.html,.css,.json,.xml" }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e?.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e?.dataTransfer?.files);
    handleFileUpload(files);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e?.target?.files);
    handleFileUpload(files);
  };

  const handleFileUpload = async (files) => {
    setIsUploading(true);
    
    // Simulate upload processing
    setTimeout(() => {
      onFilesUpload(files);
      setIsUploading(false);
      if (fileInputRef?.current) {
        fileInputRef.current.value = '';
      }
    }, 1500);
  };

  const handleBrowseClick = () => {
    fileInputRef?.current?.click();
  };

  return (
    <div className="mb-6">
      <div
        className={`relative h-48 border-2 border-dashed transition-all duration-200 ${
          isDragOver 
            ? 'border-accent bg-accent/10 raised-border' :'border-border bg-surface sunken-border'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedTypes}
          onChange={handleFileSelect}
          className="hidden"
        />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
          {isUploading ? (
            <div className="flex flex-col items-center space-y-3">
              <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm font-caption text-text-secondary">
                Caricamento file in corso...
              </span>
            </div>
          ) : (
            <>
              <div className="mb-4 p-3 bg-background ridge-border">
                <Icon name="Upload" size={32} color="var(--color-accent)" />
              </div>
              
              <div className="text-center space-y-2">
                <p className="text-sm font-bold font-heading text-text-primary">
                  Trascina i file qui o
                </p>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleBrowseClick}
                  className="font-caption"
                >
                  <Icon name="FolderOpen" size={16} className="mr-2" />
                  Sfoglia File
                </Button>
                
                <p className="text-xs font-caption text-text-secondary mt-2">
                  Supportati: PNG, JPG, PDF, TXT, JS, PY, HTML, CSS
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUploadZone;