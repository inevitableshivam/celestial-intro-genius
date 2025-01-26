import { FileUpload } from "@/components/FileUpload";
import { Header } from "@/components/Header";
import { HistoryGrid } from "@/components/HistoryGrid";
import { Navbar } from "@/components/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen w-full">
      <Navbar />
      
      <div className="container py-8">
        <Header />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Main Dashboard Section */}
          <div className="glass-card p-6 order-2 lg:order-1">
            <h2 className="text-2xl font-semibold mb-6 text-cosmic-300">Generate Introductions</h2>
            <FileUpload />
          </div>
          
          {/* History Section */}
          <div className="glass-card p-6 order-1 lg:order-2">
            <h2 className="text-2xl font-semibold mb-6 text-cosmic-300">Recent History</h2>
            <HistoryGrid />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;