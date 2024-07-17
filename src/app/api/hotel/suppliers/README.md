
# API Requests

----------------------------------------------------------------------------------

### Supplier's Module
###### 1. Add
http://localhost:3000/api/hotel/suppliers/management/add
`POST`
```json
{
    "supplier_name": "User",
    "contact": "9090909090",
    "email": "user.supplier@io",
    "gstin": "IJJNCDINC039839",
    "address": "<optional>"
    "hotel_id": "a0240527-ffbd-4563-8b73-84169046da14"
}
```

###### 2. Fetch
http://localhost:3000/api/hotel/suppliers/management/fetch
`POST`
```json
{
    "hotel_id": "a0240527-ffbd-4563-8b73-84169046da14"
}
```

###### 3. Update Details
http://localhost:3000/api/hotel/suppliers/management/update/details
`PUT`
```json
{
    "supplier_name": "User1",
    "contact": "9090909090",
    "email": "user1.supplier@io",
    "gstin": "IJJNCDINC039839",
    "supplier_id": "dca77fb8-60f5-4037-ad18-f3a587b253b0"
}
```

###### 4. Update Status
http://localhost:3000/api/hotel/suppliers/management/update/status
`PUT`
```json
{
    "supplier_id": "dca77fb8-60f5-4037-ad18-f3a587b253b0",
    "status": "In-Active"
}
```
----------------------------------------------------------------------------------

