# Property Requirement Form API Documentation

## Base URL
```
/api/v1/user/requirements
```

All endpoints require a valid JWT token.

---

## Endpoints

### 1. Submit Requirement
**POST** `/api/v1/user/requirements`

**Headers:**
```http
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "preferredLocation": "Bhopal",
  "subLocation": "Arera Colony",
  "propertyType": "FLAT",
  "budgetMin": 2000000,
  "budgetMax": 5000000,
  "currency": "INR"
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `preferredLocation` | string | ✅ Yes | Main city or area the user is looking in |
| `subLocation` | string | No | Society, locality or sub-area |
| `propertyType` | string | No | One of: `FLAT`, `PLOT`, `DUPLEX`, `FARMLAND` |
| `budgetMin` | number | No | Minimum budget (must be ≥ 0) |
| `budgetMax` | number | No | Maximum budget (must be ≥ `budgetMin`) |
| `currency` | string | No | Defaults to `INR` |

**Success Response `201`:**
```json
{
  "success": true,
  "data": {
    "id": "cm9abc123",
    "preferredLocation": "Bhopal",
    "subLocation": "Arera Colony",
    "propertyType": "FLAT",
    "budgetMin": 2000000,
    "budgetMax": 5000000,
    "currency": "INR",
    "status": "NEW",
    "userId": "cm8user456",
    "createdAt": "2026-03-16T08:00:00.000Z",
    "updatedAt": "2026-03-16T08:00:00.000Z"
  }
}
```

---

### 2. Get My Requirements
**GET** `/api/v1/user/requirements`

**Headers:**
```http
Authorization: Bearer <token>
```

**Query Parameters (all optional):**

| Parameter | Type | Default | Description |
|---|---|---|---|
| `page` | number | `1` | Page number |
| `limit` | number | `10` | Records per page. Max `100` |
| `status` | string | - | Filter by status: `NEW`, `ACTIVE`, `FULFILLED`, `CLOSED` |

**Example:**
```
GET /api/v1/user/requirements?status=NEW&page=1&limit=10
```

**Success Response `200`:**
```json
{
  "success": true,
  "data": [
    {
      "id": "cm9abc123",
      "preferredLocation": "Bhopal",
      "subLocation": "Arera Colony",
      "propertyType": "FLAT",
      "budgetMin": 2000000,
      "budgetMax": 5000000,
      "currency": "INR",
      "status": "NEW",
      "userId": "cm8user456",
      "createdAt": "2026-03-16T08:00:00.000Z",
      "updatedAt": "2026-03-16T08:00:00.000Z"
    }
  ],
  "pagination": {
    "total": 1,
    "page": 1,
    "limit": 10,
    "totalPages": 1
  }
}
```

---

### 3. Update Requirement
**PUT** `/api/v1/user/requirements/:id`

**Headers:**
```http
Authorization: Bearer <token>
Content-Type: application/json
```

**Path Parameter:**
- `id` — ID of the requirement to update

**Request Body:** (all fields optional)
```json
{
  "preferredLocation": "Indore",
  "subLocation": "Vijay Nagar",
  "propertyType": "PLOT",
  "budgetMin": 1000000,
  "budgetMax": 3000000,
  "currency": "INR",
  "status": "ACTIVE"
}
```

**Success Response `200`:**
```json
{
  "success": true,
  "data": {
    "id": "cm9abc123",
    "preferredLocation": "Indore",
    "subLocation": "Vijay Nagar",
    "propertyType": "PLOT",
    "budgetMin": 1000000,
    "budgetMax": 3000000,
    "currency": "INR",
    "status": "ACTIVE",
    "userId": "cm8user456",
    "createdAt": "2026-03-16T08:00:00.000Z",
    "updatedAt": "2026-03-16T09:30:00.000Z"
  }
}
```

---

### 4. Delete Requirement
**DELETE** `/api/v1/user/requirements/:id`

**Headers:**
```http
Authorization: Bearer <token>
```

**Path Parameter:**
- `id` — ID of the requirement to delete

**Success Response `200`:**
```json
{
  "success": true,
  "message": "Requirement deleted"
}
```

---

## Status Lifecycle

```
NEW → ACTIVE → FULFILLED
            ↘ CLOSED
```

| Status | Meaning |
|---|---|
| `NEW` | Freshly submitted, not yet reviewed |
| `ACTIVE` | Actively being worked on by the team |
| `FULFILLED` | A matching property was found |
| `CLOSED` | Requirement withdrawn or expired |

---

## Valid `propertyType` Values

| Value | Description |
|---|---|
| `FLAT` | Apartment / flat |
| `PLOT` | Open land / plot |
| `DUPLEX` | Duplex house |
| `FARMLAND` | Agricultural / farm land |

---

## Error Responses

### 400 — Validation Failed
```json
{
  "error": "Validation failed",
  "details": {
    "budgetMax": ["budgetMax must be greater than or equal to budgetMin"]
  }
}
```

### 400 — No Fields to Update
```json
{
  "message": "No fields provided to update"
}
```

### 401 — Unauthorized
```json
{
  "message": "Unauthorized"
}
```

### 403 — Forbidden (not your requirement)
```json
{
  "message": "Forbidden"
}
```

### 404 — Not Found
```json
{
  "message": "Requirement not found"
}
```

### 500 — Server Error
```json
{
  "message": "Internal server error"
}
```

---

## cURL Examples

```bash
# Submit a new requirement
curl -X POST http://localhost:5000/api/v1/user/requirements \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"preferredLocation":"Bhopal","propertyType":"FLAT","budgetMin":2000000,"budgetMax":5000000}'

# List my requirements
curl http://localhost:5000/api/v1/user/requirements \
  -H "Authorization: Bearer YOUR_TOKEN"

# Update a requirement
curl -X PUT http://localhost:5000/api/v1/user/requirements/cm9abc123 \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"status":"ACTIVE"}'

# Delete a requirement
curl -X DELETE http://localhost:5000/api/v1/user/requirements/cm9abc123 \
  -H "Authorization: Bearer YOUR_TOKEN"
```
