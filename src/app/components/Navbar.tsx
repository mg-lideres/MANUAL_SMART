import { useState, useEffect } from "react";
import { Search, Menu, X, Zap } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onOpenSearch: () => void;
}

export function Navbar({ currentView, onNavigate, onOpenSearch }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Inicio", view: "home" },
    { label: "Módulos", view: "home", anchor: "modules" },
    { label: "FAQs", view: "faqs" },
    { label: "Contacto", view: "contact" },
  ];

  const handleNavClick = (link: { view: string; anchor?: string }) => {
    setMobileMenuOpen(false);
    if (link.anchor === "modules" && currentView === "home") {
      document.getElementById("modules-section")?.scrollIntoView({ behavior: "smooth" });
    } else if (link.view === "contact") {
      document.getElementById("contact-footer")?.scrollIntoView({ behavior: "smooth" });
    } else {
      onNavigate(link.view);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header
      style={{
        backgroundColor: scrolled ? "rgba(0,36,97,0.97)" : "#002461",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.3)" : "none",
        transition: "all 0.3s ease",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 24px",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
        }}
      >
        {/* Logo */}
        <button
          onClick={() => { onNavigate("home"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
            background: "none",
            border: "none",
            padding: 0,
          }}
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              backgroundColor: "#757DE3",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Zap size={20} color="#fff" fill="#fff" />
          </div>
          <span
            style={{
              color: "#fff",
              fontSize: "20px",
              fontWeight: 700,
              letterSpacing: "0.05em",
            }}
          >
            SMART
          </span>
          <span
            style={{
              color: "#77DEA2",
              fontSize: "11px",
              fontWeight: 500,
              backgroundColor: "rgba(119,222,162,0.15)",
              padding: "2px 8px",
              borderRadius: "9999px",
              border: "1px solid rgba(119,222,162,0.3)",
            }}
          >
            Manual
          </span>
        </button>

        {/* Desktop Nav */}
        <nav
          style={{ display: "flex", gap: "4px", alignItems: "center" }}
          className="hidden md:flex"
        >
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link)}
              style={{
                color: "rgba(255,255,255,0.8)",
                fontSize: "14px",
                fontWeight: 500,
                padding: "6px 14px",
                borderRadius: "8px",
                border: "none",
                background: "none",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLButtonElement).style.backgroundColor =
                  "rgba(255,255,255,0.1)";
                (e.target as HTMLButtonElement).style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLButtonElement).style.backgroundColor = "transparent";
                (e.target as HTMLButtonElement).style.color = "rgba(255,255,255,0.8)";
              }}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* Search */}
          <button
            onClick={onOpenSearch}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "8px",
              padding: "6px 12px",
              cursor: "pointer",
              color: "rgba(255,255,255,0.7)",
              fontSize: "13px",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(255,255,255,0.2)";
              (e.currentTarget as HTMLButtonElement).style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(255,255,255,0.1)";
              (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.7)";
            }}
          >
            <Search size={15} />
            <span className="hidden sm:inline">Buscar</span>
            <kbd
              style={{
                fontSize: "10px",
                padding: "1px 5px",
                backgroundColor: "rgba(255,255,255,0.15)",
                borderRadius: "4px",
                fontFamily: "monospace",
              }}
              className="hidden sm:inline"
            >
              ⌘K
            </kbd>
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              color: "#fff",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px",
            }}
            className="md:hidden"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              overflow: "hidden",
              borderTop: "1px solid rgba(255,255,255,0.1)",
              backgroundColor: "#002461",
            }}
          >
            <div style={{ padding: "12px 24px 16px", display: "flex", flexDirection: "column", gap: "4px" }}>
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link)}
                  style={{
                    color: "rgba(255,255,255,0.85)",
                    fontSize: "15px",
                    fontWeight: 500,
                    padding: "10px 14px",
                    borderRadius: "8px",
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
