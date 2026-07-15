# **Módulo: Tareo** {#módulo:-tareo}

Desde la pantalla de inicio o Dashboard Principal, al darle ![][image142] te redirige al módulo, la tabla organiza las actividades del personal en columnas clave que deben interpretarse de la siguiente manera:

* **ID:** Número correlativo y único de identificación de la tarea registrada.  
* **Nombres:** Nombre completo del colaborador que realizó o tiene asignada la actividad.  
* **F. Actividad:** Fecha exacta en la que se ejecutó o programó la tarea.  
* **Proyecto:** Código y nombre de la cuenta o proyecto específico al que se vincula la tarea (ej. *MQ-INV-002-SMART \- MATERIA GRIS S.A.C.*).  
* **Requerimiento:** Identificador del entregable o requerimiento puntual del proyecto (ej. *Rq \- Sprint 53*).  
* **Coordinador:** Nombre del responsable que supervisa directamente la actividad o proyecto.  
* **Categoría:** Clasificación técnica de la tarea (ej. *Aseguramiento De La Calidad*, *Diseño*, *Desarrollo*).  
* **T. de Actividad:** Tipo de gestión o modalidad de la tarea realizada (ej. *Apoyo*).  
* **Detalle de Actividad:** Descripción textual breve que resume las acciones ejecutadas por el trabajador.  
* **Horas:** Cantidad exacta de tiempo invertido en la tarea, detallando horas y minutos.  
* **T. de Horas / H. Inicio / H. Fin:** Especifica bajo qué régimen de tiempo se computan las horas (ej. *HORARIO REGULAR* o *RECUPERACIÓN*), acompañado de las horas de inicio y cierre de la jornada.  
* **Estado:** Indicador visual en color naranja que define la condición de la actividad, usualmente mostrada como **PENDIENTE**.

Además de la grilla, el usuario encontrará en la misma interfaz los siguientes elementos de control:

* **Métricas de Tiempo (Esquina inferior izquierda):** Bloques que consolidan de forma histórica el conteo de la jornada en *Total de Horas*, *Horas Regulares* y *Horas de Sobretiempo*.  
* **Paginación (Esquina inferior derecha):** Un selector para definir cuántos registros visualizar por pantalla (ej.50 o 100 resultados) y flechas de navegación para explorar el listado completo de tareas.  
* **Acciones Rápidas de Fila (Extremo derecho):** Iconos interactivos en cada fila que permiten de forma individual: **Observar** la tarea (icono de bocadillo de texto), **Editar** la actividad (icono de lápiz verde) o **Eliminar** el registro (icono de tacho de basura).

## **1\. Filtros y Acciones** {#1.-filtros-y-acciones}

**![][image143]**

1. **Buscador de Rápida**: Haz clic en la barra superior derecha con un desplegable para especificar el tipo de búsqueda(Colaboradores,Clientes,Servicios,Proyectos,Requerimientos, Categorias, ID) (Ejem. *"Buscar Colaborador")*, digita el nombre o apellido del trabajador y presiona Enter; el sistema retornará de inmediato los registros relacionados.

**![][image144]**

2. **Filtro por Fecha de Actividad:** Permite delimitar un rango de tiempo específico ingresando una fecha inicial (`dd/mm/aaaa`) y una fecha final (`dd/mm/aaaa`) mediante el calendario flotante para auditar las tareas ejecutadas en periodos concretos.   
3. **Filtro de Clientes:** Al hacer clic en este botón, podrás seleccionar o marcar las casillas correspondientes de los clientes para desplegar únicamente las actividades vinculadas a esas cuentas o empresas externas.   
4. **Filtro de Servicios:** Permite abrir un menú desplegable para aislar y mostrar únicamente las tareas asociadas a una línea de servicio o modelo operativo específico de la organización.   
5. **Filtro de Equipos:** Al pulsar este botón, se habilitará un listado con los diferentes grupos o células de trabajo para filtrar la grilla según el equipo al que pertenece el personal.   
6. **Filtro por Proyecto:** Situado en la cabecera de la columna, permite desplegar una lista de opciones para seleccionar y visualizar de manera exclusiva las actividades de un proyecto corporativo en particular.   
7. **Filtro por Requerimiento:** Ubicado sobre la cabecera correspondiente, sirve para aislar las tareas que responden a un requerimiento o sprint específico asignado dentro del flujo de trabajo.   
8. **Filtro por Categoría:** Permite abrir un menú de selección en la cabecera para segmentar el listado según la especialidad o rama técnica de la actividad (ej. *Aseguramiento De La Calidad*, *Diseño*, *Desarrollo*).   
9. **Filtro por T. de Horas:** Situado en la cabecera de la columna, ayuda a discriminar los registros mostrando únicamente las jornadas que correspondan a un régimen de tiempo seleccionado (ej. *Horario Regular*, *Recuperación*).   
10. **Filtro por Estado:** Permite filtrar rápidamente las actividades según su condición de entrega o revisión actual dentro de la plataforma (ej. *Pendiente*).   
11. **Ordenamiento por F. Actividad:** Las flechas ubicadas al lado de la cabecera permiten ordenar la grilla de manera ascendente o descendente según la fecha de ejecución de las tareas.   
12. **Refrescar Filtros (Flecha Circular):** Este botón actualiza los parámetros de búsqueda por defecto, borrando por completo las selecciones realizadas en cada uno de los filtros anteriores para regresar a la vista general original de la grilla.   
13. **Exportación de Reporte de tareas:** Al hacer clic en el botón “Reporte”![][image145]ubicado en la esquina superior derecha del módulo, el sistema mostrará una ventana emergente de alerta con el mensaje: "¡Atención\! Esta acción descargará el total de registros en formato .xlsx aplicando los filtros seleccionados.", ofreciendo las opciones Aceptar y Cancelar. Al aceptar se descargara un archivo Excel (ej. `Reporte-tareo.XXXXXXXXXXXX.xlsx`**) que mostrará la información de la vista en las columnas (TAREA ID, LÍDER COLABORADOR, LÍDER PROYECTO, COLABORADOR, FECHA, MES, AÑO, CLIENTE, CÓDIGO PRY, PROYECTO, TIPO DE SERVICIO, NRO. SD, CÓDIGO RQ, REQUERIMIENTO, CATEGORÍA, DETALLE DE ACTIVIDAD, MINUTOS, HORAS, T. DE HORAS, ESTADO PAGO, MES DE CIERRE, USUARIO/COORDINADOR, ESTADO, F. CREACIÓN), esta lista servirá para auditorías internas, aplicación de tablas dinámicas o reportes de control gerencial.

