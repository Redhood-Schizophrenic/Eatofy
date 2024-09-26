
# API Requests

----------------------------------------------------------------------------------

### Table Management Module

###### 1. Add Table (Manual)
http://localhost:3000/api/hotel/tables/management/add/single
`POST`
```json
{
    "section_id": "605d6692-63d5-4e90-b9eb-436efecfb915",
    "hotel_id": "a0240527-ffbd-4563-8b73-84169046da14",
    "table_name": "Table T1",
    "persons_occupiable": "4"
}
```
###### 2. Add Table (Auto)
http://localhost:3000/api/hotel/tables/management/add/multiple
`POST`
```json
{
    "section_id": "605d6692-63d5-4e90-b9eb-436efecfb915",
    "hotel_id": "a0240527-ffbd-4563-8b73-84169046da14",
    "count": 4
}
```


###### 3. Fetch
http://localhost:3000/api/hotel/tables/management/fetch/
`POST`
```json
{
    "hotel_id": "a0240527-ffbd-4563-8b73-84169046da14"
}
```

###### 4. Update Table Name
http://localhost:3000/api/hotel/tables/management/update/name
`PUT`
```json
{
    "table_id": "08dfe8e7-5bcd-4603-be63-52fe5593ef0a",
    "table_name": "Table T1"
}
```

###### 5. Update Status
http://localhost:3000/api/hotel/tables/management/update/status
`PUT`
```json
{
    "table_id": "08dfe8e7-5bcd-4603-be63-52fe5593ef0a",
    "status": "Inactive"
}
```
----------------------------------------------------------------------------------
