import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { sendMessage, setMessages } from "../features/chatsSlice";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase";

import { RiPencilFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { IoPaperPlane, IoArrowBackSharp } from "react-icons/io5";
import Message from "./Message";

function Chats() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chats.messages);
  const currentUser = useSelector((state) => state.users.currentUser);
  const selectedUser = useSelector((state) => state.users.selectedUser);
  const chatData = useSelector((state) => state.chats.chat);
  const [text, setText] = useState("");

  const handleClick = () => {
    if (!text.trim()) return;

    dispatch(sendMessage({ chatId: chatData.id, senderId: currentUser.uid, message: text }));
    setText("");
  };

  useEffect(() => {
    if (!chatData?.id) return;

    const q = query(collection(db, "chats", chatData.id, "message"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      dispatch(setMessages(messages));
    });

    return () => unsubscribe();
  }, [chatData?.id, dispatch]);

  return (
    <div className="flex-1 flex flex-col border rounded-lg bg-zinc-100">

      {/* Chat Header */}
      <div className="w-full h-[4.5rem] flex items-center gap-3 px-5 border rounded-t-lg border-gray-200 bg-white shadow-sm">
        <button className="block md:hidden text-xl" onClick={() => navigate("/")}>
          <IoArrowBackSharp />
        </button>

        <img src={selectedUser?.photoURL} alt="avatar" className="w-10 h-10 rounded-full object-cover bg-gray-200" />

        <div className="flex flex-col">
          <span className="text-lg font-medium text-gray-700">
            {selectedUser?.displayName}
          </span>
          {chatData?.lastMessage && (
            <span className="w-60 text-xs text-gray-400 truncate">
              Last msg: {chatData.lastMessage.message}
            </span>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="w-full flex-1 overflow-y-auto p-5 flex flex-col space-y-3 custom-scroll">
        {messages.length === 0 ? (
          <p className="text-gray-400 text-sm text-center">No messages yet…</p>
        ) : (
          messages.map((msg, index) => (
            <Message
              key={index}
              msg={msg}
              currentUser={currentUser}
              chatData={chatData}
            />
          ))
        )}
      </div>


      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleClick();
        }}
        className="sticky bottom-0 rounded-b-lg w-full bg-white px-5 py-4 flex items-center"
      >
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 bg-gray-100 text-gray-800 px-4 py-2 rounded-lg outline-none placeholder-gray-400"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onFocus={() => window.scrollTo(0, document.body.scrollHeight)}
        />
        <button
          className="ml-3 bg-orange-500 hover:bg-orange-600 p-3 md:px-5 md:py-2 rounded-full text-sm text-white"
          type="submit"
        // onClick={handleClick}
        >
          <span className="hidden md:block">Send message</span>
          <IoPaperPlane className="block md:hidden text-lg" />
        </button>
      </form>

    </div>
  );
}

export default React.memo(Chats);
