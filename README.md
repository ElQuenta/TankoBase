# TankoBase
---

**Descripción del Proyecto**

TankoBase es una plataforma orientada a la gestión y organización de contenido de cómics digitales, incluyendo mangas, manhwas y manhuas. El sistema busca resolver el problema de la administración dispersa y poco estructurada de este tipo de contenido, proporcionando una solución centralizada para el registro, mantenimiento y consulta de información relacionada con obras y capítulos.

Está dirigido principalmente a administradores y editores encargados de gestionar catálogos de contenido, aunque puede servir como base para plataformas de lectura y consulta destinadas a usuarios finales. La solución permite mantener la información organizada, facilitar su acceso y establecer una estructura escalable para futuras funcionalidades como búsqueda avanzada, seguimiento de publicaciones, gestión de bibliotecas personales y control del progreso de lectura.

## Objetivo General

Desarrollar una API REST utilizando Node.js, Express.js y PostgreSQL que permita gestionar de forma centralizada la información de mangas, manhwas y manhuas, incluyendo obras, capítulos,  y seguimiento de lectura, proporcionando una base escalable para plataformas de consulta y lectura de contenido digital.

## Usuarios o Roles del Sistema

### Administrador

Responsable de la gestión global de la plataforma.

**Funciones principales:**

* Gestionar usuarios y permisos.
* Crear, editar y eliminar obras.
* Crear, editar y eliminar capítulos.
* Administrar géneros, etiquetas y categorías.
* Gestionar archivos y recursos asociados.
* Moderar comentarios y reportes.
* Supervisar la actividad del sistema.
* Configurar parámetros generales de la plataforma.
* Consultar y visualizar todas las obras y capítulos.

### Editor

Responsable de la administración y mantenimiento del contenido.

**Funciones principales:**

* Registrar nuevas obras.
* Editar información de mangas, manhwas y manhuas.
* Crear, actualizar y eliminar capítulos.
* Gestionar portadas y archivos multimedia.
* Actualizar estados de publicación y metadatos.
* Moderar comentarios relacionados con el contenido.
* Consultar y visualizar todas las obras y capítulos.

### Lector

Usuario autenticado que consume el contenido disponible en la plataforma.

**Funciones principales:**

* Consultar y visualizar obras y capítulos.
* Buscar y filtrar contenido.
* Acceder a información detallada de las obras.
* Registrar y visualizar su progreso de lectura.
* Gestionar listas de favoritos y bibliotecas personales.
* Publicar, editar y eliminar sus propios comentarios.
* Interactuar con comentarios de otros usuarios.
* Recibir información sobre nuevas publicaciones.

### Usuario Invitado

Usuario sin autenticación que accede al contenido público de la plataforma.

**Funciones principales:**

* Consultar y visualizar obras y capítulos.
* Buscar y filtrar contenido.
* Acceder a información pública de las obras.
* Navegar por el catálogo disponible.
* Visualizar comentarios publicados por otros usuarios.

### Matriz resumida de permisos

| Funcionalidad                       | Invitado | Lector | Editor | Administrador |
| ----------------------------------- | -------- | ------ | ------ | ------------- |
| Ver obras                           | ✓        | ✓      | ✓      | ✓             |
| Ver capítulos                       | ✓        | ✓      | ✓      | ✓             |
| Buscar y filtrar contenido          | ✓        | ✓      | ✓      | ✓             |
| Ver comentarios                     | ✓        | ✓      | ✓      | ✓             |
| Publicar comentarios                | ✗        | ✓      | ✓      | ✓             |
| Editar/eliminar comentarios propios | ✗        | ✓      | ✓      | ✓             |
| Moderar comentarios                 | ✗        | ✗      | ✓      | ✓             |
| Gestionar favoritos                 | ✗        | ✓      | ✓      | ✓             |
| Registrar progreso de lectura       | ✗        | ✓      | ✓      | ✓             |
| Crear/editar obras                  | ✗        | ✗      | ✓      | ✓             |
| Crear/editar capítulos              | ✗        | ✗      | ✓      | ✓             |
| Gestionar metadatos                 | ✗        | ✗      | ✓      | ✓             |
| Gestionar usuarios y roles          | ✗        | ✗      | ✗      | ✓             |
| Configuración del sistema           | ✗        | ✗      | ✗      | ✓             |

