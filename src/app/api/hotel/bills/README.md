# API Requests

----------------------------------------------------------------------------------

### Bills Management Module

###### 1. Fetch Hotel's Bills
http://localhost:3000/api/hotel/menu/management/fetch/hotel
`POST`
```json
{
    "hotel_id": "605d6692-63d5-4e90-b9eb-436efecfb915"
}
```

###### 2. Kot Display Fetch
http://localhost:3000/api/hotel/menu/management/fetch/kot
`POST`
```json
{
    "bill_id: "605d6692-63d5-4e90-b9eb-436efecfb915"
}
```

###### 3. Bill Print
http://localhost:3000/api/hotel/menu/management/fetch/single
`POST`
```json
{
    "bill_id": "605d6692-63d5-4e90-b9eb-436efecfb915"
}
```

###### 4. Bill Payment
http://localhost:3000/api/hotel/bills/management/update/payment
`PUT`
```json
{
    "bill_id": "2861a0c8-9582-4d84-b227-1de06a3671c3",
    "table_id": "<optional>",
    "total_amount": 1040.00,
    "cgst_rate": "2.5 %",
    "sgst_rate": "2.5 %",
    "cgst_amount": 25.00,
    "sgst_amount": 25.00,
    "menu_total": 1000.00,
    "balance_amount": 0.00,
    "discount_rate": "10 %",
    "discount_amount": 10.00,
    "payment_mode": "Cash",
    "payment_status": "Paid"
}
```

###### 5. Update Customer Info
http://localhost:3000/api/hotel/bills/management/update/customer
`PUT`
```json
{
    "bill_id": "2861a0c8-9582-4d84-b227-1de06a3671c3",
    "customer_name": "User",
    "contact": "8080808080",
    "email": "user@eatofy.in",
    "occassion": "<optional>",
    "date": "<optional>",
    "hotel_id": "a0240527-ffbd-4563-8b73-84169046da14"
}
```

###### 6. Update Table 
http://localhost:3000/api/hotel/bills/management/update/customer
`PUT`
```json
{
    "bill_id": "2861a0c8-9582-4d84-b227-1de06a3671c3",
    "table_id": "2861a0c8-9582-4d84-b227-1de06a3671c3"
}
```
----------------------------------------------------------------------------------
