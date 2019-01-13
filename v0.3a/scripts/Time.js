class Time {
    constructor (framesPerSecond, space) {
        this.framesPerSecond = framesPerSecond;
        this.space = space;
        this.frame = 0;
        this.units = {
            millisecond: 0,
            second: 0,
            minute: 0,
            hour: 0
        }
        this.dateToSubtractFrom = new Date();

        this.StartInterval();
    }

    MakeAFrame () {
        this.space.evalAllTheElements();
        simulation.ballsCounter();
    };

    Visualize () {
        this.space.drawAllTheElements();
        simulation.showTime(this.TimerInterval());
    }

    StartInterval () {
        var lastTime = Date.now();
        var remainderOfTime = 0;

        this.interval = setInterval(() => {
            this.MakeAFrame();
            this.Visualize();
        }, 1000/this.framesPerSecond * 1/(this.space.frequencyFactor * 2));
    }

    Stop () {
        clearInterval(this.interval);
        null.dummy;
    }

    SetTimerFromNow () {
        this.units = {
            millisecond: 0,
            second: 0,
            minute: 0,
            hour: 0
        }
        this.dateToSubtractFrom = new Date();
    }

    TimerInterval () {
        var show_time = "";
        var date = new Date();

        if (date.getMilliseconds() >= this.dateToSubtractFrom.getMilliseconds()) {
            this.units.millisecond = (date.getMilliseconds()-this.dateToSubtractFrom.getMilliseconds());
            if (date.getSeconds() >= this.dateToSubtractFrom.getSeconds()) {
                this.units.second = (date.getSeconds()-this.dateToSubtractFrom.getSeconds());
                if (date.getMinutes() >= this.dateToSubtractFrom.getMinutes()) {
                    this.units.minute = (date.getMinutes()-this.dateToSubtractFrom.getMinutes());
                    this.units.hour = (date.getHours()-this.dateToSubtractFrom.getHours());
                } else if (date.getMinutes() < this.dateToSubtractFrom.getMinutes()) {
                    this.units.minute = (60-this.dateToSubtractFrom.getMinutes())+date.getMinutes();
                }
            } else if (date.getSeconds() < this.dateToSubtractFrom.getSeconds()) {
                this.units.second = (60-this.dateToSubtractFrom.getSeconds())+date.getSeconds();
            }
        } else {
            this.units.millisecond = (1000-this.dateToSubtractFrom.getMilliseconds())+date.getMilliseconds();
        }

        if (this.units.hour < 10) show_time += "0"+this.units.hour+":";
        else show_time += this.units.hour+":";

        if (this.units.minute < 10) show_time += "0"+this.units.minute+":";
        else show_time += this.units.minute+":";

        if (this.units.second < 10) show_time += "0"+this.units.second+".";
        else  show_time += this.units.second+".";

        if (this.units.millisecond < 10) show_time += "00"+this.units.millisecond;
        else if (this.units.millisecond > 10 && this.units.millisecond < 100) show_time += "0"+this.units.millisecond;
        else show_time += this.units.millisecond;

        return show_time;
    }
}