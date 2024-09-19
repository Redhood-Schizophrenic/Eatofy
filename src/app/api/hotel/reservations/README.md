
# API Requests

----------------------------------------------------------------------------------

### Table Reservation Module

###### 1. Add
http://localhost:3000/api/hotel/reservations/management/add
`POST`
```json
{
    "note": "",
    "date": "2024-12-22",
    "time": "09:00 AM",
    "customer_name": "User",
    "contact": "9090909090",
    "hotel_id": "a0240527-ffbd-4563-8b73-84169046da14"
}
```

###### 2. Fetch
http://localhost:3000/api/hotel/reservations/management/fetch
`POST`
```json
{
    "hotel_id": "a0240527-ffbd-4563-8b73-84169046da14"
}
```

###### 3. Update Status
http://localhost:3000/api/hotel/reservations/management/update/status
`PUT`
```json
{
    "reservation_id": "55245c6a-7789-47b5-a41b-afe843a85169",
    "status": "Inactive"
}
```
----------------------------------------------------------------------------------
