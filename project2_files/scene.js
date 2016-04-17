// # The Scene
var scene = {};

// ## The Camera
scene.camera = {
    point: {
        x: 0,
        y: 1.8,
        z: 10
    },
    fieldOfView: 45,
    vector: {
        x: 0,
        y: 3,
        z: 0
    }
};

// ## Lights
scene.lights = [{
    x: -30,
    y: -10,
    z: 20
}];

// ## Objects
scene.objects = [
        // earth
    {
        type: 'sphere',
        point: {
            x: 0,
            y: 3.5,
            z: -3
        },
        color: {
            x: 200,
            y: 100,
            z: 100
        },
        specular: 0.2,
        lambert: 0.7,
        ambient: 0.1,
        radius: 3
    },
    // big moon
    {
        type: 'sphere',
        point: {
            x: -4,
            y: 3,
            z: -1
        },
        color: {
            x: 155,
            y: 200,
            z: 0
        },
        specular: 0.1,
        lambert: 0.9,
        ambient: 0.0,
        radius: 0.2
    },
    // small moon
    {
        type: 'sphere',
        point: {
            x: -4,
            y: 3,
            z: -1
        },
        color: {
            x: 50,
            y: 100,
            z: 255
        },
        specular: 0.2,
        lambert: 0.7,
        ambient: 0.1,
        radius: 0.1
     }
];


// // ## The Camera
// // 0:x, 1:y, 2:z, 3:x_normal, 4:y_normal, 5:z_normal, 6:fov
// var scene_camera = [
//    0,1.8,10,   //x, y, z
//    0,3,0,      //x, y, z of vector
//    45          //fov
// ];

// // ## Lights
// // 0:x, 1:y, 2:z
// var scene_lights = [
//     -30, -10, 20
// ];

// // ## Objects
// // 3 cols
// var scene_objects = [
//    // [0]earth           [1]x,[2]y,[3]z, [4]R,[5]G,[6]B, [7]spec,[8]lamb,[9]amb,[10]rad
//    [ObjTyp.SPHERE,        0, 3.5,-3,     200, 100, 100,   0.2,    0.7,     0.1,  3.0],
//    // [0]big moon        [1]x,[2]y,[3]z, [4]R,[5]G,[6]B, [7]spec,[8]lamb,[9]amb,[10]rad
//    [ObjTyp.SPHERE,        -4, 3,-1,      155, 200, 0,     0.1,    0.9,     0.0,  0.2],
//    // [0]small moon      [1]x,[2]y,[3]z, [4]R,[5]G,[6]B, [7]spec,[8]lamb,[9]amb,[10]rad
//    [ObjTyp.SPHERE,        -4, 3,-1,      50, 100, 255,    0.2,    0.7,     0.1,  0.1]
// ];
