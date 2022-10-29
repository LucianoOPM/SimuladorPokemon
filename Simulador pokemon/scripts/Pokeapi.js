/* const p = new Pokedex.Pokedex()

p.getPokemonByName("mewtwo")
  .then((respuesta)=>{
    return respuesta
  })
  .then((datos)=>{
    console.log(datos.stats[0].base_stat)
  }) */


let formarMewTwo=({stats, sprites, moves})=>{
    let imgMewtwo = document.querySelector("#enfrentamiento")
    imgMewtwo.setAttribute("src", `${sprites.front_default}`)
    console.log(moves[1].move.name)
    const statsMewtwo = new StatsPokemon(stats[0].base_stat, stats[1].base_stat, stats[2].base_stat, stats[3].base_stat, stats[4].base_stat, stats[5].base_stat)
    const mewtwoMoves = new StatsAtaquePokemon()
    console.log(mewtwoMoves)
}


(function(){
    fetch(`https://pokeapi.co/api/v2/pokemon/${150}/`)
    .then((respuesta)=>{
        return respuesta.json()
    })
    .then((datosMewtwo)=>{
        console.log(datosMewtwo)
        formarMewTwo(datosMewtwo)//hacer un return de datosMewtwo para probar si puedo crear cosas por afuera
    })
    .catch((error)=>{
        console.error("No hay sistema" + error)
    })
})();

(function(){
    fetch(`https://pokeapi.co/api/v2/stat/${1}/`)
    .then((respuesta)=>{
        return respuesta.json()
    })
    .then((valor)=>{
        console.log(valor)
    })
})();
//export default class clase
//el script tiene que ser type="module"