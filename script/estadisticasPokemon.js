class HealtBar {
    constructor(x, y, w, h, maxHealth, color){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.maxHealth = maxHealth;
        this.maxWidth = w;
        this.healt = maxHealth
        this.color = color
    }

    show(context){
        context.lineWidth = 4;
        context.strokeStyle = "#333";
        context.fillStyle = this.color
        context.fillRect(this.x, this.y, this.w, this.h);
        context.strokeRect(this.x, this.y, this.maxWidth, this.h)
    }

    updateHealt(vida){
        if(vida >= 0){
            this.healt = vida
            this.w = (this.healt / this.maxHealth) * this.maxWidth
        }
    }
}

class DamageCalculator{
    constructor(poderDelAtaque1, poderDelAtaque2, poderDelAtaque3, poderDelAtaque4, vidaTotal, ataqueBase,  defensaBase, ataqueEspecialBase, defensaEspecialBase,
        claseDelAtaque1, claseDelAtaque2, claseDelAtaque3, claseDelAtaque4, tipo1Pokemon, tipo2Pokemon){
        this.poderDelAtaque1 = poderDelAtaque1
        this.poderDelAtaque2 = poderDelAtaque2
        this.poderDelAtaque3 = poderDelAtaque3
        this.poderDelAtaque4 = poderDelAtaque4
        this.vidaTotal = vidaTotal
        this.ataqueBase = ataqueBase
        this.ataqueEspecialBase = ataqueEspecialBase
        this.defensaBase = defensaBase
        this.defensaEspecialBase = defensaEspecialBase
        this.claseDelAtaque1 = claseDelAtaque1
        this.claseDelAtaque2 = claseDelAtaque2
        this.claseDelAtaque3 = claseDelAtaque3
        this.claseDelAtaque4 = claseDelAtaque4
        this.tipo1Pokemon = tipo1Pokemon
        this.tipo2Pokemon = tipo2Pokemon
    }
}
/* let test=(ataque1, ataque2, ataque3, ataque4, team, mewtwo)=>{
    
    let datosTeam = {}
    let rival = {                
        vida: mewtwo.stats[0].base_stat,
        ataque: mewtwo.stats[1].base_stat,
        defensa: mewtwo.stats[2].base_stat,
        Eataque: mewtwo.stats[3].base_stat,
        Edefensa: mewtwo.stats[4].base_stat,
        tipo: mewtwo.types[0].type.name
    }
    switch(team.name){
        case "blastoise":
            datosTeam = {
                vida: team.stats[0].base_stat,
                ataque: team.stats[1].base_stat,
                defensa: team.stats[2].base_stat,
                Eataque: team.stats[3].base_stat,
                Edefensa: team.stats[4].base_stat,
                tipo: team.types[0].type.name
            }
        break
        case "charizard":
        case "venusaur":
            datosTeam = {
                vida: team.stats[0].base_stat,
                ataque: team.stats[1].base_stat,
                defensa: team.stats[2].base_stat,
                Eataque: team.stats[3].base_stat,
                Edefensa: team.stats[4].base_stat,
                tipo: team.types[0].type.name,
                tipoSecundario: team.types[1].type.name
            }
        break 
    }
    let ataque1o = {
        daño: ataque1.power,
        nombre: ataque1.name,
        clase: ataque1.damage_class.name,
        tipo: ataque1.type.name
    }
    let ataque2o = {
        daño: ataque2.power,
        nombre: ataque2.name,
        clase: ataque2.damage_class.name,
        tipo: ataque2.type.name
    }
    let ataque3o = {
        daño: ataque3.power,
        nombre: ataque3.name,
        clase: ataque3.damage_class.name,
        tipo: ataque3.type.name
    }
    let ataque4o = {
        daño: ataque4.power,
        nombre: ataque4.name,
        clase: ataque4.damage_class.name,
        tipo: ataque4.type.name
    }
}
/*-----------------------------Valores de datos para efectuar los cambios a la barra de vida----------------*/