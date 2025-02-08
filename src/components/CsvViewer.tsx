import { useMemo } from 'react';
import DataGrid from 'react-data-grid';
import 'react-data-grid/lib/styles.css';
import { ScrollArea } from '@/components/ui/scroll-area';

// Custom CSS for the data grid
import './CsvViewer.css';

interface CsvViewerProps {
  data: any[];
  columnMapping: {
    websiteColumn: string;
    linkedinColumn: string;
  } | null;
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

export const CsvViewer = ({ data, columnMapping }: CsvViewerProps) => {
  // Create columns based on current data
  const columns = useMemo(() => {
    if (!data.length) return [];

    const headers = Object.keys(data[0]);
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

    return columnMapping ? [...baseColumns, ...ADDITIONAL_COLUMNS] : baseColumns;
  }, [data, columnMapping]);

  // Render empty state if no data
  if (!data.length) {
    return (
      <div className="flex items-center justify-center h-[500px] text-nebula-400">
        No data available
      </div>
    );
  }

  return (
    <div className="csv-viewer-container">
      <ScrollArea className="h-[500px] w-full rounded-md border border-nebula-700">
        <DataGrid
          columns={columns}
          rows={data}
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
