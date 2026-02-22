# Customer Support API Documentation

## Overview
The Customer Support API allows users to create and manage support tickets. Each ticket includes user information (name, phone, email) and can request a callback. Admins can view all tickets.

## Base URL
```
/api/v1/support
```

---

## Endpoints

### 1. Create Support Ticket
**POST** `/api/v1/support/`

**Authentication:** Required

**Description:** Create a new customer support ticket

#### Request Body
```json
{
  "name": "John Doe",
  "phoneNo": "9876543210",
  "description": "I need help with property listing. The images are not uploading properly.",
  "isRequestForCall": true
}
```

#### Request Schema
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | Yes | Customer's name |
| phoneNo | string | Yes | Phone number (10-15 digits) |
| description | string | Yes | Issue description (min 10 characters) |
| isRequestForCall | boolean | No | Whether user wants a callback (default: false) |

#### Success Response (201 Created)
```json
{
  "success": true,
  "message": "Support ticket created successfully",
  "data": {
    "id": "clxyz123...",
    "name": "John Doe",
    "phoneNo": "9876543210",
    "description": "I need help with property listing. The images are not uploading properly.",
    "isRequestForCall": true,
    "ticketStatus": "OPEN",
    "userId": "user123",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z",
    "user": {
      "id": "user123",
      "email": "john@example.com",
      "firstName": "John",
      "lastName": "Doe"
    }
  }
}
```

---

### 2. Get My Tickets
**GET** `/api/v1/support/my-tickets`

**Authentication:** Required

**Description:** Get all support tickets created by the logged-in user

#### Query Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| ticketStatus | string | No | Filter by status: `OPEN` or `CLOSED` |
| page | number | No | Page number (default: 1) |
| limit | number | No | Items per page (default: 10, max: 100) |

#### Example Request
```
GET /api/v1/support/my-tickets?ticketStatus=OPEN&page=1&limit=10
```

#### Success Response (200 OK)
```json
{
  "success": true,
  "data": [
    {
      "id": "clxyz123...",
      "name": "John Doe",
      "phoneNo": "9876543210",
      "description": "I need help with property listing.",
      "isRequestForCall": true,
      "ticketStatus": "OPEN",
      "userId": "user123",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z",
      "user": {
        "id": "user123",
        "email": "john@example.com",
        "firstName": "John",
        "lastName": "Doe"
      }
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 3,
    "totalCount": 25,
    "limit": 10,
    "hasNextPage": true,
    "hasPreviousPage": false
  }
}
```

---

### 3. Get Ticket by ID
**GET** `/api/v1/support/:id`

**Authentication:** Required

**Description:** Get details of a specific support ticket (users can only access their own tickets)

#### Success Response (200 OK)
```json
{
  "success": true,
  "data": {
    "id": "clxyz123...",
    "name": "John Doe",
    "phoneNo": "9876543210",
    "description": "I need help with property listing.",
    "isRequestForCall": true,
    "ticketStatus": "OPEN",
    "userId": "user123",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z",
    "user": {
      "id": "user123",
      "email": "john@example.com",
      "firstName": "John",
      "lastName": "Doe"
    }
  }
}
```

#### Error Response (404 Not Found)
```json
{
  "message": "Ticket not found"
}
```

---

### 4. Update Ticket Status
**PUT** `/api/v1/support/:id/status`

**Authentication:** Required

**Description:** Update the status of a support ticket (user can close their own ticket)

#### Request Body
```json
{
  "ticketStatus": "CLOSED"
}
```

#### Request Schema
| Field | Type | Required | Options |
|-------|------|----------|---------|
| ticketStatus | string | Yes | `OPEN`, `CLOSED` |

#### Success Response (200 OK)
```json
{
  "success": true,
  "message": "Ticket status updated to CLOSED",
  "data": {
    "id": "clxyz123...",
    "name": "John Doe",
    "phoneNo": "9876543210",
    "description": "I need help with property listing.",
    "isRequestForCall": true,
    "ticketStatus": "CLOSED",
    "userId": "user123",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T12:00:00.000Z",
    "user": {
      "id": "user123",
      "email": "john@example.com",
      "firstName": "John",
      "lastName": "Doe"
    }
  }
}
```

---

### 5. Get All Tickets (Admin)
**GET** `/api/v1/support/admin/all`

**Authentication:** Required (Admin only - add admin middleware as needed)

**Description:** Get all support tickets from all users (for admin/support staff)

#### Query Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| ticketStatus | string | No | Filter by status: `OPEN` or `CLOSED` |
| page | number | No | Page number (default: 1) |
| limit | number | No | Items per page (default: 10, max: 100) |

#### Example Request
```
GET /api/v1/support/admin/all?ticketStatus=OPEN&page=1&limit=20
```

