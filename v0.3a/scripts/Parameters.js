var Parameters = {
    DEFAULT_DENSITY: 7874, // (density of iron)
    DEFAULT_BAFFLE_VELOCITY: 8, // (px/s)
    DEFAULT_HEIGHT_OF_BAFFLE: 1/3, // 33.3% height of the rectangle
    DEFAULT_LENGTH_OF_PIPE: 4/10, // 40% width of screen
    DEFAULT_MAX_VELOCITY: 1,

    Simulation_01: {
        BOXCOORDS: function (x, y, h) {
            return [
                { x_pos: x*0.5,     y_pos: y*0.95,                          x_size: x*0.9+20,   y_size: 20 },
                { x_pos: x*0.05,    y_pos: y*0.5,                           x_size: 20,         y_size: y*0.9-19 },
                { x_pos: x*0.5,     y_pos: y*0.05,                          x_size: x*0.9+20,   y_size: 20 },
                { x_pos: x*0.95,    y_pos: y*0.5,                           x_size: 20,         y_size: y*0.9-19 },
                { x_pos: x*0.5,     y_pos: y*(0.275-0.225*h)+4.75*h+5.25,   x_size: 20,         y_size: y*(0.45-0.45*h)+9.5*h-8.5,  label: "prop1" },
                { x_pos: x*0.5,     y_pos: y*(0.225*h+0.725)-5.25-4.75*h,   x_size: 20,         y_size: y*(0.45-0.45*h)+9.5*h-8.5,  label: "prop2" },
                { x_pos: x*0.5,     y_pos: y*0.5,                           x_size: 20,         y_size: ((y*0.9)-20+1)*h+1,         label: "baffle" }
            ];
        },
    },

    Simulation_02: {
        BOXCOORDS: function (x, y, h, l) {
            Parameters.Simulation_02.rightside = x*0.5-(x/2-x*(l/2))/2-20;
            Parameters.Simulation_02.leftside = 20;
            Parameters.Simulation_02.bottomside = y*0.95-20;
            Parameters.Simulation_02.topside = y*0.05+20;

            Parameters.Simulation_02.rightbox.rightside = x-25;
            Parameters.Simulation_02.rightbox.leftside = x*0.5+(x/2-x*(l/2))/2+20;

            return [
                { x_pos: x/2,     y_pos: y*(0.275-0.225*h)+4.75*h+5.25,                          x_size: x/2-x*(l/2)+2,   y_size: 20 },
                { x_pos: x/2,     y_pos: y*(0.225*h+0.725)-5.25-4.75*h,                          x_size: x/2-x*(l/2)+2,   y_size: 20 },
                { x_pos: x/2-(x/2-x*(l/2)+2)/2-(x*0.5-(x/2-x*(l/2))/2-10)/2+1,     y_pos: y*0.05+10,                          x_size: (x*0.5-(x/2-x*(l/2))/2-10),   y_size: 20 },
                { x_pos: x/2-(x/2-x*(l/2)+2)/2-(x*0.5-(x/2-x*(l/2))/2-10)/2+1,     y_pos: y*0.95-10,                          x_size: (x*0.5-(x/2-x*(l/2))/2-10),   y_size: 20 },
                { x_pos: 10,    y_pos: y*0.5,                           x_size: 20,         y_size: y*0.9 },
                { x_pos: x/2+(x/2-x*(l/2)+2)/2+(x*0.5-(x/2-x*(l/2))/2-10)/2-1,     y_pos: y*0.05+10,                          x_size: (x*0.5-(x/2-x*(l/2))/2-10),   y_size: 20 },
                { x_pos: x/2+(x/2-x*(l/2)+2)/2+(x*0.5-(x/2-x*(l/2))/2-10)/2-1,     y_pos: y*0.95-10,                          x_size: (x*0.5-(x/2-x*(l/2))/2-10),   y_size: 20 },
                { x_pos: x-15,    y_pos: y*0.5,                           x_size: 20,         y_size: y*0.9 },
                { x_pos: x*0.5-(x/2-x*(l/2))/2-10,     y_pos: y*0.5+((y*(0.225*h+0.725)-5.25-4.75*h)-(y*(0.275-0.225*h)+4.75*h+5.25)-20)/2+(((9/10)*y-19)*((1-h)/4)+1)/2,   x_size: 20,         y_size: ((9/10)*y-19)*((1-h)/4)+1,  label: "prop1" },
                { x_pos: x*0.5-(x/2-x*(l/2))/2-10,     y_pos: y*0.5-((y*(0.225*h+0.725)-5.25-4.75*h)-(y*(0.275-0.225*h)+4.75*h+5.25)-20)/2-(((9/10)*y-19)*((1-h)/4)+1)/2,   x_size: 20,         y_size: ((9/10)*y-19)*((1-h)/4)+1,  label: "prop2" },
                { x_pos: x*0.5+(x/2-x*(l/2))/2+10,     y_pos: y*0.5+((y*(0.225*h+0.725)-5.25-4.75*h)-(y*(0.275-0.225*h)+4.75*h+5.25)-20)/2+(((9/10)*y-19)*((1-h)/4)+1)/2,   x_size: 20,         y_size: ((9/10)*y-19)*((1-h)/4)+1,  label: "prop1" },
                { x_pos: x*0.5+(x/2-x*(l/2))/2+10,     y_pos: y*0.5-((y*(0.225*h+0.725)-5.25-4.75*h)-(y*(0.275-0.225*h)+4.75*h+5.25)-20)/2-(((9/10)*y-19)*((1-h)/4)+1)/2,   x_size: 20,         y_size: ((9/10)*y-19)*((1-h)/4)+1,  label: "prop2" },
                { x_pos: x*0.5-(x/2-x*(l/2))/2-10,     y_pos: y*0.5,                           x_size: 20,         y_size: (y*(0.225*h+0.725)-5.25-4.75*h)-(y*(0.275-0.225*h)+4.75*h+5.25)-20+1,         label: "baffle1" },
                { x_pos: x*0.5+(x/2-x*(l/2))/2+10,     y_pos: y*0.5,                           x_size: 20,         y_size: (y*(0.225*h+0.725)-5.25-4.75*h)-(y*(0.275-0.225*h)+4.75*h+5.25)-20+1,         label: "baffle2" }
            ];
        },
        DEFAULT_HEIGHT_OF_BAFFLE: 1/5,
        rightside: 0,
        leftside: 0,
        bottomside: 0,
        topside: 0,
        rightbox: {
            rightside: 0,
            leftside: 0,
        }
    }
};