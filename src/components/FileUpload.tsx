import { useState, useRef } from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

export const FileUpload = ({ onUpload }: { onUpload: (file: File) => void }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    handleFile(droppedFile);
  };

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    
    if (file.type === "text/csv" || file.name.endsWith('.csv')) {
      if (file.size > 10 * 1024 * 1024) {
        toast({
          variant: "destructive",
          title: "File too large",
          description: "Maximum file size is 10MB",
        });
        return;
      }
      onUpload(file);
      toast({
        title: "File uploaded successfully",
        description: `${file.name} has been uploaded.`,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please upload a CSV file.",
      });
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    handleFile(selectedFile);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';  // Reset the input
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={`border-2 border-dashed border-nebula-700 rounded-lg p-8 transition-all duration-300 ${
        isDragging ? 'border-cosmic-500 bg-cosmic-500/5' : ''
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center gap-4">
        <Upload className="w-8 h-8 text-nebula-400" />
        <p className="text-nebula-300 text-center">
          Drag and drop your CSV file here, or click to browse
        </p>
        <p className="text-xs text-nebula-400">
          Supported format: CSV
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleFileInput}
          className="hidden"
          id="file-upload"
        />
        <Button 
          variant="outline" 
          className="mt-2 hover:bg-nebula-800/50"
          onClick={handleBrowseClick}
        >
          Browse Files
        </Button>
      </div>
    </div>
  );
};
