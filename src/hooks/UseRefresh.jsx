import { useEffect, useState } from 'react';

export function useRefresh() {
  const [accountStatus, setAccountStatus] = useState({});
  const [user, setUser] = useState(null);
  const [info, setInfo] = useState(null)
  const [loggedIn, setLoggedIn] = useState(true)
  const [id, setId] = useState(null)

  async function refresh() {
    try {
      let result = await fetch(
        process.env.REACT_APP_BACKEND_REFRESH,
        {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({}),
        }
      )

      let data = await result.json()
      // console.log('validation', data)

      if (data.error) {
        console.log(data.error)
        setLoggedIn(false)
      } if (data.user.isAdmin) {
        // console.log('verified as admin')
        setAccountStatus({ admin: true })
        setUser(data.user)
        setLoggedIn(true)
        return
      } if (data.user) {
        // console.log('verified as regular user')
        setAccountStatus({ admin: false })
        setUser(data.user)
        setLoggedIn(true)
        return
      } else {
        setLoggedIn(false)
      }
      return data
    } catch (error) {}
  }

  async function getUserInfo() {
    if (user && user.userID) {
        let userID = user?.userID     
        let result = await fetch(
          `${process.env.REACT_APP_BACKEND_BASE}${userID}`,
          {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        })

        let data = await result.json()
        setInfo(data)
        // console.log('user info', data)
        return data
    }
}

  useEffect(() => {
    getUserInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  useEffect(() => {

    if (user != null) {
        // console.log(user)
        setId(user.userID)
    }
}, [user])
  
  return { refresh, accountStatus, user, info, loggedIn, id };
}