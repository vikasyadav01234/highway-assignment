
# 📝 Full Stack Note-Taking App

A full-stack note-taking web application built with **Next.js 14 (App Router)**, **TypeScript**, **MongoDB**, and **JWT Authentication**, featuring **email + OTP login**, optional **Google login**, and a clean, mobile-friendly UI.

> 🔗 [Live Demo](https://highway-assignment-kuel.vercel.app/)  
> 🖼️ [Design Assets & UI Reference](https://hwdlte.com/RvqdLn)

---

## 🚀 Features

- ✅ Sign up with email + OTP verification
- ✅ Login with email or Google
- ✅ JWT-based authentication
- ✅ Create and delete notes
- ✅ Mobile-first responsive UI
- ✅ Secure API routes
- ✅ Proper validation and error messages
- ✅ Full deployment-ready setup

---

## 🧑‍💻 Tech Stack

| Layer     | Tech                                        |
|-----------|---------------------------------------------|
| Frontend  | Next.js 14 (App Router), TypeScript, Tailwind CSS |
| Backend   | Next.js API Routes (Edge/Node.js), TypeScript     |
| Auth      | JWT (JSON Web Tokens)                            |
| Database  | MongoDB + Mongoose                               |
| Tools     | Axios, ESLint, Prettier, Git                     |

---

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/vikasyadav01234/highway-assignment.git
cd highway-assignment
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root of your project:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NEXT_PUBLIC_BASE_URL=http://localhost:3000

```

### 4. Run the Development Server

```bash
npm run dev
```

App will be available at: [http://localhost:3000](http://localhost:3000)

---

## 📦 Build & Deployment

To build the app for production:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

For deployment, you can use:

- **Vercel** (Recommended)
- Netlify (custom setup for Next.js)
- Railway / Render / Cyclic

---

## 🧪 API Endpoints

| Method | Endpoint                      | Description         |
|--------|-------------------------------|---------------------|
| POST   | `/api/users/sendotp`          | Send OTP for signup |
| POST   | `/api/users/signup`           | Verify OTP & signup |
| POST   | `/api/users/login`            | Login with email    |
| GET    | `/api/users/notes/list`       | Get all notes       |
| POST   | `/api/users/notes/create`     | Create a new note   |
| DELETE | `/api/users/notes/delete/:id` | Delete a note       |

> All protected routes require JWT in the `Authorization` header:  
> `Authorization: Bearer <token>`

---

---

## ✅ Completed Tasks

- [☑️] Signup with OTP
- [☑️] Error handling and validation
- [☑️] Dashboard with user info
- [☑️] Create & delete notes (JWT-protected)
- [☑️] Responsive mobile-first UI
- [☑️] Deployment ready
- [☑️] README with instructions

---

## 👤 About Me

**Name:** Vikas Yadav  
**Email:** [yadav2911vikas@gmail.com](mailto:yadav2911vikas@gmail.com)  
**GitHub:** [github.com/vikasyadav01234](https://github.com/vikasyadav01234)

---

## 📝 License

This project is open-source and free to use under the [MIT License](LICENSE).
