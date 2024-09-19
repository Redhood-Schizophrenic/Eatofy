
# API Requests

----------------------------------------------------------------------------------

### Hotel's Expenses Module

###### 1. Add
http://localhost:3000/api/hotel/expenses/management/add
`POST`
```json
{
    "hotel_id": "a0240527-ffbd-4563-8b73-84169046da14",
    "expense_name": "Groceries",
    "date": "13 July 2024",
    "note": "<optional>",
    "payable_to": "Supplier",
    "amount_payable": 500.00,
    "amount_paid": 0.0,
    "status": "Unpaid"
}
```

###### 2. Fetch
http://localhost:3000/api/hotel/expenses/management/fetch
`POST`
```json
{
    "hotel_id": "a0240527-ffbd-4563-8b73-84169046da14"
}
```

###### 3. Update Details
http://localhost:3000/api/hotel/expenses/management/update/details
`PUT`
```json
{
    "expense_id": "a0240527-ffbd-4563-8b73-84169046da14",
    "date": "13 July 2024",
    "note": "<optional>",
    "payable_to": "Supplier",
    "amount_payable": 500.00,
    "amount_paid": 0.0,
    "status": "Unpaid"
}
```

###### 4. Update Status
http://localhost:3000/api/hotel/expenses/management/update/details
`PUT`
```json
{
    "expense_id": "a0240527-ffbd-4563-8b73-84169046da14",
    "status": "Inactive"
}
```
----------------------------------------------------------------------------------
