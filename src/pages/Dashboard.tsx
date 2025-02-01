import { useState } from 'react';
import { FileUpload } from '@/components/FileUpload';
import { CsvViewer } from '@/components/CsvViewer';
import { ColumnMapper } from '@/components/ColumnMapper';
import { DataCleaner } from '@/components/DataCleaner';

type Step = 'upload' | 'map' | 'clean' | 'service';

const Dashboard = () => {
  const [currentStep, setCurrentStep] = useState<Step>('upload');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [availableColumns, setAvailableColumns] = useState<string[]>([]);
  const [csvData, setCsvData] = useState<any[]>([]);
  const [columnMapping, setColumnMapping] = useState<{
    websiteColumn: string;
    linkedinColumn: string;
  } | null>(null);

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    setCurrentStep('map');
  };

  const handleColumnMapping = (mapping: { websiteColumn: string; linkedinColumn: string }) => {
    setColumnMapping(mapping);
    setCurrentStep('clean');
  };

  const handleColumnsLoad = (headers: string[], data: any[]) => {
    console.log('Initial data loaded:', data.length); // Debug log
    setAvailableColumns(headers);
    setCsvData(data);
  };

  const handleDataCleaned = (cleanedData: any[]) => {
    console.log('Received cleaned data:', cleanedData.length); // Debug log
    console.log('Sample cleaned data:', cleanedData.slice(0, 2)); // Debug log
    setCsvData(cleanedData);
  };

  const handleNextStep = () => {
    setCurrentStep('service');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'upload':
        return <FileUpload onUpload={handleFileUpload} />;
      case 'map':
        return (
          <ColumnMapper 
            columns={availableColumns}
            onNext={handleColumnMapping}
          />
        );
      case 'clean':
        return columnMapping && csvData.length > 0 ? (
          <DataCleaner
            data={csvData}
            websiteColumn={columnMapping.websiteColumn}
            linkedinColumn={columnMapping.linkedinColumn}
            onDataCleaned={handleDataCleaned}
            onNext={handleNextStep}
          />
        ) : null;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] w-[calc(100vw-280px)] overflow-hidden">
      <div className="flex-none p-8 pb-4">
        <h1 className="text-3xl font-bold text-nebula-100">Data Dashboard</h1>
        <p className="text-sm text-nebula-400">Step {getStepNumber(currentStep)} of 4</p>
      </div>
      
      <div className="flex-1 overflow-y-auto px-8 pb-8">
        <div className="grid gap-6 min-w-0">
          {/* Top Section - Current Step */}
          <div className="w-full min-w-0">
            {renderStep()}
          </div>

          {/* Bottom Section - CSV Viewer */}
          {uploadedFile && (
            <div className="w-full min-w-0">
              <CsvViewer 
                key={csvData.length} // Force re-render when data changes
                file={uploadedFile}
                onColumnsLoad={handleColumnsLoad}
                columnMapping={columnMapping}
                currentData={csvData}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const getStepNumber = (step: Step): number => {
  const steps: Step[] = ['upload', 'map', 'clean', 'service'];
  return steps.indexOf(step) + 1;
};

export default Dashboard;
