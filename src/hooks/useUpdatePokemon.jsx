import { useState } from "react"
import { useNavigate } from "react-router-dom"

export function useUpdatePokemon() {

    // fetch request to update a users pokemon

    const navigate = useNavigate()


    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    async function editPokemon(species, nickname, gender, height, weight, notes, id, ptm) {

        setLoading(true)

        let result = await fetch(
            process.env.REACT_APP_POKEMON_BY_ID + ptm,
            {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({species: species, nickname: nickname, gender: gender, height: height, weight: weight, notes: notes})
            }
        )

        let data = await result.json()
        console.log(data)

        setLoading(false)

        if (data.error) {
            setLoading(false)
            setError(data.error)
        } else {
            setLoading(false)
            navigate('/pokemon')
        }

        return data
    }

    return { error, loading, editPokemon }
}