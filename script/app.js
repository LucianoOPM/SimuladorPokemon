import API from "./API.js"

const api = new API()

let datosMewtwo = 150//numero de ID del pokemon a combatir, en este caso el 150(mewtwo)
let mtcontenedor = document.querySelector("#contenedorMewtwo")
let teamcontainer = document.querySelectorAll("#contenedorEquipo img")

let initApp=async (initCharacterID)=>{
    const characterData = await api.getPokemon(initCharacterID)
    const datoMewtwo = characterData.sprites.front_default


    mtcontenedor.innerHTML = `<img src="${datoMewtwo}" width="150"></img>`
}

initApp(datosMewtwo)

let cambiarPagina= async(pagina, id)=>{
    let main = document.querySelector("main")
    main.innerHTML = pagina
    
    let sigPagina = document.querySelector("#pelear")
    sigPagina.addEventListener("click",(evt)=>{
        evt.preventDefault()
    })
    
    
    const traerpkm = await api.getPokemon(id)
    const pkmimg = await traerpkm.sprites.front_default
    let imgpkm = document.querySelector("#pkmSeleccionado")
    imgpkm.setAttribute("src", pkmimg)

    
    const traerataq = await api.getPokemon(id)
    const ataqpkm = await traerataq.moves
    let sel1 = document.querySelector("#ataq1")
    let sel2 = document.querySelector("#ataq2")
    let sel3 = document.querySelector("#ataq3")
    let sel4 = document.querySelector("#ataq4")
    
    ataqpkm.forEach(ataque=>{
        sel1.innerHTML+=`<option value="${ataque.move.name}">${ataque.move.name}</option>`
        sel2.innerHTML+=`<option value="${ataque.move.name}">${ataque.move.name}</option>`
        sel3.innerHTML+=`<option value="${ataque.move.name}">${ataque.move.name}</option>`
        sel4.innerHTML+=`<option value="${ataque.move.name}">${ataque.move.name}</option>`
    },
    sel1.addEventListener("change",(evt)=>{
        localStorage.setItem("ataque1", evt.target.value)
    }),
    sel2.addEventListener("change",(evt)=>{
        localStorage.setItem("ataque2", evt.target.value)
    }),
    sel3.addEventListener("change",(evt)=>{
        localStorage.setItem("ataque3", evt.target.value)
    }),
    sel4.addEventListener("change",(evt)=>{
        localStorage.setItem("ataque4", evt.target.value)
    })
    )
}   

document.addEventListener("DOMContentLoaded",()=>{
    
    let aleatorio = (Math.floor(Math.random()*4096))

    teamcontainer.forEach(pokemon => {
        pokemon.addEventListener("click",(evt)=>{
            localStorage.setItem("elegido", evt.target.id)

            const url = "html/seleccionAtaques.html"

            fetch(url)
                .then((pagina)=>{
                    return pagina.text()
                })
                .then((page)=>{
                    cambiarPagina(page, evt.target.id)
                })
                .catch((err)=>{
                    console.error(err)
                })
        })
        if(aleatorio==1){
            pokemon.addEventListener("mouseenter", async(evt)=>{
                const cambio = await api.getPokemon(evt.target.id)
                const imgshiny = await cambio.sprites.front_shiny

                evt.target.src = imgshiny
            })
            pokemon.addEventListener("mouseleave",(evt)=>{
                evt.target.src = "imgs/pokeball.gif"
            })
        }else{
            pokemon.addEventListener("mouseenter", async(evt)=>{
            const cambio = await api.getPokemon(evt.target.id)
            const img = await cambio.sprites.front_default
            
            evt.target.src = img
        })
            pokemon.addEventListener("mouseleave",(evt)=>{
            evt.target.src = "imgs/pokeball.gif"
        })
    }
    });
})