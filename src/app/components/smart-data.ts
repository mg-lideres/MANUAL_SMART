import {
  Shield,
  Users,
  Sun,
  Clock,
  FileText,
  Folder,
  Briefcase,
  Timer,
  BarChart2,
  Star,
  Settings,
  Bell,
  type LucideIcon,
} from "lucide-react";

export const SMART_COLORS = {
  primary: "#757DE3",
  secondary: "#77DEA2",
  dark: "#002461",
  lightGray: "#F8F8F8",
  white: "#FFFFFF",
  mediumGray: "#959595",
};

export interface Module {
  id: string;
  title: string;
  icon: LucideIcon;
  description: string;
}

export const modules: Module[] = [
  {
    id: "login",
    title: "Login y Dashboard",
    icon: Shield,
    description: "Acceso seguro y panel central de actividades",
  },
  {
    id: "colaboradores",
    title: "Colaboradores",
    icon: Users,
    description: "Gestión integral del personal de la organización",
  },
  {
    id: "vacaciones",
    title: "Vacaciones",
    icon: Sun,
    description: "Monitoreo de días generados, tomados y vencidos",
  },
  {
    id: "asistencia",
    title: "Asistencia",
    icon: Clock,
    description: "Control completo de marcaciones y regularizaciones",
  },
  {
    id: "solicitudes",
    title: "Solicitudes",
    icon: FileText,
    description: "Gestión de permisos, vacaciones, licencias y más",
  },
  {
    id: "notificaciones",
    title: "Notificaciones internas",
    icon: Bell,
    description: "Centro de alertas y comunicaciones del sistema",
  },
  {
    id: "proyectos",
    title: "Proyectos y Requerimientos",
    icon: Folder,
    description: "Gestión completa de proyectos, requerimientos y estados",
  },
  {
    id: "clientes",
    title: "Clientes",
    icon: Briefcase,
    description: "Registro y gestión de empresas cliente y coordinadores",
  },
  {
    id: "tareo",
    title: "Tareo",
    icon: Timer,
    description: "Registro diario de actividades y horas trabajadas",
  },
  {
    id: "indicadores",
    title: "Indicadores",
    icon: BarChart2,
    description: "Métricas de desempeño, puntualidad y productividad",
  },
  {
    id: "evaluaciones",
    title: "Evaluaciones",
    icon: Star,
    description: "Evaluaciones de desempeño 360° con seguimiento completo",
  },
  {
    id: "configuraciones",
    title: "Configuraciones",
    icon: Settings,
    description: "Administración de usuarios, roles, horarios y catálogos",
  },
];

export const faqs = [
  {
    id: "faq-1",
    category: "Acceso",
    question: "¿Cómo recupero mi contraseña?",
    answer:
      "En la pantalla de login, haz clic en '¿Has olvidado tu contraseña?'. Ingresa tu correo corporativo y recibirás un enlace de restablecimiento en tu bandeja de entrada.",
  },
  {
    id: "faq-2",
    category: "Acceso",
    question: "¿Puedo usar Google o Microsoft para iniciar sesión?",
    answer:
      "Sí. En la pantalla de login encontrarás los botones de Google y Microsoft. Al hacer clic, se abrirá el formulario de autenticación correspondiente. Usa siempre tu cuenta corporativa.",
  },
  {
    id: "faq-3",
    category: "Asistencia",
    question: "¿Qué significa cada estado de asistencia?",
    answer:
      "Sin marca: no registró entrada/salida. Puntual: registró dentro del horario. Tardanza: registró tarde. Falta: no registró el día. Permiso: tiene permiso autorizado. Vacaciones: está de vacaciones. Feriado: día no laborable. Fuera de horario: marcó fuera del rango. Licencia: tiene licencia activa. Personal de confianza: exento de marcación.",
  },
  {
    id: "faq-4",
    category: "Asistencia",
    question: "¿Cómo regularizo una marca de asistencia?",
    answer:
      "Ingresa a Asistencia → Regularizar Marcas → clic en '+ Nueva Solicitud' → luego '+ Agregar Nueva Marcación'. Completa la información de la marca, verifica los datos y envía la solicitud. Deberá ser aprobada por tu jefe directo.",
  },
  {
    id: "faq-5",
    category: "Solicitudes",
    question: "¿Cuánto tarda en aprobarse una solicitud?",
    answer:
      "El tiempo depende del aprobador asignado en el flujo de tu solicitud. Puedes verificar el estado actual en la pestaña correspondiente dentro del módulo de Solicitudes.",
  },
  {
    id: "faq-6",
    category: "Solicitudes",
    question: "¿Puedo hacer una solicitud para varios colaboradores a la vez?",
    answer:
      "Sí, si tu rol tiene el permiso 'Todos', tendrás habilitado el botón 'Solicitud Masiva'. Desde ahí puedes seleccionar múltiples colaboradores y generar la misma solicitud para todos.",
  },
  {
    id: "faq-7",
    category: "Proyectos",
    question: "¿Cómo pauso un proyecto?",
    answer:
      "Haz clic en el botón ESTADO de la fila del proyecto que deseas pausar. Selecciona el nuevo estado (Pausado), ingresa la justificación del cambio y guarda. El estado del proyecto cambiará a AMARILLO.",
  },
  {
    id: "faq-8",
    category: "Proyectos",
    question: "¿Qué consecuencias tiene pausar un proyecto?",
    answer:
      "Al pausar un proyecto, los colaboradores ya no podrán registrar horas de tareo en él. Para reactivarlo y permitir nuevamente el registro de horas, debes crear un nuevo requerimiento dentro del proyecto.",
  },
  {
    id: "faq-9",
    category: "Tareo",
    question: "¿Qué pasa si no registro mis actividades a tiempo?",
    answer:
      "Se contabilizará como tareo atrasado. A partir de 2 días laborados sin registrar actividades, el sistema suma esos días a tu indicador de 'Días con tareo atrasado', lo cual impacta en tus métricas de desempeño.",
  },
  {
    id: "faq-10",
    category: "Configuraciones",
    question: "¿Puedo desactivar un área que tiene colaboradores activos?",
    answer:
      "No. El sistema bloqueará la acción e indicará que el área tiene usuarios activos asignados. Primero debes reasignar o desactivar a todos los colaboradores del área antes de poder desactivarla.",
  },
];

export const contact = {
  message: "¿Tienes alguna consulta o detectaste un inconveniente?",
  email: "equipo.smart@materiagris.pe",
  closing: "¡Estamos para ayudarte!",
};

export const faqCategories = [
  "Todos",
  "Acceso",
  "Asistencia",
  "Solicitudes",
  "Proyectos",
  "Tareo",
  "Configuraciones",
];
