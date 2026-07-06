import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, HelpCircle, Search } from "lucide-react";
import { faqs, faqCategories } from "./smart-data";

export function FAQSection() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = faqs.filter((faq) => {
    const matchesCategory = activeCategory === "Todos" || faq.category === activeCategory;
    const matchesSearch =
      !searchQuery ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  function highlightText(text: string, query: string) {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark
          key={i}
          style={{ backgroundColor: "rgba(117,125,227,0.2)", color: "#757DE3", borderRadius: "2px", padding: "0 1px" }}
        >
          {part}
        </mark>
      ) : (
        part
      )
    );
  }

  return (
    <section
      id="faqs-section"
      style={{
        backgroundColor: "#fff",
        padding: "80px 24px",
        minHeight: "60vh",
      }}
    >
      <div style={{ maxWidth: "820px", margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "40px" }}
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
            FAQ
          </span>
          <h2
            style={{
              color: "#002461",
              fontSize: "clamp(24px, 4vw, 36px)",
              fontWeight: 800,
              margin: "0 0 12px",
            }}
          >
            Preguntas frecuentes
          </h2>
          <p style={{ color: "#959595", fontSize: "16px", margin: "0 auto", maxWidth: "480px" }}>
            Respuestas rápidas a las dudas más comunes del sistema SMART.
          </p>
        </motion.div>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          style={{
            position: "relative",
            marginBottom: "24px",
          }}
        >
          <Search
            size={16}
            color="#959595"
            style={{
              position: "absolute",
              left: "16px",
              top: "50%",
              transform: "translateY(-50%)",
              pointerEvents: "none",
            }}
          />
          <input
            type="text"
            placeholder="Buscar en las preguntas frecuentes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 16px 12px 44px",
              borderRadius: "12px",
              border: "2px solid #f0f0f5",
              fontSize: "14px",
              color: "#002461",
              backgroundColor: "#F8F8F8",
              outline: "none",
              boxSizing: "border-box",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#757DE3")}
            onBlur={(e) => (e.target.style.borderColor = "#f0f0f5")}
          />
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
            marginBottom: "32px",
          }}
        >
          {faqCategories.map((cat) => {
            const count =
              cat === "Todos"
                ? faqs.length
                : faqs.filter((f) => f.category === cat).length;
            const isActive = activeCategory === cat;
            return (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveCategory(cat)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "7px 14px",
                  borderRadius: "9999px",
                  border: isActive ? "none" : "1px solid #e8e8f0",
                  backgroundColor: isActive ? "#757DE3" : "#fff",
                  color: isActive ? "#fff" : "#595959",
                  fontSize: "13px",
                  fontWeight: isActive ? 600 : 500,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {cat}
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    backgroundColor: isActive ? "rgba(255,255,255,0.25)" : "#f0f0f5",
                    color: isActive ? "#fff" : "#959595",
                    borderRadius: "9999px",
                    padding: "1px 6px",
                  }}
                >
                  {count}
                </span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* FAQ accordion items */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  textAlign: "center",
                  padding: "48px 24px",
                  color: "#959595",
                }}
              >
                <HelpCircle size={40} color="#e0e0f0" style={{ marginBottom: "12px" }} />
                <div style={{ fontSize: "15px", fontWeight: 600, color: "#c0c0d0" }}>
                  No se encontraron resultados
                </div>
                <div style={{ fontSize: "13px", marginTop: "6px" }}>
                  Intenta con otras palabras o selecciona otra categoría.
                </div>
              </motion.div>
            ) : (
              filtered.map((faq, index) => {
                const isOpen = openFaq === faq.id;
                return (
                  <motion.div
                    key={faq.id}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25, delay: index * 0.04 }}
                    style={{
                      borderRadius: "14px",
                      overflow: "hidden",
                      border: isOpen
                        ? "2px solid rgba(117,125,227,0.35)"
                        : "2px solid #f0f0f5",
                      transition: "border-color 0.2s",
                      boxShadow: isOpen ? "0 4px 20px rgba(117,125,227,0.1)" : "none",
                    }}
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        gap: "14px",
                        padding: "18px 20px",
                        backgroundColor: isOpen ? "rgba(117,125,227,0.04)" : "#fff",
                        border: "none",
                        cursor: "pointer",
                        textAlign: "left",
                        transition: "background-color 0.2s",
                      }}
                    >
                      <div
                        style={{
                          width: "28px",
                          height: "28px",
                          borderRadius: "8px",
                          backgroundColor: isOpen ? "#757DE3" : "rgba(117,125,227,0.1)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          transition: "all 0.2s",
                        }}
                      >
                        <HelpCircle size={14} color={isOpen ? "#fff" : "#757DE3"} />
                      </div>

                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            color: "#959595",
                            fontSize: "10px",
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                            marginBottom: "3px",
                          }}
                        >
                          {faq.category}
                        </div>
                        <span
                          style={{
                            color: "#002461",
                            fontSize: "14px",
                            fontWeight: 600,
                            lineHeight: 1.4,
                          }}
                        >
                          {searchQuery ? highlightText(faq.question, searchQuery) : faq.question}
                        </span>
                      </div>

                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        style={{ flexShrink: 0 }}
                      >
                        <ChevronDown size={18} color="#959595" />
                      </motion.div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          style={{ overflow: "hidden" }}
                        >
                          <div
                            style={{
                              padding: "0 20px 20px 62px",
                              color: "#595959",
                              fontSize: "14px",
                              lineHeight: 1.7,
                            }}
                          >
                            {searchQuery ? highlightText(faq.answer, searchQuery) : faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
