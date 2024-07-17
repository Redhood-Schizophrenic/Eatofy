## 🧞 API List

All APIs in the above directories is listed here:

# 1. Eatofy Side 
----------------------------------------------------------------------------------
### Hotels

| Function                    | API Call                                                        | Method            |
| :------------------------   | :-----------------------------------------------                |:------------------|
| `Add Hotel`                 | {url}/api/eatofy/hotels/management/add                          |   `POST`          |


### Subscriptions

| Function                    | API Call                                                        | Method            |
| :------------------------   | :-----------------------------------------------                |:------------------|
| `Add Subscription`          | {url}/api/eatofy/subscriptions/management/add                   |   `POST`          |
| `Fetch Subscriptions`       | {url}/api/eatofy/subscriptions/management/fetch/                |   `POST / GET`    |
| `Update Status`             | {url}/api/eatofy/subscriptions/management/update/               |   `PUT`           |


### Hotel Subscriptions

| Function                    | API Call                                                        | Method            |
| :------------------------   | :-----------------------------------------------                |:------------------|
| `Add Hotel Subscription`    | {url}/api/eatofy/hotel_subscription/management/add              |   `POST`          |
| `Fetch All Subscriptions`   | {url}/api/eatofy/hotel_subscription/management/fetch/valid      |   `POST / GET`    |
| `Fetch Valid Subscription`  | {url}/api/eatofy/hotel_subscription/management/fetch/all        |   `POST / GET`    |
| `Update Subscription Status`| {url}/api/eatofy/hotel_subscription/management/update/status    |   `PUT`           |

----------------------------------------------------------------------------------


# 2. Hotel Side 
----------------------------------------------------------------------------------

## Customers Management

| Function                    | API Call                                                        | Method            |
| :------------------------   | :-----------------------------------------------                |:------------------|
| `Add Customers`             | {url}/api/hotel/customers/management/add                        |   `POST`          |
| `Add Customer's Occassion`  | {url}/api/hotel/customers/occassions/add                        |   `POST`          |
| `Fetch All Customers`       | {url}/api/hotel/customers/management/fetch                      |   `POST`          |
| `Fetch Single Customer`     | {url}/api/hotel/customers/occassions/fetch                      |   `POST`          |
| `Update a Customer's Status`| {url}/api/hotel/customers/management/update/status              |   `PUT`           |

## Dishes Management 

| Function                     | API Call                                                       | Method            |
| :------------------------    | :-----------------------------------------------               |:------------------|
| `Add Dish Category`          | {url}/api/hotel/dish/category/add                              |   `POST`          |
| `Add Dish`                   | {url}/api/hotel/dish/management/add                            |   `POST`          |
| `Add Dish (Image)`           | {url}/api/hotel/dish/management/add/image                      |   `POST`          |
| `Fetch Hotel's Categories`   | {url}/api/hotel/dish/category/fetch                            |   `POST`          |
| `Fetch Dishes`               | {url}/api/hotel/dish/management/fetch                          |   `POST`          |
| `Update a Category's Details`| {url}/api/hotel/dish/category/update/details                   |   `PUT`           |
| `Update a Category's Status` | {url}/api/hotel/dish/category/update/status                    |   `PUT`           |
| `Update a Dish's Details`    | {url}/api/hotel/dish/management/update/details                 |   `PUT`           |
| `Update a Dish's Status`     | {url}/api/hotel/dish/management/update/status                  |   `PUT`           |
| `Update a Dish's Image`      | {url}/api/hotel/dish/management/update/image                   |   `PUT`           |


## Menu Management

| Function                    | API Call                                                        | Method            |
| :------------------------   | :-----------------------------------------------                |:------------------|
| `Add Menu`                  | {url}/api/hotel/menu/management/add                             |   `POST`          |
| `Fetch Menus`               | {url}/api/hotel/menu/management/fetch                           |   `POST`          |
| `Update Price`              | {url}/api/hotel/menu/management/update/price                    |   `PUT`           |
| `Update Status`             | {url}/api/hotel/menu/management/update/status                   |   `PUT`           |


## Table Management