> [!IMPORTANT]
> El acceso a la lectura de obras, capítulos y comentarios es público para todos los usuarios. La autenticación es necesaria para participar en la comunidad mediante comentarios, gestionar bibliotecas personales, registrar progreso de lectura y realizar tareas de administración o mantenimiento del contenido.

## Historias de usuario

> Para el rol de INVITADO

- Como usuario invitado, quiero ver el catálogo de obras, para explorar el contenido disponible sin registrarme.
- Como usuario invitado, quiero buscar obras por título, para encontrar rápidamente una serie específica.
- Como usuario invitado, quiero ver los detalles de una obra, para conocer su descripción, género, autor y estado.
- Como usuario invitado, quiero visualizar los capítulos de una obra, para acceder al contenido publicado.
- Como usuario invitado, quiero filtrar las obras por tipo o estado, para explorar únicamente el formato de contenido que me interesa leer.

> Para el rol de LECTOR

- Como lector, quiero registrarme e iniciar sesión, para guardar mis preferencias y acceder a funciones personalizadas.
- Como lector, quiero marcar obras como favoritas, para tener un acceso rápido a las que sigo.
- Como lector, quiero registrar mi progreso de lectura, para continuar desde el capítulo donde me quedé.
- Como lector, quiero dejar comentarios en las obras y capítulos, para compartir mi opinión con otros usuarios.
- Como lector, quiero editar o eliminar mis propios comentarios, para mantener actualizada mi participación.
- Como lector, quiero actualizar la información de mi perfil, para mantener mis datos de cuenta al día y seguros.

> Para el rol de EDITOR

- Como editor, quiero crear y actualizar obras, para mantener el catálogo organizado y vigente.
- Como editor, quiero gestionar capítulos y su contenido, para publicar nuevas entregas de cada obra.
- Como editor, quiero subir imágenes para las portadas y las páginas de los capítulos, para que los usuarios puedan visualizar correctamente el contenido multimedia de la obra.

> Para el rol de ADMINISTRADOR

- Como administrador, quiero moderar comentarios y reportes, para mantener un entorno ordenado y seguro.
- Como administrador, quiero gestionar usuarios y permisos, para controlar el acceso a las funciones del sistema.
- Como administrador, quiero administrar géneros, etiquetas y categorías, para mejorar la organización del contenido.
- Como administrador, quiero cambiar el rol de un usuario, para delegar tareas de mantenimiento del catálogo a miembros de confianza de la comunidad.

## Funcionalidades principales del proyecto

| Historia de Usuario                                                                                                   | Funcionalidad                             |
| --------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| Como usuario invitado, quiero ver el catálogo de obras, para explorar el contenido disponible sin registrarme.        | Listar obras                              |
| Como usuario invitado, quiero buscar obras por título, para encontrar rápidamente una serie específica.               | Buscar obras                              |
| Como usuario invitado, quiero ver los detalles de una obra, para conocer su descripción, género, autor y estado.      | Consultar detalle de obra                 |
| Como usuario invitado, quiero visualizar los capítulos de una obra, para acceder al contenido publicado.              | Visualizar capítulos                      |
| Como usuario invitado, quiero filtrar las obras para explorar únicamente el formato de contenido que me interesa leer.| Filtrar catálogo avanzado                 |
| Como lector, quiero registrarme e iniciar sesión, para guardar mis preferencias y acceder a funciones personalizadas. | Registro e inicio de sesión               |
| Como lector, quiero marcar obras como favoritas, para tener un acceso rápido a las que sigo.                          | Gestionar favoritos                       |
| Como lector, quiero registrar mi progreso de lectura, para continuar desde el capítulo donde me quedé.                | Gestionar progreso de lectura             |
| Como lector, quiero dejar comentarios en las obras y capítulos, para compartir mi opinión con otros usuarios.         | Publicar comentarios                      |
| Como lector, quiero editar o eliminar mis propios comentarios, para mantener actualizada mi participación.            | Gestionar comentarios propios             |
| Como lector, quiero actualizar la información de mi perfil, para mantener mis datos de cuenta al día y seguros.       | Actualizar perfil de usuario              |
| Como editor, quiero crear y actualizar obras, para mantener el catálogo organizado y vigente.                         | Gestionar obras                           |
| Como editor, quiero gestionar capítulos y su contenido, para publicar nuevas entregas de cada obra.                   | Gestionar capítulos                       |
| Como editor, quiero subir imágenes para las portadas o capítulos, para que puedan visualizar el contenido.            | Gestionar archivos multimedia             | 
| Como administrador, quiero moderar comentarios y reportes, para mantener un entorno ordenado y seguro.                | Moderar comentarios                       |
| Como administrador, quiero gestionar usuarios y permisos, para controlar el acceso a las funciones del sistema.       | Gestionar usuarios y roles                |
| Como administrador, quiero administrar géneros, etiquetas y categorías, para mejorar la organización del contenido.   | Gestionar géneros, etiquetas y categorías |
| Como administrador, quiero cambiar el rol de un usuario para delegar tareas a miembros de confianza de la comunidad.  | Modificar rol de usuario                  |

