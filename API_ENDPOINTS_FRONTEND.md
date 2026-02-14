# Hema API – Frontend Implementation Guide

This document describes all API endpoints for **guest** (public) and **admin** (MCP) usage. Use it to implement the frontend for both roles.

---

## Base URL & Headers

- **Base URL:** `{BASE_URL}` (e.g. `http://localhost`, or your staging/production URL)
- **Content-Type:** `application/json` for all JSON bodies
- **Accept:** `application/json` on all requests
- **Admin (MCP) requests:** Send `Authorization: Bearer {token}` (token from Login)

---

## Authentication (Admin only)

Admin and moderator users authenticate via **Laravel Sanctum**. After login, send the returned token in the `Authorization` header for all MCP endpoints.

### How to get the token

1. Call **POST** `/api/mcp/login` with `email` and `password`.
2. On success, read `result.data.token` (or the token field inside the user object in `result`).
3. Store the token (e.g. in memory, localStorage, or secure storage).
4. For every MCP request, set: `Authorization: Bearer <token>`.

### Logout

- Call **POST** `/api/mcp/logout` with the same Bearer token. The server will invalidate that token.

---

## Response format

All endpoints return JSON in this shape:

**Success (2xx):**

```json
{
  "status": "success",
  "result": { "data": { ... } },
  "message": "Success message"
}
```

- List/detail data is usually under `result.data` (sometimes `result` is the payload directly; check the examples below).
- Paginated lists may have `result.data` as the list and pagination meta in `result` or alongside.

**Error (4xx/5xx):**

```json
{
  "status": "error",
  "message": "Error message",
  "result": null
}
```

**Validation errors (422):**

```json
{
  "status": "error",
  "message": "Validation Error.",
  "result": null,
  "data": {
    "field_name": ["Validation message 1", "..."],
    "another_field": ["..."]
  }
}
```

Handle `status === "error"` and show `message`; use `data` when present for field-level errors.

---

## Enums (for request bodies & responses)

Use these string values where the API expects a status or type:

| Enum | Values |
|------|--------|
| **Project status** | `available`, `sold`, `reserved` |
| **Unit status** | `available`, `sold`, `reserved` |

---

# Guest endpoints (public)

No authentication. Use these for the **public website** (e.g. landing, project list, project detail, unit list, unit detail).

---

## Guest – Projects

### List projects

- **Method:** `GET`
- **URL:** `/api/guest/projects`
- **Auth:** None
- **Query:** Optional pagination (if supported by backend)

**Response (success):**  
`result` / `result.data` = array of:

```ts
{
  id: number;
  title: { ar: string; en: string };
  description: { ar: string; en: string };
  price_from: string | null;
  city: { ar: string; en: string };
  area: string | null;
  rooms: string | null;
  unit_types: { ar: string; en: string };
  status: "available" | "sold" | "reserved";
  project_file_link: string | null;
  project_phone_link: string | null;
  project_questions_link: string | null;
  features: Array<{ ar?: string; en?: string }>;
  gallery: string[];
  diagrams: string[];
}
```

---

### Get single project (detail)

- **Method:** `GET`
- **URL:** `/api/guest/projects/{id}`
- **Auth:** None
- **Params:** `id` – project ID

**Response (success):**  
Same as list item, plus:

- `near_to`: `{ img: string; locations: Array<{ name: { ar: string; en: string }; distance: number }> }` or null
- `units`: array of Unit (see Guest – Units – Single unit)
- `guarantees`: array of `{ title: { ar: string; en: string }; years: number }`

---

## Guest – Units

### List units

- **Method:** `GET`
- **URL:** `/api/guest/units`
- **Auth:** None

**Response (success):**  
`result` / `result.data` = array of Unit (see shape below).

---

### Get single unit

- **Method:** `GET`
- **URL:** `/api/guest/units/{id}`
- **Auth:** None
- **Params:** `id` – unit ID

