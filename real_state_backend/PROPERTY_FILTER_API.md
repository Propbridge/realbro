# Property Filter API Documentation

## Overview
The Property Filter API allows users to search and filter properties based on multiple criteria matching the mobile app's filter interface.

## Endpoint

### Filter Properties
**GET** `/api/v1/property/filter`

**Authentication:** Not required (public endpoint)

**Description:** Retrieves a filtered list of active properties based on the provided query parameters.

---

## Query Parameters

### Property Category
- **Parameter:** `category`
- **Type:** Array of strings
- **Options:** 
  - `Residential`
  - `Commercial`
  - `FarmLand`
- **Example:** `category=Residential&category=Commercial`

### Property Type
- **Parameter:** `propertyType`
- **Type:** Array of strings
- **Options:**
  - `FLAT` (Apartment/Flat)
  - `DUPLEX` (Independent House/Villa)
  - `PLOT` (Plot/Land)
  - `FARMLAND` (Farmhouse)
- **Example:** `propertyType=FLAT&propertyType=DUPLEX`

### Furnishing Status
- **Parameter:** `furnishingStatus`
- **Type:** Array of strings
- **Options:**
  - `FullyFurnished`
  - `SemiFurnished`
  - `Unfurnished`
  - `FencedWired`
  - `FertileLand`
  - `OpenLand`
  - `Cultivated`
- **Example:** `furnishingStatus=FullyFurnished&furnishingStatus=SemiFurnished`

### Price Range
- **Parameter:** `priceMin`, `priceMax`
- **Type:** Number
- **Description:** Filter properties by listing price range
- **Example:** `priceMin=4100000&priceMax=10000000`

### Location Filters
- **Parameter:** `state`, `city`, `locality`
- **Type:** String
- **Description:** Filter by location (case-insensitive partial match)
- **Example:** `city=Mumbai&locality=Bandra`

### Additional Filters

#### Availability Status
- **Parameter:** `availabilityStatus`
- **Type:** Array of strings
- **Options:** `ReadyToMove`, `UnderConstruction`

#### Age of Property
- **Parameter:** `ageOfProperty`
- **Type:** Array of strings
- **Options:** `ZeroToOne`, `OneToThree`, `ThreeToSix`, `SixToTen`, `TenPlus`

#### Number of Rooms/Bathrooms
- **Parameter:** `numberOfRooms`, `numberOfBathrooms`
- **Type:** Number
- **Description:** Minimum number of rooms/bathrooms

#### Property Facing
- **Parameter:** `propertyFacing`
- **Type:** Array of strings
- **Options:** `East`, `West`, `North`, `South`, `NorthEast`, `NorthWest`, `SouthEast`, `SouthWest`

#### Carpet Area Range
- **Parameter:** `carpetAreaMin`, `carpetAreaMax`, `carpetAreaUnit`
- **Type:** Number for min/max, String for unit
- **Unit Options:** `SQFT`, `SQM`, `ACRES`
- **Example:** `carpetAreaMin=1000&carpetAreaMax=2000&carpetAreaUnit=SQFT`

### Sorting
- **Parameter:** `sortBy`
- **Type:** String
- **Options:**
  - `price_asc` - Price low to high
  - `price_desc` - Price high to low
  - `created_desc` - Newest first (default)
  - `created_asc` - Oldest first
- **Default:** `created_desc`

### Pagination
- **Parameter:** `page`
- **Type:** Number
- **Default:** 1
- **Min:** 1

- **Parameter:** `limit`
- **Type:** Number
- **Default:** 10
- **Min:** 1
- **Max:** 100

---

## Example Requests

### 1. Filter by Category and Property Type
```
GET /api/v1/property/filter?category=Residential&propertyType=FLAT&propertyType=DUPLEX
```

### 2. Filter by Price Range
```
GET /api/v1/property/filter?priceMin=5000000&priceMax=10000000
```

### 3. Filter by Furnishing Status
```
GET /api/v1/property/filter?furnishingStatus=FullyFurnished&furnishingStatus=SemiFurnished
```

### 4. Complete Filter Example (matching the mobile app)
```
GET /api/v1/property/filter?category=Residential&propertyType=FLAT&furnishingStatus=FullyFurnished&priceMin=4100000&priceMax=10000000&city=Mumbai&sortBy=price_asc&page=1&limit=20
```

### 5. Filter with Location and Rooms
```
GET /api/v1/property/filter?city=Delhi&numberOfRooms=3&numberOfBathrooms=2&propertyFacing=East&sortBy=created_desc
```

---

## Response Format

### Success Response (200 OK)

