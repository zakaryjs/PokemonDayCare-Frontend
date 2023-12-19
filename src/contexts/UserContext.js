import { createContext, useState } from "react";


export const UserContext = createContext({})

export default function UserProvider ({children}) {

    const [user, setUser] = useState(null)
    const [id, setId] = useState(null)

    return (
        <UserContext.Provider value={
            {
                user: user,
                setUser: setUser,
                id: id,
                setId: setId
            }
        }>
            {children}
        </UserContext.Provider>
    )
}