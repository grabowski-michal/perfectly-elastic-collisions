class _02_Simulation {
    constructor (canvasWidth, canvasHeight) {
        this.baffleVelocity = Parameters.DEFAULT_BAFFLE_VELOCITY;
        this.heightOfBaffle = Parameters.Simulation_02.DEFAULT_HEIGHT_OF_BAFFLE;
        this.pipeLength = Parameters.DEFAULT_LENGTH_OF_PIPE;

        this.widthOfEnvironment = canvasWidth+4;
        this.heightOfEnvironment = canvasHeight+4;

        var coords = Parameters.Simulation_02.BOXCOORDS(this.widthOfEnvironment, this.heightOfEnvironment, this.heightOfBaffle, this.pipeLength);
        
        coords.forEach(element => {
            var boxFragment = new Rectangle()
            .setVelocity(new Vector2D (0, 0))
            .setPosition(new Vector2D(element.x_pos, element.y_pos))
            .setCollisive(true)
            .setWidth(element.x_size)
            .setHeight(element.y_size);

            if (element.label == "prop1") {
                this.prop1 = boxFragment;
                boxFragment.name = "prop";
            } else if (element.label == "prop2") {
                this.prop2 = boxFragment;
                boxFragment.name = "prop";
            } else if (element.label == "baffle1" || element.label == "baffle2") {
                this.baffle = boxFragment.setColor("#555");
                boxFragment.name = element.label;
            }
        })


    }

    changeBaffleHeight (newHeight) {
        this.heightOfBaffle = (newHeight/100); // %
        var new_coords = Parameters.Simulation_02.BOXCOORDS(this.widthOfEnvironment, this.heightOfEnvironment, (newHeight/100), this.pipeLength);

        for (var i = 0; i < new_coords.length; i++) {
            time.space.elements[i].setPosition(new Vector2D(new_coords[i].x_pos, new_coords[i].y_pos));
            time.space.elements[i].setWidth(new_coords[i].x_size);
            time.space.elements[i].setHeight(new_coords[i].y_size);
        }
    }

    changePipeLength (newLength) {
        this.pipeLength = (newLength/100); // %
        var new_coords = Parameters.Simulation_02.BOXCOORDS(this.widthOfEnvironment, this.heightOfEnvironment, this.heightOfBaffle, (newLength/100));

        for (var i = 0; i < new_coords.length; i++) {
            time.space.elements[i].setPosition(new Vector2D(new_coords[i].x_pos, new_coords[i].y_pos));
            time.space.elements[i].setWidth(new_coords[i].x_size);
            time.space.elements[i].setHeight(new_coords[i].y_size);
        }
    }

    openBaffle () {
        var spaceElementsInTimeLength = time.space.elements.length;
        for (var k = 0; k < spaceElementsInTimeLength; k++) {
            if (time.space.elements[k] != undefined) {
                if (time.space.elements[k].name == "baffle1" || time.space.elements[k].name == "baffle2") { time.space.elements[k].remove(); k--; }
            }
        }

        var new_coords = Parameters.Simulation_02.BOXCOORDS(this.widthOfEnvironment, this.heightOfEnvironment, this.heightOfBaffle, this.pipeLength);
        var baffle_coords1 = new_coords[new_coords.findIndex((x) => { return x.label == "baffle1" })];
        var baffle_coords2 = new_coords[new_coords.findIndex((x) => { return x.label == "baffle2" })];
        var divide_coords = [
            { x_pos: baffle_coords1.x_pos, y_pos: baffle_coords1.y_pos - baffle_coords1.y_size/4, x_size: 20, y_size: baffle_coords1.y_size/2, label: "baffle1", velocity: (-1)*this.baffleVelocity },
            { x_pos: baffle_coords1.x_pos, y_pos: baffle_coords1.y_pos + baffle_coords1.y_size/4, x_size: 20, y_size: baffle_coords1.y_size/2, label: "baffle1", velocity: this.baffleVelocity },
            { x_pos: baffle_coords2.x_pos, y_pos: baffle_coords2.y_pos - baffle_coords2.y_size/4, x_size: 20, y_size: baffle_coords2.y_size/2, label: "baffle2", velocity: (-1)*this.baffleVelocity },
            { x_pos: baffle_coords2.x_pos, y_pos: baffle_coords2.y_pos + baffle_coords2.y_size/4, x_size: 20, y_size: baffle_coords2.y_size/2, label: "baffle2", velocity: this.baffleVelocity },
        ];

        divide_coords.forEach(baffleFragment => {
            var rectangle = new Rectangle()
            .setVelocity(new Vector2D (0, 0))
            .setPosition(new Vector2D(baffleFragment.x_pos, baffleFragment.y_pos))
            .setWidth(baffleFragment.x_size)
            .setHeight(baffleFragment.y_size);

            rectangle.mobile = true;
            rectangle.setVelocity(new Vector2D(0, baffleFragment.velocity));
            rectangle.intervalFunction = function () {
                if (this.position.y < simulation.heightOfEnvironment*0.05 + 2 - baffle_coords1.y_size/4 || this.position.y > simulation.heightOfEnvironment*0.95 - 2 + baffle_coords1.y_size/4) this.setVelocity(new Vector2D(0,0));
            }
        });
    }

    checkMaxBallsAmount (mass) {
        var area = (mass*1000000) / Parameters.DEFAULT_DENSITY;
        var radius = Math.sqrt(area/Math.PI);
        var ballDiameter = radius*2;

        var rightside = Parameters.Simulation_02.rightside;
        var leftside = Parameters.Simulation_02.leftside;
        var bottomside = Parameters.Simulation_02.bottomside;
        var topside = Parameters.Simulation_02.topside;

        var widthOfContainer = rightside - leftside;
        var heightOfContainer = bottomside - topside;

        var widthOfArray = Math.floor((widthOfContainer-1-(ballDiameter/4))/(ballDiameter*(2)));
        var heightOfArray = Math.floor((heightOfContainer-1-(ballDiameter/4))/(ballDiameter*(2)));

        var maxBallsAmount = widthOfArray*heightOfArray;

        return maxBallsAmount;
    }

    beginSimulation (mass, ballsNumber, lesserVelocity, greaterVelocity, ballsColor, gradient) {
        var area = (mass*1000000) / Parameters.DEFAULT_DENSITY;
        var radius = Math.sqrt(area/Math.PI);

        space.initiateSections(radius, this.widthOfEnvironment, this.heightOfEnvironment);
        window.onkeydown = function (event) {
            if (event.key == "Escape") {
                time.Stop();
            }
        }
        var body = document.getElementsByTagName("body")[0];
        var stopScript = document.createElement("span")
        stopScript.setAttribute("id", "stopScript");
        stopScript.innerHTML = "[ESC] - zatrzymaj skrypt";
        body.appendChild(stopScript);

        var ballDiameter = radius*2;

        var rightside = Parameters.Simulation_02.rightside;
        var leftside = Parameters.Simulation_02.leftside;
        var bottomside = Parameters.Simulation_02.bottomside;
        var topside = Parameters.Simulation_02.topside;

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

            var ball = new Ball().setMass(mass).setVelocity(new Vector2D(vx, vy)).setPosition(new Vector2D(px, py)).setCollisive(true).setColor(ballsColor, gradient);
            array[posx][posy] = ball;
        }
    }

    ballsCounter () {
        if (document.getElementById("infoAboutAmount1") != null && document.getElementById("infoAboutAmount2") != null) {
            document.getElementById("infoAboutAmount1").innerHTML = "<span class='amountLabel'> Ilość kul w lewym pojemniku </span>" +
            time.space.CountBalls(new Vector2D(Parameters.Simulation_02.leftside, Parameters.Simulation_02.topside), new Vector2D(Parameters.Simulation_02.rightside, Parameters.Simulation_02.topside),
                        new Vector2D(Parameters.Simulation_02.leftside, Parameters.Simulation_02.bottomside), new Vector2D(Parameters.Simulation_02.rightside, Parameters.Simulation_02.bottomside));
            
            document.getElementById("infoAboutAmount2").innerHTML = "<span class='amountLabel'> Ilość kul w lewym pojemniku </span>" +
            time.space.CountBalls(new Vector2D(Parameters.Simulation_02.rightbox.leftside, Parameters.Simulation_02.topside), new Vector2D(Parameters.Simulation_02.rightbox.rightside, Parameters.Simulation_02.topside),
                        new Vector2D(Parameters.Simulation_02.rightbox.leftside, Parameters.Simulation_02.bottomside), new Vector2D(Parameters.Simulation_02.rightbox.rightside, Parameters.Simulation_02.bottomside));

            document.getElementById("infoAboutAmount3").innerHTML = "<span class='amountLabel'> Ilość kul w rurce </span>" +
            time.space.CountBalls(new Vector2D(Parameters.Simulation_02.rightside, Parameters.Simulation_02.topside), new Vector2D(Parameters.Simulation_02.rightbox.leftside, Parameters.Simulation_02.topside),
            new Vector2D(Parameters.Simulation_02.rightside, Parameters.Simulation_02.bottomside), new Vector2D(Parameters.Simulation_02.rightbox.leftside, Parameters.Simulation_02.bottomside));

        }
    }

    parametersControl () {
        document.getElementById("baffle").oninput = () => {
            simulation.changeBaffleHeight(document.getElementById("baffle").value);
        }

        document.getElementById("pipe").oninput = () => {
            simulation.changePipeLength(parseFloat(document.getElementById("pipe").value));
            document.getElementById("mass").oninput();
        }

        document.getElementById("mass").oninput = function () {
            maxBalls = simulation.checkMaxBallsAmount(parseFloat(document.getElementById("mass").value));
            document.getElementById("amount").setAttribute("max", maxBalls);
            document.getElementById("maxBalls").innerHTML = maxBalls;
            if (parseInt(document.getElementById("amount").value) > maxBalls) document.getElementById("amount").value = maxBalls;
            document.getElementById("amount").oninput();
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

        document.getElementById("beginSimulation").onclick = function () {
            if (parseFloat(document.getElementById("lesserVelocity").value) <= parseFloat(document.getElementById("greaterVelocity").value) && !(isNaN(parseFloat(document.getElementById("lesserVelocity").value))) && !(isNaN(parseFloat(document.getElementById("greaterVelocity").value)))) {
                if (block == false && error == false) {
                    var maxvel = parseFloat(document.getElementById("greaterVelocity").value);
                    var minvel = parseFloat(document.getElementById("lesserVelocity").value);
                    var proportion = maxvel / minvel;
                    maxvel /= proportion;
                    minvel /= proportion;
                    Parameters.DEFAULT_MAX_VELOCITY = maxvel;
                    time.framesPerSecond = 60 * proportion;
                    space.frequencyFactor = parseFloat(Parameters.DEFAULT_MAX_VELOCITY) + 1;

                    block = true;
                    simulation.beginSimulation(parseFloat(document.getElementById("mass").value), parseFloat(document.getElementById("amount").value), minvel, maxvel, (document.getElementById("ballsColor").value), document.getElementById("gradient").checked);
                    document.getElementById("options").remove();

                    var infoAboutAmount1 = document.createElement("div"), infoAboutAmount2 = document.createElement("div"), infoAboutAmount3 = document.createElement("div");
                    var body = document.getElementsByTagName("body")[0];
                    infoAboutAmount1.style.left = "30vw"; infoAboutAmount2.style.left= "70vw"; infoAboutAmount3.style.left= "50vw";
                    infoAboutAmount1.setAttribute("id", "infoAboutAmount1"); infoAboutAmount2.setAttribute("id", "infoAboutAmount2"); infoAboutAmount3.setAttribute("id", "infoAboutAmount3");
                    body.appendChild(infoAboutAmount1); body.appendChild(infoAboutAmount2); body.appendChild(infoAboutAmount3);

                    var openBaffle = document.createElement("div");
                    openBaffle.setAttribute("id", "openBaffle");
                    openBaffle.innerHTML = "Otwórz przegrodę";
                    body.appendChild(openBaffle);
                    openBaffle.onclick = function () {
                        openBaffle.remove();
                        simulation.openBaffle();
                        time.SetTimerFromNow();
                        var body = document.getElementsByTagName("body")[0];
                        var timerDiv = document.createElement("div");
                        timerDiv.setAttribute("id", "timerDiv");
                        body.appendChild(timerDiv);
                    }
                }
            } else {
                alert("Ustaw poprawny przedział długości wek. prędkości.");
            }
        }

        document.getElementById("baffleVelocity").oninput = function () {
            document.getElementById("baffleVelSpan").innerHTML = parseInt(document.getElementById("baffleVelocity").value) + "px/s";
            simulation.baffleVelocity = parseInt(document.getElementById("baffleVelocity").value);
        }

        document.getElementById("amount").oninput();
        document.getElementById("baffle").oninput();
        document.getElementById("baffleVelocity").oninput();
        document.getElementById("pipe").oninput();
        document.getElementById("mass").oninput();
    }

    showTime (timeString) {
        if (document.getElementById("timerDiv") != undefined) {
            document.getElementById("timerDiv").innerHTML = timeString;
        }
    }
}