```json
{
  "success": true,
  "data": [
    {
      "id": "clxyz123...",
      "title": "Luxury 3BHK Apartment",
      "description": "Spacious apartment with modern amenities",
      "propertyType": "FLAT",
      "status": "ACTIVE",
      "listingPrice": 8500000,
      "state": "Maharashtra",
      "city": "Mumbai",
      "locality": "Bandra West",
      "subLocality": "Hill View Society",
      "flatNo": "A-501",
      "address": "Hill View Society, Bandra West, Mumbai",
      "latitude": 19.0596,
      "longitude": 72.8295,
      "carpetArea": 1200,
      "carpetAreaUnit": "SQFT",
      "category": "Residential",
      "furnishingStatus": "FullyFurnished",
      "availabilityStatus": "ReadyToMove",
      "ageOfProperty": "OneToThree",
      "numberOfRooms": 3,
      "numberOfBathrooms": 2,
      "numberOfBalcony": 2,
      "numberOfFloors": 15,
      "propertyFloor": "5",
      "allInclusivePrice": true,
      "negotiablePrice": false,
      "govtChargesTaxIncluded": true,
      "propertyFacing": "East",
      "amenities": ["Swimming Pool", "Gym", "Parking"],
      "locationAdvantages": ["Near Metro", "School Nearby"],
      "coveredParking": 1,
      "uncoveredParking": 0,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z",
      "userId": "user123",
      "media": [
        {
          "id": "media1",
          "url": "https://...",
          "key": "s3-key",
          "mediaType": "IMAGE",
          "order": 0,
          "createdAt": "2024-01-15T10:30:00.000Z"
        }
      ],
      "user": {
        "id": "user123",
        "firstName": "John",
        "lastName": "Doe",
        "email": "john@example.com",
        "phone": "+919876543210",
        "avatar": "https://..."
      }
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalCount": 47,
    "limit": 10,
    "hasNextPage": true,
    "hasPreviousPage": false
  }
}
```

### Error Response (500 Internal Server Error)

```json
{
  "success": false,
  "message": "Internal server error"
}
```

---

## Implementation Notes

1. **Only Active Properties:** The filter automatically shows only properties with `status: ACTIVE`
2. **Case-Insensitive Search:** Location filters (state, city, locality) are case-insensitive
3. **Multiple Selection:** Category, propertyType, and furnishingStatus support multiple selections
4. **Media Ordering:** Property media is returned ordered by the `order` field
5. **User Information:** Each property includes the owner's basic information (no sensitive data)
6. **Pagination:** Results are paginated to optimize performance

---

## Frontend Integration Example

### JavaScript/TypeScript (Fetch API)

```javascript
const filters = {
  category: ['Residential'],
  propertyType: ['FLAT'],
  furnishingStatus: ['FullyFurnished'],
  priceMin: 4100000,
  priceMax: 10000000,
  page: 1,
  limit: 10,
  sortBy: 'price_asc'
};

const queryString = new URLSearchParams();

// Handle array parameters
if (filters.category) {
  filters.category.forEach(cat => queryString.append('category', cat));
}
if (filters.propertyType) {
  filters.propertyType.forEach(type => queryString.append('propertyType', type));
}
if (filters.furnishingStatus) {
  filters.furnishingStatus.forEach(status => queryString.append('furnishingStatus', status));
}

// Handle single value parameters
if (filters.priceMin) queryString.append('priceMin', filters.priceMin);
if (filters.priceMax) queryString.append('priceMax', filters.priceMax);
queryString.append('page', filters.page);
queryString.append('limit', filters.limit);
queryString.append('sortBy', filters.sortBy);

const response = await fetch(`/api/v1/property/filter?${queryString.toString()}`);
const data = await response.json();

console.log('Filtered Properties:', data.data);
console.log('Pagination Info:', data.pagination);
```

### React Example

```jsx
const FilterProperties = () => {
  const [filters, setFilters] = useState({
    category: [],
    propertyType: [],
    furnishingStatus: [],
    priceMin: '',
    priceMax: '',
    page: 1,
    limit: 10
  });

  const [properties, setProperties] = useState([]);
  const [pagination, setPagination] = useState(null);

  const handleApplyFilters = async () => {
    const queryString = new URLSearchParams();
    
    // Add array filters
    filters.category.forEach(cat => queryString.append('category', cat));
    filters.propertyType.forEach(type => queryString.append('propertyType', type));
    filters.furnishingStatus.forEach(status => queryString.append('furnishingStatus', status));
    
    // Add other filters
    if (filters.priceMin) queryString.append('priceMin', filters.priceMin);
    if (filters.priceMax) queryString.append('priceMax', filters.priceMax);
    queryString.append('page', filters.page);
    queryString.append('limit', filters.limit);

    const response = await fetch(`/api/v1/property/filter?${queryString}`);
    const data = await response.json();
    
    if (data.success) {
      setProperties(data.data);
      setPagination(data.pagination);
    }
  };

  return (
    <div>
      {/* Filter UI components */}
      <button onClick={handleApplyFilters}>Apply Filters</button>
      
      {/* Display properties */}
      {properties.map(property => (
        <PropertyCard key={property.id} property={property} />
      ))}
      
      {/* Pagination controls */}
      {pagination && (
        <div>
          Page {pagination.currentPage} of {pagination.totalPages}
        </div>
      )}
    </div>
  );
};
```

---

## Performance Considerations

- The API uses database indexing on commonly filtered fields (propertyType, status, state, city, listingPrice)
- Pagination is enforced to prevent large data transfers
- Maximum limit is capped at 100 items per request
- Use appropriate page sizes based on your UI requirements (mobile: 10-20, web: 20-50)

---

## Testing with cURL

```bash
# Basic filter
curl "http://localhost:4000/api/v1/property/filter?category=Residential&propertyType=FLAT"

# With price range
curl "http://localhost:4000/api/v1/property/filter?priceMin=5000000&priceMax=10000000&sortBy=price_asc"

# Multiple filters
curl "http://localhost:4000/api/v1/property/filter?category=Residential&propertyType=FLAT&propertyType=DUPLEX&furnishingStatus=FullyFurnished&city=Mumbai&page=1&limit=20"
```
