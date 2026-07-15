# **Módulo : Proyectos y Requerimientos** {#módulo-:-proyectos-y-requerimientos}

![][image72]

## **Sección: Registro de un Nuevo Proyecto** {#sección:-registro-de-un-nuevo-proyecto}

Este proceso permite registrar un proyecto en la plataforma para que, posteriormente, los trabajadores puedan asociar sus tareas y horas de trabajo al mismo.

***Paso 1: Acceso al Formulario de Registro***

1. Dirígete a la pantalla principal de **Proyectos y Requerimientos**.  
2. Haz clic en el botón de crear proyecto.

![][image73]

3. Se desplegará una ventana emergente titulada **"Complete los campos para la creación de proyecto"**.

![][image74]

***Paso 2: Configuración Inicial y Datos Generales***

Completa la información solicitada en los campos obligatorios (marcados con un asterisco (\*)):

* **Tipo:** Selecciona el prefijo o tipo de proyecto desde el menú desplegable (por ejemplo: PRY, ADM, DEV, etc.). definidos ya por defecto.  
* **Nombre:** Escribe el nombre identificador del proyecto.

![][image75]

* **Coordinador:** Selecciona del listado al colaborador responsable de coordinar el proyecto.(los coordinadores listados , son aquellos responsables del proyecto, al momento de crear la empresa)

![][image76]

* **Código de proyecto:** El sistema generará automáticamente un código sugerido basado en las configuraciones (ej. MG-PRY-XXXX).  
* *Nota:* Si deseas personalizarlo, puedes marcar la casilla *"Cambiar el formato de código establecido por SMART"*.

![][image77]

* **Nombre del proyecto (Cliente):** detalla el nombre comercial o asignado de cara al cliente , este nombre se visualizará en el reporte de proyectos.

![][image78]

***Paso 3: Asignación de Accesos, Roles y Fechas***

Desliza hacia abajo en el formulario para completar los detalles operativos:

![][image79]

* **Acceso:**Determina la visibilidad que tendrá el proyecto, seleccionando entre las opciones **Público** o **Privado**.  
* **Colaboradores:** Haz clic en el campo y selecciona uno a uno a los miembros del equipo que participarán en el proyecto.  
* **Servicio:** Define la modalidad del servicio seleccionando una opción del menú (ej. PROYECTO, FÁBRICA, SERVICIO, etc.).  
* **Líderes:** Selecciona al líder o líderes del proyecto. identificará al primer líder como  *"Líder principal"* ,resaltandolo de color azul.

  ![][image80]

* **Rango de fechas:** Al hacer clic calendario para fijar la **Fecha de Inicio** y la **Fecha de Fin** del proyecto.  
* **Director:** Selecciona al director a cargo de la cuenta o área.  
* **Descripción:** Escribe un breve resumen sobre el alcance del proyecto.

***Paso 4: Guardar y Validación*** 

1. Tras finalizar el llenado de los datos, presiona el botón **Guardar**.  
2. **Validación de Duplicidad:** Si el nombre del proyecto ya existe, el sistema lanzará una alerta de *"¡Atención\! Ya existe un proyecto con este nombre"*. Si esto ocurre, modifica el nombre para continuar.  
3. Al pasar las validaciones, el sistema mostrará un mensaje de éxito: **"¡Procesado con éxito\!"**.

***Paso 5: Confirmación en la Tabla Principal***

El proyecto recién creado se visualizará inmediatamente en la primera fila de la tabla general de proyectos, mostrando su estado como **ACTIVO** (en color verde). A partir de este momento, quedará habilitado para el registro de tareas de los trabajadores.

![][image81]

**Recordatorio importante:** *Para efectuar el registro de tareas, es indispensable contar tanto con un Proyecto como con un Requerimiento. En los apartados siguientes se detalla el registro de los requerimientos asociados a cada uno de los proyectos.*

## **Sección: Edición y Modificación de un Proyecto Existente** {#sección:-edición-y-modificación-de-un-proyecto-existente}

Este procedimiento permite actualizar los datos generales, cambiar el estado, ajustar el rango de fechas o modificar los miembros del equipo asignados a un proyecto ya creado.  
***Paso 1: Búsqueda del Proyecto***

1. Dirígete a la tabla principal del módulo de Proyectos y Requerimientos.  
2. Identifica el proyecto que deseas modificar utilizando la barra de búsqueda o navegando en la lista.  
3. Desplázate hacia el extremo derecho de la fila del proyecto en cuestión.

