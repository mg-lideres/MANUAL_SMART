import { motion } from "motion/react";
import { Mail, MessageCircle, Heart, ExternalLink } from "lucide-react";
import { contact } from "./smart-data";

export function ContactFooter() {
  const handleEmail = () => {
    window.location.href = `mailto:${contact.email}`;
  };

  return (
    <footer
      id="contact-footer"
      style={{
        background: "linear-gradient(135deg, #002461 0%, #1a1a6e 100%)",
        padding: "64px 24px 40px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decoration */}
      <div
        style={{
          position: "absolute",
          top: "-60px",
          right: "-60px",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          backgroundColor: "rgba(117,125,227,0.1)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "0",
          left: "-40px",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          backgroundColor: "rgba(119,222,162,0.07)",
          filter: "blur(50px)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "760px", margin: "0 auto", position: "relative" }}>
        {/* Contact card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            backgroundColor: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "20px",
            padding: "40px",
            textAlign: "center",
            backdropFilter: "blur(10px)",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              backgroundColor: "rgba(119,222,162,0.15)",
              border: "2px solid rgba(119,222,162,0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
            }}
          >
            <MessageCircle size={26} color="#77DEA2" />
          </div>

          <h2
            style={{
              color: "#fff",
              fontSize: "clamp(20px, 3vw, 28px)",
              fontWeight: 800,
              margin: "0 0 12px",
              lineHeight: 1.3,
            }}
          >
            {contact.message}
          </h2>

          <p
            style={{
              color: "rgba(255,255,255,0.55)",
              fontSize: "15px",
              margin: "0 0 28px",
            }}
          >
            {contact.closing} Nuestro equipo te responderá lo antes posible.
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <a
              href={`mailto:${contact.email}`}
              style={{
                color: "#77DEA2",
                fontSize: "16px",
                fontWeight: 700,
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 20px",
                borderRadius: "10px",
                backgroundColor: "rgba(119,222,162,0.1)",
                border: "1px solid rgba(119,222,162,0.2)",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                  "rgba(119,222,162,0.18)";
                (e.currentTarget as HTMLAnchorElement).style.textDecoration = "underline";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                  "rgba(119,222,162,0.1)";
                (e.currentTarget as HTMLAnchorElement).style.textDecoration = "none";
              }}
            >
              <Mail size={16} />
              {contact.email}
            </a>

            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleEmail}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "#77DEA2",
                color: "#002461",
                border: "none",
                borderRadius: "12px",
                padding: "14px 32px",
                fontSize: "15px",
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 6px 24px rgba(119,222,162,0.3)",
              }}
            >
              Enviar correo
              <ExternalLink size={15} />
            </motion.button>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
            paddingTop: "24px",
            borderTop: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "8px",
                backgroundColor: "#757DE3",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ color: "#fff", fontSize: "12px", fontWeight: 800 }}>S</span>
            </div>
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px" }}>
              Manual de Usuario SMART v1.0
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              color: "rgba(255,255,255,0.4)",
              fontSize: "12px",
            }}
          >
            Hecho con <Heart size={12} color="#FF6B6B" fill="#FF6B6B" style={{ margin: "0 2px" }} />
            por el equipo SMART
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
