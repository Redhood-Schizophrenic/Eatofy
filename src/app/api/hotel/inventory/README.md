
# API Requests

----------------------------------------------------------------------------------

### Inventory Management Module

#### Item Category's Sub-Module
###### 1. Add
http://localhost:3000/api/hotel/inventory/item_categories/management/add
`POST`
```json
{
    "category_name": "Vegetables",
    "description": "<optional>"
    "hotel_id": "a0240527-ffbd-4563-8b73-84169046da14"
}
```

###### 2. Fetch
http://localhost:3000/api/hotel/inventory/item_categories/management/fetch
`POST`
```json
{
    "hotel_id": "a0240527-ffbd-4563-8b73-84169046da14"
}
```

###### 3. Update Details
http://localhost:3000/api/hotel/inventory/item_categories/management/update/details
`PUT`
```json
{
    "category_name": "Raw Materials",
    "description": "<optional>"
    "category_id": "4d843cd6-cd98-4ba5-b443-5f460fd1be95"
}
```

###### 4. Update Status
http://localhost:3000/api/hotel/inventory/item_categories/management/update/status
`PUT`
```json
{
    "status": "In-Active",
    "category_id": "4d843cd6-cd98-4ba5-b443-5f460fd1be95"
}
```
----------------------------------------------------------------------------------


#### Items Sub-Module

###### 1. Add
http://localhost:3000/api/hotel/inventory/items/management/add
`POST`
```json
{
    "category_id":"6a5432ba-f5c5-41e5-8a52-0cb986568b08",
    "item_name": "Tomato",
    "description": "<optional>"
    "hotel_id": "a0240527-ffbd-4563-8b73-84169046da14"
}
```

###### 2. Fetch
http://localhost:3000/api/hotel/inventory/items/management/fetch
`POST`
```json
{
    "hotel_id": "a0240527-ffbd-4563-8b73-84169046da14"
}
```

###### 3. Update Status
http://localhost:3000/api/hotel/inventory/items/management/update/status
`PUT`
```json
{
    "item_id": "a0ab3323-1cfb-472f-9667-00a39e26fa95",
    "status": "In-Active"
}
```
----------------------------------------------------------------------------------

### Purchased Invoices Sub-Module

###### 1. Add
http://localhost:3000/api/hotel/inventory/purchased/invoices/management/add
`POST`
```json
{
    "payment_mode": "Cash",
    "total_amount": 4000.00,
    "balance_amount": 2000.00,
    "payment_status": "Half-Paid",
    "invoice_date": "2024-01-02",
    "supplier_id": "dca77fb8-60f5-4037-ad18-f3a587b253b0",
    "hotel_id": "a0240527-ffbd-4563-8b73-84169046da14"
}
```

###### 2. Fetch Invoices
http://localhost:3000/api/hotel/inventory/purchased/invoices/management/fetch
`POST`
```json
{
    "hotel_id": "a0240527-ffbd-4563-8b73-84169046da14"
}
```

###### 3. Fetch Invoice by Invoice Date
http://localhost:3000/api/hotel/inventory/purchased/invoices/management/fetch/invoice_date
`POST`
```json
{
    "invoice_date": "2024-01-02"
}
```
###### 4. Fetch Invoice by Payment Status
http://localhost:3000/api/hotel/inventory/purchased/invoices/management/fetch/payment_status
`POST`
```json
{
    "payment_status": "Half-Paid"
}
```
###### 5. Fetch Invoice by Supplier Id
http://localhost:3000/api/hotel/inventory/purchased/invoices/management/fetch/supplier
`POST`
```json
{
    "supplier_id": "dca77fb8-60f5-4037-ad18-f3a587b253b0"
}
```

###### 6. Update Invoice Payment
http://localhost:3000/api/hotel/inventory/purchased/invoices/management/update/payment
`PUT`
```json
{
    "invoice_id": "39131b25-b892-412e-aaf4-f6f917c14bd3",
    "payment_mode": "Upi",
    "balance_amount": 0.00,
    "payment_status": "Half-Paid"
}
```
----------------------------------------------------------------------------------

### Purchased Stock Sub-Module

###### 1. Add 
http://localhost:3000/api/hotel/inventory/purchased/stock/management/add
`POST`
```json
{
    "invoice_id": "39131b25-b892-412e-aaf4-f6f917c14bd3",
    "item_id": "cdaf076b-46e2-4252-b13e-a9214a022bbb",
    "quantity": "10",
    "unit": "kg"
}
```

###### 2. Fetch
http://localhost:3000/api/hotel/inventory/purchased/stock/management/fetch
`POST`
```json
{
    "invoice_id": "39131b25-b892-412e-aaf4-f6f917c14bd3"
}
```
----------------------------------------------------------------------------------

### Available Stock Sub-Module

###### 1. Add
http://localhost:3000/api/hotel/inventory/available_stock/management/add
`POST`
```json
{
    "item_id": "cdaf076b-46e2-4252-b13e-a9214a022bbb",
    "quantity": "80",
    "unit": "kg",
    "hotel_id": "a0240527-ffbd-4563-8b73-84169046da14"
}
```

###### 2. Fetch
http://localhost:3000/api/hotel/inventory/available_stock/management/fetch
`POST`
```json
{
    "hotel_id": "a0240527-ffbd-4563-8b73-84169046da14"
}
```

###### 3. Update Quantities
http://localhost:3000/api/hotel/inventory/available_stock/management/update/quantity
`PUT`
```json
{
    "available_stock_id": "d5371dfd-da10-4524-aadd-4732e2d4e163",
    "quantity": "50"
}
```

###### 4. Update Status
http://localhost:3000/api/hotel/inventory/available_stock/management/update/status
`PUT`
```json
{
    "available_stock_id": "d5371dfd-da10-4524-aadd-4732e2d4e163",
    "status": "In-Active"
}
```
----------------------------------------------------------------------------------