## Modelo de datos inicial

## Endpoints tentativos de la API

| Método | Endpoint             | Descripción                            |
| ------ | -------------------- | -------------------------------------- |
| POST   | `/api/auth/register` | Registrar un nuevo usuario             |
| POST   | `/api/auth/login`    | Iniciar sesión                         |
| GET    | `/api/auth/profile`  | Obtener perfil del usuario autenticado |
| PUT    | `/api/auth/profile`  | Actualizar perfil del usuario          |

### Obras

| Método | Endpoint                  | Descripción                  |
| ------ | ------------------------- | ---------------------------- |
| GET    | `/api/works`              | Listar obras                 |
| GET    | `/api/works/:id`          | Obtener detalle de una obra  |
| POST   | `/api/works`              | Crear una obra               |
| PUT    | `/api/works/:id`          | Actualizar una obra          |
| DELETE | `/api/works/:id`          | Eliminar una obra            |
| GET    | `/api/works/search`       | Buscar obras                 |
| GET    | `/api/works/:id/chapters` | Listar capítulos de una obra |

### Capítulos

| Método | Endpoint            | Descripción                    |
| ------ | ------------------- | ------------------------------ |
| GET    | `/api/chapters/:id` | Obtener detalle de un capítulo |
| POST   | `/api/chapters`     | Crear capítulo                 |
| PUT    | `/api/chapters/:id` | Actualizar capítulo            |
| DELETE | `/api/chapters/:id` | Eliminar capítulo              |

### Favoritos

| Método | Endpoint                 | Descripción                   |
| ------ | ------------------------ | ----------------------------- |
| GET    | `/api/favorites`         | Obtener favoritos del usuario |
| POST   | `/api/favorites/:workId` | Agregar obra a favoritos      |
| DELETE | `/api/favorites/:workId` | Eliminar obra de favoritos    |

### Progreso de Lectura

| Método | Endpoint                        | Descripción                 |
| ------ | ------------------------------- | --------------------------- |
| GET    | `/api/reading-progress`         | Obtener progreso de lectura |
| POST   | `/api/reading-progress`         | Registrar progreso          |
| PUT    | `/api/reading-progress/:workId` | Actualizar progreso         |

### Comentarios

| Método | Endpoint                           | Descripción                        |
| ------ | ---------------------------------- | ---------------------------------- |
| GET    | `/api/comments/work/:workId`       | Obtener comentarios de una obra    |
| GET    | `/api/comments/chapter/:chapterId` | Obtener comentarios de un capítulo |
| POST   | `/api/comments`                    | Crear comentario                   |
| PUT    | `/api/comments/:id`                | Editar comentario                  |
| DELETE | `/api/comments/:id`                | Eliminar comentario                |

### Géneros y Etiquetas

| Método | Endpoint          | Descripción         |
| ------ | ----------------- | ------------------- |
| GET    | `/api/genres`     | Listar géneros      |
| POST   | `/api/genres`     | Crear género        |
| PUT    | `/api/genres/:id` | Actualizar género   |
| DELETE | `/api/genres/:id` | Eliminar género     |
| GET    | `/api/tags`       | Listar etiquetas    |
| POST   | `/api/tags`       | Crear etiqueta      |
| PUT    | `/api/tags/:id`   | Actualizar etiqueta |
| DELETE | `/api/tags/:id`   | Eliminar etiqueta   |

