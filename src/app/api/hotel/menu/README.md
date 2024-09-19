# API Requests

----------------------------------------------------------------------------------

### Menu Management Module

###### 1. Add
http://localhost:3000/api/hotel/menu/management/add
`POST`
```json
{
    "dish_id": "72d64e12-6477-4b21-bf07-abaeb5305b3f",
    "section_id": "605d6692-63d5-4e90-b9eb-436efecfb915",
    "price": 8000.00
}
```

###### 2. Fetch
http://localhost:3000/api/hotel/menu/management/fetch
`POST`
```json
{
    "section_id": "605d6692-63d5-4e90-b9eb-436efecfb915"
}
```

###### 3. Update Price
http://localhost:3000/api/hotel/menu/management/update/price
`PUT`
```json
{
   "menu_id": "86646bc4-4876-4114-ab0c-15d699508ac5",
   "price": 5000.99
}
```

###### 4. Update Status
http://localhost:3000/api/hotel/menu/management/update/status
`PUT`
```json
{
    "menu_id": "86646bc4-4876-4114-ab0c-15d699508ac5",
    "status": "In-Active"
}
```

----------------------------------------------------------------------------------