| Function                    | API Call                                                        | Method            |
| :------------------------   | :-----------------------------------------------                |:------------------|
| `Add Section`               | {url}/api/hotel/sections/management/add                         |   `POST`          |
| `Add Table`                 | {url}/api/hotel/tables/management/add                           |   `POST`          |
| `Add Table Reservation`     | {url}/api/hotel/reservations/management/add                     |   `POST`          |
| `Add Multiple Tables`       | {url}/api/hotel/tables/management/add/multiple                  |   `POST`          |
| `Fetch Section`             | {url}/api/hotel/sections/management/fetch                       |   `POST`          |
| `Fetch Tables`              | {url}/api/hotel/tables/management/fetch                         |   `POST`          |
| `Fetch Hotel's Reservations`| {url}/api/hotel/reservations/management/fetch                   |   `POST`          |
| `Update Section Name`       | {url}/api/hotel/sections/management/update/name                 |   `PUT`           |
| `Update Section Status`     | {url}/api/hotel/sections/management/update/status               |   `PUT`           |
| `Update Table Name`         | {url}/api/hotel/tables/management/update/name                   |   `PUT`           |
| `Update Table Status`       | {url}/api/hotel/tables/management/update/status                 |   `PUT`           |
| `Update Reservations Status`| {url}/api/hotel/reservations/management/update/status           |   `PUT`           |



## Inventory Management

| Function                      | API Call                                                                   | Method            |
| :------------------------     | :-----------------------------------------------                           |:------------------|
| `Add Supplier`                | {url}/api/hotel/suppliers/management/add                                   |   `POST`          |
| `Add Item Category`           | {url}/api/hotel/inventory/item_categories/management/add                   |   `POST`          |
| `Add Item`                    | {url}/api/hotel/inventory/items/management/add                             |   `POST`          |
| `Add Purchased Invoice`       | {url}/api/hotel/inventory/purchased/invoices/management/add                |   `POST`          |
| `Add Purchased Stock`         | {url}/api/hotel/inventory/purchased/stock/management/add                   |   `POST`          |
| `Add Available Stock`         | {url}/api/hotel/inventory/available_stock/management/add                   |   `POST`          |
| `Fetch Supplier`              | {url}/api/hotel/suppliers/management/fetch                                 |   `POST`          |
| `Fetch Item Categories`       | {url}/api/hotel/inventory/item_categories/management/fetch                 |   `POST`          |
| `Fetch Items`                 | {url}/api/hotel/inventory/items/management/fetch                           |   `POST`          |
| `Fetch Invoices`              | {url}/api/hotel/inventory/purchased/invoices/management/fetch              |   `POST`          |
| `Filter Invoices by Supplier` | {url}/api/hotel/inventory/purchased/invoices/management/fetch/supplier     |   `POST`          |
| `Filter Invoices by Date`     | {url}/api/hotel/inventory/purchased/invoices/management/fetch/invoice_date |   `POST`          |
| `Filter Invoices by Payment`  | {url}/api/hotel/inventory/purchased/invoices/management/fetch/payment_status|  `POST`          |
| `Fetch Purchased Stock`       | {url}/api/hotel/inventory/purchased/stock/management/fetch                 |   `POST`          |
| `Fetch Available Stock`       | {url}/api/hotel/inventory/available_stock/management/fetch                 |   `POST`          |
| `Update Supplier's Details`   | {url}/api/hotel/suppliers/management/update/details                        |   `PUT`           |
| `Update Supplier's Status`    | {url}/api/hotel/suppliers/management/update/status                         |   `PUT`           |
| `Update Category's Details`   | {url}/api/hotel/inventory/item_categories/management/update/details        |   `PUT`           |
| `Update Category's Status`    | {url}/api/hotel/inventory/item_categories/management/update/status         |   `PUT`           |
| `Update Item's Status`        | {url}/api/hotel/inventory/items/management/update/status                   |   `PUT`           |
| `Update Invoice Payment`      | {url}/api/hotel/inventory/purchased/invoices/management/update/payment     |   `PUT`           |
| `Update Available Quantity`   | {url}/api/hotel/inventory/available_stock/management/update/quantity       |   `PUT`           |
| `Update Available Status`     | {url}/api/hotel/inventory/available_stock/management/update/status         |   `PUT`           |