***Paso 2: Apertura del Formulario de Edición***

1. Haz clic en el botón del  ícono de Lápiz correspondiente a la fila del proyecto.  
2. Se abrirá una ventana emergente titulada "Complete los campos para la creación de proyecto" (el sistema reutiliza el formulario de registro, pero cargando de forma automática toda la información actual del proyecto seleccionado).

***Paso 3: Modificación de Campos e Información***  
Dentro del formulario, puedes realizar los siguientes cambios según se requiera:

* **Actualizar Datos Básicos:** Modificar el tipo, nombre del proyecto, coordinador o director asignado.  
* **Ajustar el Rango de Fechas:** Hacer clic en el selector de calendario para ampliar o reducir la vigencia del proyecto (Fecha de Inicio / Fecha de Fin).  
* **Gestión de Colaboradores:** Puedes remover participantes haciendo clic en la "X" de su etiqueta o haciendo clic en el campo desplegable para añadir nuevos miembros al equipo.  
* **Justificación:** En el modal de edición , se presentará un campo nuevo para agregar un comentario motivo de la edición ,siendo obligatorio.

***Paso 4: Guardado de Cambios***

1. Tras completar las actualizaciones requeridas, dirígete al final de la ventana emergente para finalizar el proceso.  
2. Haz clic en el botón Guardar .  
3. El sistema procesa los cambios y mostrará en pantalla la alerta de confirmación: **"¡Procesado con éxito\!**".

![][image82]

## **Sección: Gestión y Control de Cambios de Estado en Proyectos** {#sección:-gestión-y-control-de-cambios-de-estado-en-proyectos}

***Paso 1: Cambio de Estado del Proyecto***  
El estado de un proyecto determina si los colaboradores pueden o no registrar horas en cualquiera de sus requerimientos asociados.

1. Busca el Proyecto en la tabla general de proyectos.  
2. Desde la columna ESTADO hacer clic directamente sobre el botón.  
3. Se abrirá una ventana emergente titulada "Justifica el cambio de estado a \[Nuevo Estado\]".  
4. En el campo Justificación redacta detalladamente el motivo del cambio.  
5. De ser requerido, puedes adjuntar un archivo de evidencia utilizando el botón Subir archivo, marca la casilla de verificación de aceptación de responsabilidad sobre los archivos y motivos indicados, si no tiene archivos para adjuntar

![][image83]

6. Haz clic en Guardar. El sistema procesa el cambio y mostrará el aviso: "Procesado con éxito". El ESTADO cambiará automáticamente de color (AMARILLO).

![][image84]

***Nota**: anual queda inhabilitada. Para activarlo nuevamente, es indispensable registrar un nuevo Requerimiento, lo cual restablecerá de forma automática el estado activo del Proyecto.*

*Un proyecto o requerimiento en estado **PAUSADO** restringe automáticamente la carga de horas en el módulo de registro de tareas de los trabajadores.**Recordatorio importante:** cuando un Proyecto se cambia al estado “PAUSADO”, la reactivación m*

***Paso 2: Consulta del Historial de Cambios de Proyectos***  
Para revisar la trazabilidad y saber qué usuario realiza modificaciones sobre el estado de un Proyecto:

1. Se desplegará una tarjeta flotante lateral titulada "Histórico de cambios".  
2. En esta tarjeta podrás validar la siguiente información:  
   * **Transición de Estado:** El estado de origen y el estado de destino.  
   * **Usuario:** Nombre de la persona que  ejecutó el cambio en la plataforma.  
   * **Fecha y Hora:** El registro temporal exacto (DD/MM/AAAA \- HH:MM).  
   * **Justificación:** El texto exacto que el usuario ingresó al momento de realizar la transición.

***Recordatorio importante:** El historial no puede ser borrado ni editado por ningún usuario.*

*![][image85]*

## **Sección: Configuración de Requerimientos (RQ)** {#sección:-configuración-de-requerimientos-(rq)}

Esta sección describe cómo asignar un requerimiento específico a un proyecto existente, definiendo sus metodologías y la estimación de horas por categoría.

***Paso 1: Acceso a la Creación de Requerimiento***

1. En la tabla principal de **Proyectos y Requerimientos**, ubica el proyecto que acabas de crear.  
2. En el menú desplegable, selecciona la opción para agregar un requerimiento(+). Se abrirá la ventana emergente: **"Complete los campos para la creación de requerimiento"**.

