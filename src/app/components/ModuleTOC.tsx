import { useState } from "react";
import { motion } from "motion/react";
import { List, X, ChevronRight } from "lucide-react";
import { slugify, dedupeSlug } from "../lib/slugify";

export interface TOCItem {
  id: string;
  title: string;
  level: 2 | 3;
}

export function extractSections(content: string): TOCItem[] {
  const items: TOCItem[] = [];
  const seenSlugs = new Map<string, number>();
  const lines = content.split(/\r?\n/);
  for (const line of lines) {
    const match = line.match(/^(##|###)\s+(.+?)\s*(?:\{#[^}]*\})?\s*$/);
    if (match) {
      const raw = match[2]
        .replace(/\*\*/g, "")
        .replace(/\s*\{#[^}]+\}\s*$/g, "")
        .trim();
      const title = raw.replace(/^Sección:\s*/i, "");
      const id = dedupeSlug(slugify(title), seenSlugs);
      items.push({ id, title, level: match[1] === "##" ? 2 : 3 });
    }
  }
  return items;
}

interface ModuleTOCProps {
  content: string;
  activeId: string;
  onSelect: (id: string) => void;
}

export function ModuleTOC({ content, activeId, onSelect }: ModuleTOCProps) {
  // Only top-level sections are separately selectable tabs; ### headings stay
  // as in-page markers within whichever tab's content they belong to.
  const items = extractSections(content).filter((item) => item.level === 2);
  const [mobileOpen, setMobileOpen] = useState(false);

  const select = (id: string) => {
    onSelect(id);
    setMobileOpen(false);
  };

  if (items.length === 0) return null;

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen((p) => !p)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 50,
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          backgroundColor: "#757DE3",
          color: "#fff",
          border: "none",
          boxShadow: "0 4px 14px rgba(117,125,227,0.35)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        className="toc-mobile-toggle lg:hidden"
      >
        {mobileOpen ? <X size={22} /> : <List size={22} />}
      </button>

      {/* Tab panel */}
      <aside
        style={{
          width: "260px",
          flexShrink: 0,
          position: "sticky",
          top: "90px",
          alignSelf: "flex-start",
          maxHeight: "calc(100vh - 120px)",
          overflowY: "auto",
        }}
        className="toc-sidebar hidden lg:block"
      >
        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: "14px",
            border: "1px solid #e8e8f0",
            padding: "16px",
            boxShadow: "0 2px 12px rgba(0,36,97,0.04)",
          }}
        >
          <div
            style={{
              color: "#002461",
              fontSize: "12px",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: "12px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <List size={14} />
            Contenido
          </div>
          <nav style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {items.map((item) => {
              const active = item.id === activeId;
              return (
                <button
                  key={item.id}
                  onClick={() => select(item.id)}
                  style={{
                    position: "relative",
                    textAlign: "left",
                    padding: "9px 12px",
                    borderRadius: "8px",
                    border: "none",
                    backgroundColor: "transparent",
                    color: active ? "#757DE3" : "#666",
                    fontSize: "13px",
                    fontWeight: active ? 700 : 500,
                    lineHeight: 1.4,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "6px",
                  }}
                  onMouseEnter={(e) => {
                    if (!active) (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#f8f8fb";
                  }}
                  onMouseLeave={(e) => {
                    if (!active) (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
                  }}
                >
                  {active && (
                    <motion.span
                      layoutId="toc-active-pill"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: "8px",
                        backgroundColor: "rgba(117,125,227,0.1)",
                        zIndex: 0,
                      }}
                    />
                  )}
                  <span style={{ position: "relative", zIndex: 1 }}>{item.title}</span>
                  <ChevronRight
                    size={14}
                    style={{
                      position: "relative",
                      zIndex: 1,
                      flexShrink: 0,
                      opacity: active ? 1 : 0,
                      transform: active ? "translateX(0)" : "translateX(-4px)",
                      transition: "opacity 0.2s ease, transform 0.2s ease",
                    }}
                  />
                </button>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Mobile panel overlay */}
      {mobileOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,36,97,0.45)",
            zIndex: 40,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            padding: "20px",
          }}
          className="toc-mobile-overlay"
          onClick={() => setMobileOpen(false)}
        >
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "16px",
              width: "100%",
              maxWidth: "360px",
              maxHeight: "70vh",
              overflowY: "auto",
              padding: "20px",
              boxShadow: "0 12px 40px rgba(0,36,97,0.2)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                color: "#002461",
                fontSize: "13px",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: "14px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <List size={16} />
              Contenido
            </div>
            <nav style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {items.map((item) => {
                const active = item.id === activeId;
                return (
                  <button
                    key={item.id}
                    onClick={() => select(item.id)}
                    style={{
                      textAlign: "left",
                      padding: "10px 12px",
                      borderRadius: "10px",
                      border: "none",
                      backgroundColor: active ? "rgba(117,125,227,0.1)" : "#F8F8F8",
                      color: active ? "#757DE3" : "#555",
                      fontSize: "14px",
                      fontWeight: active ? 700 : 500,
                      cursor: "pointer",
                    }}
                  >
                    {item.title}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