**Response (success):**  
One unit object:

```ts
{
  id: number;
  project_id: number;
  unit_number: string | null;
  title: string | null;
  description: string | null;
  image: string | null;
  status: "available" | "sold" | "reserved";
  price: string | null;
  floor: string | null;
  area: string | null;
  rooms: number | null;
}
```

---

# Admin (MCP) endpoints

All MCP endpoints require:

- **Header:** `Authorization: Bearer <token>`
- **Accept:** `application/json`
- **Content-Type:** `application/json` (except file upload)

Use the same base URL as above.

---

## Admin – Auth

### Login

- **Method:** `POST`
- **URL:** `/api/mcp/login`
- **Auth:** None (no Bearer)
- **Body:**

```json
{
  "email": "string (required, must exist in users)",
  "password": "string (required, min 6)"
}
```

**Response (success):**  
User object including `token`. Store the token for subsequent MCP requests.

```ts
// result.data or result contains:
{
  id: number;
  name: string;
  email: string;
  is_active: number;
  guard: string;           // e.g. "admin" | "moderator"
  roles: Array<{ id: number; name: string; guard_name: string; permissions: Permission[] }>;
  permissions: Array<{ id: number; name: string; guard_name: string }>;
  token: string;           // use this as Bearer token
  created_at: string;
  updated_at: string;
}
```

**Errors:**  
- Wrong credentials or inactive account → `status: "error"`, appropriate `message`.

---

### Logout

- **Method:** `POST`
- **URL:** `/api/mcp/logout`
- **Auth:** Bearer required

**Response (success):**  
`result` empty, `message` e.g. "Logged out successfully".

---

### Get profile

- **Method:** `GET`
- **URL:** `/api/mcp/profile/edit`
- **Auth:** Bearer required

**Response (success):**  
Same user shape as Login (without `token` if not returned).

---

### Update profile

- **Method:** `PUT`
- **URL:** `/api/mcp/profile/update`
- **Auth:** Bearer required
- **Body:**

```json
{
  "name": "string (required)",
  "email": "string (required, unique except current user)"
}
```

**Response (success):**  
Updated user object.

---

### Update password (current user)

- **Method:** `PUT`
- **URL:** `/api/mcp/profile/password/update`
- **Auth:** Bearer required
- **Body:**

```json
{
  "old_password": "string (required, min 6)",
  "new_password": "string (required, min 6)",
  "new_password_confirmation": "string (must match new_password)"
}
```

**Response (success):**  
Empty result, success message.

---

## Admin – Moderators

| Action | Method | URL | Notes |
|--------|--------|-----|--------|
| List | GET | `/api/mcp/moderators` | Paginated list |
| Create | POST | `/api/mcp/moderators` | Body below |
| Show | GET | `/api/mcp/moderators/{id}` | Single moderator |
| Update | PUT/PATCH | `/api/mcp/moderators/{id}` | Body below (no password) |
| Delete | DELETE | `/api/mcp/moderators/{id}` | |
| Block | POST | `/api/mcp/moderators/block/{id}` | Toggle block |
| Update password | PUT | `/api/mcp/moderators/update-password` | Body: `{ "password": "newpassword" }` (admin sets moderator password) |
| Create form | GET | `/api/mcp/moderators/create` | Roles/options for create form |
| Edit form | GET | `/api/mcp/moderators/{id}/edit` | Data for edit form |

**Create body (POST):**

```json
{
  "name": "string (required, 3–255)",
  "email": "string (required, unique)",
  "password": "string (required, min 6)",
  "is_active": true | false,
  "role_id": number | null
}
```

**Update body (PUT/PATCH):**

```json
{
  "name": "string (required, 3–255)",
  "email": "string (required, unique except this user)",
  "is_active": true | false,
  "role_id": number | null
}
```

**Moderator response shape:**