#### Success Response (200 OK)
```json
{
  "success": true,
  "data": [
    {
      "id": "clxyz123...",
      "name": "John Doe",
      "phoneNo": "9876543210",
      "description": "I need help with property listing.",
      "isRequestForCall": true,
      "ticketStatus": "OPEN",
      "userId": "user123",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z",
      "user": {
        "id": "user123",
        "email": "john@example.com",
        "firstName": "John",
        "lastName": "Doe",
        "phone": "+919876543210"
      }
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 10,
    "totalCount": 95,
    "limit": 10,
    "hasNextPage": true,
    "hasPreviousPage": false
  }
}
```

---

## Database Schema

```prisma
enum TicketStatus {
  OPEN
  CLOSED
}

model CustomerSupport {
  id               String       @id @default(cuid())
  name             String
  phoneNo          String
  description      String       @db.Text
  isRequestForCall Boolean      @default(false)
  ticketStatus     TicketStatus @default(OPEN)
  
  // User info
  userId String
  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([userId])
  @@index([ticketStatus])
  @@map("customer_support")
}
```

---

## Setup Instructions

### 1. Generate Prisma Client
After adding the schema, run:
```bash
npm run prisma:generate
```

### 2. Push Schema to Database
```bash
npm run prisma:push
```

### 3. Build and Restart Server
```bash
npm run build
# Then restart your server (pm2/systemctl/etc.)
```

---

## Error Responses

### 401 Unauthorized
```json
{
  "message": "Unauthorized User"
}
```

### 404 Not Found
```json
{
  "message": "Ticket not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Internal server error"
}
```

---

## Frontend Integration Examples

### Create Support Ticket
```javascript
const createTicket = async () => {
  const token = localStorage.getItem('accessToken');
  
  const response = await fetch('/api/v1/support/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      name: "John Doe",
      phoneNo: "9876543210",
      description: "I need help with property listing",
      isRequestForCall: true
    })
  });
  
  const data = await response.json();
  console.log(data);
};
```

### Get My Tickets
```javascript
const getMyTickets = async (status = null, page = 1) => {
  const token = localStorage.getItem('accessToken');
  
  let url = `/api/v1/support/my-tickets?page=${page}&limit=10`;
  if (status) {
    url += `&ticketStatus=${status}`;
  }
  
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  const data = await response.json();
  console.log(data);
};
```

### Update Ticket Status
```javascript
const closeTicket = async (ticketId) => {
  const token = localStorage.getItem('accessToken');
  
  const response = await fetch(`/api/v1/support/${ticketId}/status`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      ticketStatus: "CLOSED"
    })
  });
  
  const data = await response.json();
  console.log(data);
};
```

---

## React Component Example

```jsx
import { useState, useEffect } from 'react';

const SupportTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    phoneNo: '',
    description: '',
    isRequestForCall: false
  });

  const fetchTickets = async () => {
    const token = localStorage.getItem('accessToken');
    const response = await fetch('/api/v1/support/my-tickets', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await response.json();
    if (data.success) {
      setTickets(data.data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('accessToken');
    
    const response = await fetch('/api/v1/support/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    });
    
    const data = await response.json();
    if (data.success) {
      alert('Ticket created successfully!');
      fetchTickets();
      setFormData({ name: '', phoneNo: '', description: '', isRequestForCall: false });
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div>
      <h2>Create Support Ticket</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={formData.phoneNo}
          onChange={(e) => setFormData({...formData, phoneNo: e.target.value})}
          required
        />
        <textarea
          placeholder="Describe your issue"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          required
        />
        <label>
          <input
            type="checkbox"
            checked={formData.isRequestForCall}
            onChange={(e) => setFormData({...formData, isRequestForCall: e.target.checked})}
          />
          Request a callback
        </label>
        <button type="submit">Submit Ticket</button>
      </form>

      <h2>My Tickets</h2>
      {tickets.map(ticket => (
        <div key={ticket.id}>
          <h3>{ticket.description}</h3>
          <p>Status: {ticket.ticketStatus}</p>
          <p>Created: {new Date(ticket.createdAt).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
};

export default SupportTickets;
```

---

## Testing with cURL

```bash
# Create a ticket
curl -X POST "http://localhost:4000/api/v1/support/" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "name": "John Doe",
    "phoneNo": "9876543210",
    "description": "I need help with property listing",
    "isRequestForCall": true
  }'

# Get my tickets
curl "http://localhost:4000/api/v1/support/my-tickets?ticketStatus=OPEN" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Get specific ticket
curl "http://localhost:4000/api/v1/support/TICKET_ID" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Update ticket status
curl -X PUT "http://localhost:4000/api/v1/support/TICKET_ID/status" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"ticketStatus": "CLOSED"}'

# Get all tickets (admin)
curl "http://localhost:4000/api/v1/support/admin/all?page=1&limit=20" \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

---

## Notes

- All endpoints except admin routes are accessible to authenticated users
- Users can only view and update their own tickets
- The admin route (`/admin/all`) should have admin middleware added for production
- Ticket status can only be `OPEN` or `CLOSED`
- User's email is automatically retrieved from their account
- Phone number validation accepts 10-15 digit numbers
- Description must be at least 10 characters long
