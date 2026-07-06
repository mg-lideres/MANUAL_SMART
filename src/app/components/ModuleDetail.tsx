import { useState, useEffect, useMemo } from "react";
import { motion } from "motion/react";
import { ArrowLeft, ChevronRight, ChevronLeft, Layers, Clock } from "lucide-react";
import { type Module, modules } from "./smart-data";
import { moduleContents } from "../../content";
import { MarkdownContent } from "./MarkdownContent";
import { ModuleTOC, extractSections } from "./ModuleTOC";

interface ModuleDetailProps {
  module: Module;
  onBack: () => void;
  onNavigate: (id: string) => void;
}

const WORDS_PER_MINUTE = 200;

export function ModuleDetail({ module, onBack, onNavigate }: ModuleDetailProps) {
  const currentIndex = modules.findIndex((m) => m.id === module.id);
  const prevModule = currentIndex > 0 ? modules[currentIndex - 1] : null;
  const nextModule = currentIndex < modules.length - 1 ? modules[currentIndex + 1] : null;

  const rawContent = moduleContents[module.id] || "";
  // The module title is already shown in the page header; skip the markdown H1.
  const content = rawContent.replace(/^# .*\n+/, "");
  const Icon = module.icon;

  const h2Ids = useMemo(
    () => extractSections(content).filter((item) => item.level === 2).map((item) => item.id),
    [content]
  );

  // App.tsx keys ModuleDetail by module id, so this fully remounts (and this
  // lazy initializer re-runs) whenever the user navigates to a different module.
  const [activeId, setActiveId] = useState(() => h2Ids[0] ?? "");
  const [scrollProgress, setScrollProgress] = useState(0);

  // Only the active section's content is expanded — the rest of the module
  // stays a tap away in the sidebar instead of one long scroll.
  const openMap = useMemo(
    () => Object.fromEntries(h2Ids.map((id) => [id, id === activeId])),
    [h2Ids, activeId]
  );

  const { sectionCount, readMinutes } = useMemo(() => {
    const sections = content.match(/^##\s+/gm)?.length ?? 0;
    // Strip markdown noise and image reference definitions before counting words.
    const words = content
      .replace(/^\[image[^\]]*\]:.*$/gm, "")
      .replace(/!\[[^\]]*\]\[[^\]]*\]/g, "")
      .replace(/[#*_`~>|]/g, "")
      .split(/\s+/)
      .filter(Boolean).length;
    return {
      sectionCount: sections,
      readMinutes: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
    };
  }, [content]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [module.id]);

  return (
    <div style={{ backgroundColor: "#F8F8F8", minHeight: "100vh", paddingTop: "72px" }}>
      {/* Reading progress bar */}
      <div
        style={{
          position: "fixed",
          top: "64px",
          left: 0,
          right: 0,
          height: "3px",
          zIndex: 51,
          backgroundColor: "transparent",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${scrollProgress * 100}%`,
            background: "linear-gradient(90deg, #757DE3, #77DEA2)",
            transition: "width 0.1s linear",
          }}
        />
      </div>

      {/* Module header */}
      <div
        style={{
          background: "linear-gradient(135deg, #002461 0%, #1a1a6e 100%)",
          padding: "28px 24px 44px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(117,125,227,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(117,125,227,0.08) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "-40px",
            top: "-40px",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            backgroundColor: "rgba(117,125,227,0.15)",
            filter: "blur(40px)",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: "1180px", margin: "0 auto", position: "relative" }}>
          {/* Breadcrumb */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "18px",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={onBack}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                color: "rgba(255,255,255,0.65)",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "13px",
                padding: 0,
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#fff")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.65)")}
            >
              <ArrowLeft size={14} />
              Inicio
            </button>
            <ChevronRight size={12} color="rgba(255,255,255,0.35)" />
            <span style={{ color: "rgba(255,255,255,0.65)", fontSize: "13px" }}>Módulos</span>
            <ChevronRight size={12} color="rgba(255,255,255,0.35)" />
            <span style={{ color: "#757DE3", fontSize: "13px", fontWeight: 600 }}>
              {module.title}
            </span>
          </div>

          {/* Module identity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ display: "flex", alignItems: "center", gap: "18px" }}
          >
            <div
              style={{
                width: "58px",
                height: "58px",
                borderRadius: "16px",
                backgroundColor: "rgba(117,125,227,0.2)",
                border: "2px solid rgba(117,125,227,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Icon size={26} color="#757DE3" />
            </div>
            <div>
              <div
                style={{
                  color: "#757DE3",
                  fontSize: "11px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: "4px",
                }}
              >
                Módulo {currentIndex + 1} de {modules.length}
              </div>
              <h1
                style={{
                  color: "#fff",
                  fontSize: "clamp(22px, 4vw, 32px)",
                  fontWeight: 800,
                  margin: 0,
                  lineHeight: 1.2,
                }}
              >
                {module.title}
              </h1>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px", margin: "6px 0 0" }}>
                {module.description}
              </p>
              {sectionCount > 0 && (
                <div style={{ display: "flex", gap: "16px", marginTop: "10px" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "6px", color: "rgba(255,255,255,0.5)", fontSize: "12px" }}>
                    <Layers size={13} />
                    {sectionCount} {sectionCount === 1 ? "sección" : "secciones"}
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: "6px", color: "rgba(255,255,255,0.5)", fontSize: "12px" }}>
                    <Clock size={13} />
                    {readMinutes} min de lectura
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main content with sidebar */}
      <div
        style={{
          maxWidth: "1180px",
          margin: "0 auto",
          padding: "32px 24px 64px",
        }}
      >
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-7" style={{ alignItems: "flex-start" }}>
          <ModuleTOC content={content} activeId={activeId} onSelect={setActiveId} />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full"
            style={{
              flex: 1,
              minWidth: 0,
              backgroundColor: "#fff",
              borderRadius: "18px",
              padding: "28px",
              boxShadow: "0 2px 14px rgba(0,36,97,0.05)",
            }}
          >
            <MarkdownContent content={content} openMap={openMap} onToggleSection={setActiveId} />
          </motion.div>
        </div>

        {/* Module navigation */}
        <div style={{ display: "flex", gap: "12px", justifyContent: "space-between", marginTop: "32px" }}>
          {prevModule ? (
            <motion.button
              whileHover={{ x: -4 }}
              onClick={() => onNavigate(prevModule.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                flex: 1,
                padding: "16px 20px",
                backgroundColor: "#fff",
                border: "2px solid #f0f0f5",
                borderRadius: "12px",
                cursor: "pointer",
                textAlign: "left",
                boxShadow: "0 2px 8px rgba(0,36,97,0.04)",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.borderColor = "#757DE3")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.borderColor = "#f0f0f5")}
            >
              <ChevronLeft size={18} color="#757DE3" />
              <div>
                <div style={{ color: "#959595", fontSize: "11px", marginBottom: "2px" }}>Anterior</div>
                <div style={{ color: "#002461", fontSize: "13px", fontWeight: 600 }}>{prevModule.title}</div>
              </div>
            </motion.button>
          ) : <div style={{ flex: 1 }} />}

          {nextModule ? (
            <motion.button
              whileHover={{ x: 4 }}
              onClick={() => onNavigate(nextModule.id)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: "10px",
                flex: 1,
                padding: "16px 20px",
                backgroundColor: "#fff",
                border: "2px solid #f0f0f5",
                borderRadius: "12px",
                cursor: "pointer",
                textAlign: "right",
                boxShadow: "0 2px 8px rgba(0,36,97,0.04)",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.borderColor = "#757DE3")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.borderColor = "#f0f0f5")}
            >
              <div>
                <div style={{ color: "#959595", fontSize: "11px", marginBottom: "2px" }}>Siguiente</div>
                <div style={{ color: "#002461", fontSize: "13px", fontWeight: 600 }}>{nextModule.title}</div>
              </div>
              <ChevronRight size={18} color="#757DE3" />
            </motion.button>
          ) : <div style={{ flex: 1 }} />}
        </div>
      </div>
    </div>
  );
}