![][image146]

14. **Exportación del Reporte de Tareas incompletas:** Haz clic en el botón “Incompletos”![][image147]ubicado en la esquina superior derecha del módulo el sistema mostrará una ventana emergente de alerta con el mensaje: "¡Atención\! Esta acción descargará el total de registros en formato .xlsx aplicando los filtros seleccionados.", ofreciendo las opciones Aceptar y Cancelar. Al Aceptar se descarga un documento Excel (ej. **R`eporte-tareo-incompletos.XXXXXXXXXXXX.xlsx`**), que al abrir el archivo de Excel, se mostrará la información de los colaboradores y las fechas faltantes en las que falta registrar sus tareas las cuales se visualizaran en las columnas del módulo de tareas (COLABORADORES, ESTADO TAREAS).

![][image148]

## **2\. Registro de tarea** {#2.-registro-de-tarea}

Para realizar la carga manual de horas y tareas, haz clic en el botón azul "Registrar Actividad". El sistema desplegará el formulario flotante "Registrar actividad", el cual cuenta con los siguientes campos y lógicas de validación: 

![][image149]

* **Fecha:** Selecciona el día de ejecución en el calendario dinámico. El sistema calculará e indicará los minutos por registrar para ese día. Si seleccionas una fecha en la que no laburaste, se mostrará el aviso en rojo: *"No tienes permitido para este día"*.  
* **Minutos:** Define de manera exacta el tiempo invertido en la actividad mediante el contador numérico que calcula el equivalente automático en horas (ej. 420 minutos equivalen a 7 horas).  
* **Proyecto:** Menú desplegable obligatorio para vincular las horas a una cuenta corporativa en curso, dividida entre *Mis Proyectos* y la lista general de *Todos*.  
* **Requerimiento:** Selecciona el entregable o sprint específico asociado de forma obligatoria; si se omite, el sistema marcará el campo con la alerta *"Este campo es obligatorio"*.  
* **Categoría:** Define la especialidad técnica o rama operativa bajo la cual se clasifica la labor ejecutada (ej. *Diseño*).  
* **Tipo de Horas:** Indica el régimen de tiempo en el que se computarán las horas ingresadas (ej. *Horario Regular*, *Extras*, *Compensación* o *Avance*).  
* **Descripción de la actividad:** Campo de texto libre para detallar las acciones realizadas, con un límite máximo de hasta 500 caracteres.  
* **Consolidación de Actividades:** Al hacer clic en el botón **"Agregar actividad"**, la tarea se listará en una minifila dentro del mismo formulario, permitiendo verificar los datos guardados o modificarlos usando los iconos internos de *Editar* (lápiz) o *Eliminar* (tacho). Para finalizar, haz clic en **"Registrar actividades"**, lo que abrirá una ventana emergente que te consultará: *¿Qué acción desea realizar?* con las opciones de *Guardar y continuar* (para mantener el formulario abierto) o **Guardar y salir**. Al presionar esta última, el sistema confirmará el proceso con el mensaje **"¡Procesado con éxito\!"**, ingresando los nuevos registros de forma directa a la grilla principal.

[image142]: /assets/manual-img/tareo/tareo-1.webp
[image143]: /assets/manual-img/tareo/tareo-2.webp
[image144]: /assets/manual-img/tareo/tareo-3.webp
[image145]: /assets/manual-img/tareo/tareo-4.webp
[image146]: /assets/manual-img/tareo/tareo-5.webp
[image147]: /assets/manual-img/tareo/tareo-6.webp
[image148]: /assets/manual-img/tareo/tareo-7.webp
[image149]: /assets/manual-img/tareo/tareo-8.webp