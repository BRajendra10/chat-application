import { createSlice, createAsyncThunk, isPending, isRejected } from "@reduxjs/toolkit";
import { addDoc, getDocs, deleteDoc, updateDoc, collection, query, where, serverTimestamp, doc } from "firebase/firestore";
import { db } from "../firebase";

export const createChat = createAsyncThunk(
  "chats/createChat",
  async (
    { members, type, groupName = null, groupPhotoURL = null },
    { rejectWithValue }
  ) => {
    try {
      const chatKey = members.slice().sort().join("_");
      // 1️⃣ Create new chat doc
      const chatDoc = await addDoc(collection(db, "chats"), {
        type,
        chatKey,
        members, // now array of user UIDs (including current user)
        groupName, // null if direct chat
        groupPhotoURL, // null if no group image
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        lastMessage: null,
      });

      // 2️⃣ Return new chat data (no messages yet)
      return {
        id: chatDoc.id,
        groupName,
        groupPhotoURL,
        members,
        chatKey,
        createdAt: serverTimestamp(), // fallback for UI
        updatedAt: serverTimestamp(),
        lastMessage: null,
        messages: [],
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchSingleChat = createAsyncThunk(
  "chats/fetchSingleChat",
  async ({ currentUserUid, selectedUserUid }, { rejectWithValue }) => {
    try {
      const chatKey = [currentUserUid, selectedUserUid]
        .sort()
        .join("_");

      const q = query(
        collection(db, "chats"),
        where("chatKey", "==", chatKey)
      );

      const snapshot = await getDocs(q);

      // ✅ If chat exists
      if (!snapshot.empty) {
        const docSnap = snapshot.docs[0];
        return {
          id: docSnap.id,
          ...docSnap.data(),
        };
      }

      // ❗ If chat does NOT exist
      return null;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// export const fetchMessages = createAsyncThunk(
//   "chats/fetchMessages",
//   async (chatId, { rejectWithValue }) => {
//     try {
//       const messagesRef = collection(db, "chats", chatId, "message");

//       const q = query(
//         messagesRef,
//         orderBy("createdAt", "asc")
//       );

//       const snapshot = await getDocs(q);

//       const messages = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));

//       return { chatId, messages };
//     } catch (err) {
//       return rejectWithValue(err.message);
//     }
//   }
// );

export const sendMessage = createAsyncThunk(
  "chats/sendMessage",
  async ({ chatId, senderId, message }, { rejectWithValue }) => {
    try {
      const msgData = {
        senderId,
        message,
        createdAt: serverTimestamp(),
      };

      // add message
      const msgRef = await addDoc(collection(db, "chats", chatId, "message"), msgData);

      // update chat meta
      await updateDoc(doc(db, "chats", chatId), {
        lastMessage: msgData,
        updatedAt: serverTimestamp(),
      });

      return {
        chatId,
        message: { id: msgRef.id, ...msgData },
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteMessage = createAsyncThunk(
  "chats/deleteMessage",
  async ({ chatId, messageId }, { rejectWithValue }) => {
    try {
      const msgRef = doc(db, "chats", chatId, "message", messageId);

      await deleteDoc(msgRef);

      return messageId;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateMessage = createAsyncThunk(
  "chats/updateMessage",
  async ({ chatId, messageId, newText }, { rejectWithValue }) => {
    try {
      const msgRef = doc(db, "chats", chatId, "message", messageId);

      await updateDoc(msgRef, {
        message: newText,
        editedAt: serverTimestamp()
      });

      return true;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  chats: [],
  chat: {},
  messages: [],
  status: "pending",
  error: null
}

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setMessages: (state, action) => {
      const sortedMessages = [...action.payload].sort((a, b) => {
        const aTime = a.createdAt?.seconds || 0;
        const bTime = b.createdAt?.seconds || 0;
        return aTime - bTime;
      });

      state.messages = sortedMessages;
    }
  },
  extraReducers: (builder) => {
    builder
      // fetch user chats
      .addCase(fetchSingleChat.fulfilled, (state, action) => {
        state.status = "success";
        state.chat = action.payload;
      })

      // .addCase(fetchMessages.fulfilled, (state, action) => {
      //   const { messages } = action.payload;
      //   state.messages = messages
      //   state.status = "success";
      // })

      // send message
      .addCase(sendMessage.fulfilled, (state, action) => {
        const { message } = action.payload;
        state.messages.push(message);
        state.status = "success";
      })

      // create new chat(start new chat)
      .addCase(createChat.fulfilled, (state, action) => {
        state.status = "success";
        state.chat = action.payload;
      })

      .addCase(updateMessage.fulfilled, (state) => {
        state.state = "success"
      })

      .addCase(deleteMessage.fulfilled, (state, action) => {
        const messageId = action.payload;
        const messages = state.messages.filter((message) => message.id !== messageId);

        state.messages = messages;
        state.status = "success";

      })

      // pending and rejected handling(removed boilerplate)
      .addMatcher(isPending(fetchSingleChat, sendMessage, createChat, updateMessage, deleteMessage), (state) => {
        state.status = "pending";
      })
      .addMatcher(isRejected(fetchSingleChat, sendMessage, createChat, updateMessage, deleteMessage), (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
  }
})

export default chatsSlice.reducer;
export const { setMessages } = chatsSlice.actions;