```ts
{
  id: number;
  name: string;
  email: string;
  is_active: number;
  roles: Array<{ id: number; name: string; guard_name: string; permissions: Permission[] }>;
  permissions: Array<{ id: number; name: string; guard_name: string }>;
  created_at: string;
  updated_at: string;
}
```

---

## Admin – Projects (MCP)

| Action | Method | URL | Notes |
|--------|--------|-----|--------|
| List | GET | `/api/mcp/projects` | Paginated |
| Create | POST | `/api/mcp/projects` | Body below |
| Show | GET | `/api/mcp/projects/{id}` | |
| Update | PUT/PATCH | `/api/mcp/projects/{id}` | Partial body ok |
| Delete | DELETE | `/api/mcp/projects/{id}` | |
| Create form | GET | `/api/mcp/projects/create` | Options for form |
| Edit form | GET | `/api/mcp/projects/{id}/edit` | Data for edit form |

**Create/Update body (all fields optional except where noted):**

```json
{
  "title_ar": "string (max 500)",
  "title_en": "string (max 500)",
  "description_ar": "string",
  "description_en": "string",
  "price_from": "string (max 100)",
  "city_ar": "string (max 255)",
  "city_en": "string (max 255)",
  "area": "string (max 100)",
  "rooms": "string (max 100)",
  "unit_types_ar": "string (max 255)",
  "unit_types_en": "string (max 255)",
  "status": "available" | "sold" | "reserved",
  "project_file_link": "string (max 500)",
  "project_phone_link": "string (max 255)",
  "project_questions_link": "string (max 500)",
  "features": [
    { "ar": "string (max 500)", "en": "string (max 500)" }
  ],
  "gallery": ["string (path, max 500)"],
  "diagrams": ["string (path, max 500)"],
  "near_to": {
    "img": "string (max 500)",
    "locations": [
      { "name_ar": "string", "name_en": "string", "distance": number }
    ]
  },
  "guarantees": [
    { "title_ar": "string", "title_en": "string", "years": number }
  ]
}
```

Project list/detail response shape matches the Guest project shape (with possible extra fields for admin). Use the same TypeScript types as Guest for consistency.

---

## Admin – Units (MCP)

| Action | Method | URL | Notes |
|--------|--------|-----|--------|
| List | GET | `/api/mcp/units` | Paginated |
| Create | POST | `/api/mcp/units` | Body below |
| Show | GET | `/api/mcp/units/{id}` | |
| Update | PUT/PATCH | `/api/mcp/units/{id}` | |
| Delete | DELETE | `/api/mcp/units/{id}` | |
| Create form | GET | `/api/mcp/units/create` | e.g. projects list |
| Edit form | GET | `/api/mcp/units/{id}/edit` | Data for edit form |

**Create body (POST):**

```json
{
  "project_id": number,
  "unit_number": "string (max 50)",
  "title": "string (max 255)",
  "description": "string",
  "image": "string (path, max 500)",
  "status": "available" | "sold" | "reserved",
  "price": "string (max 100)",
  "floor": "string (max 50)",
  "area": "string (max 50)",
  "rooms": number
}
```

**Update body (PUT/PATCH):**  
Same fields; all optional. Unit response shape is the same as Guest single unit.

---

## Admin – Roles (MCP)

| Action | Method | URL | Notes |
|--------|--------|-----|--------|
| List | GET | `/api/mcp/roles` | All roles |
| Create | POST | `/api/mcp/roles` | Body below |
| Show | GET | `/api/mcp/roles/{id}` | |
| Update | PUT/PATCH | `/api/mcp/roles/{id}` | Body below |
| Delete | DELETE | `/api/mcp/roles/{id}` | |
| Create form | GET | `/api/mcp/roles/create` | |
| Edit form | GET | `/api/mcp/roles/{id}/edit` | |

**Create body (POST):**

```json
{
  "name": "string (required, unique)",
  "permissions": [1, 2, 3]
}
```

**Update body (PUT/PATCH):**

```json
{
  "name": "string (required)",
  "permissions": [1, 2, 3]
}
```

