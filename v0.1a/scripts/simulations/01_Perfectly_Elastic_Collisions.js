class Perfectly_Elastic_Collisions_01 {
    constructor () {
        var widthOfEnvironment, heightOfEnvironment;
        this.defaultDensity = 7874;
        this.widthOfEnvironment = widthOfEnvironment = 800+4;
        this.heightOfEnvironment = heightOfEnvironment = 400+4;
        this.heightOfBaffle = (1/3);
        this.baffleVelocity = 8;

        var coords = [
            [widthOfEnvironment*0.5, heightOfEnvironment*0.95, widthOfEnvironment*0.9+20, 20],
            [widthOfEnvironment*0.05, heightOfEnvironment*0.5, 20, heightOfEnvironment*0.9-20+1],
            [widthOfEnvironment*0.5, heightOfEnvironment*0.05, widthOfEnvironment*0.9+20, 20],
            [widthOfEnvironment*0.95, heightOfEnvironment*0.5, 20, heightOfEnvironment*0.9-20+1],
            [widthOfEnvironment*0.5, heightOfEnvironment*0.05+10+((heightOfEnvironment*0.9)-20+1)*this.heightOfBaffle*(1/2), 20, ((heightOfEnvironment*0.9)-20+1)*this.heightOfBaffle+1, "prop1"],
            [widthOfEnvironment*0.5, heightOfEnvironment*0.95-10-((heightOfEnvironment*0.9)-20+1)*this.heightOfBaffle*(1/2), 20, ((heightOfEnvironment*0.9)-20+1)*this.heightOfBaffle+1, "prop2"],
            [widthOfEnvironment*0.5, heightOfEnvironment*0.5, 20, ((heightOfEnvironment*0.9)-20+1)*this.heightOfBaffle+1, "baffle"]
        ];

        for (var i = 0; i < coords.length; i++) {
            var rectangle = new Rectangle()
            .setVelocity(new Vector2D (0, 0))
            .setPosition(new Vector2D(coords[i][0], coords[i][1]))
            .setCollisive(true)
            .setWidth(coords[i][2])
            .setHeight(coords[i][3]);

            switch (coords[i][4]) {
                case "prop1":
                    this.prop1 = rectangle;
                    break;
                case "prop2":
                    this.prop2 = rectangle;
                    break;
                case "baffle":
                    this.baffle = rectangle;
                    rectangle.name = "baffle";
                    rectangle.setColor("#555555");
                    break;
                default:
                    break;
            }
        }
    }

    changeBaffleHeight (newHeight) {
        this.heightOfBaffle = (newHeight/100);
        this.baffle.setHeight(((this.heightOfEnvironment*0.9)-20+1)*(newHeight/100)+1);
        this.prop1.setPosition(new Vector2D(this.prop1.position.x, this.heightOfEnvironment*0.05+10+((this.heightOfEnvironment*0.9)-20+1)*((1-(newHeight/100))/2)*(1/2)));
        this.prop1.setHeight(((this.heightOfEnvironment*0.9)-20+1)*((1-(newHeight/100))/2)+1);
        this.prop2.setPosition(new Vector2D(this.prop2.position.x, this.heightOfEnvironment*0.95-10-((this.heightOfEnvironment*0.9)-20+1)*((1-(newHeight/100))/2)*(1/2)));
        this.prop2.setHeight(((this.heightOfEnvironment*0.9)-20+1)*((1-(newHeight/100))/2)+1);
    }

    openBaffle () {
        for (var k = 0; k < time.space.elements.length; k++) {
            if (time.space.elements[k].name == "baffle") time.space.elements[k].remove();
        }
        var coords = [
            [this.widthOfEnvironment*0.5, this.heightOfEnvironment*0.5-((((this.heightOfEnvironment*0.9)-20+1)*this.heightOfBaffle+1)/2)/2, 20, (((this.heightOfEnvironment*0.9)-20+1)*this.heightOfBaffle+1)/2, "baffle", (-1)*this.baffleVelocity],
            [this.widthOfEnvironment*0.5, this.heightOfEnvironment*0.5+((((this.heightOfEnvironment*0.9)-20+1)*this.heightOfBaffle+1)/2)/2, 20, (((this.heightOfEnvironment*0.9)-20+1)*this.heightOfBaffle+1)/2, "baffle", this.baffleVelocity]
        ];

        for (var i = 0; i < coords.length; i++) {
            var rectangle = new Rectangle()
            .setVelocity(new Vector2D (0, 0))
            .setPosition(new Vector2D(coords[i][0], coords[i][1]))
            .setWidth(coords[i][2])
            .setHeight(coords[i][3]);

            rectangle.mobile = true;
            rectangle.setVelocity(new Vector2D(0, coords[i][5]));
        }
    }

    ballsCounter () {
        if (document.getElementById("infoAboutAmount1") != null && document.getElementById("infoAboutAmount2") != null) {
            document.getElementById("infoAboutAmount1").innerHTML = "Kulek w lewym pojemniku: " + 
            time.space.CountBalls(new Vector2D(this.widthOfEnvironment*0.05, this.heightOfEnvironment*0.05), new Vector2D(this.widthOfEnvironment*0.5, this.heightOfEnvironment*0.05),
                        new Vector2D(this.widthOfEnvironment*0.05, this.heightOfEnvironment*0.95), new Vector2D(this.widthOfEnvironment*0.5, this.heightOfEnvironment*0.95));
            
            document.getElementById("infoAboutAmount2").innerHTML = "Kulek w prawym pojemniku: " +
            time.space.CountBalls(new Vector2D(this.widthOfEnvironment*0.5, this.heightOfEnvironment*0.05), new Vector2D(this.widthOfEnvironment*0.95, this.heightOfEnvironment*0.05),
                        new Vector2D(this.widthOfEnvironment*0.5, this.heightOfEnvironment*0.95), new Vector2D(this.widthOfEnvironment*0.95, this.heightOfEnvironment*0.95));
        }
    }

    checkMaxBallsAmount (mass) {
        var area = (mass*1000000) / this.defaultDensity;
        var radius = Math.sqrt(area/Math.PI);
        var ballDiameter = radius*2;

        var rightside = this.widthOfEnvironment*0.5 - 20/2;
        var leftside = this.widthOfEnvironment*0.05 + 20/2;
        var bottomside = this.heightOfEnvironment*0.95 - 20/2;
        var topside = this.heightOfEnvironment*0.05 + 20/2;

        var widthOfContainer = rightside - leftside;
        var heightOfContainer = bottomside - topside;

        var widthOfArray = Math.floor((widthOfContainer-1-(ballDiameter/4))/(ballDiameter*(2)));
        var heightOfArray = Math.floor((heightOfContainer-1-(ballDiameter/4))/(ballDiameter*(2)));

        var maxBallsAmount = widthOfArray*heightOfArray;

        return maxBallsAmount;
    }

    beginSimulation (mass, ballsNumber, lesserVelocity, greaterVelocity, ballsColor) {
        var area = (mass*1000000) / this.defaultDensity;
        var radius = Math.sqrt(area/Math.PI);
        var ballDiameter = radius*2;

        var rightside = this.widthOfEnvironment*0.5 - 20/2;
        var leftside = this.widthOfEnvironment*0.05 + 20/2;
        var bottomside = this.heightOfEnvironment*0.95 - 20/2;
        var topside = this.heightOfEnvironment*0.05 + 20/2;

        var widthOfContainer = rightside - leftside;
        var heightOfContainer = bottomside - topside;

        var widthOfArray = Math.floor((widthOfContainer-1-(ballDiameter/4))/(ballDiameter*(2)));
        var heightOfArray = Math.floor((heightOfContainer-1-(ballDiameter/4))/(ballDiameter*(2)));

        var array = new Array(widthOfArray);

        for (var i = 0; i < array.length; i++)
            array[i] = new Array(heightOfArray);

        for (var i = 0; i < ballsNumber; i++) {
            var angle = (Math.random() * 360) * Math.PI / 180;
            var velocityValue = (Math.random() * (greaterVelocity - lesserVelocity)) + lesserVelocity;
            var vx = velocityValue*Math.cos(angle);
            var vy = velocityValue*Math.sin(angle);

            var posx, posy;

            while ((posx == undefined || posy == undefined) || (array[posx][posy] != undefined)) {
                var posx = Math.floor(Math.random() * widthOfArray);
                var posy = Math.floor(Math.random() * heightOfArray);
            }

            var px = leftside + ballDiameter/2 + 1 + (ballDiameter/4) + posx*(ballDiameter*(2));
            var py = topside + ballDiameter/2 + 1 + (ballDiameter/4) + posy*(ballDiameter*(2));

            var ball = new Ball().setMass(mass).setVelocity(new Vector2D(vx, vy)).setPosition(new Vector2D(px, py)).setCollisive(true).setColor(ballsColor);
            array[posx][posy] = ball;
        }
    }
}