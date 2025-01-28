import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import History from "./pages/History";
import Writer from "./pages/Writer";
import Resources from "./pages/Resources";
import Settings from "./pages/Settings";
import { Navbar } from "./components/Navbar";

const queryClient = new QueryClient();

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return null;
  }

  if (!session) {
    return <Navigate to="/auth" />;
  }

  return children;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route
            element={
              <PrivateRoute>
                <div className="min-h-screen bg-background">
                  <Navbar />
                  <main className="pt-16">
                    <Routes>
                      <Route index element={<Index />} />
                      <Route path="history" element={<History />} />
                      <Route path="writer" element={<Writer />} />
                      <Route path="resources" element={<Resources />} />
                      <Route path="settings" element={<Settings />} />
                    </Routes>
                  </main>
                </div>
              </PrivateRoute>
            }
          >
            <Route path="/" element={null} />
            <Route path="/history" element={null} />
            <Route path="/writer" element={null} />
            <Route path="/resources" element={null} />
            <Route path="/settings" element={null} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;