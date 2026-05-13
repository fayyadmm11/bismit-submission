# BEM Connect

Platform media sosial khusus untuk civitas BEM, dibuat sebagai bagian dari submission Bismit.

## Tech Stack

- **Frontend**: React + React Router + Vite + Tailwind CSS
- **Backend**: ExpressJS (Node.js)
- **Database**: PostgreSQL (via Docker)
- **Package Manager**: PNPM (Workspaces)
- **Documentation**: Swagger

## Prerequisites

- Node.js >= 18
- PNPM >= 9
- Docker Desktop

## How to Run Locally

### 1. Clone repository

```bash
git clone <repo-url>
cd bismit-submission
```

### 2. Install semua dependencies

```bash
pnpm install
```

### 3. Setup environment variables

Perintah ini untuk PowerShell (Windows). Jika Anda menggunakan Linux/macOS, ganti `Copy-Item` dengan `cp`.

```powershell
# Windows (PowerShell)
Copy-Item .env.example .env
Copy-Item backend/.env.example backend/.env
Copy-Item frontend/.env.example frontend/.env

# Linux / macOS
cp .env.example .env
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

Setelah itu, pastikan Anda mengisi nilai `JWT_SECRET` di `backend/.env` dan `VITE_API_URL` di `frontend/.env`.

### 4. Jalankan database PostgreSQL

```bash
docker compose up -d
```

### 5. Jalankan frontend & backend sekaligus

```bash
pnpm dev
```

Aplikasi akan berjalan di:

- **Frontend**: `http://localhost:5173`
- **Backend**: `http://localhost:5000`

## API Documentation

Setelah backend berjalan, dokumentasi API interaktif (Swagger) tersedia di:
**[http://localhost:5000/api/doc](http://localhost:5000/api/doc)**

Gunakan halaman ini untuk melihat semua endpoint yang tersedia, format JSON yang dibutuhkan, dan untuk menguji API secara langsung dari browser.

## Environment Variables

### Root / Docker

| Variable    | Default     | Description         |
| ----------- | ----------- | ------------------- |
| DB_NAME     | bem_connect | Nama database       |
| DB_USER     | postgres    | Username PostgreSQL |
| DB_PASSWORD | postgres    | Password PostgreSQL |

### Backend

| Variable   | Description                            |
| ---------- | -------------------------------------- |
| PORT       | Port backend (default 5000)            |
| JWT_SECRET | **Wajib diisi.** Secret key untuk JWT. |

### Frontend

| Variable     | Description                                                      |
| ------------ | ---------------------------------------------------------------- |
| VITE_API_URL | **Wajib diisi.** URL backend API (e.g., `http://localhost:5000`) |
