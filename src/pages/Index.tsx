import { FileUpload } from "@/components/FileUpload";
import { Header } from "@/components/Header";
import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowUp, ArrowDown, Clock } from "lucide-react";

const StatsCard = ({ title, value, change, timeframe }: { title: string; value: string; change: string; timeframe: string }) => (
  <Card className="glass-card p-6">
    <h3 className="text-nebula-400 text-sm mb-2">{title}</h3>
    <div className="flex items-baseline gap-2">
      <span className="text-2xl font-semibold text-nebula-50">{value}</span>
      <span className="text-xs text-nebula-400">
        {change} from {timeframe}
      </span>
    </div>
  </Card>
);

const ProcessingStatus = () => (
  <Card className="glass-card p-6">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-nebula-50 font-semibold">Processing Status</h3>
      <span className="text-nebula-400">50%</span>
    </div>
    <Progress value={50} className="mb-4" />
    <div className="grid grid-cols-3 gap-4">
      <div>
        <p className="text-nebula-400 text-sm mb-1">Processed</p>
        <p className="text-nebula-50 font-semibold">25/50</p>
      </div>
      <div>
        <p className="text-nebula-400 text-sm mb-1">Success Rate</p>
        <p className="text-nebula-50 font-semibold">98%</p>
      </div>
      <div>
        <p className="text-nebula-400 text-sm mb-1">Time Left</p>
        <p className="text-nebula-50 font-semibold">~2m</p>
      </div>
    </div>
  </Card>
);

const Index = () => {
  return (
    <div className="min-h-screen w-full">
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatsCard
            title="Total Contacts"
            value="2,345"
            change="+180"
            timeframe="last month"
          />
          <StatsCard
            title="Processing Rate"
            value="98.2%"
            change="+2.1%"
            timeframe="last week"
          />
          <StatsCard
            title="Avg. Response Time"
            value="1.2s"
            change="-0.1s"
            timeframe="last week"
          />
          <StatsCard
            title="Success Rate"
            value="99.9%"
            change="+0.5%"
            timeframe="last month"
          />
        </div>

        <div className="space-y-6">
          <Card className="glass-card p-6">
            <h2 className="text-xl font-semibold text-nebula-50 mb-2">Upload Contacts</h2>
            <p className="text-nebula-400 text-sm mb-6">
              Upload a CSV file with columns: full_name, linkedin_url, website_url
            </p>
            <FileUpload />
          </Card>

          <ProcessingStatus />
        </div>
      </div>
    </div>
  );
};

export default Index;