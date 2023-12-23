export function useDeletePokemon() {

    // fetch request that deletes pokemon from the server
    
    async function DeletePokemon(id) {
        let result = await fetch(
            process.env.REACT_APP_POKEMON_BY_ID + id,
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

    return { DeletePokemon }
}