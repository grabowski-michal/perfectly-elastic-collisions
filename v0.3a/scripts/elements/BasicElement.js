class BasicElement {
    constructor () {
        this.density = Parameters.DEFAULT_DENSITY;
        this.shape = "unshaped";
        this.collisive = false;
        this.mobile = false;
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

    setColor (color, gradient) {
        this.color = color;
        this.gradient = gradient;
        return this;
    }

    checkCollision (frequencyFactor) {
        this.position.x += 1/(frequencyFactor * 2) * this.velocity.x * (1/(1000 / time.framesPerSecond));
        this.position.y += 1/(frequencyFactor * 2) * this.velocity.y * (1/(1000 / time.framesPerSecond));
    }

    intervalFunction () {

    }

    evalPosition (frequencyFactor) {
        if (this.mobile == true) {
            for (var i = 0; i < frequencyFactor*2; i++) {
                this.lastPosition = new Vector2D(this.position.x, this.position.y);

                this.checkCollision(frequencyFactor);
                this.intervalFunction();
            }
        }
    }

    remove () {
        var element = this;
        time.space.elements.splice(time.space.elements.findIndex(function (a) { return a == element; }), 1);
    }
}