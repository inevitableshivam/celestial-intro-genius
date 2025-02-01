import { useState, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Info } from 'lucide-react';

interface ColumnMapperProps {
  columns: string[];
  onNext: (mapping: { websiteColumn: string; linkedinColumn: string }) => void;
}

export const ColumnMapper = ({ columns, onNext }: ColumnMapperProps) => {
  const [websiteColumn, setWebsiteColumn] = useState<string>('');
  const [linkedinColumn, setLinkedinColumn] = useState<string>('');

  const canProceed = websiteColumn && linkedinColumn;

  const handleNext = () => {
    if (canProceed) {
      onNext({ websiteColumn, linkedinColumn });
    }
  };

  return (
    <div className="space-y-6">
      {/* Step Indicator */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-nebula-300">Step 1 of 4</span>
          <div className="w-24 h-1 bg-nebula-800 rounded-full">
            <div className="w-1/4 h-full bg-cosmic-500 rounded-full" />
          </div>
        </div>
      </div>

      {/* Instructions Card */}
      <Card className="p-4 border-nebula-700 bg-nebula-900/50">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-cosmic-500 mt-0.5" />
          <div>
            <h3 className="font-medium text-nebula-100 mb-1">Column Mapping Instructions</h3>
            <p className="text-sm text-nebula-300">
              Please select the columns from your CSV that contain the Website URLs and LinkedIn URLs. 
              We'll use these to generate personalized content for each entry.
            </p>
          </div>
        </div>
      </Card>

      {/* Column Selection */}
      <div className="grid gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-nebula-200">Website URL Column</label>
          <Select value={websiteColumn} onValueChange={setWebsiteColumn}>
            <SelectTrigger className="w-full bg-nebula-900 border-nebula-700">
              <SelectValue placeholder="Select column for website URLs" />
            </SelectTrigger>
            <SelectContent>
              {columns.map((column) => (
                <SelectItem key={column} value={column}>
                  {column}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-nebula-200">LinkedIn URL Column</label>
          <Select value={linkedinColumn} onValueChange={setLinkedinColumn}>
            <SelectTrigger className="w-full bg-nebula-900 border-nebula-700">
              <SelectValue placeholder="Select column for LinkedIn URLs" />
            </SelectTrigger>
            <SelectContent>
              {columns.map((column) => (
                <SelectItem key={column} value={column}>
                  {column}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Additional Columns Info */}
        <Card className="p-4 border-nebula-700 bg-nebula-900/50">
          <h3 className="font-medium text-nebula-100 mb-2">Additional Columns</h3>
          <p className="text-sm text-nebula-300 mb-3">
            The following columns will be automatically added to your CSV:
          </p>
          <ul className="space-y-2 text-sm text-nebula-300">
            <li>• LinkedIn Scrape Data</li>
            <li>• Website Scrape Data</li>
            <li>• Personalized Line V1</li>
            <li>• Personalized Line V2</li>
            <li>• Personalized Line V3</li>
          </ul>
        </Card>

        <Button 
          onClick={handleNext}
          disabled={!canProceed}
          className="w-full bg-cosmic-500 hover:bg-cosmic-600 text-white"
        >
          Next Step
        </Button>
      </div>
    </div>
  );
};
