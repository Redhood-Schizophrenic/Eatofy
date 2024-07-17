# API Requests

----------------------------------------------------------------------------------

### Customer Module

#### Customer Management Sub-Module
###### 1. Add
http://localhost:3000/api/hotel/customers/management/add/
`POST`
```json
{
    "customer_name": "User",
    "contact": "9090909090",
    "hotel_id": "a0240527-ffbd-4563-8b73-84169046da14",
    "occassion": "Birthday Party",
    "date": "2024-04-01"
}
```

###### 2. Fetch
http://localhost:3000/api/hotel/customers/management/fetch
`POST`
```json
{
    "hotel_id": "a0240527-ffbd-4563-8b73-84169046da14"
}
```

###### 3. Update
http://localhost:3000/api/hotel/customers/management/update/status
`PUT`
```json
{
    "customer_id": "70130784-e6bd-499d-9acb-ba1afb6690c7",
    "status": "In-Active"
}
```
----------------------------------------------------------------------------------

#### Customer's Special Occasions Sub-Module
###### 1. Add
http://localhost:3000/api/hotel/customers/occassions/add
`POST`
```json
{
    "customer_id": "70130784-e6bd-499d-9acb-ba1afb6690c7",
    "occassion": "Birthday Party",
    "date": "2024-04-01"
}
```
----------------------------------------------------------------------------------
