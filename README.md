# Proyek Manajemen Pesanan

## URL Deployment
Aplikasi ini dapat diakses di [URL_DEPLOY](URL_DEPLOY).

## Daftar Endpoint

### 1. **Register User**
- **URL**: `/auth/register`
- **Method**: `POST`
- **Description**: Mendaftarkan pengguna baru.
- **Request Body**:
  ```json
  {
    "fullName": "string",
    "username": "string",
    "email": "string",
    "password": "string",
    "roles": "string"
  }

### 2. Login User
- **URL**: `/auth/login`
- **Method**: `POST`
- **Description**: Login untuk mendapatkan JWT.
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }

### 3. Update User
- **URL**: `/auth/profile`
- **Method**: `PUT`
- **Description**: Memperbarui profil pengguna yang sudah login.
- **Request Body**:
  ```json
  {
    "fullName": "string",
    "username": "string",
    "email": "string",
    "password": "string",
    "roles": "string"
  }

### Produk
- **GET** `/products`
  - Mendapatkan daftar semua produk.
- **POST** `/products`
  - Membuat produk baru.
- **GET** `/products/:id`
  - Mendapatkan detail produk berdasarkan ID.
- **PUT** `/products/:id`
  - Memperbarui produk berdasarkan ID.
- **DELETE** `/products/:id`
  - Menghapus produk berdasarkan ID.

### Kategori
- **GET** `/categories`
  - Mendapatkan daftar semua kategori.
- **POST** `/categories`
  - Membuat kategori baru.
- **GET** `/categories/:id`
  - Mendapatkan detail kategori berdasarkan ID.
- **PUT** `/categories/:id`
  - Memperbarui kategori berdasarkan ID.
- **DELETE** `/categories/:id`
  - Menghapus kategori berdasarkan ID.

### Autentikasi
- **POST** `/auth/login`
  - Login pengguna. 
  - Request body:
    ```json
    {
      "email": "user@example.com",
      "password": "yourpassword"
    }
    ```
- **POST** `/auth/register`
  - Mendaftar pengguna baru.
  - Request body:
    ```json
    {
      "fullName": "John Doe",
      "username": "johndoe",
      "email": "user@example.com",
      "password": "yourpassword",
      "roles": "user" 
    }
    ```
- **GET** `/auth/me`
  - Mendapatkan detail pengguna saat ini. 
  - Autentikasi diperlukan (hanya untuk admin).
- **PUT** `/auth/profile`
  - Memperbarui profil pengguna saat ini. 
  - Autentikasi diperlukan.

### Pesanan
- **GET** `/orders`
  - Menampilkan riwayat order untuk pengguna yang sedang login.
  - Autentikasi diperlukan.
- **POST** `/orders`
  - Membuat order baru.
  - Autentikasi diperlukan.

## Teknologi
- Node.js
- Express.js
- MongoDB
- JSON Web Token (JWT)
- Yup (Validasi)
