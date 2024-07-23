# API Requests


----------------------------------------------------------------------------------

### Eatofy Authentication

###### 1. Login
http://localhost:3000/api/eatofy/auth/login
`POST`
```json
{
    "email":"user@mail.co",
    "password":"123"
}
```

###### 2. Register (*To be used one time only*)
http://localhost:3000/api/eatofy/auth/register
`POST`
```json
{
    "username":"User",
    "email":"user@gmail.com",
    "password":"123"
}
```

###### 3. Forgot Password 
http://localhost:3000/api/eatofy/auth/forgot_password
`PUT`
```json
{
    "email": "user@gmail.com",
    "old_password": "123",
    "new_password": "123456"
}
```

###### 4. Account Delete
http://localhost:3000/api/eatofy/auth/delete_account
`DELETE`
```json
{
    "user_id": "ba4c0332-317f-4609-b011-6268f4bd12fc"
}
```

----------------------------------------------------------------------------------

