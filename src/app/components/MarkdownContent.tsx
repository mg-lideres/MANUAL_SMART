import React, { type ReactNode, Children, cloneElement, isValidElement, useState, useEffect, useContext, createContext } from "react";
import { createPortal } from "react-dom";
import ReactMarkdown, { defaultUrlTransform } from "react-markdown";
import remarkGfm from "remark-gfm";
import { remarkRehypeWrap } from "remark-rehype-wrap";

function allowDataUrl(url: string) {
  if (url.startsWith("data:")) return url;
  return defaultUrlTransform(url);
}
import {
  Info,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  HelpCircle,
  X,
  ZoomIn,
} from "lucide-react";
import { slugify, dedupeSlug } from "../lib/slugify";

interface MarkdownContentProps {
  content: string;
  /** id -> false means explicitly collapsed; missing id means open (the default). */
  openMap?: Record<string, boolean>;
  onToggleSection?: (id: string) => void;
}

interface SectionOpenContextValue {
  isOpen: (id: string) => boolean;
  toggle: (id: string) => void;
  /** Slugifies + dedupes heading text into the id the matching <h2> will use. */
  registerHeadingId: (rawText: string) => string;
}

// Section reads its open state from these props/context instead of local
// component state: react-markdown reprocesses the whole tree on most parent
// re-renders (e.g. every scroll-driven progress-bar update), which can
// unmount/remount the Section instances — local useState would silently
// reset to the default on every one of those remounts.
const SectionOpenContext = createContext<SectionOpenContextValue>({
  isOpen: () => true,
  toggle: () => {},
  registerHeadingId: (rawText) => slugify(rawText),
});

function getNodeText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(getNodeText).join("");
  if (isValidElement(node)) return getNodeText(node.props.children);
  return "";
}

function StepCard({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div
      style={{
        margin: "16px 0",
        borderRadius: "14px",
        border: "1px solid #e8e8f0",
        backgroundColor: "#fff",
        boxShadow: "0 2px 10px rgba(0,36,97,0.04)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          padding: "12px 18px",
          background: "linear-gradient(135deg, #757DE3 0%, #5c63d2 100%)",
        }}
      >
        <div
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontWeight: 800,
            fontSize: "13px",
            flexShrink: 0,
          }}
        >
          {number}
        </div>
        <span
          style={{
            color: "#fff",
            fontWeight: 700,
            fontSize: "14px",
          }}
        >
          {title}
        </span>
      </div>
      {children && (
        <div style={{ padding: "12px 18px 4px" }}>{children}</div>
      )}
    </div>
  );
}

function NoteBlock({
  children,
  variant,
}: {
  children: ReactNode;
  variant: "info" | "warning" | "tip" | "important";
}) {
  const styles: Record<
    string,
    { bg: string; border: string; icon: typeof Info; iconColor: string }
  > = {
    info: {
      bg: "rgba(117,125,227,0.08)",
      border: "#757DE3",
      icon: Info,
      iconColor: "#757DE3",
    },
    warning: {
      bg: "rgba(255,193,7,0.08)",
      border: "#FFC107",
      icon: AlertTriangle,
      iconColor: "#F5A623",
    },
    tip: {
      bg: "rgba(119,222,162,0.08)",
      border: "#77DEA2",
      icon: Lightbulb,
      iconColor: "#28B07D",
    },
    important: {
      bg: "rgba(0,36,97,0.06)",
      border: "#002461",
      icon: CheckCircle2,
      iconColor: "#002461",
    },
  };
  const s = styles[variant];
  const Icon = s.icon;
  return (
    <div
      style={{
        margin: "16px 0",
        padding: "12px 16px",
        borderRadius: "12px",
        backgroundColor: s.bg,
        borderLeft: `4px solid ${s.border}`,
        display: "flex",
        gap: "12px",
        alignItems: "flex-start",
      }}
    >
      <Icon size={18} color={s.iconColor} style={{ flexShrink: 0, marginTop: "2px" }} />
      <div style={{ flex: 1, color: "#444", fontSize: "14px", lineHeight: 1.6 }}>
        {children}
      </div>
    </div>
  );
}

