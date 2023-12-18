export function useDeleteAppointment() {

    async function DeleteAppointment(id) {
        let result = await fetch(
            process.env.REACT_APP_APPOINTMENT_BY_ID + id,
            {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            }
        )

        let data = await result.json()
        console.log(data)

        window.location.reload(false)

        return data
    }

    return { DeleteAppointment }
}