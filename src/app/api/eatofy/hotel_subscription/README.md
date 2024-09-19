# API Requests

----------------------------------------------------------------------------------

### Hotel's Subscription Module

###### 1. Add
http://localhost:3000/api/eatofy/hotel_subscription/management/add
`POST`
```json
{
    "hotel_id": "a0240527-ffbd-4563-8b73-84169046da14",
    "subscription_id": "2185ccc8-14ba-4e40-97d1-ef7cc49428d4",
    "is_valid": true,
    "start_date": "2024-06-18",
    "end_date": "2024-09-16"
}
```

###### 2. Fetch
http://localhost:3000/api/eatofy/hotel_subscription/management/fetch/all
http://localhost:3000/api/eatofy/hotel_subscription/management/fetch/valid
`POST | GET`
```json
{
    "hotel_id": "746b236d-ff30-43fc-8ca6-643dedac5a5c"
}
```

###### 3. Update
http://localhost:3000/api/eatofy/hotel_subscription/management/update/status
`PUT`
```json
{
    "hotel_subscription_id": "7220e4e8-4a0f-4e9d-b006-b3a782f97be6",
    "is_valid": false,
    "status": "In-Active"
}
```
----------------------------------------------------------------------------------
