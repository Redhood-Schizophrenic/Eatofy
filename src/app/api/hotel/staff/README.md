# API Requests

----------------------------------------------------------------------------------

### Staff Module

#### Management Sub-Module
###### 1. Add
http://localhost:3000/api/hotel/staff/management/add
`POST`
```json
{
    "first_name": "User",
    "last_name": "Surname",
    "address": "New York",
    "contact": "9090909090",
    "email": "user.hotel@eatofy.in",
    "password": "user@123",
    "department_name": "Sales",
    "designation": "Sales Manager",
    "role": "Waiter",
    "salary": 50000.00,
    "incentives": 8,
    "hotel_id": "a0240527-ffbd-4563-8b73-84169046da14"
}
```

###### 2. Fetch
http://localhost:3000/api/hotel/staff/management/fetch
`POST`
```json
{
    "hotel_id": "a0240527-ffbd-4563-8b73-84169046da14"
}
```

###### 3. Update Details
http://localhost:3000/api/hotel/staff/management/update/details
`PUT`
```json
{
    "first_name": "User",
    "last_name": "Surname",
    "address": "Alaska",
    "contact": "9090909090",
    "staff_id": "e033d4f8-87b7-4037-ab6b-bb7fa31031e8"
}
```
###### 4. Employee Promotion
http://localhost:3000/api/hotel/staff/management/update/income
`PUT`
```json
{
    "department_name": "Sales",
    "designation": "Sales Head",
    "role": "Waiter",
    "salary": 50000.00,
    "incentives": 8,
    "staff_id": "e033d4f8-87b7-4037-ab6b-bb7fa31031e8"
}
```

###### 5. Update Status
http://localhost:3000/api/hotel/staff/management/update/status
`PUT`
```json
{
    "status": "In-Active",
    "staff_id": "e033d4f8-87b7-4037-ab6b-bb7fa31031e8"
}
```


----------------------------------------------------------------------------------

#### Attendance Sub-Module
###### 1. Add
http://localhost:3000/api/hotel/staff/attendance/add
`POST`
```json
{
    "date": "4 July 2024",
    "arrival_time": "9:00",
    "departure_time": "17:00",
    "type": "Present",
    "note": "<optional>",
    "staff_id": "b5c658c1-8483-4978-8406-1ff406634029"
}
```

###### 2. Fetch

`POST`
```json
{
    "hotel_id": "a0240527-ffbd-4563-8b73-84169046da14",
    "date": "4 July 2024"
}
```
----------------------------------------------------------------------------------
