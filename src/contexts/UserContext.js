import { createContext, useState } from "react";


export const UserContext = createContext({})

// provides the current user and user id for use with account portal, pokemon and appointment pages

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