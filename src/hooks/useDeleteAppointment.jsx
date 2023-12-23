export function useDeleteAppointment() {

    // fetch request that deletes appointment from the server

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
        // reload the page
        window.location.reload(false)
        return data
    }

    return { DeleteAppointment }
}