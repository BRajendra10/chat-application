import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, Navigate } from 'react-router-dom';

import Signin from './screens/Signin.jsx';
import Signup from './screens/Signup.jsx';
import Home from './screens/Home';
import Sidebar from './components/Sidebar';
// import ChatsContainer from './components/ChatsContainer';

import { setCurrentUser } from './features/usersSlice';

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

import './App.css'
import Chats from './components/Chats.jsx';

function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.users.currentUser);
  const selectedUser = useSelector((state) => state.users.selectedUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      dispatch(setCurrentUser(currentUser))
    });
    return () => unsubscribe();
  }, [dispatch, currentUser]);

  return (
    <Routes>
      <Route path="/" element={<Home />} >
        <Route index element={<Sidebar />} />
        <Route path="/chats" element={!selectedUser.uid ?
          (<Navigate to="/" replace />)
          : (<Chats />)} />
      </Route>
      <Route path="/login" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<>Page not found</>} />
    </Routes>
  );
}

export default App;
