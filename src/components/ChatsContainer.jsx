import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Chats from "./Chats";
import { createChat, fetchSingleChat, setMessages } from "../features/chatsSlice";

export default function ChatContainer() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.users.currentUser);
  const selectedUser = useSelector((state) => state.users.selectedUser);
  const chat = useSelector((state) => state.chats.chat)

  useEffect(() => {
    ; (async () => {
      dispatch(setMessages([]))
      let chat = await dispatch(
        fetchSingleChat({
          currentUserUid: currentUser.uid,
          selectedUserUid: selectedUser.uid,
        })
      ).unwrap();

      if (!chat) {
        chat = await dispatch(createChat({ type: "direct", members: [currentUser.uid, selectedUser.uid] })).unwarp();
      }

    })()
  }, [dispatch, currentUser, selectedUser])

  // ✅ Decide what to render:
  if (!selectedUser?.uid || !chat) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center border rounded-lg bg-zinc-100">
        <span>Select chat to start chatting</span>
      </div>
    );
  }

  return (
    <Chats />
  );
}
