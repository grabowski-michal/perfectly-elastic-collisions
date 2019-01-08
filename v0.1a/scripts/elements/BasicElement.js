class BasicElement {
    constructor () {
        this.shape = "unshaped";
        this.collisive = false;
        this.mobile = false;
        this.density = 7874;
        this.color = "black";
        this.velocity = new Vector2D(0, 0);
        time.space.elements.push(this);
        return this;
    }

    setMass (m) {
        this.mass = m; // [kg]
        return this;
    }

    setDensity (d) { // [kg/m^3]
        this.density = d;
        return this;
    }

    setVelocity (vel) {
        if (this.mobile != false) this.velocity = vel;
        return this;
    }

    setPosition (pos) {
        this.position = pos;
        return this;
    }

    setCollisive (collisive) {
        this.collisive = collisive;
        return this;
    }

    setColor (color) {
        this.color = color;
        return this;
    }

    checkCollision () {

    }

    evalPosition (frequencyFactor) {
        if (this.mobile == true) {
            for (var i = 0; i < frequencyFactor*2; i++) {
                this.checkCollision();

                this.position.x += 1/(frequencyFactor * 2) * this.velocity.x * (1/(1000 / time.framesPerSecond));
                this.position.y += 1/(frequencyFactor * 2) * this.velocity.y * (1/(1000 / time.framesPerSecond));
            }
        }
    }

    remove () {
        var element = this;
        time.space.elements.splice(time.space.elements.findIndex(function (a) { return a == element; }), 1);
    }
}