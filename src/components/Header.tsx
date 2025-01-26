import { Sparkles } from 'lucide-react';

export const Header = () => {
  return (
    <header className="flex flex-col items-center text-center mb-12">
      <div className="rounded-full p-3 nebula-gradient mb-6 animate-float">
        <Sparkles className="w-6 h-6 text-nebula-50" />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        <span className="text-gradient">Nebula</span>
      </h1>
      <p className="text-lg text-nebula-300 max-w-2xl">
        Generate personalized email introductions powered by AI. Upload your CSV file with LinkedIn profiles and watch the magic happen.
      </p>
    </header>
  );
};