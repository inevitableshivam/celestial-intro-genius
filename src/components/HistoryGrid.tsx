import { Mail, Calendar, User } from 'lucide-react';

const mockHistory = [
  {
    id: 1,
    recipient: "John Doe",
    company: "Tech Corp",
    date: "2024-02-20",
    line: "I was impressed by your recent article on AI implementation...",
  },
  {
    id: 2,
    recipient: "Jane Smith",
    company: "Innovation Labs",
    date: "2024-02-19",
    line: "Your work on sustainable technology caught my attention...",
  },
];

export const HistoryGrid = () => {
  return (
    <div className="grid grid-cols-1 gap-4 max-h-[500px] overflow-y-auto pr-2">
      {mockHistory.map((item) => (
        <div key={item.id} className="glass-card p-4 hover:bg-white/10 transition-all">
          <div className="flex items-center gap-3 mb-3">
            <div className="rounded-full p-2 nebula-gradient">
              <User className="w-4 h-4 text-nebula-50" />
            </div>
            <div>
              <h4 className="font-medium text-nebula-50">{item.recipient}</h4>
              <p className="text-sm text-nebula-300">{item.company}</p>
            </div>
          </div>
          <p className="text-sm text-nebula-200 mb-3 line-clamp-2">{item.line}</p>
          <div className="flex items-center gap-2 text-nebula-400 text-sm">
            <Calendar className="w-4 h-4" />
            {item.date}
          </div>
        </div>
      ))}
    </div>
  );
};