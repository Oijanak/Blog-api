# Blog Platform API

A RESTful API for managing blogs built with Node.js, Express,Jwt and MongoDB. This project demonstrates robust backend development practices, including authentication, input validation, advanced querying, and modular architecture.

![Node.js](https://img.shields.io/badge/Node.js-green)
![Express](https://img.shields.io/badge/Express-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-brightgreen)
![JWT](https://img.shields.io/badge/JWT-black)

## Features

- ✅ User authentication with JWT
- ✅ Create, Read, Update, and Delete (CRUD) blogs
- ✅ Input validation using **Joi**
- ✅ MongoDB schema for User,Blog and Comment
- ✅ Advanced querying:
  - Search (?search=keyword)
  - Tag filtering (?tags=tech,programming)
  - Sorting (?sort=oldest)
- ✅Comment system for blogs

## Getting Started Locally

Follow these steps to set up and run the project on your local machine.

### ✅ Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [MongoDB](https://www.mongodb.com/) (local or MongoDB Atlas)
- [Git](https://git-scm.com/)

### 📦 Installation

1. **Clone the repository and install dependencies**

```bash
git clone https://github.com/Oijanak/Blog-api.git
cd Blog-api
npm install
```

2. **Environment Configuration**

   The `.env` file is already included in this repository.

   - To connect to your own MongoDB instance, update the `MONGO_URL` variable in the `.env` file.
   - The default port is 5000 but you can add `PORT` variable in the `.env` file for custom port.

   ```env
   MONGO_URL=mongodb://localhost:27017/taskmanager
   PORT=
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRES_IN=1h
   ```

3. **Start the server**
   - Run the following command to start the server
   ```bash
   npm start
   ```
   The server will run at `http://localhost:<PORT>`, where `<PORT>` is the value defined in your `.env` file (default is `5000`).

## 🚀 Deployed API

You can access the deployed version of this API at:

🔗 [`vercel`](https://task-manager-api-bay-theta.vercel.app/api/v1/tasks)

## API Endpoints

### Authentication

| METHOD | Endpoints               | Description                                             |
| ------ | ----------------------- | ------------------------------------------------------- |
| POST   | `/api/v1/auth/register` | register a new user with `email`, `username`,`password` |
| POST   | `/api/v1/auth/login`    | Login existing user with `email` and `password`         |

#### Request and Response body

- Request

```json
POST /api/v1/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}

```

```json
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

```

- Response

```json
status 201
{
    "status": "success",
    "message": "User registered successfully",
}
```

```json
status 200
{
    "status": "success",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4OGYwMmFhYmFjY2ZmZDFkMWM5ZGUzOSIsImlhdCI6MTc1NDIxMjI0OCwiZXhwIjoxNzU0MjEyODQ4fQ._5ZYjcFYTHMrAp25bN-OJES4tqw7D4zPV2dAvxLkvPw",
    "user": {
        "id": "688f02aabaccffd1d1c9de39",
        "username": "johndoe",
        "email": "john@example.com"
    }
}
```

### Blogs

| METHOD | Endpoints           | Description                                        |
| ------ | ------------------- | -------------------------------------------------- |
| GET    | `/api/v1/blogs`     | Get all blogs (with filtering, searching, sorting) |
| GET    | `/api/v1/blogs/:id` | Get a single blog by ID                            |
| POST   | `/api/v1/blogs`     | Create a new blog (protected)                      |
| PUT    | `/api/v1/blogs/:id` | Update a blog (protected)                          |
| DELETE | `/api/v1/blogs/:id` | Delete a blog (protected)                          |

```json
POST /api/v1/blogs
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Getting Started with Node.js",
  "description": "A beginner's guide to Node.js",
  "content": "Node.js is a JavaScript runtime...",
  "tags": ["node", "javascript", "backend"]
}

Response
{
    "status": "sccess",
    "data": {
        "title": "Getting Started with Node.js",
        "description": "A beginner's guide to Node.js",
        "content": "Node.js is a JavaScript runtime...",
        "tags": [
            "node",
            "javascript",
            "backend"
        ],
        "author": "688f02aabaccffd1d1c9de39",
        "comments": [],
        "_id": "688f38b091f2b30ec343ceb2",
        "createdAt": "2025-08-03T10:23:44.484Z",
        "updatedAt": "2025-08-03T10:23:44.484Z",
        "__v": 0
    }
}

```

### Comment

| METHOD | Endpoints                  | Description                         |
| ------ | -------------------------- | ----------------------------------- |
| POST   | `/api/v1/comments/:blogId` | Add a comment to a blog (protected) |
| DELETE | `/api/v1/comments/:id`     | Delete a comment (protected)        |

```json
POST /api/v1/comments/:blogId
Authorization: Bearer <token>
Content-Type: application/json
{
    "content":"this is helpful"
}

Response
{
    "status": "success",
    "data": {
        "content": "this is helpful",
        "author": "688f02aabaccffd1d1c9de39",
        "blog": "688f38b091f2b30ec343ceb2",
        "_id": "688f3d50ef9c06c056fa0b4a",
        "createdAt": "2025-08-03T10:43:28.507Z",
        "__v": 0
    }
}
```

### Query Params for `GET /api/v1/blogs`

| Parameter | Type   | Required | Default | Description                                               |
| --------- | ------ | -------- | ------- | --------------------------------------------------------- |
| search    | String | No       | —       | Search term to match in title or description              |
| tags      | String | No       | —       | Comma-separated tags to filter (`?tags=tech,programming`) |
| sort      | String | No       | newest  | Sort option (`sort:oldest`,`sort:newest`)                 |

```json
GET /api/v1/blogs?tags=node,javascript&sort=oldest

Response
{
    "status": "success",
    "total": 2,
    "data": [
        {
            "_id": "688f38b091f2b30ec343ceb2",
            "title": "Getting Started with Node.js",
            "description": "A beginner's guide to Node.js",
            "content": "Node.js is a JavaScript runtime...",
            "tags": [
                "node",
                "javascript",
                "backend"
            ],
            "author": {
                "_id": "688f02aabaccffd1d1c9de39",
                "username": "janak"
            },
            "comments": [
                {
                    "_id": "688f3d50ef9c06c056fa0b4a",
                    "content": "this is helpful",
                    "author": "688f02aabaccffd1d1c9de39",
                    "blog": "688f38b091f2b30ec343ceb2",
                    "createdAt": "2025-08-03T10:43:28.507Z",
                    "__v": 0
                }
            ],
            "createdAt": "2025-08-03T10:23:44.484Z",
            "updatedAt": "2025-08-03T10:43:28.519Z",
            "__v": 1
        },
        {
            "_id": "688f299073320d5dbb0786f0",
            "title": "Learn Node.js",
            "description": "A beginner guide to Node.js",
            "content": "Node.js is a runtime environment for executing JavaScript on the server...",
            "tags": [
                "nodejs",
                "javascript",
                "backend"
            ],
            "author": {
                "_id": "688f02aabaccffd1d1c9de39",
                "username": "janak"
            },
            "comments": [],
            "createdAt": "2025-08-03T09:19:12.239Z",
            "updatedAt": "2025-08-03T09:19:12.239Z",
            "__v": 0
        },
    ]}
```

### Status Codes

| Status Code | Description             |
| :---------- | :---------------------- |
| 200         | `OK`                    |
| 201         | `CREATED`               |
| 400         | `BAD REQUEST`           |
| 404         | `NOT FOUND`             |
| 403         | `FORBIDDEN`             |
| 401         | `UNAUTHORIZED`          |
| 500         | `INTERNAL SERVER ERROR` |

### User Schema

| Field     | Type   | Required | Description                                           |
| --------- | ------ | -------- | ----------------------------------------------------- |
| username  | String | Yes      | Unique username (min 3 chars)                         |
| email     | String | Yes      | Unique email address                                  |
| password  | String | Yes      | Password minimum 8 characters                         |
| createdAt | Date   | No       | Timestamp of user creation (defaults to current time) |

### Blog Schema

| Field       | Type     | Required | Description                                           |
| ----------- | -------- | -------- | ----------------------------------------------------- |
| \_id        | ObjectId | Yes      | Unique identifier automatically generated by MongoDB  |
| title       | String   | Yes      | Blog title (max 100 chars)                            |
| description | String   | Yes      | Short description of the blog                         |
| content     | String   | No       | Main content of the blog                              |
| tags        | Array    | NO       | Array of tags for categorization                      |
| author      | ObjectId | Yes      | Reference to User who created the blog                |
| createdAt   | Date     | No       | Timestamp of blog creation (defaults to current time) |
| updatedAt   | Date     | No       | Timestamp of last update                              |
| comments    | Array    | No       | Array of comment references                           |

### Comment Schema

| Field     | Type     | Required | Description                                              |
| --------- | -------- | -------- | -------------------------------------------------------- |
| content   | String   | Yes      | Comment text (max 500 chars)                             |
| author    | ObjectId | Yes      | Reference to User who created the comment                |
| blog      | ObjectId | Yes      | Reference to Blog the comment belongs to                 |
| createdAt | Date     | No       | Timestamp of comment creation (defaults to current time) |

### Error Response

- for `status code 404 400 11000`

```
{
  "status": "failed",
  "message": string,
  "details": array //optional, for validation error only
}
```

- for `status code 500`

```json
{
  "status": "error",
  "message": "Server Error"
}
```
