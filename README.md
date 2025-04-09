# 📚 ZyneticBackend

ZyneticBackend is a RESTful API built using Express.js for managing user authentication and book-related operations. This project is designed for deployment on platforms like Railway and Render.

---

## 🚀 Deployment
Deployed on Railway: [zyneticbackend-production.up.railway.app](https://zyneticbackend-production.up.railway.app/)

---

## 🛠️ Setup Instructions

1. **Clone the repo**
```bash
git clone https://github.com/LalatenduR/zyneticbackend.git
cd zyneticbackend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create `.env` file**
```env
PORT=8000
MONGODB_URI=your_mongodb_connection_string
CORS_ORIGIN=http://localhost:3000
JWT_SECRET=your_jwt_secret
```

4. **Run the server locally**
```bash
npm run dev
```

---

## 📬 API Endpoints

### 🔐 Auth Routes

#### Register
- **POST** `/api/users/register`
- **Body:** `{ username, email, password }`
- **Response:** Success message

#### Login
- **POST** `/api/users/login`
- **Body:** `{ email, password }`
- **Response:** JWT token

#### Logout
- **POST** `/api/users/logout`
- **Response:** Logout success message

#### Get Current User
- **GET** `/api/users/current`
- **Headers:** Success message

---

### 📚 Book Routes

#### Create Book
- **POST** `/api/v1/books/create`
- **Headers:** `Authorization: Bearer <token>`
- **Body:** `{ title, author, category, price, publishedDate }`

#### Get All Books
- **GET** `/api/v1/books`
- **Query:** `?author=&category=&rating=&page=&limit=&sortBy=&sortOrder=`

#### Get Book by ID
- **GET** `/api/v1/books/:id`

#### Update Book
- **PUT** `/api/v1/books/:id`
- **Body:** Updated fields

#### Delete Book
- **DELETE** `/api/v1/books/:id`

#### Search Books
- **POST** `/api/v1/books/search`
- **Body:** `{ title }`

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


