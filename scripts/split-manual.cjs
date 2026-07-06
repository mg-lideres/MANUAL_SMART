const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const MANUAL_PATH = path.resolve(ROOT, '..', 'Manual-SMART-MG-2026.md');
const OUT_DIR = path.resolve(ROOT, 'src', 'content');

if (!fs.existsSync(MANUAL_PATH)) {
  console.error('No se encontró el manual:', MANUAL_PATH);
  process.exit(1);
}

fs.mkdirSync(OUT_DIR, { recursive: true });

const manual = fs.readFileSync(MANUAL_PATH, 'utf-8');
const lines = manual.split(/\r?\n/);

// Extract image definitions at the end of the file: [imageN]: <data:image/...>
const imageDefRegex = /^(\[image\d+\]):\s*(.+)$/;
const imageDefinitions = {};
lines.forEach((line) => {
  const match = line.match(imageDefRegex);
  if (match) {
    imageDefinitions[match[1]] = match[2];
  }
});

function cleanMarkdown(content) {
  return content
    // Remove stray image definition lines that may appear inside the text
    .replace(/^\[image\d+\]:\s*.+$/gim, '')
    // Remove markdown links that only point to in-document anchors
    .replace(/^\[[^\]]+\]\(#[^)]+\)\s*$/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function extractUsedImages(content) {
  const used = new Set();
  const regex = /!\[([^\]]*)\]\[(image\d+)\]/g;
  let m;
  while ((m = regex.exec(content)) !== null) {
    used.add(`[${m[2]}]`);
  }
  return [...used].sort((a, b) => {
    const na = parseInt(a.match(/\d+/)[0], 10);
    const nb = parseInt(b.match(/\d+/)[0], 10);
    return na - nb;
  });
}

// Module mapping from manual titles to web IDs
const moduleMap = {
  'Login y Dashboard': 'login',
  'Colaboradores': 'colaboradores',
  'Vacaciones': 'vacaciones',
  'Asistencia': 'asistencia',
  'Solicitudes': 'solicitudes',
  'Notificaciones internas': 'notificaciones',
  'Proyectos y Requerimientos': 'proyectos',
  'Clientes': 'clientes',
  'Tareo': 'tareo',
  'Indicadores': 'indicadores',
  'Evaluaciones': 'evaluaciones',
  'Configuraciones': 'configuraciones',
};

const moduleStartRegex = /^#\s+\*\*Módulo\s*:\s+(.+?)\*\*\s*\{#[^}]*\}\s*$/;
const faqStartRegex = /^#\s+\*\*PREGUNTAS FRECUENTES[^*]*\*\*\s*\{#[^}]*\}\s*$/;

const sections = [];
let current = null;

for (let idx = 0; idx < lines.length; idx++) {
  const line = lines[idx];
  // Stop collecting when we hit image definitions block
  if (imageDefRegex.test(line)) {
    break;
  }
  const modMatch = line.match(moduleStartRegex);
  const faqMatch = line.match(faqStartRegex);
  if (modMatch || faqMatch) {
    if (current) sections.push(current);
    const title = modMatch ? modMatch[1].trim() : 'Preguntas frecuentes';
    current = { title, startLine: idx, lines: [line] };
  } else if (current) {
    current.lines.push(line);
  } else {
    // Preamble before any module
    if (!sections.find((s) => s.title === '__preamble__')) {
      sections.push({ title: '__preamble__', startLine: idx, lines: [] });
    }
    sections.find((s) => s.title === '__preamble__').lines.push(line);
  }
}
if (current) sections.push(current);

const preambleSection = sections.find((s) => s.title === '__preamble__');
const moduleSections = sections.filter((s) => moduleMap[s.title]);
const faqSection = sections.find((s) => s.title === 'Preguntas frecuentes');

const generatedFiles = [];

function writeSectionFile(filename, title, content) {
  let cleaned = cleanMarkdown(content);
  // Avoid duplicated H1 if the section already starts with a module heading.
  if (cleaned && !cleaned.trim().startsWith('#')) {
    cleaned = `# ${title}\n\n${cleaned}`;
  }
  const usedImages = extractUsedImages(cleaned);
  const imageBlock = usedImages
    .map((ref) => `${ref}: ${imageDefinitions[ref] || ''}`)
    .filter((line) => !line.endsWith(': undefined'))
    .join('\n');
  const parts = [cleaned || `# ${title}`];
  if (imageBlock) parts.push(imageBlock);
  const fullContent = parts.join('\n\n') + '\n';
  const outPath = path.join(OUT_DIR, filename);
  fs.writeFileSync(outPath, fullContent, 'utf-8');
  generatedFiles.push(outPath);
}

// Write preamble as intro
if (preambleSection) {
  const content = preambleSection.lines.join('\n');
  writeSectionFile('intro.md', 'Introducción', content);
} else {
  fs.writeFileSync(path.join(OUT_DIR, 'intro.md'), '# Introducción\n', 'utf-8');
  generatedFiles.push(path.join(OUT_DIR, 'intro.md'));
}

// Write each module
moduleSections.forEach((s) => {
  const id = moduleMap[s.title];
  const content = s.lines.join('\n');
  writeSectionFile(`${id}.md`, s.title, content);
});

// Write FAQ
if (faqSection) {
  const content = faqSection.lines.join('\n');
  writeSectionFile('faqs.md', 'Preguntas frecuentes', content);
} else {
  fs.writeFileSync(path.join(OUT_DIR, 'faqs.md'), '# Preguntas frecuentes\n', 'utf-8');
  generatedFiles.push(path.join(OUT_DIR, 'faqs.md'));
}

// Generate index.ts with imports and metadata
const moduleOrder = [
  { id: 'login', title: 'Login y Dashboard' },
  { id: 'colaboradores', title: 'Colaboradores' },
  { id: 'vacaciones', title: 'Vacaciones' },
  { id: 'asistencia', title: 'Asistencia' },
  { id: 'solicitudes', title: 'Solicitudes' },
  { id: 'notificaciones', title: 'Notificaciones internas' },
  { id: 'proyectos', title: 'Proyectos y Requerimientos' },
  { id: 'clientes', title: 'Clientes' },
  { id: 'tareo', title: 'Tareo' },
  { id: 'indicadores', title: 'Indicadores' },
  { id: 'evaluaciones', title: 'Evaluaciones' },
  { id: 'configuraciones', title: 'Configuraciones' },
];

const indexLines = [
  "// Auto-generated by scripts/split-manual.cjs",
  "// Do not edit manually.",
  "",
  "import introSource from './intro.md?raw';",
  ...moduleOrder.map((m) => `import ${m.id}Source from './${m.id}.md?raw';`),
  "import faqsSource from './faqs.md?raw';",
  "",
  "export const introContent = introSource;",
  "export const faqContent = faqsSource;",
  "",
  "export const moduleContents: Record<string, string> = {",
  ...moduleOrder.map((m) => `  ${m.id}: ${m.id}Source,`),
  "};",
  "",
];

fs.writeFileSync(path.join(OUT_DIR, 'index.ts'), indexLines.join('\n'), 'utf-8');
generatedFiles.push(path.join(OUT_DIR, 'index.ts'));

console.log(`Generados ${generatedFiles.length} archivos de contenido en src/content/`);
