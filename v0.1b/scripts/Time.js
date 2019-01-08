class Time {
    constructor (framesPerSecond, space) {
        this.framesPerSecond = framesPerSecond;
        this.space = space;
        this.frame = 0;
        this.screenWidth = screen.width;
        this.screenHeight = screen.height;
        this.StartInterval();
    }

    MakeAFrame () {
        this.space.evalAllTheElements();
        simulation.ballsCounter();
    };

    Visualize () {
        this.space.drawAllTheElements();
    }

    StartInterval () {
        var lastTime = Date.now();
        var remainderOfTime = 0;

        this.interval = setInterval(() => {
            //this.MakeAFrame();
            //this.Visualize();

            // Fragment kodu poniżej to zmiana o tyle klatek zależnie od upływu czasu (1s -> 60 klatek). Mniejsza wydajność.
            
            var nowTime = Date.now();
            var delta = nowTime - lastTime + remainderOfTime;
            lastTime = nowTime;
    
            if (delta >= (1000 / this.framesPerSecond)) {
                var framesPassed = Math.floor(delta/(1000 / this.framesPerSecond));
                delta -= framesPassed*(1000 / this.framesPerSecond);
                this.frame += framesPassed;
                for (var k = 0; k < framesPassed; k++) this.MakeAFrame();
                this.Visualize();
            } else {
                remainderOfTime += delta;
            }
        }, 1000/this.framesPerSecond * 1/(this.space.frequencyFactor * 2));
    }

    Stop () {
        clearInterval(this.interval);
        null.dummy;
    }
}