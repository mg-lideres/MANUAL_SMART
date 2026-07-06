import { useEffect, useState, useRef } from "react";
import { motion } from "motion/react";
import {
  Shield, Users, Sun, Clock, FileText, Folder,
  Briefcase, Timer, BarChart2, Star, Settings,
  ChevronDown, Rocket, BookOpen,
} from "lucide-react";

const floatingIcons = [
  { Icon: Shield, x: 8, y: 15, delay: 0 },
  { Icon: Users, x: 20, y: 70, delay: 0.5 },
  { Icon: Sun, x: 75, y: 10, delay: 0.8 },
  { Icon: Clock, x: 88, y: 60, delay: 0.3 },
  { Icon: FileText, x: 55, y: 80, delay: 1.1 },
  { Icon: Folder, x: 35, y: 20, delay: 0.7 },
  { Icon: Briefcase, x: 92, y: 30, delay: 0.2 },
  { Icon: Timer, x: 5, y: 50, delay: 0.9 },
  { Icon: BarChart2, x: 65, y: 55, delay: 0.4 },
  { Icon: Star, x: 45, y: 88, delay: 0.6 },
  { Icon: Settings, x: 80, y: 82, delay: 1.0 },
];

function useCountUp(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

interface HeroSectionProps {
  onExploreModules: () => void;
  onOpenFAQs: () => void;
}

export function HeroSection({ onExploreModules, onOpenFAQs }: HeroSectionProps) {
  const [statsStarted, setStatsStarted] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  const modules = useCountUp(11, 1500, statsStarted);
  const features = useCountUp(50, 1800, statsStarted);
  const faqs = useCountUp(10, 1200, statsStarted);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsStarted(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #002461 0%, #1a1a6e 40%, #002461 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        paddingTop: "80px",
        paddingBottom: "60px",
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(117,125,227,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(117,125,227,0.07) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          pointerEvents: "none",
        }}
      />

      {/* Glow blobs */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "15%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          backgroundColor: "rgba(117,125,227,0.12)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "20%",
          right: "10%",
          width: "350px",
          height: "350px",
          borderRadius: "50%",
          backgroundColor: "rgba(119,222,162,0.08)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />

      {/* Floating module icons */}
      {floatingIcons.map(({ Icon, x, y, delay }, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            left: `${x}%`,
            top: `${y}%`,
            pointerEvents: "none",
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.18, 0.18],
            scale: [0, 1, 1],
            y: [0, -18, 0],
          }}
          transition={{
            opacity: { delay: delay + 0.5, duration: 0.8 },
            scale: { delay: delay + 0.5, duration: 0.8 },
            y: { delay: delay + 1.3, duration: 3.5 + i * 0.3, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              backgroundColor: "rgba(117,125,227,0.12)",
              border: "1px solid rgba(117,125,227,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(4px)",
            }}
          >
            <Icon size={22} color="rgba(117,125,227,0.7)" />
          </div>
        </motion.div>
      ))}

      {/* Hero content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          maxWidth: "780px",
          padding: "0 24px",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              backgroundColor: "rgba(119,222,162,0.15)",
              border: "1px solid rgba(119,222,162,0.3)",
              borderRadius: "9999px",
              padding: "6px 16px",
              color: "#77DEA2",
              fontSize: "13px",
              fontWeight: 600,
              marginBottom: "24px",
            }}
          >
            <Rocket size={13} />
            Bienvenido al Manual Interactivo
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          style={{
            fontSize: "clamp(36px, 6vw, 64px)",
            fontWeight: 800,
            color: "#fff",
            lineHeight: 1.15,
            margin: "0 0 20px",
            letterSpacing: "-0.02em",
          }}
        >
          Todo lo que necesitas
          <br />
          saber sobre{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #757DE3 0%, #77DEA2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            SMART
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{
            color: "rgba(255,255,255,0.65)",
            fontSize: "clamp(15px, 2.5vw, 18px)",
            lineHeight: 1.7,
            marginBottom: "40px",
            maxWidth: "600px",
            margin: "0 auto 40px",
          }}
        >
          Tu guía completa e interactiva para consultar cada módulo del sistema de
          gestión SMART. Encuentra rápidamente lo que necesitas.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}
        >
          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={onExploreModules}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "#757DE3",
              color: "#fff",
              border: "none",
              borderRadius: "12px",
              padding: "14px 28px",
              fontSize: "15px",
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 8px 30px rgba(117,125,227,0.4)",
            }}
          >
            <BookOpen size={17} />
            Explorar módulos
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={onOpenFAQs}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "rgba(255,255,255,0.1)",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.25)",
              borderRadius: "12px",
              padding: "14px 28px",
              fontSize: "15px",
              fontWeight: 600,
              cursor: "pointer",
              backdropFilter: "blur(8px)",
            }}
          >
            Preguntas frecuentes
          </motion.button>
        </motion.div>


      </div>

      {/* Stats row */}
      <motion.div
        ref={statsRef}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          gap: "0",
          marginTop: "64px",
          borderRadius: "20px",
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(12px)",
        }}
      >
        {[
          { value: modules, suffix: "", label: "Módulos completos", color: "#757DE3" },
          { value: features, suffix: "+", label: "Funcionalidades", color: "#77DEA2" },
          { value: faqs, suffix: "", label: "Preguntas frecuentes", color: "#757DE3" },
        ].map((stat, i) => (
          <div
            key={i}
            style={{
              padding: "28px 40px",
              textAlign: "center",
              backgroundColor: "rgba(255,255,255,0.05)",
              borderRight: i < 2 ? "1px solid rgba(255,255,255,0.1)" : "none",
              minWidth: "140px",
            }}
          >
            <div
              style={{
                fontSize: "clamp(28px, 4vw, 42px)",
                fontWeight: 800,
                color: stat.color,
                lineHeight: 1,
                marginBottom: "6px",
              }}
            >
              {stat.value}{stat.suffix}
            </div>
            <div style={{ color: "rgba(255,255,255,0.55)", fontSize: "12px", fontWeight: 500 }}>
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Scroll hint */}
      <motion.button
        style={{
          position: "absolute",
          bottom: "32px",
          left: "50%",
          transform: "translateX(-50%)",
          color: "rgba(255,255,255,0.4)",
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "4px",
        }}
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        onClick={onExploreModules}
      >
        <span style={{ fontSize: "11px", fontWeight: 500 }}>Explorar</span>
        <ChevronDown size={18} />
      </motion.button>
    </section>
  );
}
