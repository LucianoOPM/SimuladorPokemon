const seleccionpkm = document.querySelectorAll(".pokeball")
const pkmcontainer = document.querySelector("#pkbcontainer")
const h2 = document.querySelector("h2")
const btncon = document.querySelector("#btncontainer")
const recargar = document.querySelector("#refresh")
const btn1=document.querySelector("#ataque1")
const btn2=document.querySelector("#ataque2")
const btn3=document.querySelector("#ataque3")
const btn4=document.querySelector("#ataque4")




let colocarAtaques=(num)=>{
    btn1.innerText=`${equipo[num].ataque1.nombreAtaque}`
    btn2.innerText=`${equipo[num].ataque2.nombreAtaque}`/*Función que coloca los ataques en mis botones (Creo que es optimizable)*/
    btn3.innerText=`${equipo[num].ataque3.nombreAtaque}`
    btn4.innerText=`${equipo[num].ataque4.nombreAtaque}`
}

let numeracionPkm=(pkm)=>{
        switch(pkm){
            case "Charizard":
                pkm=0
                break
            case "Blastoise":/*Función que me cambia al pókemon a un valor de numero (Se podría optimizar)*/
                pkm=1
                break
            case "Venusaur":
                pkm=2
                break
        }
        colocarAtaques(pkm)
        return pkm
}

let seleccion=(evt)=>{
    let seleccionado = evt.target.alt
    localStorage.setItem("eleccion", seleccionado)
        
        switch(seleccionado){
            case "Charizard":
                h2.innerText=`Charizard vs Mewtwo`
                pkmcontainer.innerHTML=`<img src="assets/CharizardEspalda.webp" widht="150">`
                break
            case "Blastoise":
                h2.innerText=`Blastoise vs Mewtwo`
                pkmcontainer.innerHTML=`<img src="assets/Blastoiseespalda.gif" widht="150">`/*Función que manipula el HTML para hacer algunos cambios*/
                break
            case "Venusaur":
                h2.innerText= `Venusaur vs Mewtwo`
                pkmcontainer.innerHTML=`<img src="assets/Venusaurespalda.png" width="150">`
                break
            }
    btncon.setAttribute("style", "")//Cambia el atributo de los botones que originalmente están ocultos y los muestra en el HTML
    numeracionPkm(seleccionado)
}

let returnImg=(evt)=>{
    evt.target.setAttribute("src", `assets/pokeball.gif`) //Funcion que devuelve la pokeball al pokemon original
}
let changeImg=(evt)=>{
    evt.target.setAttribute("src", `assets/${evt.target.alt}.png`) //Funcion que cuando ponga el mouse sobre la pokeball muestra el pokemon a seleccionar
}

document.addEventListener("DOMContentLoaded",()=>{
    let pkmstorage = localStorage.getItem("eleccion")
    if(pkmstorage==null){
        for(let imagen of seleccionpkm){/*Este método me permite recorrer cada uno de los nodos de mi interes con sus respectivas variables En este caso lo usé para seleccionar las imagenes de mi interés*/
            imagen.addEventListener("mouseover", changeImg)
            imagen.addEventListener("mouseout", returnImg)
            
            imagen.addEventListener("click", seleccion)
            }
    }else{
        h2.innerText=`${pkmstorage} vs Mewtwo`
        switch(pkmstorage){
            case "Charizard":
                h2.innerText=`Charizard vs Mewtwo`
                pkmcontainer.innerHTML=`<img src="assets/CharizardEspalda.webp" widht="150">`
                break
            case "Blastoise":
                h2.innerText=`Blastoise vs Mewtwo`
                pkmcontainer.innerHTML=`<img src="assets/Blastoiseespalda.gif" widht="150">`/*Función que manipula el HTML para hacer algunos cambios*/
                break
            case "Venusaur":
                h2.innerText= `Venusaur vs Mewtwo`
                pkmcontainer.innerHTML=`<img src="assets/Venusaurespalda.png" width="150">`
                break
            }
            btncon.setAttribute("style", "")
            numeracionPkm(pkmstorage)
        }
    }
    )

recargar.addEventListener("click",()=>{
    localStorage.removeItem("eleccion")
    location.reload()
})


/*
Recordar que los ".addEventListener" siempre tienen un parametro por defecto con el que se pueden identificar, en este caso lo llamamos "evt"
Aqui en palabras humanas, le accedimos al "target" del parametro y le atribuimos un cambio de
atributo, nos dirigimos a su atributo "src" y se lo cambiamos por los assets
*/