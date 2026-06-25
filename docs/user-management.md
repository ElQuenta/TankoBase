# Gestión de Usuarios — Guía de Usuario

## Introducción

El módulo de gestión de usuarios permite a los administradores de TankoBase administrar las cuentas registradas en la plataforma. A través de esta API es posible consultar, crear, modificar y eliminar usuarios sin necesidad de que estos pasen por el flujo de registro público.

Todas las operaciones de este módulo están protegidas: solo usuarios autenticados con el rol `ADMINISTRATOR` pueden acceder. Cualquier intento de acceso sin autenticación o con un rol diferente será rechazado con un error `401 Unauthorized` o `403 Forbidden` respectivamente.

La eliminación de usuarios es **lógica** (soft delete): el registro no se borra físicamente de la base de datos, sino que se marca con una fecha de eliminación. Esto permite mantener la integridad referencial con otras entidades del sistema (favoritos, seguidos, progreso de lectura).

---

## Objetivos

- Permitir al administrador crear cuentas con cualquier rol sin pasar por el registro público.
- Proveer una vista completa de todos los usuarios activos de la plataforma.
- Facilitar la modificación de datos de un usuario (incluyendo su contraseña y rol) de forma segura.
- Permitir la desactivación de cuentas sin perder el historial asociado al usuario.

---

## Autenticación

Todos los endpoints requieren un token JWT válido con rol `ADMINISTRATOR` en el header:

```
Authorization: Bearer <token>
```

El token se obtiene al iniciar sesión en `POST /api/auth/login`.

---

## Endpoints

### 1. Listar todos los usuarios

**`GET /api/user`**

Retorna la lista de todos los usuarios activos (no eliminados).

**Headers requeridos**
| Header | Valor |
|--------|-------|
| Authorization | `Bearer <token>` |

**Respuesta exitosa — `200 OK`**
```json
{
  "success": true,
  "code": 200,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "username": "johndoe",
      "email": "john@example.com",
      "role": "READER",
      "createdAt": "2026-06-24T00:00:00.000Z",
      "updatedAt": "2026-06-24T00:00:00.000Z"
    }
  ]
}
```

---

### 2. Obtener un usuario por ID

**`GET /api/user/:id`**

Retorna el detalle de un usuario específico.

**Parámetros de ruta**
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `id` | UUID v4 | ID único del usuario |

**Respuesta exitosa — `200 OK`**
```json
{
  "success": true,
  "code": 200,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "username": "johndoe",
    "email": "john@example.com",
    "role": "READER",
    "createdAt": "2026-06-24T00:00:00.000Z",
    "updatedAt": "2026-06-24T00:00:00.000Z"
  }
}
```

**Errores posibles**
| Código | Mensaje | Causa |
|--------|---------|-------|
| `400` | Validation error | El `id` no tiene formato UUID v4 válido |
| `404` | User not found | No existe un usuario activo con ese ID |

---

### 3. Crear un usuario

**`POST /api/user`**

Crea una nueva cuenta de usuario. El administrador puede asignar cualquier rol directamente.

**Body — `application/json`**
| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `username` | string | ✅ | Entre 3 y 30 caracteres |
| `email` | string | ✅ | Debe ser un email válido y único |
| `password` | string | ✅ | Mínimo 6 caracteres |
| `role` | string | ✅ | `ADMINISTRATOR`, `EDITOR` o `READER` |

**Ejemplo de request**
```json
{
  "username": "janedoe",
  "email": "jane@example.com",
  "password": "Secret123",
  "role": "EDITOR"
}
```

**Respuesta exitosa — `201 Created`**
```json
{
  "success": true,
  "code": 201,
  "data": {
    "id": "660e9500-f30c-52e5-b827-557766551111",
    "username": "janedoe",
    "email": "jane@example.com",
    "role": "EDITOR",
    "createdAt": "2026-06-25T05:00:00.000Z"
  }
}
```

**Errores posibles**
| Código | Mensaje | Causa |
|--------|---------|-------|
| `400` | Validation error | Algún campo falla la validación del schema |
| `400` | Email already in use | Ya existe una cuenta con ese email |
| `400` | Username already in use | Ya existe una cuenta con ese username |

---

### 4. Actualizar un usuario

**`PUT /api/user/:id`**

Modifica los datos de un usuario existente. Se debe enviar al menos un campo.

**Parámetros de ruta**
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `id` | UUID v4 | ID único del usuario |

**Body — `application/json`** *(al menos un campo requerido)*
| Campo | Tipo | Descripción |
|-------|------|-------------|
| `username` | string | Entre 3 y 30 caracteres |
| `email` | string | Email válido y único |
| `password` | string | Mínimo 6 caracteres. Se hashea automáticamente |
| `role` | string | `ADMINISTRATOR`, `EDITOR` o `READER` |

**Ejemplo de request**
```json
{
  "role": "ADMINISTRATOR"
}
```

**Respuesta exitosa — `200 OK`**
```json
{
  "success": true,
  "code": 200,
  "data": {
    "id": "660e9500-f30c-52e5-b827-557766551111",
    "username": "janedoe",
    "email": "jane@example.com",
    "role": "ADMINISTRATOR",
    "updatedAt": "2026-06-25T06:00:00.000Z"
  }
}
```

**Errores posibles**
| Código | Mensaje | Causa |
|--------|---------|-------|
| `400` | Validation error | Body vacío o algún campo no pasa validación |
| `400` | Email already in use | El nuevo email ya pertenece a otra cuenta |
| `400` | Username already in use | El nuevo username ya pertenece a otra cuenta |
| `404` | User not found | No existe un usuario activo con ese ID |

---

### 5. Eliminar un usuario

**`DELETE /api/user/:id`**

Realiza un **soft delete** del usuario: la cuenta queda desactivada pero no se elimina físicamente de la base de datos.

**Parámetros de ruta**
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `id` | UUID v4 | ID único del usuario |

**Respuesta exitosa — `204 No Content`**

Sin cuerpo de respuesta.

**Errores posibles**
| Código | Mensaje | Causa |
|--------|---------|-------|
| `400` | Validation error | El `id` no tiene formato UUID v4 válido |
| `404` | User not found | No existe un usuario activo con ese ID |

---

## Respuestas de error comunes

Estos errores aplican a todos los endpoints del módulo:

| Código | Mensaje | Causa |
|--------|---------|-------|
| `401` | Unauthorized | No se envió el token o es inválido/expirado |
| `403` | Forbidden | El token es válido pero el rol no es `ADMINISTRATOR` |
