# 💬 Velixa – Real-Time Chat Application

🚀 **Velixa** is a modern, real-time chat application built with **React + Firebase (Auth & Firestore)**, designed with a scalable architecture and clean state management using **Redux Toolkit**.

It supports **private chats, group chats, real-time messaging**, and **advanced message control**, powered by Firestore’s `onSnapshot` for instant updates.


[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Visit_App-blue?style=for-the-badge)](https://velixa.netlify.app/)

---

## ✨ Features

### 🔐 Authentication & User Management

* Email & Password authentication
* Google OAuth (**Continue with Google**)
* Persistent login using Firebase `onAuthStateChanged`
* User profile with avatar update functionality
* Automatic user sync with Firestore

---

### 💬 Chat System

* 🧑‍🤝‍🧑 **One-to-One Chat**
* 👥 **Group Chat Creation**
* ⚡ **Real-Time Messaging** using Firestore `onSnapshot`
* 🔄 Automatic chat creation if conversation doesn’t exist
* 🧠 Smart `chatKey` generation for unique conversations

---

### 📝 Message Features

* Send messages instantly
* ✏️ Edit messages
* 🗑️ Delete messages
* 📌 Last message preview in chat header
* 🧾 Sorted message rendering (based on timestamps)

---

### 🎯 State Management (Redux Toolkit)

* Async logic handled using `createAsyncThunk`
* Centralized state for:

  * Users
  * Chats
  * Messages
* Optimized reducers using `addMatcher` for cleaner async handling

---

### 🎨 UI / UX

* Clean, modern UI with Tailwind CSS
* Responsive design (mobile + desktop)
* Sidebar-based navigation
* Modal-based interactions (Profile, Group Creation)
* Smooth UX with conditional rendering and route protection

---

## 🧠 Architecture Highlights (What Makes This Strong)

### 🔄 Real-Time Data Flow

* Firestore `onSnapshot` ensures instant UI updates
* No manual refresh required

---

### 🧩 Smart Chat Handling

* Uses a **deterministic `chatKey`**

  ```js
  members.sort().join("_")
  ```
* Prevents duplicate chats
* Automatically creates chat if not found

---

### 🔐 Auth Persistence

* Global auth state synced using:

  ```js
  onAuthStateChanged()
  ```
* Ensures user stays logged in across refresh

---

### ⚡ Optimized State Updates

* Uses Redux Toolkit matchers:

  * `isPending`
  * `isRejected`
* Reduces boilerplate and improves scalability

---

## 🛠️ Tech Stack

### Frontend

* React
* Tailwind CSS
* Redux Toolkit
* React Router

### Backend / Services

* Firebase Authentication
* Firebase Firestore (Real-time DB)

---

## ⚡ Installation & Setup

```bash
# Clone the repository
git clone https://github.com/BRajendra10/chat-app.git

# Navigate into the folder
cd chat-app

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## 🏃‍♂️ Usage

1. Open the app
   👉 https://velixa.netlify.app/

2. Sign in using:

   * Email & Password
   * Google OAuth

3. Search users and start chatting

4. Create group chats and add members

5. Send, edit, or delete messages in real-time

---

## 🚀 Future Improvements

* 🔔 Real-time notifications system
* 📷 Image & file sharing
* 🟢 Online/offline presence tracking
* 💬 Typing indicators
* 🌙 Dark mode support

---

## 📌 Key Learning Outcomes

* Built scalable async flows using Redux Toolkit
* Implemented real-time systems with Firestore
* Designed clean architecture for chat systems
* Managed authentication and global state effectively
* Improved UX with modern UI patterns

---

## 👨‍💻 Author

**Rajendra Behera**

* GitHub: https://github.com/BRajendra10
* LinkedIn: https://www.linkedin.com/in/behera-rajendra/

---
