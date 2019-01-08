class Rectangle extends BasicElement {
    constructor () {
        super();
        this.shape = "rectangular";
        return this;
    }

    setWidth (width) {
        this.width = width;
        return this;
    }

    setHeight (height) {
        this.height = height;
        return this;
    }
    
    draw (ctx) {
        if (this.width != undefined && this.height != undefined && this.density != undefined) {
            this.area = this.width*this.height;
            this.mass = this.area*this.density;

            ctx.fillStyle = this.color;
            ctx.moveTo(this.position.x, this.position.y);
            ctx.rect(this.position.x-(this.width/2), this.position.y-(this.height/2), this.width, this.height);
            ctx.fill();
        }
    }
}