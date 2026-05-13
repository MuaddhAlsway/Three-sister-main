import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./app/contexts/LanguageContext.tsx";
import { ScrollToTop } from "./app/components/ScrollToTop.tsx";
import App from "./app/App.tsx";
import { CaseStudyPage } from "./app/pages/CaseStudyPage.tsx";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <LanguageProvider>
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/project/:projectId" element={<CaseStudyPage />} />
      </Routes>
    </Router>
  </LanguageProvider>
);