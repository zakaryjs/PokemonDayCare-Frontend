import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/UserContext';

//@desc hook that is designed to get and set user data on page load


// fetch request to token-refresh

export function useRefresh() {
  const [accountStatus, setAccountStatus] = useState({});
  const {user, setUser} = useContext(UserContext)
  const {id, setId} = useContext(UserContext)
  const [info, setInfo] = useState(null)
  const [loggedIn, setLoggedIn] = useState(true)

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

      // if theres an error - the user is not logged in
      if (data.error) {
        setLoggedIn(false)
      // if the user is an admin - they are logged in, and have admin status
      } if (data.user.isAdmin) {
        // console.log('verified as admin')
        setAccountStatus({ admin: true })
        setUser(data.user)
        setLoggedIn(true)
        return
      } if (data.user) {
        // if the user has data - they are logged in, but have no admin status
        // console.log('verified as regular user')
        setAccountStatus({ admin: false })
        setUser(data.user)
        setLoggedIn(true)
        return
      // otherwise, they aren't logged in
      } else {
        setLoggedIn(false)
      }
      return data
    } catch (error) {}
  }

  // after the refresh function is run, get the user info
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

    // set the userID to the users ID
    if (user != null) {
        // console.log(user)
        setId(user.userID)
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [user])
  
  return { refresh, accountStatus, user, info, loggedIn, id };
}