function Section({ children }: { children: ReactNode }) {
  const { isOpen, toggle, registerHeadingId } = useContext(SectionOpenContext);
  const childArray = Children.toArray(children);
  const [heading, ...rest] = childArray;
  // `heading` here is still the unrendered <h2> component element (react-markdown
  // hasn't invoked it yet), so its `id` prop isn't computed. Derive the same id
  // from the same heading text up front, via the shared registry, then hand it
  // to the h2 renderer below so both agree on one value instead of computing
  // (and deduping) it twice independently.
  const headingChildren = isValidElement(heading) ? (heading.props as { children?: ReactNode }).children : undefined;
  const id = headingChildren !== undefined ? registerHeadingId(getNodeText(headingChildren)) : undefined;
  const headingWithId = isValidElement(heading) && id ? cloneElement(heading, { forcedId: id } as object) : heading;
  const open = id ? isOpen(id) : true;
  const handleToggle = () => id && toggle(id);

  return (
    <section
      style={{
        backgroundColor: "#fff",
        borderRadius: "16px",
        border: "1px solid #e8e8f0",
        boxShadow: "0 2px 14px rgba(0,36,97,0.04)",
        padding: "22px 26px",
        marginBottom: "22px",
      }}
    >
      <div
        role="button"
        tabIndex={0}
        aria-expanded={open}
        onClick={handleToggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleToggle();
          }
        }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          cursor: "pointer",
          userSelect: "none",
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>{headingWithId}</div>
        <ChevronDown
          size={18}
          color="#757DE3"
          style={{
            flexShrink: 0,
            transform: open ? "rotate(0deg)" : "rotate(-90deg)",
            transition: "transform 0.2s ease",
          }}
        />
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "grid-template-rows 0.3s ease",
        }}
      >
        <div style={{ overflow: "hidden", minHeight: 0 }}>
          <div
            style={{
              paddingTop: open ? "4px" : "0",
              opacity: open ? 1 : 0,
              transform: open ? "translateY(0)" : "translateY(-6px)",
              transition: "opacity 0.25s ease 0.05s, transform 0.25s ease 0.05s",
            }}
          >
            {rest}
          </div>
        </div>
      </div>
    </section>
  );
}

function ImageLightbox({ src, alt }: { src?: string; alt?: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  if (!src) return null;

  return (
    <span style={{ display: "block", margin: "14px 0", textAlign: "center" }}>
      <span
        role="button"
        tabIndex={0}
        onClick={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen(true);
          }
        }}
        style={{
          display: "inline-block",
          position: "relative",
          cursor: "zoom-in",
          maxWidth: "480px",
        }}
      >
        {/* No forced width: many source screenshots are already small (as
            little as ~200px wide) — stretching them to fill a fixed-width
            box upscales and blurs them. Let them render at native size,
            only capping large ones down via maxWidth. */}
        <img
          src={src}
          alt={alt || ""}
          loading="lazy"
          style={{
            maxWidth: "100%",
            height: "auto",
            borderRadius: "12px",
            border: "1px solid #e8e8f0",
            boxShadow: "0 2px 12px rgba(0,36,97,0.08)",
            display: "block",
          }}
        />
        <span
          style={{
            position: "absolute",
            bottom: "10px",
            right: "10px",
            display: "flex",
            alignItems: "center",
            gap: "4px",
            backgroundColor: "rgba(0,36,97,0.72)",
            color: "#fff",
            fontSize: "11px",
            fontWeight: 600,
            padding: "4px 9px",
            borderRadius: "9999px",
          }}
        >
          <ZoomIn size={12} />
          Ampliar
        </span>
      </span>
      {alt && (
        <span style={{ display: "block", fontSize: "12px", color: "#959595", marginTop: "6px" }}>
          {alt}
        </span>
      )}
      {open &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            onClick={() => setOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 1000,
              backgroundColor: "rgba(0,36,97,0.78)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "32px",
              cursor: "zoom-out",
            }}
          >
            <img
              src={src}
              alt={alt || ""}
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: "92vw",
                maxHeight: "88vh",
                borderRadius: "12px",
                boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
                cursor: "default",
              }}
            />
            <button
              onClick={() => setOpen(false)}
              aria-label="Cerrar"
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                border: "none",
                backgroundColor: "rgba(255,255,255,0.15)",
                color: "#fff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <X size={20} />
            </button>
          </div>,
          document.body
        )}
    </span>
  );
}

