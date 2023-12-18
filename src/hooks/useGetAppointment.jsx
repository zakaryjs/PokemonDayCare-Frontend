import { useState } from "react"
import { useRefresh } from "./UseRefresh"

export function useGetAppointment() {

    let { id, user } = useRefresh()
    const [appointments, setAppointment] = useState({})

    async function GetAppointment() {
        if (id != null && user.isAdmin === true) {
            let result  = await fetch(process.env.REACT_APP_ALL_APPOINTMENTS,
                {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                })
            let data = await result.json()
            console.log(data)
            setAppointment(data)
        }
        if (id != null && user.isAdmin === false) {
            let result = await fetch(process.env.REACT_APP_APPOINTMENT_BY_ID + id,
                {
                  method: 'GET',
                  headers: {
                      "Content-Type": "application/json",
                  },
                  credentials: "include",
              })
            let data = await result.json()
            console.log(data)
            setAppointment(data)
        }
    }

    return { appointments, GetAppointment }
}