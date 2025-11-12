import { createContext, useState } from "react";

export const UserContext = createContext();

export function UserContextProvider({ children }) {
    const [query, setQuery] = useState("");

    return (
        <UserContext.Provider value={{ query, setQuery }}>
            {children}
        </UserContext.Provider>
    )
}