![][image86]

***Paso 2: Información General del Requerimiento***  
Completa los campos obligatorios correspondientes a la estructura del RQ:

* **Nombre de requerimiento:** Ingresa el título descriptivo del requerimiento.  
* **Código de requerimiento:** Digita el código alfanumérico interno asignado para el seguimiento de este entregable.  
* Rango de fechas: Selecciona en el calendario la fecha de inicio y fin específicas para este requerimiento (deben estar dentro del rango general del proyecto).  
* **Descripción:** Detalla brevemente el objetivo del requerimiento.  
* **Líder asignado:** El sistema precarga al líder principal, puede modificarlo.  
* **Metodología:** Selecciona el marco de trabajo del menú desplegable:  
  * METODOLOGÍA AGILE  
  * METODOLOGÍA TRADICIONAL

![][image87]

***Paso 3: Estimación de Horas por Categoría (Bolsa de Horas)***  
Para que los trabajadores puedan cargar horas a tareas específicas, debes desglosar la estimación del requerimiento por Categorías:

1. En la sección inferior del formulario, hacer clic en Seleccionar una categoría.  
2. Elige una opción del listado (ej. ANÁLISIS FUNCIONAL, DESARROLLO, REVISIÓN, DISEÑO, etc.).  
3. En el campo Estimación, digita la cantidad de horas asignadas a esa categoría específica.  
4. Haz clic en el botón "Agregar categoría".  
5. Repite este proceso para todas las categorías que requiera el proyecto. El sistema sumará de forma automática el Total de horas acumuladas para el requerimiento en el contador inferior.

![][image88]

***Paso 4: Guardar y Confirmación***

1. Una vez que hayas distribuido las horas y completado los campos, finaliza el registro haciendo clic en el botón **Guardar**.  
2. El sistema procesa la información y mostrará la notificación en pantalla: **"¡Procesado con éxito\!"**.

A partir de este momento, el requerimiento queda enlazado al proyecto y completamente habilitado en los formularios de los trabajadores para que comiencen el registro diario de sus actividades y tareas.

## **Sección: Edición y Modificación de un Requerimiento (RQ)** {#sección:-edición-y-modificación-de-un-requerimiento-(rq)}

Este procedimiento describe cómo modificar la información de un requerimiento existente, actualizar sus bolsas de horas o cambiar su estado dentro de la plataforma.

***Paso 1: búsqueda del Requerimiento***

1. En la tabla principal de **Proyectos y Requerimientos**, identifica el proyecto contenedor.  
2. Si el proyecto se encuentra desglosado, ubica la fila específica del requerimiento (RQ) que deseas editar.  
3. Desplázate hacia el extremo derecho de esa fila y haz clic en el botón con el ícono de **Lápiz** .

![][image89]

***Paso 2: Modificación de la Bolsa de Horas y Datos del RQ***

Al abrirse la ventana emergente **"Complete los campos para la edición de requerimiento"**, puedes realizar los cambios necesarios:

* **Editar campos generales:** Actualiza el nombre, código de RQ, rango de fechas o el líder asignado, los campos metodología y categoría no podrán editarse  
* **Ajustar Bolsa de Horas:** \* Si requieres agregar nuevas horas, selecciona la categoría correspondiente en la lista desplegable, introduce el valor y presiona el botón **"Agregar categoría"**.  
  * El sistema actualizará de manera automática el contador en el campo **Total de horas**.  
* **Campo de Justificación:**  
  * **Justificación** , describe textualmente el motivo del cambio de estado o de la edición crítica.  
  * **Subir Archivo de Evidencia:** De forma obligatoria, deberás adjuntar un documento o imagen que respalde la solicitud del cambio de estado, se aceptan documentos : PDF, WORD ,imagen, sino se adjuntará ningún archivo deberás marcar la casilla de declaración jurada que indica: *"Acepto la responsabilidad de no adjuntar archivos como evidencia de la edición del RQ requerimiento"*.

![][image90]

***Paso 3: Confirmación y Guardado***

1. Una vez completados los cambios y los campos de auditoría, desplázate al final del formulario y haz clic en el botón verde Guardar.  
2. El sistema validará la consistencia de los datos y, de ser correcta, desplegará una ventana emergente de confirmación con el mensaje: **"Procesado con éxito"**.

