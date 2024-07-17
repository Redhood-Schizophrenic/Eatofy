# API Requests

----------------------------------------------------------------------------------

### Dish Module

#### Dish Category Sub-Module
###### 1. Add
http://localhost:3000/api/hotel/dish/category/add
`POST`
```json
{
    "hotel_id": "a0240527-ffbd-4563-8b73-84169046da14",
    "category_name": "Starters"
    "description": "<optional>"
}
```

###### 2. Fetch
http://localhost:3000/api/hotel/dish/category/fetch
`POST`
```json
{
    "hotel_id": "a0240527-ffbd-4563-8b73-84169046da14"
}
```

###### 3. Update
http://localhost:3000/api/hotel/dish/category/update/details
`PUT`
```json
{
    "category_id": "3708f908-e188-46ef-8d55-bc2840853167",
    "category_name": "Breakfast",
    "description": "<optional>"
}
```
----------------------------------------------------------------------------------

#### Dish Management Sub-Module
###### 1. Add
http://localhost:3000/api/hotel/dish/management/add
`POST`
```json
{
    "dish_name": "Panner Crispy",
    "dish_code":"087",
    "dish_type": "Veg",
    "category_id":"3708f908-e188-46ef-8d55-bc2840853167",
    "hotel_id": "a0240527-ffbd-4563-8b73-84169046da14",
    "description": "<optional>"
}
```

###### 2. Add with image
http://localhost:3000/api/hotel/dish/management/add/image
`FORMDATA(POST)`
```json
{
    "dish_name": "Panner Crispy",
    "dish_code":"087",
    "dish_type": "Veg",
    "category_id":"3708f908-e188-46ef-8d55-bc2840853167",
    "hotel_id": "a0240527-ffbd-4563-8b73-84169046da14",
    "description": "<optional>",
    "dish": File
}
```
###### 3. Fetch
http://localhost:3000/api/hotel/dish/management/fetch
`POST`
```json
{
    "hotel_id": "a0240527-ffbd-4563-8b73-84169046da14"
}
```

###### 4. Update Details
http://localhost:3000/api/hotel/dish/management/update/details
`PUT`
```json
{
    "dish_name": "Panner Crispy",
    "dish_code":"067",
    "dish_type": "Veg",
    "dish_id": "72d64e12-6477-4b21-bf07-abaeb5305b3f",
    "hotel_id": "a0240527-ffbd-4563-8b73-84169046da14"
}
```

###### 5. Update Image
http://localhost:3000/api/hotel/dish/management/update/image
`FORMDATA(PUT)`
```json
    "dish_id": "72d64e12-6477-4b21-bf07-abaeb5305b3f",
    "dish_image": File
```

###### 6. Update Status
http://localhost:3000/api/hotel/dish/management/update/status
`PUT`
```json
{
    "dish_id": "72d64e12-6477-4b21-bf07-abaeb5305b3f",
    "status": "In-Active"
}
```
----------------------------------------------------------------------------------
