# API Requests


----------------------------------------------------------------------------------

### Hotel's Compliance Checklist Module

###### 1. Add Compliance
http://localhost:3000/api/hotel/compliance/management/add
`POST`
```json
{
    "compliance_name": "GSTIN",
    "description": "<optional>",
    "hotel_id": "a0240527-ffbd-4563-8b73-84169046da14"
}
```

###### 2. Add Compliance with Image
http://localhost:3000/api/hotel/compliance/management/add/image
`POST(formData())`
```json
{
    "compliance_name": "GSTIN",
    "description": "<optional>",
    "hotel_id": "a0240527-ffbd-4563-8b73-84169046da14",
    "image": File
}
```

###### 3. Fetch
http://localhost:3000/api/hotel/compliance/management/fetch
`POST`
```json
{
    "hotel_id": "a0240527-ffbd-4563-8b73-84169046da14"
}
```

###### 4. Update Details
http://localhost:3000/api/hotel/compliance/management/update/details
`PUT(formData())`
```json
{
    "compliance_id": "a0240527-ffbd-4563-8b73-84169046da14",
    "description": "<optional>",
    "image": File | Optional
}
```

###### 5. Update Status
http://localhost:3000/api/hotel/compliance/management/update/details
`PUT`
```json
{
    "compliance_id": "a0240527-ffbd-4563-8b73-84169046da14",
    "status": "Inactive"
}
```

----------------------------------------------------------------------------------
