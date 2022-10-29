class NuevosPokemon {
    constructor(nombre, elementoPokemon, elementoPokemon2, stats, ataque1, ataque2, ataque3, ataque4, habilidad, naturaleza){
        this.nombre= nombre
        this.elementoPokemon= elementoPokemon
        this.elementoPokemon2= elementoPokemon2
        this.stats= stats
        this.ataque1= ataque1
        this.ataque2= ataque2
        this.ataque3= ataque3
        this.ataque4= ataque4
        this.habilidad= habilidad
        this.naturaleza= naturaleza
    }
}
class StatsPokemon {
    constructor(vida, ataque, defensa, ataqueEspecial, defensaEspecial, velocidad){
        this.vida= vida
        this.ataque= ataque
        this.defensa= defensa
        this.ataqueEspecial= ataqueEspecial
        this.defensaEspecial= defensaEspecial
        this.velocidad= velocidad
    }
}
class StatsAtaquePokemon{
    constructor(nombreAtaque, daño, precision, tipoDaño, elemento, PP, prioridad){
        this.nombreAtaque= nombreAtaque
        this.daño= daño
        this.precision= precision
        this.tipoDaño= tipoDaño
        this.elemento= elemento
        this.powerpoints= PP
        this.prioridad= prioridad
    }
}
/*-------------------------------------------------------------------Charizard----------------------------------------------------------------------*/
const StatsCharizard = new StatsPokemon(50, 153,93,98,141,105,120)
const Lanzallamas = new StatsAtaquePokemon("Lanzallamas", 90,100,"especial", "fuego", 15, 0)
const AirSlash = new StatsAtaquePokemon("Air slash", 75,95,"especial", "volador", 15, 0)
const PulsoDragon = new StatsAtaquePokemon("Pulso Dragon", 85,100,"especial", "dragon", 10, 0)
const Respiro = new StatsAtaquePokemon("Respiro", false, -1, "estado", "volador", 10, 0)

const Charizard = new NuevosPokemon(
    "Charizard",
    "fuego",
    "volador",
    StatsCharizard,
    Lanzallamas,
    AirSlash, 
    PulsoDragon, 
    Respiro,
    "Mar llamas",
    "Modesta"
)
/*------------------------------------------------------------------Blastoise-------------------------------------------------------------------------*/
const StatsBlastoise = new StatsPokemon(50,154,92,120,115,125,98)
const HydroBomba = new StatsAtaquePokemon("Hydro Bomba", 110, 80, "especial", "agua", 5, 0)
const FlashCanon = new StatsAtaquePokemon("Flash Canon", 80, 100, "especial", "acero", 10, 0)
const PulsoUmbrio = new StatsAtaquePokemon("Pulso Umbrio", 80, 100, "especial", "siniestro", 15, 0)
const RayoHielo = new StatsAtaquePokemon("Rayo Hielo", 90, 100, "especial", "hielo", 10, 0)

const Blastoise = new NuevosPokemon(
    "Blastoise",
    "Agua",
    false,
    StatsBlastoise,
    HydroBomba,
    FlashCanon,
    PulsoUmbrio,
    RayoHielo,
    "Torrente",
    "Modesta"
)
/*-------------------------------------------------------------------Venusaur----------------------------------------------------------------------------*/
const StatsVenusaur = new StatsPokemon (50,155,91,103,132,120,100)
const Energibola = new StatsAtaquePokemon ("Energibola", 90, 100,"especial", "planta", 10, 0)
const Bombalodo = new StatsAtaquePokemon("Bomba lodo", 90,100,"especial", "veneno", 10, 0)
const Somnifero = new StatsAtaquePokemon("Somnifero", false, 75, "estado", "planta", 15, 0)
const Sintesis = new StatsAtaquePokemon("Sintesis", false, -1, "estadoo", "planta", 5, 0)

const Venusaur= new NuevosPokemon(
    "Venusaur", 
    "planta", 
    "veneno",
    StatsVenusaur,
    Energibola,
    Bombalodo,
    Somnifero,
    Sintesis,
    "espesura",
    "modesta"
)
/*----------------------------------------------------------------------Mewtwo-------------------------------------------------------------------------------*/
/* 
const StatsMewtwo = new StatsPokemon(50, 181, 116, 110, 191, 110, 150)
const Psiquico = new StatsAtaquePokemon("Psiquico", 90, 100, "especial", "psiquico", 10, 0)
const Bolsombra = new StatsAtaquePokemon("Bola Sombra", 80, 100, "especial", "fantasma", 15, 0)
const Rayo = new StatsAtaquePokemon("Rayo", 90, 100, "especial", "electrico", 15, 0)
const Rayosolar = new StatsAtaquePokemon("Rayo Solar", 120, 100, "especial", "planta", 10, 0)

const Mewtwo= new NuevosPokemon(
    "Mewtwo",
    "Psiquico",
    false,
    StatsMewtwo,
    Psiquico,
    Bolsombra,
    Rayo,
    Rayosolar,
    "presion",
    "modesta"
)
*/
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
const equipo = [Charizard, Blastoise, Venusaur]
//const rival = [Mewtwo]

/*---------------------------------------------------------------------Comienzo del combate------------------------------------------------------------------------------*/

btncon.addEventListener("click",(evt)=>{
    console.log(evt.target.textContent)//Obtengo el texto el cual contiene el boton
})