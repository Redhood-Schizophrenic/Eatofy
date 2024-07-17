# API Requests

----------------------------------------------------------------------------------

### Subscriptions Module

###### 1. Add
http://localhost:3000/api/eatofy/subscription/management/add
`POST`
```json
{
    "subscription_name": "Test",
    "price": "100000.00",
    "validity": 90
}
```

###### 2. Fetch
http://localhost:3000/api/eatofy/subscriptions/management/fetch
`GET`


###### 3. Update
http://localhost:3000/api/eatofy/subscriptions/management/update/status
`PUT`
```json
{
    "subscription_id": "2de77322-60a3-455f-b3f6-a268bd2c8719",
    "status": "In-Active"
}
```
----------------------------------------------------------------------------------


