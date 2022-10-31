/*Los comentarios están de abajo para arriba. */
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
/*-----------------------------------Coloca a mewtwo en la página-------------------------------------------------- */

initApp(datosMewtwo)

let cambiarPagina= async(pagina, id)=>{
    localStorage.setItem("pkmescogido", id)
    let main = document.querySelector("main")
    main.innerHTML = pagina
/*---------------------------------------------Cambia la página-----------------------------------*/
    const traerpkm = await api.getPokemon(id)
    const pkmimg = await traerpkm.sprites.front_default
    let imgpkm = document.querySelector("#pkmSeleccionado")
    imgpkm.setAttribute("src", pkmimg)
/*---------------------------------------------Coloca la imagen del pokemon seleccionado en la nueva pagina------------------------------------------------------------------*/
    const ataqpkm = await traerpkm.moves
    let sel1 = document.querySelector("#ataq1")
    let sel2 = document.querySelector("#ataq2")
    let sel3 = document.querySelector("#ataq3")
    let sel4 = document.querySelector("#ataq4")
/*---------------------------------------------Trae los ataques del pokemon y llama a los select de la nueva página------------------------------------------------------------------*/
    let fightBtn = document.querySelector("#pelear")
/*--------------------------------------------------Boton que captura los datos-----------------------------------------------------------------------------*/
    ataqpkm.forEach(ataque=>{
        sel1.innerHTML+=`<option value="${ataque.move.name}">${ataque.move.name}</option>`
        sel2.innerHTML+=`<option value="${ataque.move.name}">${ataque.move.name}</option>`
        sel3.innerHTML+=`<option value="${ataque.move.name}">${ataque.move.name}</option>`
        sel4.innerHTML+=`<option value="${ataque.move.name}">${ataque.move.name}</option>`
/*------------------------------------------Coloca todos los ataques que traje antes en el selec-----------------------------------------------------------------*/
    },fightBtn.addEventListener("click", (evt)=>{

        evt.preventDefault()

        if(sel1.value || sel2.value || sel3.value || sel4.value == ""){
            alert("No puede haber ataques vacios")
            //error, esto no funciona como se supone
        }else{
            if(sel1.value != sel2.value && sel1.value != sel3.value && sel1.value != sel4.value){
                if(sel2.value != sel3.value && sel2.value != sel4.value){
                    if(sel3.value != sel4.value){
                        localStorage.setItem("movimientosPKM", JSON.stringify({
                            "ataque1": sel1.value, "ataque2": sel2.value, "ataque3": sel3.value, "ataque4": sel4.value
                        }))
                        paginaCombate()
                    }else{
                        alert("ataque repetido 3")
                    }
                }else{
                    alert("ataque repetido 2")
                }
            }else{
                alert("ataque repetido")
            }
        }
    }))
}
/*-----------------------Condicional que sube los datos al local storage y revisa que no haya selecciones repetidas-----------------------*/

document.addEventListener("DOMContentLoaded",()=>{
    
    let aleatorio = (Math.floor(Math.random()*4096))
    const url = "html/seleccionAtaques.html"

    teamcontainer.forEach((pokemon) => {
        pokemon.addEventListener("click",(evt)=>{
/*--------------------------------------------------recorre la eleccion del pokemon-----------------------------------------*/
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
/*--------------------------------------------Me trae los datos de seleccionataques.html-----------------------------------*/
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
/*------------------------------------------funcion que cambia entre la pokeball y el pokemon en el html----------------------------------------------*/
    });
})