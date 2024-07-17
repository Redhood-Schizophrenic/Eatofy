# API Requests

----------------------------------------------------------------------------------

### Order Management Module

###### 1. Add
http://localhost:3000/api/hotel/orders/management/add
`POST`
```json
{

    "type": "Dine-In",
    "table_id": "aed6fb54-aaf9-4ffb-bba3-304ad6bc950b",
    "waiter_id": "b5c658c1-8483-4978-8406-1ff406634029",
    "hotel_id": "a0240527-ffbd-4563-8b73-84169046da14",
    "customer_name": "User",
    "contact": "8080808080",
    "email": "user@eatofy.in",
    "occassion": "<optional>",
    "date": "<optional>",
    "menu_data": [
        {
            "quantity": "1",
            "menu_id": "bf5862b7-e46e-455c-b446-a6acca33f11a",
            "note": "medium teekha"
        },
        {
            "quantity": "2",
            "menu_id": "bf5862b7-e46e-455c-b446-a6acca33f11a"
        }
    ]
}
```

###### 2. Fetch an orders
http://localhost:3000/api/hotel/orders/management/fetch
`POST`
```json
{
    "order_id": "605d6692-63d5-4e90-b9eb-436efecfb915"
}
```

----------------------------------------------------------------------------------


### Order Menu Management Module

###### 1. Add
http://localhost:3000/api/hotel/orders/menus/add
`POST`
```json
{
    "quantity": "4",
    "menu_id": "bf5862b7-e46e-455c-b446-a6acca33f11a",
    "bill_id": "40bc3ad1-41ac-431a-b9a4-69672a5e1c40"
}
```

###### 2. Add Multiple
http://localhost:3000/api/hotel/orders/menus/add/multiple
`POST`
```json
{
    "data": [
        {
            "quantity": "1",
            "menu_id": "bf5862b7-e46e-455c-b446-a6acca33f11a",
            "bill_id": "40bc3ad1-41ac-431a-b9a4-69672a5e1c40",
            "note": "medium teekha"
        },
        {
            "quantity": "2",
            "menu_id": "bf5862b7-e46e-455c-b446-a6acca33f11a",
            "bill_id": "40bc3ad1-41ac-431a-b9a4-69672a5e1c40"
        }
    ]
}
```

###### 3. Delete
http://localhost:3000/api/hotel/orders/menus/delete
`POST`
```json
{
    order_id": "bf5862b7-e46e-455c-b446-a6acca33f11a"
}
```
----------------------------------------------------------------------------------
