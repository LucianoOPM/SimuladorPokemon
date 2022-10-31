import API from "./API.js"


const movement = new API()

let datosAtaques = async(moveID)=>{
    const movedata = await movement.getMove(moveID)
    const datoObtenido = await movedata
    console.log(datoObtenido)
}
datosAtaques("ice-beam")