function FeatureItem({ children }: { children: ReactNode }) {
  const childArray = Children.toArray(children);
  const first = childArray[0];
  let firstText = "";
  if (typeof first === "string" || typeof first === "number") {
    firstText = String(first);
  } else if (isValidElement(first)) {
    firstText = getNodeText(first);
  }
  const colonIdx = firstText.search(/[:：]/);
  if (colonIdx > 0 && firstText.slice(colonIdx + 1).trim() === "") {
    const name = firstText.slice(0, colonIdx).trim();
    const restChildren = childArray.slice(1);
    return (
      <li
        style={{
          display: "flex",
          gap: "10px",
          padding: "8px 0",
          borderBottom: "1px solid #f6f6fa",
          listStyle: "none",
        }}
      >
        <ChevronRight size={16} color="#757DE3" style={{ flexShrink: 0, marginTop: "3px" }} />
        <div>
          <strong style={{ color: "#002461", fontWeight: 700 }}>{name}</strong>
          {restChildren.length > 0 && (
            <span style={{ color: "#555", marginLeft: "4px" }}>{restChildren}</span>
          )}
        </div>
      </li>
    );
  }
  return (
    <li style={{ margin: "6px 0", lineHeight: 1.6, listStyle: "disc" }}>
      {children}
    </li>
  );
}

const EMPTY_OPEN_MAP: Record<string, boolean> = {};

