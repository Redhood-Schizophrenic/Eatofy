
# API Requests

----------------------------------------------------------------------------------

### Hotel's Sections Module

###### 1. Add
http://localhost:3000/api/hotel/sections/management/add
`POST`
```json
{
    "hotel_id": "a0240527-ffbd-4563-8b73-84169046da14",
    "section_name": "Hall Section",
    "description": "<optional>"
}
```

###### 2. Fetch
http://localhost:3000/api/hotel/sections/management/fetch
`POST`
```json
{
    "hotel_id": "a0240527-ffbd-4563-8b73-84169046da14"
}
```

###### 3. Update Name
http://localhost:3000/api/hotel/sections/management/update/name
`PUT`
```json
{
    "section_id": "605d6692-63d5-4e90-b9eb-436efecfb915",
    "section_name": "Ac Section"
}
```

###### 4. Update Status
http://localhost:3000/api/hotel/sections/management/update/status
`PUT`
```json
{
    "section_id": "605d6692-63d5-4e90-b9eb-436efecfb915",
    "status": "Inactive"
}
```
----------------------------------------------------------------------------------
