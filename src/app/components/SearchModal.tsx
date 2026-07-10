import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, X, ArrowRight, HelpCircle } from "lucide-react";
import { modules, faqs } from "./smart-data";
import { loadModuleContent } from "../../content";

interface SearchResult {
  type: "module" | "faq";
  id: string;
  title: string;
  subtitle: string;
  moduleId?: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateModule: (id: string) => void;
  onNavigateFAQ: () => void;
}

function highlightText(text: string, query: string) {
  if (!query.trim()) return <span>{text}</span>;
  const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi"));
  return (
    <span>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark
            key={i}
            style={{
              backgroundColor: "rgba(117,125,227,0.18)",
              color: "#757DE3",
              borderRadius: "3px",
              padding: "0 1px",
              fontWeight: 600,
            }}
          >
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
}

function stripMarkdown(md: string) {
  return md
    .replace(/!\[[^\]]*\]\[[^\]]*\]/g, "")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\[([^\]]+)\]:\s*.+/g, "")
    .replace(/[#*_`~>|\-]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function SearchModal({ isOpen, onClose, onNavigateModule, onNavigateFAQ }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [selectedIdx, setSelectedIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Module bodies are code-split; fetch them the first time the search opens
  // so full-text search works without shipping them in the initial bundle.
  const [contents, setContents] = useState<Record<string, string>>({});
  useEffect(() => {
    if (!isOpen) return;
    let cancelled = false;
    Promise.all(
      modules.map(async (m) => [m.id, await loadModuleContent(m.id)] as const)
    ).then((entries) => {
      if (!cancelled) setContents(Object.fromEntries(entries));
    });
    return () => {
      cancelled = true;
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIdx(0);
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [isOpen]);

  const results: SearchResult[] = query.trim()
    ? [
        ...modules
          .filter((m) => {
            const q = query.toLowerCase();
            const content = contents[m.id] || "";
            return (
              m.title.toLowerCase().includes(q) ||
              m.description.toLowerCase().includes(q) ||
              stripMarkdown(content).toLowerCase().includes(q)
            );
          })
          .map((m) => ({
            type: "module" as const,
            id: m.id,
            title: m.title,
            subtitle: m.description,
          })),
        ...faqs
          .filter(
            (f) =>
              f.question.toLowerCase().includes(query.toLowerCase()) ||
              f.answer.toLowerCase().includes(query.toLowerCase())
          )
          .map((f) => ({
            type: "faq" as const,
            id: f.id,
            title: f.question,
            subtitle: f.category,
            moduleId: f.id,
          })),
      ]
    : [];

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIdx((p) => Math.min(p + 1, results.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIdx((p) => Math.max(p - 1, 0));
      }
      if (e.key === "Enter" && results[selectedIdx]) {
        handleSelect(results[selectedIdx]);
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, selectedIdx, results]);

  function handleSelect(result: SearchResult) {
    if (result.type === "module") {
      onNavigateModule(result.id);
    } else {
      onNavigateFAQ();
    }
    onClose();
  }

  useEffect(() => {
    setSelectedIdx(0);
  }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0,36,97,0.6)",
              backdropFilter: "blur(6px)",
              zIndex: 100,
            }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: -16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: -16 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{
              position: "fixed",
              top: "15%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "min(600px, calc(100vw - 32px))",
              backgroundColor: "#fff",
              borderRadius: "20px",
              boxShadow: "0 24px 80px rgba(0,36,97,0.25)",
              zIndex: 101,
              overflow: "hidden",
            }}
          >
            {/* Search input */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "16px 20px",
                borderBottom: "1px solid #f0f0f5",
              }}
            >
              <Search size={18} color="#757DE3" style={{ flexShrink: 0 }} />
              <input
                ref={inputRef}
                type="text"
                placeholder="Buscar en el manual..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{
                  flex: 1,
                  border: "none",
                  outline: "none",
                  fontSize: "16px",
                  color: "#002461",
                  backgroundColor: "transparent",
                  fontWeight: 500,
                }}
              />
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#959595",
                      display: "flex",
                      padding: "2px",
                    }}
                  >
                    <X size={16} />
                  </button>
                )}
                <kbd
                  style={{
                    fontSize: "11px",
                    padding: "2px 7px",
                    backgroundColor: "#F8F8F8",
                    border: "1px solid #e8e8f0",
                    borderRadius: "6px",
                    color: "#959595",
                    fontFamily: "monospace",
                  }}
                >
                  ESC
                </kbd>
              </div>
            </div>

            {/* Results */}
            <div style={{ maxHeight: "380px", overflowY: "auto" }}>
              {!query.trim() ? (
                <div style={{ padding: "24px 20px" }}>
                  <div style={{ color: "#959595", fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "12px" }}>
                    Módulos disponibles
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {modules.map((m) => {
                      const Icon = m.icon;
                      return (
                        <button
                          key={m.id}
                          onClick={() => { onNavigateModule(m.id); onClose(); }}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            padding: "6px 12px",
                            borderRadius: "9999px",
                            border: "1px solid #e8e8f0",
                            backgroundColor: "#F8F8F8",
                            color: "#002461",
                            fontSize: "13px",
                            fontWeight: 500,
                            cursor: "pointer",
                            transition: "all 0.15s",
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(117,125,227,0.08)";
                            (e.currentTarget as HTMLButtonElement).style.borderColor = "#757DE3";
                            (e.currentTarget as HTMLButtonElement).style.color = "#757DE3";
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#F8F8F8";
                            (e.currentTarget as HTMLButtonElement).style.borderColor = "#e8e8f0";
                            (e.currentTarget as HTMLButtonElement).style.color = "#002461";
                          }}
                        >
                          <Icon size={13} />
                          {m.title}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : results.length === 0 ? (
                <div style={{ padding: "40px 20px", textAlign: "center" }}>
                  <div style={{ color: "#c0c0d0", marginBottom: "8px" }}>
                    <Search size={32} />
                  </div>
                  <div style={{ color: "#959595", fontSize: "14px" }}>
                    Sin resultados para "{query}"
                  </div>
                  <div style={{ color: "#c0c0d0", fontSize: "12px", marginTop: "6px" }}>
                    Intenta con otro término de búsqueda.
                  </div>
                </div>
              ) : (
                <div style={{ padding: "8px" }}>
                  {/* Group by type */}
                  {results.some((r) => r.type === "module") && (
                    <div>
                      <div
                        style={{
                          padding: "8px 12px 4px",
                          color: "#959595",
                          fontSize: "11px",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                        }}
                      >
                        Módulos
                      </div>
                      {results
                        .filter((r) => r.type === "module")
                        .map((result) => {
                          const mod = modules.find((m) => m.id === result.id);
                          const Icon = mod?.icon;
                          const globalIdx = results.indexOf(result);
                          const isSelected = globalIdx === selectedIdx;
                          return (
                            <button
                              key={result.id}
                              onClick={() => handleSelect(result)}
                              onMouseEnter={() => setSelectedIdx(globalIdx)}
                              style={{
                                width: "100%",
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                padding: "10px 12px",
                                borderRadius: "10px",
                                border: "none",
                                backgroundColor: isSelected ? "rgba(117,125,227,0.08)" : "transparent",
                                cursor: "pointer",
                                textAlign: "left",
                                transition: "background-color 0.15s",
                              }}
                            >
                              <div
                                style={{
                                  width: "34px",
                                  height: "34px",
                                  borderRadius: "9px",
                                  backgroundColor: "rgba(117,125,227,0.1)",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  flexShrink: 0,
                                }}
                              >
                                {Icon && <Icon size={17} color="#757DE3" />}
                              </div>
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ color: "#002461", fontSize: "14px", fontWeight: 600 }}>
                                  {highlightText(result.title, query)}
                                </div>
                                <div style={{ color: "#959595", fontSize: "12px", marginTop: "2px" }}>
                                  {highlightText(result.subtitle, query)}
                                </div>
                              </div>
                              <ArrowRight size={14} color="#c0c0d0" />
                            </button>
                          );
                        })}
                    </div>
                  )}

                  {results.some((r) => r.type === "faq") && (
                    <div>
                      <div
                        style={{
                          padding: "8px 12px 4px",
                          color: "#959595",
                          fontSize: "11px",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                        }}
                      >
                        Preguntas frecuentes
                      </div>
                      {results
                        .filter((r) => r.type === "faq")
                        .map((result) => {
                          const globalIdx = results.indexOf(result);
                          const isSelected = globalIdx === selectedIdx;
                          return (
                            <button
                              key={result.id}
                              onClick={() => handleSelect(result)}
                              onMouseEnter={() => setSelectedIdx(globalIdx)}
                              style={{
                                width: "100%",
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                padding: "10px 12px",
                                borderRadius: "10px",
                                border: "none",
                                backgroundColor: isSelected ? "rgba(117,125,227,0.08)" : "transparent",
                                cursor: "pointer",
                                textAlign: "left",
                                transition: "background-color 0.15s",
                              }}
                            >
                              <div
                                style={{
                                  width: "34px",
                                  height: "34px",
                                  borderRadius: "9px",
                                  backgroundColor: "rgba(119,222,162,0.1)",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  flexShrink: 0,
                                }}
                              >
                                <HelpCircle size={17} color="#77DEA2" />
                              </div>
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ color: "#002461", fontSize: "13px", fontWeight: 600, lineHeight: 1.4 }}>
                                  {highlightText(result.title, query)}
                                </div>
                                <div
                                  style={{
                                    color: "#77DEA2",
                                    fontSize: "11px",
                                    fontWeight: 600,
                                    marginTop: "2px",
                                    backgroundColor: "rgba(119,222,162,0.1)",
                                    display: "inline-block",
                                    borderRadius: "9999px",
                                    padding: "1px 7px",
                                  }}
                                >
                                  {result.subtitle}
                                </div>
                              </div>
                              <ArrowRight size={14} color="#c0c0d0" />
                            </button>
                          );
                        })}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer hint */}
            <div
              style={{
                borderTop: "1px solid #f0f0f5",
                padding: "10px 20px",
                display: "flex",
                gap: "16px",
                color: "#c0c0d0",
                fontSize: "11px",
              }}
            >
              {[
                { keys: ["↑", "↓"], label: "navegar" },
                { keys: ["↵"], label: "seleccionar" },
                { keys: ["ESC"], label: "cerrar" },
              ].map(({ keys, label }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  {keys.map((k) => (
                    <kbd
                      key={k}
                      style={{
                        padding: "1px 5px",
                        borderRadius: "4px",
                        backgroundColor: "#F8F8F8",
                        border: "1px solid #e8e8f0",
                        fontFamily: "monospace",
                        fontSize: "10px",
                        color: "#959595",
                      }}
                    >
                      {k}
                    </kbd>
                  ))}
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
