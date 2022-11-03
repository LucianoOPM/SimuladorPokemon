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

const renderBarraVida= async(statspkm, atq1, atq2, atq3, atq4)=>{

    let attackbtn = document.querySelectorAll("#bataq")
    
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

    switch(statspkm.name){
        case "mewtwo":

            let vidaMtwo = statspkm.stats[0].base_stat;
            let atqMtwo = statspkm.stats[1].base_stat
            let atqEsMtwo = statspkm.stats[3].base_stat
            let defMtwo = statspkm.stats[2].base_stat
            let defEsMtwo = statspkm.stats[4].base_stat
            let tipoMtwo1 = statspkm.types[0].type.name
            let tipoMtwo2 = false

            const barraDeMtwo = new HealtBar(xPosition, yPosition, largoBarraVida, altoBarraVida, vidaMtwo, "green")
            barraDeMtwo.updateHealt(new DamageCalculator(atq1.power, atq2.power, atq3.power, atq4.power, vidaMtwo, atqMtwo, defMtwo, atqEsMtwo, defEsMtwo,
                atq1.type.name, atq2.type.name, atq3.type.name, atq4.type.name, tipoMtwo1, tipoMtwo2))
            

            const framemwto = ()=>{
                mtwocontext.clearRect(0,0, widthBar, heightBar)
                barraDeMtwo.show(mtwocontext)
                requestAnimationFrame(framemwto)
            }
            framemwto()
            attackbtn.forEach((boton)=>{
            boton.addEventListener("click",(evt)=>{
                vidaMtwo -= 20
                barraDeMtwo.updateHealt(vidaMtwo)
            })
        })
        break
        case "blastoise":
        case "charizard":
        case "venusaur":

            let tipo2team;
            
            if(statspkm.name == "blastoise"){
                tipo2team = false
            }else{
                tipo2team = statspkm.types[1].type.name
            }

            let vidaIniciales = statspkm.stats[0].base_stat
            let atqIniciales = statspkm.stats[1].base_stat
            let defIniciales = statspkm.stats[2].base_stat
            let atqEsIniciales = statspkm.stats[3].base_stat
            let defEsIniciales = statspkm.stats[4].base_stat
            let tipo1Iniciales = statspkm.types[0].type.name

            const barraVidaIniciales = new HealtBar(xPosition, yPosition, largoBarraVida, altoBarraVida, vidaIniciales, "green")
            barraVidaIniciales.updateHealt(new DamageCalculator(atq1.power, atq2.power, atq3.power, atq4.power, vidaIniciales, atqIniciales, defIniciales, atqEsIniciales, defEsIniciales,
                atq1.type.name, atq2.type.name, atq3.type.name, atq4.type.name, tipo1Iniciales, tipo2team))

            const frameTeam =()=>{
                vidateamcontext.clearRect(0, 0, widthBar, heightBar)
                barraVidaIniciales.show(vidateamcontext)
                requestAnimationFrame(frameTeam)
            }
            frameTeam()
            attackbtn.forEach((boton)=>{
                boton.addEventListener("click",(evt)=>{
                    vidaIniciales -=10
                    barraVidaIniciales.updateHealt(vidaIniciales)
                })
            })
        break
        }
    }
/*-------------------------------Coloca la barra de vida de los pokemons-----------------------*/

const cambiarACombate= async (infopagina, datorecibido1, datorecibido2, datorecibido3, datorecibido4)=>{
    let mainseleccion = document.querySelector("main")
        mainseleccion.innerHTML = infopagina
    let btnataques = document.querySelectorAll("#bataq")
/*--------------------------Llamado al DOM de las etiquetas que tengo en combate.html-----------------------------------------*/

    const mtwo = await api.getPokemon(datosMewtwo)
    const datomtwo = await mtwo
    const atq1Mtwo = await api.getMove("psychic")
    const atq2Mtwo = await api.getMove("iron-tail")
    const atq3Mtwo = await api.getMove("energy-ball")
    const atq4Mtwo = await api.getMove("water-pulse")
    const atq1MtwoData = await atq1Mtwo
    const atq2MtwoData = await atq2Mtwo
    const atq3MtwoData = await atq3Mtwo
    const atq4MtwoData = await atq4Mtwo
        renderBarraVida(datomtwo, atq1MtwoData, atq2MtwoData, atq3MtwoData, atq4MtwoData)

    
    let mtsprite = document.querySelector("#mtwosprite")
        mtsprite.setAttribute("src", datomtwo.sprites.front_default)
/*----------------------------------Coloca a mewtwo en la página de combate------------------------------*/
    let pkmseleccionado = localStorage.getItem("pkmescogido")
/*------------------------------Trae los datos del localstorage de los ataques y del pokemon escogido----------------------------------*/

    const pkmteam = await api.getPokemon(pkmseleccionado)
    const datopkmteam = await pkmteam
        renderBarraVida(datopkmteam, datorecibido1, datorecibido2, datorecibido3, datorecibido4)
    const pkmimg = await pkmteam.sprites.back_default
    const pkmimgshiny = await pkmteam.sprites.back_shiny
/*-----------------------------------------Trae datos de las imagenes de los pokemon--------------------------------*/


    let ataques = localStorage.getItem("movimientosPKM")//a partir de aqui podría traerme los stats de los ataques seleccionados
    let parseoAtaques = JSON.parse(ataques)

    btnataques[0].innerText = `${parseoAtaques.ataque1}`
    btnataques[1].innerText = `${parseoAtaques.ataque2}`
    btnataques[2].innerText = `${parseoAtaques.ataque3}`
    btnataques[3].innerText = `${parseoAtaques.ataque4}`
/*--------------------------------Coloca el nombre del ataque en los botones correspondientes.----------------------------------------- */

    let imgpkmteam = document.querySelector("#currentPkm")
    
        if(aleatorio == 1){
            imgpkmteam.setAttribute("src", pkmimgshiny)
        }else{
            imgpkmteam.setAttribute("src", pkmimg)
        }
/*--------------------------Coloca la imagen respecto a si es shiny o no----------------------------*/
}

let cambiarPaginaACombate=(ataque1,ataque2,ataque3,ataque4)=>{
    const pcombate = "html/combate.html"
    fetch(pcombate)
    .then((pagina)=>{
        return pagina.text()
    })
    .then((dato)=>{
        cambiarACombate(dato, ataque1, ataque2, ataque3, ataque4)
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

    },fightBtn.addEventListener("click",async (evt)=>{

        evt.preventDefault()

        if(sel1.value != "" && sel2.value != "" && sel3.value != "" && sel4.value != ""){
            if(sel1.value != sel2.value && sel1.value != sel3.value && sel1.value != sel4.value){
                if(sel2.value != sel3.value && sel2.value != sel4.value){
                    if(sel3.value != sel4.value){
                        const ataque1 = await api.getMove(sel1.value)
                        const ataque1Data = await ataque1
                        const ataque2 = await api.getMove(sel2.value)
                        const ataque2Data = await ataque2
                        const ataque3 = await api.getMove(sel3.value)
                        const ataque3Data = await ataque3
                        const ataque4 = await api.getMove(sel4.value)
                        const ataque4Data = await ataque4
                            localStorage.setItem("movimientosPKM", JSON.stringify({
                                "ataque1": sel1.value, "ataque2": sel2.value, "ataque3": sel3.value, "ataque4": sel4.value
                            }))
                        cambiarPaginaACombate(ataque1Data, ataque2Data, ataque3Data, ataque4Data)
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