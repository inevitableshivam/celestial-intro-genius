import { FileUpload } from "@/components/FileUpload";
import { Header } from "@/components/Header";
import { HistoryGrid } from "@/components/HistoryGrid";

const Index = () => {
  return (
    <div className="min-h-screen w-full container py-12">
      <Header />
      
      <div className="max-w-xl mx-auto mb-16">
        <FileUpload />
      </div>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-6">Recent Generations</h2>
        <HistoryGrid />
      </section>
    </div>
  );
};

export default Index;