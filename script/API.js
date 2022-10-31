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
    async getMove(id){
        try{
            const req = await fetch (`https://pokeapi.co/api/v2/move/${id}/`)
            const succ = await req.json()
            return succ
        }catch(err){
            console.error(err)
        }
    }
}