class Space {
    constructor (canvas) {
        this.elements = [];
        this.sections = [];
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
        for (var j = 0; j < this.sections.length; j++) {
            this.sections[j].elements = [];
        }
        for (var i = 0; i < this.elements.length; i++) {
            this.elements[i].sectionIndexes = [];
            for (var j = 0; j < this.sections.length; j++) {
                if ((this.elements[i].position.x >= this.sections[j].leftPos && this.elements[i].position.x <= this.sections[j].rightPos
                    && this.elements[i].position.y >= this.sections[j].topPos && this.elements[i].position.y <= this.sections[j].bottomPos) || (this.elements[i].shape == "rectangular")) {
                        this.elements[i].sectionIndexes.push(j);
                        this.sections[j].elements.push(this.elements[i]);
                    }
            }
        }
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

    initiateSections (ballRadius, canvasWidth, canvasHeight) {
        var widthOfSection = 2*ballRadius*6;
        var heightOfSection = 2*ballRadius*6;

        this.sections = [];

        for (var k = 0; k < canvasHeight; k += heightOfSection) {
            for (var j = 0; j < canvasWidth; j += widthOfSection) {
                var section = {
                    leftPos: j - (ballRadius/2),
                    rightPos: j + widthOfSection + (ballRadius/2),
                    topPos: k - (ballRadius/2),
                    bottomPos: k + heightOfSection + (ballRadius/2),

                    elements: []
                };
                this.sections.push(section);
            }
        }
        console.log(this.sections);
    }
}