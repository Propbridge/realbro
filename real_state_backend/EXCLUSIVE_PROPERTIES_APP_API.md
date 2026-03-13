# Exclusive Properties App API Documentation

## Overview
This document is for app frontend integration of user-facing exclusive properties.

Admin exclusive property APIs already exist separately.

---

## Base Path
`/api/v1/user/exclusive-properties`

---

## 1. Get Exclusive Properties (List)

**Endpoint:** `GET /api/v1/user/exclusive-properties`

**Auth Required:** No

**Description:**
Returns paginated exclusive properties for app listing/cards.

### Query Params
- `page` (optional, number, default: `1`)
- `limit` (optional, number, default: `10`, max: `100`)
- `status` (optional, string, default: `ACTIVE`)
  - Allowed: `ACTIVE`, `SOLD_OUT`, `ARCHIVED`
  - If invalid value is sent, API falls back to `ACTIVE`

### Example Request
```bash
curl -X GET "http://localhost:5000/api/v1/user/exclusive-properties?page=1&limit=10&status=ACTIVE"
```

### Success Response (200)
```json
{
  "success": true,
  "data": [
    {
      "id": "cm9x8abc123",
      "title": "Premium Lake View Apartment",
      "status": "ACTIVE",
      "listingPrice": 7800000,
      "city": "Bhopal",
      "locality": "Arera Colony",
      "subLocality": "Green Heights",
      "numberOfRooms": 3,
      "numberOfBathrooms": 2,
      "numberOfBalcony": 2,
      "numberOfFloors": 12,
      "furnishingStatus": "FullyFurnished",
      "fixedRewardGems": 300,
      "imageUrl": "https://your-cdn.com/exclusive/property-1.jpg",
      "createdAt": "2026-03-10T08:00:00.000Z",
      "updatedAt": "2026-03-12T09:30:00.000Z"
    }
  ],
  "pagination": {
    "total": 24,
    "page": 1,
    "limit": 10,
    "totalPages": 3
  }
}
```

### Empty Response (200)
```json
{
  "success": true,
  "data": [],
  "pagination": {
    "total": 0,
    "page": 1,
    "limit": 10,
    "totalPages": 0
  }
}
```

### Error Response (500)
```json
{
  "message": "Internal server error"
}
```

---

## 2. Get Exclusive Property Detail

**Endpoint:** `GET /api/v1/user/exclusive-properties/:exclusivePropertyId`

**Auth Required:** No

**Description:**
Returns full details of a single exclusive property for detail screen.

Note: This endpoint currently returns only `ACTIVE` exclusive properties.

### Example Request
```bash
curl -X GET "http://localhost:5000/api/v1/user/exclusive-properties/cm9x8abc123"
```

### Success Response (200)
```json
{
  "success": true,
  "data": {
    "id": "cm9x8abc123",
    "title": "Premium Lake View Apartment",
    "description": "Spacious apartment with premium amenities",
    "propertyType": "FLAT",
    "status": "ACTIVE",
    "listingPrice": 7800000,
    "city": "Bhopal",
    "locality": "Arera Colony",
    "address": "A-401, Green Heights",
    "fixedRewardGems": 300,
    "media": [
      {
        "id": "cm9x9m1",
        "exclusivePropertyId": "cm9x8abc123",
        "url": "https://your-cdn.com/exclusive/property-1.jpg",
        "key": "exclusive/images/property-1.jpg",
        "mediaType": "IMAGE",
        "order": 0,
        "createdAt": "2026-03-10T08:00:00.000Z"
      }
    ],
    "createdAt": "2026-03-10T08:00:00.000Z",
    "updatedAt": "2026-03-12T09:30:00.000Z"
  }
}
```

### Not Found (404)
```json
{
  "message": "Exclusive property not found"
}
```

### Bad Request (400)
```json
{
  "message": "exclusivePropertyId is required"
}
```

### Error Response (500)
```json
{
  "message": "Internal server error"
}
```

---

## Frontend Notes

1. Listing API includes `imageUrl` for card thumbnail (first IMAGE media).
2. Detail API returns sorted `media` array by `order` ascending.
3. For app home/discovery use default status (ACTIVE) only.
4. If needed, app can fetch sold/archived tabs using `status=SOLD_OUT` and `status=ARCHIVED`.

---

