import API from "./API.js"

const api = new API()

let datosMewtwo = 150

let initApp=async (initCharacterID)=>{
    const characterData = await api.getPokemon(initCharacterID)
    const datoMewtwo = characterData.sprites.front_default

    let mtcontenedor = document.querySelector("#contenedorMewtwo")

    mtcontenedor.innerHTML = `<img src="${datoMewtwo}" width="150"></img>`
}

initApp(datosMewtwo)


let teamcontainer = document.querySelectorAll("#contenedorEquipo img")

document.addEventListener("DOMContentLoaded",()=>{
    teamcontainer.forEach(pokemon => {
        pokemon.addEventListener("click",(evt)=>{
            console.log(`elegiste a: ${evt.target.id}`)
        })
        pokemon.addEventListener("mouseenter", async(evt)=>{
            const cambio = await api.getPokemon(evt.target.id)
            const img = await cambio.sprites.front_default

            evt.target.src = img
        })
        pokemon.addEventListener("mouseleave",(evt)=>{
            evt.target.src = "imgs/pokeball.gif"
        })
    });
}) 
//1:46:46