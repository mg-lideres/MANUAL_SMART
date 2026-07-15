import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { type Module } from "./smart-data";

interface ModulesGridProps {
  modules: Module[];
  onSelectModule: (id: string) => void;
}

export function ModulesGrid({ modules, onSelectModule }: Readonly<ModulesGridProps>) {
  return (
    <section
      id="modules-section"
      style={{
        backgroundColor: "#F8F8F8",
        padding: "80px 24px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "48px" }}
        >
          <span
            style={{
              display: "inline-block",
              backgroundColor: "rgba(117,125,227,0.1)",
              color: "#757DE3",
              borderRadius: "9999px",
              padding: "4px 14px",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            Guía Completa
          </span>
          <h2
            style={{
              color: "#002461",
              fontSize: "clamp(24px, 4vw, 36px)",
              fontWeight: 800,
              margin: "0 0 12px",
            }}
          >
            Explora todos los módulos
          </h2>
          <p style={{ color: "#959595", fontSize: "16px", margin: "0 auto", maxWidth: "520px" }}>
            Consulta el manual completo de SMART organizado por módulos.
          </p>
        </motion.div>

        {/* Modules grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))",
            gap: "20px",
          }}
        >
          {modules.map((mod, index) => {
            const Icon = mod.icon;

            return (
              <motion.div
                key={mod.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{
                  y: -6,
                  boxShadow: "0 16px 40px rgba(117,125,227,0.2)",
                }}
                onClick={() => onSelectModule(mod.id)}
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "16px",
                  padding: "24px",
                  cursor: "pointer",
                  boxShadow: "0 2px 12px rgba(0,36,97,0.06)",
                  border: "2px solid transparent",
                  position: "relative",
                  overflow: "hidden",
                  transition: "box-shadow 0.3s, border-color 0.3s",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Background accent */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "80px",
                    height: "80px",
                    background:
                      "radial-gradient(circle at top right, rgba(117,125,227,0.06), transparent)",
                    borderRadius: "0 16px 0 80px",
                  }}
                />

                {/* Module number */}
                <div
                  style={{
                    position: "absolute",
                    top: "20px",
                    right: "20px",
                    fontSize: "36px",
                    fontWeight: 800,
                    color: "rgba(117,125,227,0.1)",
                    lineHeight: 1,
                    userSelect: "none",
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                </div>

                {/* Icon */}
                <div
                  style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "14px",
                    backgroundColor: "rgba(117,125,227,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "16px",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={24} color="#757DE3" />
                </div>

                {/* Content */}
                <h3
                  style={{
                    color: "#002461",
                    fontSize: "16px",
                    fontWeight: 700,
                    margin: "0 0 8px",
                    paddingRight: "24px",
                  }}
                >
                  {mod.title}
                </h3>
                <p
                  style={{
                    color: "#959595",
                    fontSize: "13px",
                    lineHeight: 1.6,
                    margin: "0 0 16px",
                  }}
                >
                  {mod.description}
                </p>

                {/* CTA — marginTop auto pins it to the card's bottom edge so
                    every card in a row aligns it regardless of text length */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    gap: "4px",
                    color: "#757DE3",
                    fontSize: "12px",
                    fontWeight: 600,
                    marginTop: "auto",
                  }}
                >
                  Ver módulo
                  <ArrowRight size={13} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
