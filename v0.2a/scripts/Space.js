class Space {
    constructor (canvas) {
        this.elements = [];
        this.frequencyFactor = 1;
        this.ctx = canvas.getContext("2d");
    }

    CountBalls(topLeftPos, topRightPos, bottomLeftPos, bottomRightPos) {
        var elements = this.elements;
        var counter = 0;

        for (var i = 0; i < elements.length; i++) {
            if (elements[i].position.x > topLeftPos.x && elements[i].position.y > topLeftPos.y && elements[i].position.x < topRightPos.x && elements[i].position.y > topRightPos.y
            && elements[i].position.x > bottomLeftPos.x && elements[i].position.y < bottomLeftPos.y && elements[i].position.x < bottomRightPos.x && elements[i].position.y < bottomRightPos.y) {
                counter++;
            }
        }

        return counter;
    }

    evalAllTheElements () {
        for (var i = 0; i < this.elements.length; i++) {
            this.elements[i].evalPosition(this.frequencyFactor);
        }
    }

    drawAllTheElements () {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < this.elements.length; i++) {
            this.ctx.beginPath();
            this.elements[i].draw(this.ctx);
        }
    }
}