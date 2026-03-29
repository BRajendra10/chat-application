import { createSlice, createAsyncThunk, isPending, isRejected } from "@reduxjs/toolkit";
import { getDocs, setDoc, collection, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export const fetchUsers = createAsyncThunk(
    "users/fetchUsers",
    async (_, { rejectWithValue }) => {
        try {
            const querySnapshot = await getDocs(collection(db, "users"));
            return querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const addUser = createAsyncThunk(
    "users/addUser",
    async ({ uid, displayName, email, photoURL }, { rejectWithValue }) => {
        try {
            await setDoc(doc(db, "users", uid), {
                uid,
                displayName,
                email,
                photoURL,
                online: true,
                createdAt: serverTimestamp()
            });

            // return the user object so Redux can update state immediately
            return { uid, displayName, email, photoURL, online: true };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    users: [],
    currentUser: {},
    selectedUser: {},

    status: "pending",
    error: null
}

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        },

        selectUser: (state, action) => {
            state.selectedUser = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // fetching users
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = "success";
                state.users = action.payload;
            })

            // adding user
            .addCase(addUser.fulfilled, (state, action) => {
                state.status = "success";
                state.users.push(action.payload);
            })

            // pending and rejected handling(removed boilerplate)
            .addMatcher(isPending(fetchUsers, addUser), (state) => {
                state.status = "pending";
            })
            .addMatcher(isRejected(fetchUsers, addUser), (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
    },
})

export default userSlice.reducer;
export const { setCurrentUser, selectUser } = userSlice.actions;