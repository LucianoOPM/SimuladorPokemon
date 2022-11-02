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
let test=(dato)=>{
    console.log(dato.power)
    console.log(dato.name)
    //switch case de los nombres de los ataques, y que cada ataque llame a la funcion "actualizar vida" cuando se escuche el evento "click" en los botones
}

const renderBarraVida=(vidapkm)=>{
    let mtwocanvas = document.querySelector("#vidaMewtwo")
    let mtwocontext = mtwocanvas.getContext("2d")
    let vidateam = document.querySelector("#vidaTeam")
    let vidateamcontext = vidateam.getContext("2d")

    let widthBar = mtwocanvas.width = 320 
    let heightBar = mtwocanvas.height = 50
    const largoBarraVida = 100;
    const altoBarraVida = 10;
    const xPosition = widthBar / 2 - largoBarraVida / 2;
    const yPosition = heightBar / 2 - altoBarraVida / 2;

    switch(vidapkm.name){
        case "mewtwo":
            let vidaMtwo = vidapkm.stats[0].base_stat;
            const barraDeMtwo = new HealtBar(xPosition, yPosition, largoBarraVida, altoBarraVida, vidaMtwo, "green")

            const framemwto = ()=>{
                mtwocontext.clearRect(0,0, widthBar, heightBar)
                barraDeMtwo.show(mtwocontext)
                requestAnimationFrame(framemwto)
            }
            framemwto()
        break
        case "charizard":
        case "blastoise":
        case "venusaur":
            let vidaIniciales = vidapkm.stats[0].base_stat
            const barraVidaIniciales = new HealtBar(xPosition, yPosition, largoBarraVida, altoBarraVida, vidaIniciales, "green")
            
            const frameTeam =()=>{
                vidateamcontext.clearRect(0, 0, widthBar, heightBar)
                barraVidaIniciales.show(vidateamcontext)
                requestAnimationFrame(frameTeam)
            }
            frameTeam()
        break
        }
    }
/*-------------------------------Coloca la barra de vida de los pokemons-----------------------*/
/*Traer los datos necesarios como caracteristicas del pokemon, y caracteristicas del ataque */

const cambiarACombate= async (infopagina)=>{
    let mainseleccion = document.querySelector("main")
        mainseleccion.innerHTML = infopagina
    let btnataques = document.querySelectorAll("#bataq")
/*--------------------------Llamado al DOM de las etiquetas que tengo en combate.html-----------------------------------------*/

    const mtwo = await api.getPokemon(datosMewtwo)
    const datomtwo = await mtwo
        renderBarraVida(datomtwo)
    
    let mtsprite = document.querySelector("#mtwosprite")
        mtsprite.setAttribute("src", datomtwo.sprites.front_default)
/*----------------------------------Coloca a mewtwo en la página de combate------------------------------*/

    let ataques = localStorage.getItem("movimientosPKM")//a partir de aqui podría traerme los stats de los ataques seleccionados
    let parseoAtaques = JSON.parse(ataques)
        for(let i in parseoAtaques){
            const ataque = await api.getMove(parseoAtaques[i])
            const datoAtaque = await ataque
            test(datoAtaque)
        }
    
    let pkmseleccionado = localStorage.getItem("pkmescogido")
/*------------------------------Trae los datos del localstorage de los ataques y del pokemon escogido----------------------------------*/

    btnataques[0].innerText = `${parseoAtaques.ataque1}`
    btnataques[1].innerText = `${parseoAtaques.ataque2}`
    btnataques[2].innerText = `${parseoAtaques.ataque3}`
    btnataques[3].innerText = `${parseoAtaques.ataque4}`
/*--------------------------------Coloca el nombre del ataque en los botones correspondientes.----------------------------------------- */

    const pkmteam = await api.getPokemon(pkmseleccionado)
    const datopkmteam = await pkmteam
        renderBarraVida(datopkmteam)
    const pkmimg = await pkmteam.sprites.back_default
    const pkmimgshiny = await pkmteam.sprites.back_shiny
/*-----------------------------------------Trae datos de las imagenes de los pokemon--------------------------------*/

    let imgpkmteam = document.querySelector("#currentPkm")
    
        if(aleatorio == 1){
            imgpkmteam.setAttribute("src", pkmimgshiny)
        }else{
            imgpkmteam.setAttribute("src", pkmimg)
        }
/*--------------------------Coloca la imagen respecto a si es shiny o no----------------------------*/

    btnataques.forEach((botonpulsado)=>{
        botonpulsado.addEventListener("click",(evt)=>{
            let btnAtqSel = evt.target.innerText
            //reducir la barra de vida en cuestión al boton que se pulsó
        })
    })
}

let cambiarPaginaACombate=()=>{
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
                        cambiarPaginaACombate()
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