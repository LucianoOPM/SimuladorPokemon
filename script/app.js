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
let subirVida = (nivel, vidabase, IV, EV)=>{
    let paso1 = 2 * vidabase
    let paso2 = EV/4
    let paso3 = paso1 + IV + paso2
    let paso4 = paso3 * nivel
    let paso5 = paso4 / 100
    let paso6 = paso5 + nivel +10
    
    return Math.floor(paso6)
}
/*Funcion para subir la vida*/
let subirCaracteristicas = (nivel, caracteristicaASubir, IV, EV, naturaleza)=>{
    let paso1 = 2 * caracteristicaASubir
    let paso2 = EV/4
    let paso3 = paso1 + IV + paso2
    let paso4 = paso3 * nivel
    let paso5 = paso4 / 100
    let paso6 = paso5 + 5
    let paso7 = paso6 * naturaleza

    return Math.floor(paso7)
}
/*funcion para subir los stats base */

let Combate= async (barravida, barravida2, statspkm)=>{

    let calcularDamage = (bono, efectividad, variante, nivel, ataque, power, defensa) =>{
        
        let paso1 = 0.2 * nivel + 1
        let paso2 = paso1 * ataque * power
        let paso3 = 25 * defensa
        let paso4 = paso2 / paso3
        let paso5 = paso4 + 2
        let paso6 = 0.01 * bono * efectividad * variante * paso5

        return Math.floor(paso6)
    }
let ataqueRandom =()=> Math.ceil(Math.random()*4)

const mtwo = await api.getPokemon(datosMewtwo)
const datomtwo = await mtwo

const atq1Mtwo = await api.getMove(94)
const atq2Mtwo = await api.getMove(412)
const atq3Mtwo = await api.getMove(352)
const atq4Mtwo = await api.getMove(231)

let vidaMtwo = barravida.maxHealth
let atqMtwo = subirCaracteristicas(50,datomtwo.stats[1].base_stat, 31, 0, 0.9)
let defMtwo = subirCaracteristicas(50, datomtwo.stats[2].base_stat,31,0,1)
let atqEsmtwo = subirCaracteristicas(50, datomtwo.stats[3].base_stat,31, 255, 1.1)
let defEsMtwo = subirCaracteristicas(50, datomtwo.stats[4].base_stat,31,0,1)
let velMtwo = subirCaracteristicas(50, datomtwo.stats[5].base_stat, 31, 0, 1)
/*Stats de mewtwo*/
let vidateam = barravida2.maxHealth
let atqTeam = subirCaracteristicas(50, statspkm.stats[1].base_stat, 31, 0, 0.9)
let defTeam = subirCaracteristicas(50, statspkm.stats[2].base_stat, 31, 0, 1)
let atqEsTeam = subirCaracteristicas(50, statspkm.stats[3].base_stat, 31, 255, 1.1)
let defEsTeam = subirCaracteristicas(50, statspkm.stats[4].base_stat, 31, 0, 1)
let velTeam = subirCaracteristicas(50, statspkm.stats[5].base_stat, 31, 0, 1)
/*Stats del equipo*/


let attackbtn = document.querySelectorAll("#bataq")

    attackbtn.forEach((boton)=>{
        boton.addEventListener("click",async(evt)=>{

            let daño = Math.floor(Math.random()*50)

            vidaMtwo -= daño
            barravida.updateHealt(vidaMtwo)
            
            vidateam -= daño
            barravida2.updateHealt(vidateam)
        })
    })
}

const renderBarraVida= async(statspkm)=>{

    const mtwo = await api.getPokemon(datosMewtwo)
    const datomtwo = await mtwo
    
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
    
    let vidaMtwo = subirVida(50, datomtwo.stats[0].base_stat, 31, 0)
    
    let barraDeMtwo = new HealtBar(xPosition, yPosition, largoBarraVida, altoBarraVida, vidaMtwo, "green")
    const framemwto = ()=>{
        mtwocontext.clearRect(0,0, widthBar, heightBar)
        barraDeMtwo.show(mtwocontext)
        requestAnimationFrame(framemwto)
    }
    framemwto()
    

    switch(statspkm.name){
        case "blastoise":
        case "charizard":
        case "venusaur":
            let vidaTeam = subirVida(50, statspkm.stats[0].base_stat, 31, 0)

            const barraVidaIniciales = new HealtBar(xPosition, yPosition, largoBarraVida, altoBarraVida, vidaTeam, "green")
            Combate(barraDeMtwo, barraVidaIniciales, statspkm)
                
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

const cambiarACombate= async (infopagina)=>{
    let mainseleccion = document.querySelector("main")
        mainseleccion.innerHTML = infopagina
    let btnataques = document.querySelectorAll("#bataq")
/*--------------------------Llamado al DOM de las etiquetas que tengo en combate.html-----------------------------------------*/

    const mtwo = await api.getPokemon(datosMewtwo)
    const datomtwo = await mtwo

    
    let mtsprite = document.querySelector("#mtwosprite")
        mtsprite.setAttribute("src", datomtwo.sprites.front_default)
/*----------------------------------Coloca a mewtwo en la página de combate------------------------------*/
    let pkmseleccionado = localStorage.getItem("pkmescogido")
/*------------------------------Trae los datos del localstorage de los ataques y del pokemon escogido----------------------------------*/

    const pkmteam = await api.getPokemon(pkmseleccionado)
    const datopkmteam = await pkmteam
        renderBarraVida(datopkmteam)
    const pkmimg = await pkmteam.sprites.back_default
    const pkmimgshiny = await pkmteam.sprites.back_shiny
/*-----------------------------------------Trae datos de las imagenes de los pokemon--------------------------------*/


    let ataques = localStorage.getItem("AtaquesSeleccionados")//a partir de aqui podría traerme los stats de los ataques seleccionados
    let parseoAtaques = JSON.parse(ataques)

    btnataques[0].innerText = `${parseoAtaques[0]}`
    btnataques[1].innerText = `${parseoAtaques[1]}`
    btnataques[2].innerText = `${parseoAtaques[2]}`
    btnataques[3].innerText = `${parseoAtaques[3]}`
/*--------------------------------Coloca el nombre del ataque en los botones correspondientes.----------------------------------------- */

    let imgpkmteam = document.querySelector("#currentPkm")
    
        if(aleatorio == 1){
            imgpkmteam.setAttribute("src", pkmimgshiny)
        }else{
            imgpkmteam.setAttribute("src", pkmimg)
        }
/*--------------------------Coloca la imagen respecto a si es shiny o no----------------------------*/
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

    },fightBtn.addEventListener("click",async (evt)=>{

        evt.preventDefault()

        if(sel1.value != "" && sel2.value != "" && sel3.value != "" && sel4.value != ""){
            if(sel1.value != sel2.value && sel1.value != sel3.value && sel1.value != sel4.value){
                if(sel2.value != sel3.value && sel2.value != sel4.value){
                    if(sel3.value != sel4.value){
                            let selecciones = [sel1.value, sel2.value, sel3.value, sel4.value]
                            localStorage.setItem("AtaquesSeleccionados",JSON.stringify(selecciones))
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