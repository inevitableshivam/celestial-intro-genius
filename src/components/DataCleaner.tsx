import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Info, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/components/ui/use-toast';

interface DataCleanerProps {
  data: any[];
  websiteColumn: string;
  linkedinColumn: string;
  onDataCleaned: (cleanedData: any[]) => void;
  onNext: () => void;
}

interface CleaningStats {
  duplicatesRemoved: number;
  missingUrlsRemoved: number;
  remainingRows: number;
}

export const DataCleaner = ({
  data,
  websiteColumn,
  linkedinColumn,
  onDataCleaned,
  onNext,
}: DataCleanerProps) => {
  const [isCleaning, setIsCleaning] = useState(false);
  const [isCleaningComplete, setIsCleaningComplete] = useState(false);
  const [stats, setStats] = useState<CleaningStats>({
    duplicatesRemoved: 0,
    missingUrlsRemoved: 0,
    remainingRows: data.length,
  });
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const cleanData = () => {
    setIsCleaning(true);
    setError(null);
    console.log('Starting data cleaning...');
    console.log('Initial data:', data);

    // Step 1: Remove duplicates
    const uniqueData = data.filter((item, index, self) =>
      index === self.findIndex((t) => (
        t[websiteColumn] === item[websiteColumn] &&
        t[linkedinColumn] === item[linkedinColumn] &&
        t.name === item.name
      ))
    );

    // Step 2: Remove rows with missing URLs
    const cleanedData = uniqueData.filter(row => {
      // Get URL values and ensure they're strings
      const websiteUrl = String(row[websiteColumn] || '');
      const linkedinUrl = String(row[linkedinColumn] || '');
      
      // Log values for debugging
      console.log('Row:', {
        name: row.name,
        websiteUrl: websiteUrl,
        linkedinUrl: linkedinUrl,
        websiteEmpty: !websiteUrl.trim(),
        linkedinEmpty: !linkedinUrl.trim()
      });

      // A row should be kept only if it has at least one non-empty URL
      const hasValidUrl = websiteUrl.trim() !== '' || linkedinUrl.trim() !== '';
      
      // Log the decision
      console.log(`Row ${row.name} ${hasValidUrl ? 'kept' : 'removed'}`);
      
      return hasValidUrl;
    });

    console.log('Cleaned data:', cleanedData);

    // Calculate stats
    const newStats = {
      duplicatesRemoved: data.length - uniqueData.length,
      missingUrlsRemoved: uniqueData.length - cleanedData.length,
      remainingRows: cleanedData.length
    };

    console.log('Final stats:', newStats);

    // Update state and notify parent
    setStats(newStats);
    setIsCleaningComplete(true);
    onDataCleaned(cleanedData);

    toast({
      title: "Data Cleaning Complete",
      description: `Removed ${newStats.duplicatesRemoved} duplicates and ${newStats.missingUrlsRemoved} rows with missing URLs.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Step Indicator */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-nebula-300">Step 2 of 4</span>
          <div className="w-24 h-1 bg-nebula-800 rounded-full">
            <div className="w-1/2 h-full bg-cosmic-500 rounded-full" />
          </div>
        </div>
      </div>

      {/* Current Dataset Statistics */}
      <Card className="p-6 bg-nebula-900 border-nebula-700">
        <h3 className="text-lg font-semibold text-nebula-100 mb-4">Current Dataset Statistics</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-nebula-300">Total Rows</p>
            <p className="text-lg font-medium text-nebula-100">{data.length}</p>
          </div>
          <div>
            <p className="text-sm text-nebula-300">Total Columns</p>
            <p className="text-lg font-medium text-nebula-100">
              {Object.keys(data[0] || {}).length}
            </p>
          </div>
        </div>
      </Card>

      {/* Data Cleaning Instructions */}
      <Card className="p-6 bg-nebula-900 border-nebula-700">
        <h3 className="text-lg font-semibold text-nebula-100 mb-4">Data Cleaning Instructions</h3>
        <p className="text-sm text-nebula-300 mb-2">The following rows will be removed:</p>
        <ul className="list-disc list-inside text-sm text-nebula-300 space-y-1">
          <li>Duplicate entries (exactly matching rows)</li>
          <li>Rows without any URL (missing both Website and LinkedIn URLs)</li>
        </ul>
      </Card>

      {/* Error Message */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Cleaning Stats */}
      {isCleaningComplete && (
        <Card className="p-6 bg-nebula-900 border-nebula-700">
          <h3 className="text-lg font-semibold text-nebula-100 mb-4">Cleaning Results</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-nebula-300">Duplicates Removed</p>
              <p className="text-lg font-medium text-nebula-100">
                {stats.duplicatesRemoved}
              </p>
            </div>
            <div>
              <p className="text-sm text-nebula-300">Missing URLs Removed</p>
              <p className="text-lg font-medium text-nebula-100">
                {stats.missingUrlsRemoved}
              </p>
            </div>
            <div>
              <p className="text-sm text-nebula-300">Remaining Rows</p>
              <p className="text-lg font-medium text-nebula-100">
                {stats.remainingRows}
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button
          onClick={cleanData}
          disabled={isCleaning || isCleaningComplete}
          className="flex-1 bg-cosmic-500 hover:bg-cosmic-600"
        >
          {isCleaning ? 'Cleaning...' : 'Clean Data'}
        </Button>
        
        {isCleaningComplete && (
          <Button
            onClick={onNext}
            className="flex-1 bg-nebula-600 hover:bg-nebula-700"
          >
            Next Step
          </Button>
        )}
      </div>
    </div>
  );
};
