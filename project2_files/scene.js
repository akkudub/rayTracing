   // var camera = [
   //    0,1,2,                     // x,y,z coordinates                                                                                   
   //    4,4,4,                     // Direction normal vector                                                                             
   //    45                         // field of view : example 45                                                                          
   // ];

   // var lights = [
   //    2,                         // number of lights                                                                                    
   //    200,200,200, 0,1,0,        // light 1, x,y,z location, and rgb colour (green)                                                     
   //    100,100,100, 1,1,1,        // light 2, x,y,z location, and rgb colour (white)                                                     
   // ];

   // var objects = [
   //    2,                                                                             // number of objects                               
   //    ObjTyp.SPHERE,      13, 1.0,0.0,0.0,0.2,0.7,0.1,1.0, 100,500,500,40,           // typ,recsz,r,g,b,spec,lamb,amb,opac, x,y,z,rad,           
   //    ObjTyp.SPHERE,      13, 0.0,0.0,1.0,0.2,0.7,0.1,1.0, 200,600,200,20            // typ,recsz,r,g,b,spec,lamb,amb,opac, x,y,z,rad,            

   // ]

// # The Scene
var scene = {};

// ## The Camera
// 0:x, 1:y, 2:z, 3:x_normal, 4:y_normal, 5:z_normal, 6:fov
// scene.camera = [
//    0,1.8,10,   //x, y, z
//    0,3,0,      //x, y, z of vector
//    45          //fov
// ];

// ## The Camera
// 0:x, 1:y, 2:z, 3:x_normal, 4:y_normal, 5:z_normal, 6:fov
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
    {
        // earth
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