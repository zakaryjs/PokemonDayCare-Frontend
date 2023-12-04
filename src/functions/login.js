async function login(email, password) {
    console.log(email)
    console.log(password)
    console.log(process.env.REACT_APP_BACKEND_LOGIN)

    let result = await fetch(
        process.env.REACT_APP_BACKEND_LOGIN,
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({email: email, password: password}),
        }
    )

    let data = await result.json()

    console.log(data)

    return data
}

module.exports = {login}