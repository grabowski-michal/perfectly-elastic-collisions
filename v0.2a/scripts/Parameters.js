var Parameters = {
    DEFAULT_DENSITY: 7874, // (density of iron)
    DEFAULT_BAFFLE_VELOCITY: 8, // (px/s)
    DEFAULT_HEIGHT_OF_BAFFLE: 1/3, // 33.3% height of the rectangle

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
        
    }
};