
import { useState, useEffect } from 'react';
import { FileUpload } from '@/components/FileUpload';
import { CsvViewer } from '@/components/CsvViewer';
import { ColumnMapper } from '@/components/ColumnMapper';
import { DataCleaner } from '@/components/DataCleaner';
import { ServiceDetails } from '@/components/ServiceDetails';
import { ProcessingStep } from '@/components/ProcessingStep';
import { supabase } from '@/integrations/supabase/client';
import Papa from 'papaparse';
import { useToast } from '@/components/ui/use-toast';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

type Step = 'upload' | 'map' | 'clean' | 'service' | 'process';
type JobStatus = 'pending' | 'processing' | 'completed' | 'failed';

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
  const [uploadId, setUploadId] = useState<string>('');
  const [tableName, setTableName] = useState<string>('');
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error || !session) {
        toast({
          variant: "destructive",
          title: "Authentication required",
          description: "Please sign in to access this feature"
        });
        navigate('/auth');
      }
    };

    checkAuth();
  }, [navigate, toast]);

  const createCsvTable = async (headers: string[], fileName: string, cleanedData: any[]) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const tableId = uuidv4();
      const newTableName = `csv_data_${tableId}`;
      setTableName(newTableName);

      // Filter out the columns that will be renamed
      const filteredHeaders = headers.filter(header => 
        columnMapping && 
        header !== columnMapping.websiteColumn && 
        header !== columnMapping.linkedinColumn
      );

      // Add our additional columns to the headers, including the renamed columns
      const allHeaders = [
        ...filteredHeaders,
        'website_url',
        'linkedin_url',
        'linkedin_scrape_data',
        'website_scrape_data',
        'personalized_line_v1',
        'personalized_line_v2',
        'personalized_line_v3'
      ];

      // Create the table with RPC function
      const { error: rpcError } = await supabase
        .rpc('create_csv_data_table', {
          p_table_name: newTableName,
          p_columns: allHeaders
        } as never);

      if (rpcError) throw rpcError;

      // Create the upload record
      const { data: uploadData, error: uploadError } = await supabase
        .from('csv_uploads')
        .insert({
          filename: fileName,
          table_name: newTableName,
          status: 'pending',
          user_id: user.id
        })
        .select()
        .single();

      if (uploadError) throw uploadError;
      const newUploadId = uploadData.upload_id;
      setUploadId(newUploadId);

      // Prepare the data for insertion with renamed columns
      const dataWithIds = cleanedData.map(row => {
        const newRow: any = {};
        
        // Copy all columns except the ones being renamed
        Object.entries(row).forEach(([key, value]) => {
          if (columnMapping) {
            if (key === columnMapping.websiteColumn) {
              newRow.website_url = value;
            } else if (key === columnMapping.linkedinColumn) {
              newRow.linkedin_url = value;
            } else if (key !== columnMapping.websiteColumn && key !== columnMapping.linkedinColumn) {
              newRow[key] = value;
            }
          }
        });

        // Add additional fields
        return {
          ...newRow,
          linkedin_scrape_data: null,
          website_scrape_data: null,
          personalized_line_v1: null,
          personalized_line_v2: null,
          personalized_line_v3: null,
          user_id: user.id,
          id: uuidv4()
        };
      });

      console.log('Data being inserted:', dataWithIds); // Debug log

      // Insert the data using RPC function
      const { error: insertError } = await supabase.rpc('insert_csv_data', {
        p_table_name: newTableName,
        p_data: dataWithIds
      } as never);

      if (insertError) {
        console.error('Insert error:', insertError); // Debug log
        throw insertError;
      }

      return { tableName: newTableName, uploadId: newUploadId };
    } catch (error) {
      console.error('Error creating CSV table:', error);
      toast({
        variant: "destructive",
        title: "Error creating table",
        description: "Failed to initialize data storage"
      });
      throw error;
    }
  };

  const handleFileUpload = async (file: File) => {
    setUploadedFile(file);
    
    Papa.parse(file, {
      complete: async (results) => {
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
          setCurrentStep('map');
        }
      },
      header: false,
      error: (error) => {
        console.error('CSV parsing error:', error);
        toast({
          variant: "destructive",
          title: "Error parsing CSV",
          description: "Failed to parse the uploaded file"
        });
      }
    });
  };

  const handleColumnMapping = (mapping: { websiteColumn: string; linkedinColumn: string }) => {
    setColumnMapping(mapping);
    setCurrentStep('clean');
  };

  const handleDataCleaned = async (cleanedData: any[]) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Create table and save data with all necessary arguments
      const { tableName: newTableName, uploadId: newUploadId } = await createCsvTable(
        Object.keys(cleanedData[0]),
        uploadedFile?.name || 'data.csv',
        cleanedData
      );

      // Create processing jobs for each row
      const processingJobs = cleanedData.map(() => ({
        upload_id: newUploadId,
        row_id: uuidv4(),
        status: 'pending' as JobStatus,
        user_id: user.id
      }));

      const { error: jobsError } = await supabase
        .from('csv_processing_jobs')
        .insert(processingJobs);

      if (jobsError) {
        console.error('Error creating processing jobs:', jobsError);
        throw jobsError;
      }

      // Update upload status
      const { error: statusError } = await supabase
        .from('csv_uploads')
        .update({ status: 'processing' })
        .eq('upload_id', newUploadId)
        .eq('user_id', user.id);

      if (statusError) throw statusError;

      // Update display data to show renamed columns
      const renamedDisplayData = cleanedData.map(row => {
        const newRow = { ...row };
        if (columnMapping) {
          if (columnMapping.websiteColumn) {
            newRow.website_url = row[columnMapping.websiteColumn];
            delete newRow[columnMapping.websiteColumn];
          }
          if (columnMapping.linkedinColumn) {
            newRow.linkedin_url = row[columnMapping.linkedinColumn];
            delete newRow[columnMapping.linkedinColumn];
          }
        }
        return newRow;
      });

      setDisplayData(renamedDisplayData);

      toast({
        title: "Data saved successfully",
        description: `${cleanedData.length} rows have been processed and saved`
      });
    } catch (error) {
      console.error('Error saving cleaned data:', error);
      toast({
        variant: "destructive",
        title: "Error saving data",
        description: "Failed to save cleaned data"
      });
    }
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
      case 'process':
        return tableName ? <ProcessingStep tableName={tableName} /> : null;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] overflow-hidden">
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

export default Dashboard;
