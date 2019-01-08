class _01_Simulation {
    constructor (canvasWidth, canvasHeight) {
        this.baffleVelocity = Parameters.DEFAULT_BAFFLE_VELOCITY;
        this.heightOfBaffle = Parameters.DEFAULT_HEIGHT_OF_BAFFLE;

        this.widthOfEnvironment = canvasWidth+4;
        this.heightOfEnvironment = canvasHeight+4;

        var coords = Parameters.Simulation_01.BOXCOORDS(this.widthOfEnvironment, this.heightOfEnvironment, this.heightOfBaffle);

        coords.forEach(element => {
            var boxFragment = new Rectangle()
            .setVelocity(new Vector2D (0, 0))
            .setPosition(new Vector2D(element.x_pos, element.y_pos))
            .setCollisive(true)
            .setWidth(element.x_size)
            .setHeight(element.y_size);

            if (element.label == "prop1") {
                this.prop1 = boxFragment;
            } else if (element.label == "prop2") {
                this.prop2 = boxFragment;
            } else if (element.label == "baffle") {
                this.baffle = boxFragment.setColor("#555");
                boxFragment.name = "baffle";
            }
        })
    }

    changeBaffleHeight (newHeight) {
        this.heightOfBaffle = (newHeight/100); // %
        var new_coords = Parameters.Simulation_01.BOXCOORDS(this.widthOfEnvironment, this.heightOfEnvironment, (newHeight/100));

        new_coords.forEach(element => {
            if (element.label == "prop1") {
                this.prop2.setPosition(new Vector2D(element.x_pos, element.y_pos));
                this.prop2.setHeight(element.y_size);
            } else if (element.label == "prop2") {
                this.prop1.setPosition(new Vector2D(element.x_pos, element.y_pos));
                this.prop1.setHeight(element.y_size);
            } else if (element.label == "baffle") {
                this.baffle.setHeight(element.y_size);
            }
        })
    }

    openBaffle () {
        for (var k = 0; k < time.space.elements.length; k++) {
            if (time.space.elements[k].name == "baffle") time.space.elements[k].remove();
        }

        var new_coords = Parameters.Simulation_01.BOXCOORDS(this.widthOfEnvironment, this.heightOfEnvironment, this.heightOfBaffle);
        var baffle_coords = new_coords[new_coords.findIndex((x) => { return x.label == "baffle" })];
        var divide_coords = [
            { x_pos: baffle_coords.x_pos, y_pos: baffle_coords.y_pos - baffle_coords.y_size/4, x_size: 20, y_size: baffle_coords.y_size/2, label: "baffle", velocity: (-1)*this.baffleVelocity },
            { x_pos: baffle_coords.x_pos, y_pos: baffle_coords.y_pos + baffle_coords.y_size/4, x_size: 20, y_size: baffle_coords.y_size/2, label: "baffle", velocity: this.baffleVelocity },
        ]

        divide_coords.forEach(baffleFragment => {
            var rectangle = new Rectangle()
            .setVelocity(new Vector2D (0, 0))
            .setPosition(new Vector2D(baffleFragment.x_pos, baffleFragment.y_pos))
            .setWidth(baffleFragment.x_size)
            .setHeight(baffleFragment.y_size);

            rectangle.mobile = true;
            rectangle.setVelocity(new Vector2D(0, baffleFragment.velocity));
        });
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
        var area = (mass*1000000) / Parameters.DEFAULT_DENSITY;
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
        var area = (mass*1000000) / Parameters.DEFAULT_DENSITY;
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

    parametersControl () {
        document.getElementById("baffle").oninput = () => {
            simulation.changeBaffleHeight(document.getElementById("baffle").value);
        }

        document.getElementById("mass").oninput = function () {
            maxBalls = simulation.checkMaxBallsAmount(parseFloat(document.getElementById("mass").value));
            document.getElementById("amount").setAttribute("max", maxBalls);
            document.getElementById("maxBalls").innerHTML = maxBalls;
            if (parseInt(document.getElementById("amount").value) > maxBalls) document.getElementById("amount").value = maxBalls;
        }

        document.getElementById("amount").oninput = function () {
            if (document.getElementById("amount").value > maxBalls || isNaN(parseFloat(document.getElementById("amount").value))) {
                document.getElementById("maxBalls").style.color = "red";
                error = true;
            } else {
                document.getElementById("maxBalls").style.color = "lime";
                error = false;
            }
        }

        document.getElementById("baffleVelocity").oninput = function () {
            document.getElementById("baffleVelSpan").innerHTML = parseInt(document.getElementById("baffleVelocity").value) + "px/s";
            simulation.baffleVelocity = parseInt(document.getElementById("baffleVelocity").value);
        }

        document.getElementById("beginSimulation").onclick = function () {
            if (parseFloat(document.getElementById("lesserVelocity").value) <= parseFloat(document.getElementById("greaterVelocity").value) && !(isNaN(parseFloat(document.getElementById("lesserVelocity").value))) && !(isNaN(parseFloat(document.getElementById("greaterVelocity").value)))) {
                if (block == false && error == false) {
                    space.frequencyFactor = parseFloat(document.getElementById("greaterVelocity").value) + 1;

                    block = true;
                    simulation.beginSimulation (parseFloat(document.getElementById("mass").value), parseFloat(document.getElementById("amount").value), parseFloat(document.getElementById("lesserVelocity").value), parseFloat(document.getElementById("greaterVelocity").value), (document.getElementById("ballsColor").value));
                    document.getElementById("options").remove();

                    var infoAboutAmount1 = document.createElement("div"), infoAboutAmount2 = document.createElement("div");
                    var body = document.getElementsByTagName("body")[0];
                    infoAboutAmount1.setAttribute("id", "infoAboutAmount1"); infoAboutAmount2.setAttribute("id", "infoAboutAmount2");
                    body.appendChild(infoAboutAmount1); body.appendChild(infoAboutAmount2);

                    var openBaffle = document.createElement("div");
                    openBaffle.setAttribute("id", "openBaffle");
                    openBaffle.innerHTML = "Otwórz przegrodę";
                    body.appendChild(openBaffle);
                    openBaffle.onclick = function () {
                        openBaffle.remove();
                        simulation.openBaffle();
                    }
                }
            } else {
                alert("Ustaw poprawny przedział długości wek. prędkości.");
            }
        }

        document.getElementById("mass").oninput();
        document.getElementById("amount").oninput();
        document.getElementById("baffle").oninput();
        document.getElementById("baffleVelocity").oninput();
    }
}