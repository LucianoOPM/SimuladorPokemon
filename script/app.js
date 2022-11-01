/*Los comentarios están de abajo para arriba. */
import API from "./API.js"

const api = new API()

let datosMewtwo = 150//numero de ID del pokemon a combatir, en este caso el 150(mewtwo)
let aleatorio = (Math.floor(Math.random()*4096))//Variable global para poner un shiny



let initApp=async (initCharacterID)=>{
    const characterData = await api.getPokemon(initCharacterID)
    const datoMewtwo = await characterData.sprites.front_default
    
    let mtcontenedor = document.querySelector("#contenedorMewtwo")
    
    mtcontenedor.innerHTML = `<img src="${datoMewtwo}" width="150"></img>`
}
initApp(datosMewtwo)
/*-----------------------------------Coloca a mewtwo en la página principal-------------------------------------------------- */
/* let atacar=(ataque)=>{

}
let evaluarDamage=(callback)=>{
    callback(atacar)
} Verificar si es recomendado usar un callback para hacer la función del daño
*/
let efectuarAtaque=(ataqueSeleccionado, dañoAtq, atqTeam, defTeam)=>{
    console.log(ataqueSeleccionado)
    //traer datos de mewtwo como la defensa y defensa especial, traer el ataque del pokemon aliado seleccionado, y evaluarlo por el daño y el ataque seleccionado
}
/*-----------------Funcion que trae los ataques de la API---------------------------*/

const cambiarACombate= async (infopagina)=>{
    let mainseleccion = document.querySelector("main")
        mainseleccion.innerHTML = infopagina
    let btnataques = document.querySelectorAll("#bataq")
    
    const mtwo = await api.getPokemon(datosMewtwo)
    const datomtwo = await mtwo.sprites.front_default
    
    let mtsprite = document.querySelector("#mtwosprite")
        mtsprite.setAttribute("src", datomtwo)
/*----------------------------------Coloca a mewtwo en la página de combate------------------------------*/
    let ataques = localStorage.getItem("movimientosPKM")
    let parseoAtaques = JSON.parse(ataques)
    let pkmseleccionado = localStorage.getItem("pkmescogido")
/*------------------------------Trae los datos del localstorage de los ataques y del pokemon escogido----------------------------------*/
    btnataques[0].innerText = `${parseoAtaques.ataque1}`
    btnataques[1].innerText = `${parseoAtaques.ataque2}`
    btnataques[2].innerText = `${parseoAtaques.ataque3}`
    btnataques[3].innerText = `${parseoAtaques.ataque4}`

/*--------------------------------Coloca el nombre del ataque en los botones correspondientes.----------------------------------------- */

    const pkmteam = await api.getPokemon(pkmseleccionado)
    const pkmimg = await pkmteam.sprites.back_default
    const pkmimgshiny = await pkmteam.sprites.back_shiny
/*-----------------------------------------Trae datos de las imagenes de los pokemon--------------------------------*/

    let imgpkmteam = document.querySelector("#currentPkm")
    
        if(aleatorio == 1){
            imgpkmteam.setAttribute("src", pkmimgshiny)
        }else{
            imgpkmteam.setAttribute("src", pkmimg)
        }
/*Coloca la imagen respecto a si es shiny o no*/
            btnataques.forEach((botonpulsado)=>{
                botonpulsado.addEventListener("click",(evt)=>{
                    let btnAtqSel = evt.target.innerText
                    efectuarAtaque(btnAtqSel)
                })
            })
        }

let inicioCombate=()=>{
    const pcombate = "html/combate.html"
    fetch(pcombate)
    .then((pagina)=>{
        return pagina.text()
    })
    .then((dato)=>{
        cambiarACombate(dato)
    })
    .catch((err)=>{
        console.error(err)
    })
}
/*------------------------------------Me trae la url de combate.html-----------------------------------*/

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

        if(sel1.value != "" && sel2.value != "" && sel3.value != "" && sel4.value != ""){
            if(sel1.value != sel2.value && sel1.value != sel3.value && sel1.value != sel4.value){
                if(sel2.value != sel3.value && sel2.value != sel4.value){
                    if(sel3.value != sel4.value){
                        localStorage.setItem("movimientosPKM", JSON.stringify({
                            "ataque1": sel1.value, "ataque2": sel2.value, "ataque3": sel3.value, "ataque4": sel4.value
                        }))
                        inicioCombate()
                    }else{
                        alert("Revisa que no tengas ataques repetidos")
                    }
                }else{
                    alert("Revisa que no tengas ataques repetidos")
                }
            }else{
                alert("Revisa que no tengas ataques repetidos")
            }
        }else{
            alert("Verifica que no dejes ningún ataque vacio")
        }
    }))
}
/*-----------------------Condicional que sube los datos al local storage y revisa que no haya selecciones repetidas-----------------------*/

document.addEventListener("DOMContentLoaded",()=>{
    
    const url = "html/seleccionAtaques.html"
    let teamcontainer = document.querySelectorAll("#contenedorEquipo img")

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