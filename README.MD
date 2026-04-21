# 💰 Spendora – MERN Expense Tracker

Spendora is a full-stack MERN application that helps users **track income, manage expenses, and visualize financial insights** through interactive charts and a clean dashboard.

It includes secure authentication, Excel export, avatar uploads, and responsive UI.

---

## ✨ Features

- 🔐 JWT based authentication  
- 📊 Smart dashboard with analytics  
- 💵 Add / edit / delete income  
- 💸 Add / edit / delete expenses  
- 📈 Pie, Line & Bar charts  
- 🧑 Profile avatar upload  
- 📤 Export transactions to Excel  
- 📱 Fully responsive design  

---

## 🔧 Tech Stack

### Frontend
- React  
- Axios  
- Recharts  

### Backend
- Node.js  
- Express  
- MongoDB  
- Mongoose  

### Authentication
- JWT (JSON Web Token)

### File Handling
- Multer  

### Other Tools
- XLSX  
- dotenv  
- CORS  

---

## 🗂 Project Structure

### 📁 Frontend
```
frontend/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── pages/
│   ├── utils/
│   ├── App.jsx
│   └── index.css
```

### 📁 Backend
```
server/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── uploads/
├── server.js
```

---
### 3️⃣ Environment Variables

Create `.env` inside **server/**

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```
Create `.env` inside **client/**
```
VITE_BASE_URL=http://localhost:5000
```
---

## 📊 Dashboard Capabilities

- Income vs Expense overview  
- Last 30 days spending  
- Recent transactions  
- Category distribution  
- Visual analytics  

---

## 📈 Future Improvements

- Budget planning  
- Recurring transactions  
- Multi-user collaboration  
- Dark / light theme  
- Mobile app version  

---
## 👨‍💻 Developed By
**Sanchay Kumar Singh**

---