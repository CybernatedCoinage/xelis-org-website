import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import Roadmap from "./pages/Roadmap";
import Exchanges from "./pages/Exchanges";
import Resources from "./pages/Resources";
import Tokenomics from "./pages/Tokenomics";
import NotFound from "./pages/NotFound";
import Blog from "./pages/Blog";
import BlogArticlePage from "./pages/BlogArticlePage";
import Ecosystem from '@/pages/Ecosystem';

const queryClient = new QueryClient();

const GA_MEASUREMENT_ID = "G-8FC9METHBL"; // Replace with your GA ID

// Initialize Google Analytics
const initGA = () => {
  if (!window.gtag) {
    const script1 = document.createElement("script");
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script1);

    const script2 = document.createElement("script");
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_MEASUREMENT_ID}');
    `;
    document.head.appendChild(script2);
  }
};

// Track page views
const trackPageView = (url: string) => {
  if (window.gtag) {
    window.gtag("config", GA_MEASUREMENT_ID, { page_path: url });
  }
};

// Component to handle route changes
const AnalyticsHandler = () => {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);

  return null;
};

const App = () => {
  useEffect(() => {
    initGA();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnalyticsHandler />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/exchanges" element={<Exchanges />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/tokenomics" element={<Tokenomics />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blogarticlepage" element={<BlogArticlePage />} />
            <Route path="/blog/:slug" element={<BlogArticlePage />} />
            <Route path="/ecosystem" element={<Ecosystem />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