`permissions` = array of permission IDs (from GET Permissions).

**Role response shape:**

```ts
{
  id: number;
  name: string;
  guard_name: string;
  permissions: Array<{ id: number; name: string; guard_name: string }>;
}
```

---

## Admin – Permissions (MCP)

### List permissions

- **Method:** `GET`
- **URL:** `/api/mcp/permissions`
- **Auth:** Bearer required

**Response (success):**  
List of permissions. Use `id` in role create/update:

```ts
{ id: number; name: string; guard_name: string; }[]
```

---

## Admin – File upload (MCP)

Use this to upload images/files; use the returned filename in project/unit payloads (e.g. `gallery`, `image`, `diagrams`).

- **Method:** `POST`
- **URL:** `/api/mcp/upload`
- **Auth:** Bearer required
- **Content-Type:** `multipart/form-data`
- **Body:** one file field named `file`

**Allowed file types:**  
jpeg, jpg, png, gif, webp, svg, bmp, ico, pdf, doc, docx, xls, xlsx, ppt, pptx, txt, csv, rtf, odt, ods, odp, zip, rar, 7z, json, xml, mp4, mp3, wav, avi, mov, wmv, flac, aac.

**Response (success):**  
`result` / `result.data` = generated filename string (e.g. `"6789abc.jpg"`). Prepend your static base path if needed (e.g. `/storage/temp/` + filename) when displaying or sending in project/unit bodies.

---

# Quick reference – by role

## As guest (public)

- `GET /api/guest/projects` – list projects  
- `GET /api/guest/projects/{id}` – project detail (with units, guarantees, near_to)  
- `GET /api/guest/units` – list units  
- `GET /api/guest/units/{id}` – unit detail  

No `Authorization` header.

---

## As admin (MCP)

1. **Auth:**  
   - `POST /api/mcp/login` (body: `email`, `password`) → store `token`  
   - `POST /api/mcp/logout`  
   - `GET /api/mcp/profile/edit`  
   - `PUT /api/mcp/profile/update` (body: `name`, `email`)  
   - `PUT /api/mcp/profile/password/update` (body: `old_password`, `new_password`, `new_password_confirmation`)

2. **Moderators:**  
   - CRUD + Block + Update password + Create/Edit form  
   - Base path: `/api/mcp/moderators`

3. **Projects:**  
   - CRUD + Create/Edit form  
   - Base path: `/api/mcp/projects`

4. **Units:**  
   - CRUD + Create/Edit form  
   - Base path: `/api/mcp/units`

5. **Roles:**  
   - CRUD + Create/Edit form  
   - Base path: `/api/mcp/roles`

6. **Permissions:**  
   - `GET /api/mcp/permissions`

7. **Upload:**  
   - `POST /api/mcp/upload` (form-data, key: `file`)

All MCP requests: `Authorization: Bearer <token>`, `Accept: application/json`, and `Content-Type: application/json` (except upload).

---

# Implementation notes for frontend

1. **Base URL:** Configure one base URL per environment (e.g. env var).
2. **Token:** After login, store token and send it on every MCP request; clear it on logout or 401.
3. **Errors:** Check `status === "error"`; show `message` and, if present, `data` for validation errors.
4. **Locales:** Project/unit titles, descriptions, etc. use `{ ar, en }`; use current locale to pick `ar` or `en`.
5. **File upload:** Upload first with `POST /api/mcp/upload`, then use the returned filename in project/unit create/update payloads.
6. **Pagination:** For list endpoints, follow backend pagination (e.g. `page`, `per_page` in query if documented); parse `result` for list and meta.
7. **Ids in URLs:** Replace `{id}`, `{moderator_id}`, `{project_id}`, `{unit_id}`, `{role_id}` with actual IDs when calling show/update/delete/edit/block.

If you need the exact pagination query params or more response samples, the backend team can provide them; the structure above matches the current API.