## 3. Search Exclusive Properties

**Endpoint:** `GET /api/v1/user/exclusive-properties/search`

**Auth Required:** No

**Description:**
Searches only within exclusive properties (not normal properties).

### Query Params
- `query` (optional, string): Free text search in title and location fields
- `status` (optional, repeatable): `ACTIVE`, `SOLD_OUT`, `ARCHIVED` (default: `ACTIVE`)
- `state` (optional, string)
- `city` (optional, string)
- `locality` (optional, string)
- `subLocality` (optional, string)
- `area` (optional, string)
- `sortBy` (optional): `price_asc`, `price_desc`, `created_desc`, `created_asc` (default: `created_desc`)
- `page` (optional, number, default: `1`)
- `limit` (optional, number, default: `10`, max: `100`)

### Example Request
```bash
curl -X GET "http://localhost:5000/api/v1/user/exclusive-properties/search?query=bhopal&status=ACTIVE&sortBy=created_desc&page=1&limit=10"
```

### Success Response (200)
```json
{
  "success": true,
  "data": [
    {
      "id": "cm9x8abc123",
      "title": "Premium Lake View Apartment",
      "status": "ACTIVE",
      "listingPrice": 7800000,
      "city": "Bhopal",
      "locality": "Arera Colony",
      "subLocality": "Green Heights",
      "numberOfRooms": 3,
      "numberOfBathrooms": 2,
      "numberOfBalcony": 2,
      "numberOfFloors": 12,
      "furnishingStatus": "FullyFurnished",
      "fixedRewardGems": 300,
      "imageUrl": "https://your-cdn.com/exclusive/property-1.jpg",
      "createdAt": "2026-03-10T08:00:00.000Z",
      "updatedAt": "2026-03-12T09:30:00.000Z"
    }
  ],
  "pagination": {
    "total": 12,
    "page": 1,
    "limit": 10,
    "totalPages": 2,
    "hasNextPage": true,
    "hasPreviousPage": false
  }
}
```

---

## 4. Filter Exclusive Properties

**Endpoint:** `GET /api/v1/user/exclusive-properties/filter`

**Auth Required:** No

**Description:**
Applies structured filters only on exclusive properties.

### Query Params
- `status` (optional, repeatable): `ACTIVE`, `SOLD_OUT`, `ARCHIVED` (default: `ACTIVE`)
- `category` (optional, repeatable): `RESIDENTIAL`, `COMMERCIAL`, `AGRICULTURAL`
- `propertyType` (optional, repeatable): `FARMLAND`, `DUPLEX`, `FLAT`, `PLOT`
- `furnishingStatus` (optional, repeatable)
- `availabilityStatus` (optional, repeatable): `ReadyToMove`, `UnderConstruction`
- `ageOfProperty` (optional, repeatable): `ZeroToOne`, `OneToThree`, `ThreeToSix`, `SixToTen`, `TenPlus`
- `propertyFacing` (optional, repeatable)
- `priceMin` (optional, number)
- `priceMax` (optional, number)
- `carpetAreaMin` (optional, number)
- `carpetAreaMax` (optional, number)
- `carpetAreaUnit` (optional): `SQFT`, `SQM`, `ACRES`
- `state` (optional, string)
- `city` (optional, string)
- `locality` (optional, string)
- `numberOfRooms` (optional, number, minimum)
- `numberOfBathrooms` (optional, number, minimum)
- `sortBy` (optional): `price_asc`, `price_desc`, `created_desc`, `created_asc` (default: `created_desc`)
- `page` (optional, number, default: `1`)
- `limit` (optional, number, default: `10`, max: `100`)

### Example Request
```bash
curl -X GET "http://localhost:5000/api/v1/user/exclusive-properties/filter?status=ACTIVE&category=RESIDENTIAL&city=Bhopal&priceMin=1000000&priceMax=10000000&numberOfRooms=2&sortBy=price_asc&page=1&limit=10"
```

### Success Response (200)
```json
{
  "success": true,
  "data": [
    {
      "id": "cm9x8abc123",
      "title": "Premium Lake View Apartment",
      "status": "ACTIVE",
      "listingPrice": 7800000,
      "city": "Bhopal"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 1,
    "totalCount": 1,
    "limit": 10,
    "hasNextPage": false,
    "hasPreviousPage": false
  }
}
```
