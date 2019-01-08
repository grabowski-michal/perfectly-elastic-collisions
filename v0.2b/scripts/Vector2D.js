class Vector2D {
    constructor (x, y) {
        this.x = x;
        this.y = y;
        return this;
    }

    setVector (x, y) {
        this.x = x;
        this.y = y;
        return this;
    }

    getLength () {
        return Math.sqrt(this.x*this.x + this.y*this.y);
    }

    getScalar (v2) {
        return (this.x*v2.x + this.y*v2.y);
    }

    clampX(min, max) {
        this.x = this.x <= min ? min : this.x >= max ? max : this.x;
    }

    clampY(min, max) {
        this.y = this.y <= min ? min : this.y >= max ? max : this.y;
    }
}