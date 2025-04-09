# 📚 ZyneticBackend

ZyneticBackend is a RESTful API built using Express.js for managing user authentication and book-related operations. This project is designed for deployment on platforms like Railway and Render.

---

## 🚀 Deployment
Deployed on Railway: [https://your-subdomain.up.railway.app](https://your-subdomain.up.railway.app)

---

## 🛠️ Setup Instructions

1. **Clone the repo**
```bash
git clone https://github.com/yourusername/zyneticbackend.git
cd zyneticbackend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create `.env` file**
```env
PORT=8000
MONGODB_URI=your-mongodb-uri
CORS_ORIGIN=*
ACCESS_JWT_SECRET=your-access-jwt-secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_JWT_SECRET=your-refresh-jwt-secret
REFRESH_TOKEN_EXPIRY=7d
```

4. **Run the server locally**
```bash
npm run dev
```

---

## 📬 API Endpoints and Sample Requests

### 🔐 Auth Routes

#### Register
- **POST** `/api/auth/register`
- **Body:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Login
- **POST** `/api/auth/login`
- **Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Logout
- **POST** `/api/auth/logout`
- **Headers:** `Authorization: Bearer <token>`

#### Get Current User
- **GET** `/api/auth/current`
- **Headers:** `Authorization: Bearer <token>`

---

### 📚 Book Routes

#### Create Book
- **POST** `/api/v1/books/create`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
```json
{
  "title": "Node.js in Action",
  "author": "Mike Cantelon",
  "category": "Programming",
  "price": 29.99,
  "publishedDate": "2021-08-01"
}
```

#### Get All Books
- **GET** `/api/v1/books`
- **Query:**
```
?author=mike&category=programming&rating=4&page=1&limit=10&sortBy=price&sortOrder=asc
```

#### Get Book by ID
- **GET** `/api/v1/books/:id`

#### Update Book
- **PUT** `/api/v1/books/:id`
- **Body:**
```json
{
  "price": 24.99
}
```

#### Delete Book
- **DELETE** `/api/v1/books/:id`

#### Search Books
- **POST** `/api/v1/books/search`
- **Body:**
```json
{
  "title": "Node"
}
```

---

## ⚙️ Assumptions / Enhancements

- All authenticated routes expect a valid JWT token in the `Authorization` header.
- User sessions are managed via JWT and cookies.
- Book search is performed via regex on title.
- Supports pagination and sorting for `getAllBooks`.
- Error handling is centralized using custom middleware.

---

## 🧑‍💻 Contributors
- Lalatendu Rajguru

## 📜 License
MIT License
