# User API Spec

## Register User API

Endpoint: POST /api/users

Request Body:

```json
{
    "username":"evan",
    "password": "rahasia",
    "name": "Programmer Zaman Now"
}```

Response Body Success:

```json
{
    "data":{
        "username": "evan",
        "name":"programmer zaman now"
    }
}```

Response Body Error:

```json
{
    "errors": "username already exist"
}```

## Login User API

Endpoint: POST /api/users/login

Request Body:

```json
{
    "username":"evan",
    "password":"rahasia"
}```

Response Body Success:

```json
{
    "data":{
        "token":"unique-token"
    }
}```

Response Body Error:

```json
{
    "errors":"username or password wrong"
}```

## Update User API

Endpoint: PATCH /api/users/current

Headers:
- Authorization: token

Request Body:

```json
{
    "name":"programmer zaman now",
    "password":"new password"
}```

Response Body Success:

```json
{
    "data":{
        "username":"evan",
        "name":"programmer zaman now
        "
    }
}```

Response Body Error:

```json
{
    "errors":"Name lengt max 100"
}```

## Get User API

Endpoint: GET /api/users/current

Headers:
- Authorization: token

Response body succeess:
```json
{
    "data":{
        "username":"evan",
        "name":"programmer zaman now"
    }
}```

Response Body Error:

```json
{
    "errors": "unautorized"
}``

## Logout User API

Endpoint: DELTE/api/users/logout

Headers:
- Authorization: token


Response body success:

```json
{
    "data": "ok"
}```

Response body error:

```json
{
    "errors":"unahotirized"
}```