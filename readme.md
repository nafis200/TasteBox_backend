# 🍱 TasteBox Backend
## 🚀 Project Overview
TasteBox backend is a Node.js + Express.js API server supporting a personalized meal planning and delivery platform. It provides role-based authentication, product & order management, secure payment integration, and robust API endpoints to serve the frontend.

# Live Link URL

- [LiveDemo](https://meal-shop-frontend.vercel.app/)

## 🔑 Key Features
  -    Role-based authentication: JWT access & refresh tokens, bcrypt password hashing

  -    User & Admin dashboards: CRUD operations on users, products, and orders

  -    Secure Payment Integration: ShurjoPay sandbox gateway support

  -    Robust API: Pagination, filtering, validation, error handling, and middleware protection

  -    Environment-aware configuration: Separate dev/prod modes via environment variables

# ⚡ Tech Stack

# Frontend: 

- **React.js** 
- **Redux** 
- **Ant Design**
- **Sonner (for notifications)**.

# Backend: 
- **Node.js**, 
- **Express.js**, 
- **MongoDB**, 
- **Mongoose**.
- **bcrypt** for password hashing
- **Nodemailer** for email notifications
- **Authentication**: JWT for secure user sessions.

# Folder sturcture



```
src/
├── app.ts                 # Express app setup and middleware
├── server.ts              # Server bootstrap and listen
├── app/
│   ├── builder/           # Helpers for building requests/responses
│   ├── config/            # Configuration files (env, constants)
│   ├── errors/            # Custom error classes & handlers
│   ├── interface/         # TypeScript interfaces & types
│   ├── middleware/        # Express middleware (auth, validation, etc.)
│   ├── modules/           # Feature modules (user, product, order, payment)
│   ├── routes/            # Express route definitions
│   └── utils/             # Utility functions/helpers
├── .env                   # Environment variables (not committed)
├── .gitignore             # Git ignore rules
├── package.json           # NPM dependencies and scripts

 ```


# Project Setup

## ⚙️ Environment Variables



Create a `.env` file in the root directory with the following content:

```bash

NODE_ENV=development
PORT=5000

DATABASE_URL=

BCRYPT_SALT_ROUNDS=

JWT_ACCESS_SECRET=d76563dd6c7a0a4246beabb6875e8cbc31beaf9fb447dcdb0183ea82da994e
JWT_REFRESH_SECRET=d5b7ef6638570aa71f037d3b79e778f5714a70bafd68ec22f9d25ed89de018a41575159680944e3e582241172289f8633b54c2a7a28b48d9ddcd097e0406a78e
JWT_ACCESS_EXPIRES_IN=1d
JWT_REFRESH_EXPIRES_IN=365d

SP_ENDPOINT=https://sandbox.shurjopayment.com
SP_USERNAME=
SP_PASSWORD=
SP_PREFIX=SP
SP_RETURN_URL=http://localhost:3000/

```



## 🛠 Installation & Setup
1. Clone the repo

```bash 
git clone https://github.com/nafis200/TasteBox_backend
cd TasteBox_backend
```

```bash
2. Install dependencies
npm install
```

```bash
3. Create .env file

```
4.  Run in development mode
This will start the server with auto-reloading on file changes:
```bash
npm run start:dev
```


