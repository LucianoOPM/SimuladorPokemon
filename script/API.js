export default class API {
    async getPokemon(id){
        try{
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
            const data = await res.json()
            return data
        }catch(err){
            console.error(err)
        }
    }
}