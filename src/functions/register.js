async function register(firstName, lastName, email, password) {    

    let result = await fetch(
        process.env.REACT_APP_BACKEND_REGISTER,
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({firstName: firstName, lastName: lastName, password: password, email: email}),
        }
    )

    let data = await result.json()

    return data
}

module.exports = {register}