export function MarkdownContent({ content, openMap = EMPTY_OPEN_MAP, onToggleSection }: MarkdownContentProps) {
  // Shared per-render counter so repeated headings (e.g. two "### Ejemplo")
  // get -2, -3, ... in the same order ModuleTOC's extraction sees them.
  const usedSlugs = new Map<string, number>();
  const sectionOpenValue: SectionOpenContextValue = {
    isOpen: (id) => openMap[id] ?? true,
    toggle: (id) => onToggleSection?.(id),
    registerHeadingId: (rawText) => {
      const text = rawText.replace(/^Sección:\s*/i, "").replace(/\s*\{#[^}]+\}\s*$/g, "");
      return dedupeSlug(slugify(text), usedSlugs);
    },
  };
  return (
    <div
      className="markdown-body"
      style={{
        color: "#3a3a48",
        fontSize: "15px",
        lineHeight: 1.7,
      }}
    >
      <SectionOpenContext.Provider value={sectionOpenValue}>
      <ReactMarkdown
        urlTransform={allowDataUrl}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          [remarkRehypeWrap, {
            node: { type: "element", tagName: "section", properties: { className: ["module-section"] } },
            start: "element[tagName=h2]",
            end: "element[tagName=h2]",
          }],
        ]}
        components={{
          section: ({ children }) => <Section>{children}</Section>,
          h1: ({ children }) => {
            const text = getNodeText(children).replace(/\s*\{#[^}]+\}\s*$/g, "");
            const id = dedupeSlug(slugify(text), usedSlugs);
            return (
              <h1
                id={id}
                style={{
                  color: "#002461",
                  fontSize: "clamp(26px, 4vw, 34px)",
                  fontWeight: 800,
                  margin: "0 0 20px",
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                }}
              >
                {children}
              </h1>
            );
          },
          h2: ({ children, forcedId }: { children?: ReactNode; forcedId?: string }) => {
            const text = getNodeText(children)
              .replace(/^Sección:\s*/i, "")
              .replace(/\s*\{#[^}]+\}\s*$/g, "");
            // Section (the h2-to-h2 wrapper below) pre-registers this id from the
            // same heading text so it can gate open/closed state; reuse it here
            // instead of registering (and thus deduping) the same heading twice.
            const id = forcedId ?? dedupeSlug(slugify(text), usedSlugs);
            return (
              <h2
                id={id}
                style={{
                  color: "#002461",
                  fontSize: "clamp(17px, 3vw, 20px)",
                  fontWeight: 700,
                  margin: "0 0 14px",
                  paddingBottom: "10px",
                  lineHeight: 1.25,
                  borderBottom: "1px solid #f0f0f5",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "20px",
                    borderRadius: "999px",
                    backgroundColor: "#757DE3",
                    flexShrink: 0,
                  }}
                />
                {text}
              </h2>
            );
          },
          h3: ({ children }) => {
            const text = getNodeText(children).replace(/\s*\{#[^}]+\}\s*$/g, "");
            const id = dedupeSlug(slugify(text), usedSlugs);
            return (
              <h3
                id={id}
                style={{
                  color: "#757DE3",
                  fontSize: "16px",
                  fontWeight: 700,
                  margin: "20px 0 10px",
                  lineHeight: 1.3,
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <HelpCircle size={16} color="#757DE3" />
                {children}
              </h3>
            );
          },
          h4: ({ children }) => {
            const text = getNodeText(children).replace(/\s*\{#[^}]+\}\s*$/g, "");
            const id = dedupeSlug(slugify(text), usedSlugs);
            return (
              <h4
                id={id}
                style={{
                  color: "#002461",
                  fontSize: "15px",
                  fontWeight: 700,
                  margin: "16px 0 8px",
                  lineHeight: 1.3,
                }}
              >
                {children}
              </h4>
            );
          },
          p: ({ children }) => {
            const text = getNodeText(children);
            const stepMatch = text.match(/^Paso\s+(\d+)[:：]\s*(.+)$/);
            const noteMatch = text.match(
              /^(Recordatorio importante|Nota importante|Nota|Tip|Consejo|Advertencia)[:：]\s*/i
            );

            if (stepMatch) {
              return (
                <StepCard number={parseInt(stepMatch[1], 10)} title={stepMatch[2]} />
              );
            }

            if (noteMatch) {
              const raw = text.replace(noteMatch[0], "");
              let variant: "info" | "warning" | "tip" | "important" = "info";
              const key = noteMatch[1].toLowerCase();
              if (key.includes("advertencia")) variant = "warning";
              else if (key.includes("tip") || key.includes("consejo")) variant = "tip";
              else if (key.includes("importante")) variant = "important";
              return (
                <NoteBlock variant={variant}>
                  <ReactMarkdown remarkPlugins={[remarkGfm]} urlTransform={allowDataUrl}>{raw}</ReactMarkdown>
                </NoteBlock>
              );
            }

            return (
              <p
                style={{
                  margin: "0 0 12px",
                  color: "#3a3a48",
                  fontSize: "15px",
                  lineHeight: 1.7,
                  maxWidth: "720px",
                }}
              >
                {children}
              </p>
            );
          },
          ul: ({ children }) => (
            <ul
              style={{
                margin: "0 0 14px",
                paddingLeft: "6px",
                listStyle: "none",
                color: "#3a3a48",
                maxWidth: "720px",
              }}
            >
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol
              style={{
                margin: "0 0 14px",
                paddingLeft: "22px",
                color: "#3a3a48",
                maxWidth: "720px",
              }}
            >
              {children}
            </ol>
          ),
          li: ({ children, ordered }) =>
            ordered ? (
              <li style={{ margin: "6px 0", lineHeight: 1.6 }}>{children}</li>
            ) : (
              <FeatureItem>{children}</FeatureItem>
            ),
          strong: ({ children }) => (
            <strong style={{ color: "#002461", fontWeight: 700 }}>{children}</strong>
          ),
          em: ({ children }) => <em style={{ color: "#595959" }}>{children}</em>,
          a: ({ children, href }) => {
            const isAnchor = href?.startsWith("#");
            return (
              <a
                href={href}
                style={{
                  color: "#757DE3",
                  textDecoration: "none",
                  fontWeight: 600,
                  borderBottom: "1px solid rgba(117,125,227,0.3)",
                }}
                target={isAnchor ? undefined : "_blank"}
                rel={isAnchor ? undefined : "noopener noreferrer"}
              >
                {children}
              </a>
            );
          },
          img: ({ src, alt }) => <ImageLightbox src={typeof src === "string" ? src : undefined} alt={alt} />,
          table: ({ children }) => (
            <div
              style={{
                overflowX: "auto",
                margin: "16px 0",
                borderRadius: "12px",
                border: "1px solid #e8e8f0",
                boxShadow: "0 2px 8px rgba(0,36,97,0.03)",
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "14px",
                  backgroundColor: "#fff",
                }}
              >
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead style={{ backgroundColor: "#F8F8F8" }}>{children}</thead>
          ),
          th: ({ children }) => (
            <th
              style={{
                padding: "12px 16px",
                textAlign: "left",
                fontWeight: 700,
                color: "#002461",
                borderBottom: "2px solid #e8e8f0",
                fontSize: "13px",
                textTransform: "uppercase",
                letterSpacing: "0.03em",
              }}
            >
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td
              style={{
                padding: "10px 16px",
                borderBottom: "1px solid #f0f0f5",
                color: "#3a3a48",
              }}
            >
              {children}
            </td>
          ),
          code: ({ children }) => (
            <code
              style={{
                backgroundColor: "#F4F4F9",
                padding: "2px 6px",
                borderRadius: "5px",
                fontSize: "13px",
                color: "#757DE3",
                fontFamily: "monospace",
              }}
            >
              {children}
            </code>
          ),
          blockquote: ({ children }) => (
            <NoteBlock variant="info">{children}</NoteBlock>
          ),
          hr: () => (
            <hr
              style={{
                border: "none",
                borderTop: "1px solid #f0f0f5",
                margin: "22px 0",
              }}
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
      </SectionOpenContext.Provider>
    </div>
  );
}
