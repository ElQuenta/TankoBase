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

> Para el rol de LECTOR

- Como lector, quiero registrarme e iniciar sesión, para guardar mis preferencias y acceder a funciones personalizadas.
- Como lector, quiero marcar obras como favoritas, para tener un acceso rápido a las que sigo.
- Como lector, quiero registrar mi progreso de lectura, para continuar desde el capítulo donde me quedé.
- Como lector, quiero dejar comentarios en las obras y capítulos, para compartir mi opinión con otros usuarios.
- Como lector, quiero editar o eliminar mis propios comentarios, para mantener actualizada mi participación.

> Para el rol de EDITOR

- Como editor, quiero crear y actualizar obras, para mantener el catálogo organizado y vigente.
- Como editor, quiero gestionar capítulos y su contenido, para publicar nuevas entregas de cada obra.

> Para el rol de ADMINISTRADOR

- Como administrador, quiero moderar comentarios y reportes, para mantener un entorno ordenado y seguro.
- Como administrador, quiero gestionar usuarios y permisos, para controlar el acceso a las funciones del sistema.
- Como administrador, quiero administrar géneros, etiquetas y categorías, para mejorar la organización del contenido.

## Funcionalidades principales del proyecto

| Historia de Usuario                                                                                                   | Funcionalidad                             |
| --------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| Como usuario invitado, quiero ver el catálogo de obras, para explorar el contenido disponible sin registrarme.        | Listar obras                              |
| Como usuario invitado, quiero buscar obras por título, para encontrar rápidamente una serie específica.               | Buscar obras                              |
| Como usuario invitado, quiero ver los detalles de una obra, para conocer su descripción, género, autor y estado.      | Consultar detalle de obra                 |
| Como usuario invitado, quiero visualizar los capítulos de una obra, para acceder al contenido publicado.              | Visualizar capítulos                      |
| Como lector, quiero registrarme e iniciar sesión, para guardar mis preferencias y acceder a funciones personalizadas. | Registro e inicio de sesión               |
| Como lector, quiero marcar obras como favoritas, para tener un acceso rápido a las que sigo.                          | Gestionar favoritos                       |
| Como lector, quiero registrar mi progreso de lectura, para continuar desde el capítulo donde me quedé.                | Gestionar progreso de lectura             |
| Como lector, quiero dejar comentarios en las obras y capítulos, para compartir mi opinión con otros usuarios.         | Publicar comentarios                      |
| Como lector, quiero editar o eliminar mis propios comentarios, para mantener actualizada mi participación.            | Gestionar comentarios propios             |
| Como editor, quiero crear y actualizar obras, para mantener el catálogo organizado y vigente.                         | Gestionar obras                           |
| Como editor, quiero gestionar capítulos y su contenido, para publicar nuevas entregas de cada obra.                   | Gestionar capítulos                       |
| Como administrador, quiero moderar comentarios y reportes, para mantener un entorno ordenado y seguro.                | Moderar comentarios                       |
| Como administrador, quiero gestionar usuarios y permisos, para controlar el acceso a las funciones del sistema.       | Gestionar usuarios y roles                |
| Como administrador, quiero administrar géneros, etiquetas y categorías, para mejorar la organización del contenido.   | Gestionar géneros, etiquetas y categorías |

## Modelo de datos inicial

## Endpoints tentativos de la API

## Reglas de negocio

## Tecnologías a utilizar

## Alcance del proyecto
