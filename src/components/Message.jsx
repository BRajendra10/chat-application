import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";

import { RiMore2Fill, RiPencilFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { deleteMessage, updateMessage } from "../features/chatsSlice";

function Message({ msg, currentUser, chatData }) {
  const dispatch = useDispatch();
  const menuRef = useRef(null);
  const [showMenu, setShowMenu] = useState(false);
  const isOwnMessage = msg.senderId === currentUser.uid;

  const handleEdit = () => {
    const newText = prompt("Edit your message:", msg.message);

    if (newText && newText.trim()) {
      dispatch(updateMessage({ chatId: chatData.id, messageId: msg.id, newText }));
    }
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  return (
    <div
      className={`relative flex flex-col ${isOwnMessage ? "items-end" : "items-start"
        }`}
    >
      {/* Message Bubble */}
      <div
        className={`max-w-[25rem] px-4 py-2 flex items-start gap-2 rounded-2xl shadow break-words ${isOwnMessage
          ? "bg-orange-500 text-white"
          : "bg-gray-200 text-gray-800"
          }`}
      >
        <span className="flex-1">{msg.message}</span>

        {/* Options button */}
        {isOwnMessage && (
          <button
            onClick={() => setShowMenu((prev) => !prev)}
            className="text-lg text-white/80 hover:text-white shrink-0"
          >
            <RiMore2Fill />
          </button>
        )}
      </div>

      {/* Dropdown menu */}
      {showMenu && isOwnMessage && (
        <div
          ref={menuRef}
          className="absolute top-full mt-1 right-0 w-24 bg-white border rounded-md shadow-md z-10"
        >
          <button
            onClick={() => handleEdit()}
            className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 text-gray-700"
          >
            <RiPencilFill /> Edit
          </button>

          <button
            onClick={() => {
              if (window.confirm("Delete this message?")) {
                dispatch(deleteMessage({ chatId: chatData.id, messageId: msg.id }));
              }
            }}
            className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 text-red-600"
          >
            <MdDelete /> Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default React.memo(Message);