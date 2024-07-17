# API Requests


----------------------------------------------------------------------------------

### Hotels Module

###### 1. Add Hotel
http://localhost:3000/api/eatofy/hotels/management/add/single
`POST(formData())`
```json
{
    "hotel_name": "New Mordern Cafe",
    "email": "mordern.cafe@hotel.io",
    "password": "hotel@123",
    "address": "Phadke Rd, Chirag Society, Dombivli East, Dombivli, Maharashtra 421201",
    "speciality": [
        "South Indian",
        "North Indian",
        "Chinese",
        "Sandwich",
        "Pizza",
        "Fast Food",
        "Desserts",
        "Beverages"
    ],
    "contacts": [
        "1234567890",
        "1234567890"
    ],
    "fssai_code": "IN9738633DDDDDFD",
    "logo": File
}
```
----------------------------------------------------------------------------------