***Paso 4: Historial de modificaciones***  
Una vez que se haya completado la actualización del registro, aparecerá un ícono en rojo. Al seleccionarlo, el usuario podrá acceder al detalle de todas las modificaciones que se han realizado.

![][image91]

## **Sección: Gestión y Control de Cambios de Estado en Requerimientos** {#sección:-gestión-y-control-de-cambios-de-estado-en-requerimientos}

La plataforma cuenta con un sistema de control que permite modificar el estado de un requerimiento rápidamente desde la vista principal y consultar el histórico de auditoría para garantizar la transparencia en los procesos.

![][image92]

***Paso 1: Modificación del Estado*** 

No es necesario ingresar al formulario de edición completo para pausar o activar un requerimiento:

1. Busca el requerimiento en la tabla general de proyectos.  
2. Desde la columna **ESTADO** hacer clic directamente sobre el botón.  
3. Se abrirá una ventana emergente titulada **"Justifica el cambio de estado a \[Nuevo Estado\]"**.  
4. En el campo **Justificación** redacta detalladamente el motivo del cambio.  
5. De ser requerido, puedes adjuntar un archivo de evidencia utilizando el botón **Subir archivo**, marca la casilla de verificación de aceptación de responsabilidad sobre los archivos y motivos indicados, si no tiene archivos para adjuntar

![][image93]

6. Haz clic en **Guardar**. El sistema procesa el cambio y mostrará el aviso: **"¡Procesado con éxito\!"**. El **ESTADO** cambiará automáticamente de color.

![][image94]  ![][image95]![][image96]

***Nota:** aquellos requerimientos cuyo estado sea modificado a “DESESTIMADO” quedarán inhabilitados permanentemente, sin posibilidad de ser reactivados en el futuro y no estará visible para el registro de actividades.* 

*Para los Requerimientos en estado de Pausa se podrán reactivar de forma manual, mientras estén en pausa no estará visible para el registro de actividades.*

* *Finalización de actividad: Cuando un requerimiento alcanza el estado de completado, la actividad se considera terminada y deja de estar disponible para el registro de nuevas tareas.*  
* *Actualización automática del Proyecto: Es fundamental considerar que si la totalidad de los requerimientos vinculados a un proyecto se completan, el estado del Proyecto cambiará automáticamente a completado.*

***Paso 2: Consulta del Historial de Cambios***

Para revisar la trazabilidad y saber qué usuario realiza modificaciones sobre el estado de un requerimiento:

3. Se desplegará una tarjeta flotante lateral titulada **"Histórico de cambios"**.  
4. En esta tarjeta podrás validar la siguiente información:  
   * **Transición de Estado:** El estado de origen y el estado de destino (ej. *El estado del requerimiento cambió de PAUSADO a ACTIVO*).  
   * **Usuario:** Nombre de la persona que autorizó y ejecutó el cambio en la plataforma.  
   * **Fecha y Hora:** El registro temporal exacto (DD/MM/AAAA \- HH:MM).  
   * **Justificación:** El texto exacto que el usuario ingresó al momento de realizar la transición.

***Nota:** El historial no puede ser borrado ni editado por ningún usuario.*

![][image97]

## **Sección: Búsquedas, Filtros y Exportación de Reportes** {#sección:-búsquedas,-filtros-y-exportación-de-reportes}

Esta sección detalla cómo utilizar las herramientas de la barra superior para segmentar la información en pantalla y exportar reportes en formatos de hoja de cálculo.

***Paso 1: Filtrado por Rango de Fechas***

1. Haz clic en el campo **Fecha de creación** y se desplegará un calendario interactivo; selecciona la **Fecha inicial** y la **Fecha final** deseada.  
2. La tabla se actualizará de inmediato mostrando únicamente los registros que coincidan con ese rango.

***Paso 2: Uso de los Filtros Desplegables (Coordinador y Estados)***

La barra de herramientas permite aislar datos mediante criterios específicos:

* **Filtro por Coordinador:**  
  1. Haz clic en el botón **Coordinador**.  
  2. Puedes escribir el nombre en la barra interna de búsqueda o seleccionarlo directamente de la lista desplegable.  
  3. El sistema ocultará los demás registros y mostrará sólo los proyectos asignados a ese coordinador.  
