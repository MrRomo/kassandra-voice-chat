import { useSession } from 'next-auth/client'
import React, { createContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

export const UserContext = createContext({ user: null }) //exporting context object

export const UserProvider = (props) => {
    const [user, setUser] = useState(null)
    const [, loading] = useSession()
    // useEffect(async () => {
    //     if (user === null && !loading) {
    //         const res = await fetch('/api/users')
    //         if (res.status === 200) setUser({ user: (await res.json()).data })
    //     }
    // })
    return <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
}
export default UserProvider
