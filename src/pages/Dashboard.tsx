import { useState } from 'react';
import { FileUpload } from '@/components/FileUpload';
import { CsvViewer } from '@/components/CsvViewer';
import { ColumnMapper } from '@/components/ColumnMapper';
import { DataCleaner } from '@/components/DataCleaner';
import { ServiceDetails } from '@/components/ServiceDetails';
import Papa from 'papaparse';

type Step = 'upload' | 'map' | 'clean' | 'service' | 'process';

const Dashboard = () => {
  const [currentStep, setCurrentStep] = useState<Step>('upload');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [availableColumns, setAvailableColumns] = useState<string[]>([]);
  const [originalData, setOriginalData] = useState<any[]>([]);
  const [displayData, setDisplayData] = useState<any[]>([]);
  const [columnMapping, setColumnMapping] = useState<{
    websiteColumn: string;
    linkedinColumn: string;
  } | null>(null);

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    
    Papa.parse(file, {
      complete: (results) => {
        if (results.data.length > 0) {
          const headers = results.data[0] as string[];
          const rows = results.data.slice(1).map((row: any) => {
            const rowData: any = {};
            headers.forEach((header, index) => {
              rowData[header] = row[index];
            });
            return rowData;
          }).filter(row => Object.values(row).some(value => value !== ''));

          setAvailableColumns(headers);
          setOriginalData(rows);
          setDisplayData(rows);
        }
      },
      header: false,
      error: (error) => {
        console.error('CSV parsing error:', error);
      }
    });
    
    setCurrentStep('map');
  };

  const handleColumnMapping = (mapping: { websiteColumn: string; linkedinColumn: string }) => {
    setColumnMapping(mapping);
    setCurrentStep('clean');
  };

  const handleDataCleaned = (cleanedData: any[]) => {
    setDisplayData(cleanedData);
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
        return columnMapping ? (
          <DataCleaner
            data={originalData}
            websiteColumn={columnMapping.websiteColumn}
            linkedinColumn={columnMapping.linkedinColumn}
            onDataCleaned={handleDataCleaned}
            onNext={handleNextStep}
          />
        ) : null;
      case 'service':
        return (
          <ServiceDetails
            remainingRows={displayData.length}
            onNext={() => setCurrentStep('process')}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] w-[calc(100vw-280px)] overflow-hidden">
      <div className="flex-none p-8 pb-4">
        <h1 className="text-3xl font-bold text-nebula-100">Data Dashboard</h1>
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
                data={displayData}
                columnMapping={columnMapping}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const getStepNumber = (step: Step): number => {
  const steps: Step[] = ['upload', 'map', 'clean', 'service', 'process'];
  return steps.indexOf(step) + 1;
};

export default Dashboard;