* **Filtro por Estado:**  
  1. Haz clic en el botón **Estados**.  
  2. Selecciona entre las opciones disponibles: Todos, Activo, Pausado, Completado o Desestimado (tener en cuenta que solo hay 3 estados para el proyecto (Activo-Pausado-Completado) y para el Requerimiento(Activo-Pausado-desestimado-completado)  
  3. Al seleccionar un estado, la lista se adaptará para mostrar solo los elementos en esa condición.

***Paso 3: Búsqueda Directa por Texto***

Si conoces el nombre o el código del proyecto que necesitas gestionar:

1. En la barra **Buscar Proyecto** (ubicada en la esquina superior derecha).  
2. Se podrá digitar las primeras letras o palabras clave (ej. RQ-).  
3. El sistema realiza el filtro en tiempo real para las filas que contienen los caracteres introducidos.

***Paso 4: Exportación de Reportes (Proyectos y Requerimientos)***

El sistema permite descargar bases de datos completas en formato Excel mediante dos botones independientes ubicados en la parte superior derecha de la pantalla:

*Opción 1: Reporte General de Proyectos*

1. Al hacer clic en el botón **Reporte PRY**.  
2. Se tomará la información actual de los resultados de la grilla y descargará automáticamente un archivo de Excel.  
3. Al descargar se presentará una alerta inicial de confirmación con el msj “ Esta acción descargará el total de registros en formato .xlsx aplicando los filtros seleccionados. “ con las acciones de botón para"cancelar "y"continuar ".  
4. En el reporte se visualizan los campos detallados como: *ID, Visibilidad, Tipo, Nombre de Proyecto, Nombre de Cliente, Fechas de Inicio/Fin, Coordinador, Líderes, Estado, entre otros.*

*![][image98]*

*Opción 2: Reporte General de Requerimientos*

1. Al hacer clic en el botón  **Reporte RQ**.  
2. Se tomará la información actual de los resultados de la grilla y descargará automáticamente un archivo de Excel.  
3. Al descargar se presentará una alerta inicial de confirmación con el msj “ Esta acción descargará el total de registros en formato .xlsx de los requerimientos pertenecientes a sus proyectos“ con las acciones de botón para"cancelar "y continuar".

4. En el reporte se visualizan los campos detallados como: ID proyecto, Código de proyecto, Nombre de proyecto, ID de requerimiento, Código de requerimiento, Nombre de requerimiento, entre otros.

   ![][image99]

[image72]: /assets/manual-img/proyectos/proyectos-1.webp
[image73]: /assets/manual-img/proyectos/proyectos-2.webp
[image74]: /assets/manual-img/proyectos/proyectos-3.webp
[image75]: /assets/manual-img/proyectos/proyectos-4.webp
[image76]: /assets/manual-img/proyectos/proyectos-5.webp
[image77]: /assets/manual-img/proyectos/proyectos-6.webp
[image78]: /assets/manual-img/proyectos/proyectos-7.webp
[image79]: /assets/manual-img/proyectos/proyectos-8.webp
[image80]: /assets/manual-img/proyectos/proyectos-9.webp
[image81]: /assets/manual-img/proyectos/proyectos-10.webp
[image82]: /assets/manual-img/proyectos/proyectos-11.webp
[image83]: /assets/manual-img/proyectos/proyectos-12.webp
[image84]: /assets/manual-img/proyectos/proyectos-13.webp
[image85]: /assets/manual-img/proyectos/proyectos-14.webp
[image86]: /assets/manual-img/proyectos/proyectos-15.webp
[image87]: /assets/manual-img/proyectos/proyectos-16.webp
[image88]: /assets/manual-img/proyectos/proyectos-17.webp
[image89]: /assets/manual-img/proyectos/proyectos-18.webp
[image90]: /assets/manual-img/proyectos/proyectos-19.webp
[image91]: /assets/manual-img/proyectos/proyectos-20.webp
[image92]: /assets/manual-img/proyectos/proyectos-21.webp
[image93]: /assets/manual-img/proyectos/proyectos-22.webp
[image94]: /assets/manual-img/proyectos/proyectos-23.webp
[image95]: /assets/manual-img/proyectos/proyectos-24.webp
[image96]: /assets/manual-img/proyectos/proyectos-25.webp
[image97]: /assets/manual-img/proyectos/proyectos-26.webp
[image98]: /assets/manual-img/proyectos/proyectos-27.webp
[image99]: /assets/manual-img/proyectos/proyectos-28.webp