### Administración de Usuarios

| Método | Endpoint              | Descripción                   |
| ------ | --------------------- | ----------------------------- |
| GET    | `/api/users`          | Listar usuarios               |
| GET    | `/api/users/:id`      | Obtener usuario               |
| PUT    | `/api/users/:id/role` | Actualizar rol de usuario     |
| DELETE | `/api/users/:id`      | Desactivar o eliminar usuario |

### Archivos y Recursos

| Método | Endpoint               | Descripción                  |
| ------ | ---------------------- | ---------------------------- |
| POST   | `/api/uploads/cover`   | Subir portada de una obra    |
| POST   | `/api/uploads/chapter` | Subir páginas de un capítulo |
| DELETE | `/api/uploads/:id`     | Eliminar archivo             |

## Reglas de negocio

- Toda obra debe tener un título antes de ser registrada en el sistema.
- Una obra debe pertenecer al menos a un género.
- No se puede publicar una obra sin una portada asociada.
- Un capítulo debe estar asociado a una única obra.
- No se puede crear un capítulo sin un número o identificador válido.
- Un capítulo debe contener al menos una página o archivo de contenido para ser publicado.
- Solo los usuarios con rol Administrador o Editor pueden crear, modificar o eliminar obras.
- Solo los usuarios con rol Administrador o Editor pueden crear, modificar o eliminar capítulos.
- Solo los usuarios autenticados pueden agregar obras a favoritos.
- Solo los usuarios autenticados pueden registrar o actualizar su progreso de lectura.
- Solo los usuarios autenticados pueden publicar comentarios.
- Un usuario solo puede editar o eliminar sus propios comentarios.
- Los administradores pueden moderar o eliminar cualquier comentario que incumpla las normas de la plataforma.
- Un usuario no puede registrar más de una vez la misma obra en su lista de favoritos.
- El progreso de lectura de un usuario debe corresponder a un capítulo existente de la obra.
- Los usuarios invitados pueden visualizar obras, capítulos y comentarios, pero no pueden realizar acciones de modificación.
- Cada usuario debe tener un correo electrónico único dentro del sistema.
- Los roles de usuario solo pueden ser asignados o modificados por un administrador.
- Una obra solo puede tener uno de los siguientes tipos: Manga, Manhwa o Manhua.
- El estado de una obra debe pertenecer a los valores definidos por el sistema (por ejemplo: En emisión, Finalizado, Pausado o Cancelado).
- No se puede eliminar una obra que tenga capítulos asociados sin eliminar o reasignar previamente dichos capítulos.

## Tecnologías a utilizar

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT para autenticación
- Postman para pruebas
- GitHub para control de versiones
- Swagger/OpenAPI para documentación, si corresponde
- Multer para recepción de archivos
- winston para Loggers

## Alcance del proyecto

Incluye
- Registro, autenticación y gestión de usuarios.
- Gestión de roles (Administrador, Editor y Lector).
- CRUD de obras (Mangas, Manhwas y Manhuas).
- CRUD de capítulos.
- Gestión de géneros, etiquetas y categorías.
- Consulta y búsqueda de obras mediante filtros.
- Sistema de favoritos.
- Registro y seguimiento del progreso de lectura.
- Sistema de comentarios en obras y capítulos.
- Moderación de comentarios por parte de administradores y editores.
- Carga y gestión de portadas y archivos asociados a capítulos.
- Validación de datos y reglas de negocio.
- API REST desarrollada con Node.js y Express.js.
- Control de acceso basado en roles.
- Documentación básica de endpoints y arquitectura del sistema.
No incluye
- Plataforma de lectura optimizada.
- Sistema de monetización o suscripciones.
- Pasarelas de pago o procesamiento de transacciones.
- Integración con redes sociales externas.
- Sistema de notificaciones en tiempo real.
- Envío real de correos electrónicos.
- Sistema de recomendaciones basado en inteligencia artificial.
- Traducción automática de contenido.
- Gestión de derechos de autor o licenciamiento de obras.
- Funcionalidades de streaming o distribución multimedia avanzada.
- Herramientas avanzadas de análisis y estadísticas para administradores.
- Moderación automática mediante inteligencia artificial.
- Infraestructura de producción, balanceo de carga o despliegue distribuido.
