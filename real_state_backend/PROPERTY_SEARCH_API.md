# Property Search API

## Search Properties Endpoint
Search for properties by title and location. Returns only **ACTIVE** status properties.

### Endpoint
```
GET /api/properties/search
```

### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| query | string | No | Search text to match against property title |
| state | string | No | Filter by state (case-insensitive, partial match) |
| city | string | No | Filter by city (case-insensitive, partial match) |
| locality | string | No | Filter by locality (case-insensitive, partial match) |
| subLocality | string | No | Filter by sub-locality/society name (case-insensitive, partial match) |
| area | string | No | Filter by area (case-insensitive, partial match) |
| sortBy | enum | No | Sort results: `price_asc`, `price_desc`, `created_desc` (default), `created_asc` |
| page | number | No | Page number for pagination (default: 1, min: 1) |
| limit | number | No | Number of results per page (default: 10, min: 1, max: 100) |

### Features
- **Title Search**: Searches property titles using the `query` parameter with case-insensitive matching
- **Location Search**: Flexible location search across multiple fields (state, city, locality, subLocality, area) using OR logic
- **Active Properties Only**: Automatically filters to show only properties with `ACTIVE` status
- **Pagination**: Built-in pagination support
- **Sorting**: Sort by price or creation date in ascending/descending order

### Example Requests

#### Search by title
```bash
GET /api/properties/search?query=Beautiful%20Villa
```

#### Search by location
```bash
GET /api/properties/search?city=Bhopal&locality=Arera%20Colony
```

#### Search by title and location
```bash
GET /api/properties/search?query=Apartment&city=Bhopal&sortBy=price_asc
```

#### Search with pagination
```bash
GET /api/properties/search?city=Bhopal&page=2&limit=20
```

### Response Format

#### Success Response (200 OK)
```json
{
  "success": true,
  "data": [
    {
      "id": "clxxx...",
      "title": "Beautiful 3BHK Apartment",
      "description": "Spacious apartment with modern amenities",
      "propertyType": "FLAT",
      "status": "ACTIVE",
      "listingPrice": 5000000,
      "state": "Madhya Pradesh",
      "city": "Bhopal",
      "locality": "Arera Colony",
      "subLocality": "Green Valley Society",
      "address": "123 Main Street",
      "latitude": 23.2599,
      "longitude": 77.4126,
      "carpetArea": 1200,
      "carpetAreaUnit": "SQFT",
      "category": "Residential",
      "furnishingStatus": "SemiFurnished",
      "numberOfRooms": 3,
      "numberOfBathrooms": 2,
      "numberOfBalcony": 1,
      "amenities": ["Parking", "Gym", "Swimming Pool"],
      "createdAt": "2026-02-25T10:00:00.000Z",
      "updatedAt": "2026-02-25T10:00:00.000Z",
      "userId": "clyyyy...",
      "media": [
        {
          "id": "clzzz...",
          "url": "https://...",
          "key": "properties/...",
          "mediaType": "IMAGE",
          "order": 0
        }
      ],
      "user": {
        "id": "clyyyy...",
        "firstName": "John",
        "lastName": "Doe",
        "email": "john@example.com",
        "phone": "+911234567890",
        "avatar": "https://..."
      }
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalCount": 50,
    "limit": 10,
    "hasNextPage": true,
    "hasPreviousPage": false
  }
}
```

#### Error Response (500 Internal Server Error)
```json
{
  "success": false,
  "message": "Internal server error"
}
```

### Notes
- All text searches are case-insensitive
- Location filters use OR logic, meaning properties matching ANY of the provided location criteria will be returned
- Title search requires exact substring match
- The endpoint automatically filters out non-active properties (DRAFT, UNLISTED, SOLDOFFLINE, etc.)
- Maximum limit per page is 100 items
- Results include property media and owner information

### Use Cases
1. **Quick Search**: Users can search for properties by typing titles like "Villa", "Apartment", "2BHK"
2. **Location-based Search**: Find properties in specific cities, localities, or neighborhoods
3. **Combined Search**: Search for "Luxury Villa" in "Bhopal" sorted by price
4. **Browse Active Listings**: Get all active properties without any filters
