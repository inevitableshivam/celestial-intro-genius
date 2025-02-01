import { useEffect, useMemo } from 'react';
import DataGrid from 'react-data-grid';
import 'react-data-grid/lib/styles.css';
import { ScrollArea } from '@/components/ui/scroll-area';
import Papa from 'papaparse';

// Custom CSS for the data grid
import './CsvViewer.css';

interface CsvData {
  headers: string[];
  rows: any[];
}

interface CsvViewerProps {
  file: File;
  columnMapping: {
    websiteColumn: string;
    linkedinColumn: string;
  } | null;
  onColumnsLoad: (headers: string[], data: any[]) => void;
  currentData: any[];
}

const ADDITIONAL_COLUMNS = [
  {
    key: 'linkedin_scrape_data',
    name: 'LinkedIn Scrape Data',
    width: 'auto',
    resizable: true,
  },
  {
    key: 'website_scrape_data',
    name: 'Website Scrape Data',
    width: 'auto',
    resizable: true,
  },
  {
    key: 'personalized_line_v1',
    name: 'Personalized Line V1',
    width: 'auto',
    resizable: true,
  },
  {
    key: 'personalized_line_v2',
    name: 'Personalized Line V2',
    width: 'auto',
    resizable: true,
  },
  {
    key: 'personalized_line_v3',
    name: 'Personalized Line V3',
    width: 'auto',
    resizable: true,
  },
];

export const CsvViewer = ({ 
  file, 
  columnMapping, 
  onColumnsLoad, 
  currentData 
}: CsvViewerProps) => {
  // Parse initial CSV data
  useEffect(() => {
    console.log('Parsing initial CSV file');
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

          console.log('Initial parsed rows:', rows.length);
          onColumnsLoad(headers, rows);
        }
      },
      header: false,
      error: (error) => {
        console.error('CSV parsing error:', error);
      }
    });
  }, [file, onColumnsLoad]);

  // Log when currentData changes
  useEffect(() => {
    console.log('CsvViewer received new data:', currentData.length);
    console.log('Sample of current data:', currentData.slice(0, 2));
  }, [currentData]);

  // Create columns based on current data
  const columns = useMemo(() => {
    if (!currentData.length) {
      console.log('No current data available');
      return [];
    }

    console.log('Creating columns from data');
    const headers = Object.keys(currentData[0]);
    const baseColumns = headers.map(header => ({
      key: header,
      name: header,
      width: 'auto',
      resizable: true,
      headerRenderer: (props: any) => (
        <div className="rdg-header-cell">
          {props.column.name}
        </div>
      ),
      formatter: (props: any) => (
        <div className="rdg-cell">
          {props.row[props.column.key]}
        </div>
      ),
    }));

    if (!columnMapping) return baseColumns;
    return [...baseColumns, ...ADDITIONAL_COLUMNS];
  }, [currentData, columnMapping]);

  // Render empty state if no data
  if (!currentData.length) {
    return <div>No data available</div>;
  }

  return (
    <div className="csv-viewer-container">
      <ScrollArea className="h-[500px] w-full rounded-md border border-nebula-700">
        <DataGrid
          columns={columns}
          rows={currentData}
          className="rdg-dark csv-grid"
          rowClass={() => 'csv-row'}
          headerRowHeight={45}
          rowHeight={40}
          style={{
            height: '100%',
            width: '100%',
            backgroundColor: 'rgb(15, 23, 42)',
            color: 'rgb(226, 232, 240)',
          }}
        />
      </ScrollArea>
    </div>
  );
};
