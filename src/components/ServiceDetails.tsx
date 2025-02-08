import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

interface ServiceDetailsProps {
  remainingRows: number;
  onNext: () => void;
}

interface ServiceFormData {
  service: string;
  companyName: string;
  emailAim: string;
  customAim?: string;
}

const EMAIL_AIMS = [
  'Introductory email',
  'Sales email',
  'Follow-up email',
  'Custom'
] as const;

const CREDITS_PER_ROW = 1; // Credits needed per row for personalization

export const ServiceDetails = ({ remainingRows, onNext }: ServiceDetailsProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ServiceFormData>(() => {
    // Try to load saved data from localStorage
    const savedData = localStorage.getItem('serviceDetails');
    return savedData ? JSON.parse(savedData) : {
      service: '',
      companyName: '',
      emailAim: '',
      customAim: ''
    };
  });

  const [isCustomAim, setIsCustomAim] = useState(false);

  // Update localStorage whenever form data changes
  useEffect(() => {
    localStorage.setItem('serviceDetails', JSON.stringify(formData));
  }, [formData]);

  const handleInputChange = (field: keyof ServiceFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleEmailAimChange = (value: string) => {
    setIsCustomAim(value === 'Custom');
    handleInputChange('emailAim', value);
    if (value !== 'Custom') {
      handleInputChange('customAim', '');
    }
  };

  const isFormValid = () => {
    return formData.service.trim() !== '' &&
           formData.companyName.trim() !== '' &&
           formData.emailAim.trim() !== '' &&
           (!isCustomAim || (isCustomAim && formData.customAim?.trim() !== ''));
  };

  const handleSave = () => {
    if (!isFormValid()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all required fields.",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Service details saved successfully!",
    });
    onNext();
  };

  return (
    <div className="space-y-6">
      {/* Stats Card */}
      <Card className="p-6 bg-nebula-900 border-nebula-700">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-sm text-nebula-400">Remaining Rows</p>
            <p className="text-2xl font-bold text-nebula-100">{remainingRows}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-nebula-400">Credits Required</p>
            <p className="text-2xl font-bold text-nebula-100">{remainingRows * CREDITS_PER_ROW}</p>
          </div>
        </div>
      </Card>

      {/* Form */}
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-nebula-200">
            What service do you provide?
          </label>
          <Textarea
            placeholder="Describe your service..."
            value={formData.service}
            onChange={(e) => handleInputChange('service', e.target.value)}
            className="min-h-[100px]"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-nebula-200">
            Company Name
          </label>
          <Input
            placeholder="Enter your company name"
            value={formData.companyName}
            onChange={(e) => handleInputChange('companyName', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-nebula-200">
            Email Aim
          </label>
          <Select
            value={formData.emailAim}
            onValueChange={handleEmailAimChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select email aim" />
            </SelectTrigger>
            <SelectContent>
              {EMAIL_AIMS.map((aim) => (
                <SelectItem key={aim} value={aim}>
                  {aim}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {isCustomAim && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-nebula-200">
              Custom Aim
            </label>
            <Input
              placeholder="Describe your custom aim"
              value={formData.customAim}
              onChange={(e) => handleInputChange('customAim', e.target.value)}
            />
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        <Button
          variant="default"
          onClick={handleSave}
          disabled={!isFormValid()}
        >
          Save & Continue
        </Button>
      </div>
    </div>
  );
};
