// ## The Camera
// 0:x, 1:y, 2:z, 3:x_normal, 4:y_normal, 5:z_normal, 6:fov
var camera = [
   0,1.8,10,   //x, y, z
   50,          //fov
   0,3,0      //x, y, z of vector
];

// ## Lights
// 0:x, 1:y, 2:z
var lights = [
    -30, -10, 20
];

// ## Objects
// 3 cols
var objects = [
   // [0]earth           [1]x,[2]y,[3]z, [4]R,[5]G,[6]B, [7]spec,[8]lamb,[9]amb,[10]rad
   [0,                     0, 3.5,-3,     200, 100, 100,   0.2,    0.7,     0.1,  3.0],
   // [0]big moon        [1]x,[2]y,[3]z, [4]R,[5]G,[6]B, [7]spec,[8]lamb,[9]amb,[10]rad
   [0,                     -4, 3,-1,      155, 200, 0,     0.1,    0.9,     0.0,  0.2],
   // [0]small moon      [1]x,[2]y,[3]z, [4]R,[5]G,[6]B, [7]spec,[8]lamb,[9]amb,[10]rad
   [0,                     -4, 3,-1,      50, 100, 255,    0.2,    0.7,     0.1,  0.1]
];
