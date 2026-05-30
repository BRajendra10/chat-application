# Velixa — Real-Time Chat Application

Velixa is a modern **real-time chat application** built with React, Redux Toolkit, and Firebase. It allows users to authenticate using Email/Password or Google OAuth, start direct conversations, create group chats, and exchange messages with real-time updates powered by Firestore.

The project demonstrates scalable frontend architecture, centralized state management with Redux Toolkit, Firebase Authentication, Firestore real-time listeners, and responsive UI development using Tailwind CSS.

## ✅ Tech Stack

* **Frontend:** React 19
* **State Management:** Redux Toolkit
* **Backend as a Service:** Firebase
* **Authentication:** Firebase Auth (Email/Password + Google OAuth)
* **Database:** Cloud Firestore
* **Routing:** React Router DOM
* **Forms & Validation:** Formik + Yup
* **Styling:** Tailwind CSS
* **Build Tool:** Vite

## 📁 Folder Structure

```text
src/
├── components/       # Reusable UI components
├── screens/          # Route-level pages
├── features/         # Redux slices and async thunks
├── context/          # Shared React context
├── store/            # Redux store configuration
├── firebase.js       # Firebase setup
├── App.jsx           # Routing & auth state sync
└── main.jsx          # Application bootstrap
```

---

## 💬 Core Features

### Authentication

* Email & Password login/signup
* Google OAuth authentication
* Persistent user sessions
* Profile avatar management
* Secure logout functionality

### Real-Time Messaging

* Instant message delivery using Firestore listeners
* Direct one-to-one conversations
* Group chat creation
* Message editing
* Message deletion
* Automatic chat synchronization

### User Management

* User discovery and search
* Profile management
* Real-time user data updates

### State Management

* Redux Toolkit slices
* Async Firestore operations via thunks
* Centralized application state
* Predictable data flow

---

## ⚙️ Key Engineering Decisions

### Deterministic Chat Identity

Direct conversations use a shared `chatKey` generated from sorted user IDs.

This ensures:

* No duplicate conversations
* Simple chat lookup
* Consistent conversation references

### Real-Time Architecture

Firestore `onSnapshot` listeners provide instant updates without polling, enabling a smooth chat experience.

### Redux + Firebase Separation

UI components focus on presentation while Firestore operations are centralized in Redux async thunks, improving maintainability and scalability.

---

## 🔥 Firebase Integration

### Authentication

* Email/Password authentication
* Google OAuth login
* Session persistence with `onAuthStateChanged`

### Firestore

Collections used:

```text
users/
chats/
└── messages/
```

Implemented operations:

* Create users
* Create chats
* Send messages
* Edit messages
* Delete messages
* Real-time message subscriptions

---

## ⚙️ Environment Variables

Create a `.env` file in the project root.

```env
VITE_API_KEY=
VITE_AUTH_DOMAIN=
VITE_PROJECT_ID=
VITE_STORAGE_BUCKET=
VITE_MESSAGING_SENDER_ID=
VITE_APP_ID=
VITE_MEASUREMENT_ID=
```

---

## 🧰 Development Commands

### Install

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

### Build Production Version

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

## 🚀 Future Improvements

* Typing indicators
* Online/offline presence tracking
* Message reactions
* Read receipts
* File and image sharing
* Push notifications
* Message pagination
* Enhanced Firebase security rules

---

## 🛠️ Skills Demonstrated

* React Application Architecture
* Redux Toolkit State Management
* Firebase Authentication
* Firestore Real-Time Database
* Async Data Handling
* Responsive UI Development
* Form Validation
* Authentication Flows
* Component-Based Design
* Modern JavaScript (ES6+)

---

## ❤️ Connect

| Platform | Link                                                    |
| -------- | ------------------------------------------------------- |
| Email    | [your-email@example.com](mailto:your-email@example.com) |
| LinkedIn | your-linkedin                                           |
| GitHub   | your-github                                             |

---

⭐ If you found this project useful, consider giving it a star.
