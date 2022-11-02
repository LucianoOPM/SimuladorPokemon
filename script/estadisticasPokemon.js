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

    updateHealt(val){
        if(val >= 0){
            this.healt = val;
            this.w = (this.healt / this.maxHealth) * this.maxWidth;
        }
    }
}

//formula para calcular daño daño=Math.flor(0.01 * b * e * v *((0.2*N+1)*a*p/25*D+2)) valor máximo iv 31 Pueden tener un total de 510 evs repartidos en dos atributos 252 evs en gral