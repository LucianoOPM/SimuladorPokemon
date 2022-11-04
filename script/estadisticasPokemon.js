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
        if(vida > 0){
            this.healt = vida
            this.w = (this.healt / this.maxHealth) * this.maxWidth
        }
    }
}