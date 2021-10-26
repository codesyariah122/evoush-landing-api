// this will create a blank canvas and import all kaboom functions to global
kaboom();

// init with some configs (check out #KaboomConf for full config list)
// create a game with custom dimension, but stretch to fit container, keeping aspect ratio, with a clear color
kaboom({
    width: 320,
    height: 240,
    stretch: true,
    letterbox: true,
    font: "sinko",
    background: [ 0, 0, 255, ],
});

// all kaboom functions are imported to global automatically
add();
action();
keyPress();
vec2();

// can also prevent kaboom from importing all functions to global and use a context handle
const k = kaboom({ global: false });

k.add(...);
k.action(...);
k.keyPress(...);
k.vec2(...);