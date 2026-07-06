import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

import { modules } from "./components/smart-data";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { ModulesGrid } from "./components/ModulesGrid";
import { ModuleDetail } from "./components/ModuleDetail";
import { FAQSection } from "./components/FAQSection";
import { ContactFooter } from "./components/ContactFooter";
import { SearchModal } from "./components/SearchModal";

type View = "home" | "faqs" | { type: "module"; id: string };

export default function App() {
  const [view, setView] = useState<View>("home");
  const [searchOpen, setSearchOpen] = useState(false);

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  const navigate = useCallback((v: string) => {
    if (v === "home") setView("home");
    else if (v === "faqs") setView("faqs");
    else if (v.startsWith("module:")) setView({ type: "module", id: v.slice(7) });
  }, []);

  const openModule = useCallback((id: string) => {
    setView({ type: "module", id });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const openFAQs = useCallback(() => {
    setView("faqs");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const exploreModules = useCallback(() => {
    if (view !== "home") {
      setView("home");
      setTimeout(() => {
        document.getElementById("modules-section")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById("modules-section")?.scrollIntoView({ behavior: "smooth" });
    }
  }, [view]);

  const currentModule =
    typeof view === "object" && view.type === "module"
      ? modules.find((m) => m.id === view.id) ?? null
      : null;

  const viewKey =
    view === "home" ? "home" : view === "faqs" ? "faqs" : `module-${(view as any).id}`;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#F8F8F8", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <Navbar
        currentView={viewKey}
        onNavigate={navigate}
        onOpenSearch={() => setSearchOpen(true)}
      />

      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onNavigateModule={openModule}
        onNavigateFAQ={openFAQs}
      />

      {/* Main content */}
      <AnimatePresence mode="wait">
        {view === "home" && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <HeroSection
              onExploreModules={exploreModules}
              onOpenFAQs={openFAQs}
            />
            <ModulesGrid
              modules={modules}
              onSelectModule={openModule}
            />
          </motion.div>
        )}

        {view === "faqs" && (
          <motion.div
            key="faqs"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
          >
            <div style={{ paddingTop: "66px" }}>
              {/* Back button */}
              <div
                style={{
                  backgroundColor: "#F8F8F8",
                  padding: "16px 24px 0",
                  maxWidth: "820px",
                  margin: "0 auto",
                }}
              >
                <button
                  onClick={() => { setView("home"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    color: "#757DE3",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "13px",
                    fontWeight: 600,
                    padding: 0,
                  }}
                >
                  ← Volver al inicio
                </button>
              </div>
              <FAQSection />
            </div>
          </motion.div>
        )}

        {currentModule && (
          <motion.div
            key={`module-${currentModule.id}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ModuleDetail
              module={currentModule}
              onBack={() => { setView("home"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              onNavigate={(id) => { openModule(id); }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer always visible */}
      <ContactFooter />
    </div>
  );
}
