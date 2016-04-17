// # Vector Operations
var Vector = {};

// # Constants
// Vector.UP = { x: 0, y: 1, z: 0 };
// Vector.ZERO = { x: 0, y: 0, z: 0 };
// Vector.WHITE = { x: 255, y: 255, z: 255 };

// # Operations
Vector.dotProduct = function(a, b) {
    return (a.x * b.x) + (a.y * b.y) + (a.z * b.z);
};

Vector.crossProduct = function(a, b) {
    return {
        x: (a.y * b.z) - (a.z * b.y),
        y: (a.z * b.x) - (a.x * b.z),
        z: (a.x * b.y) - (a.y * b.x)
    };
};

Vector.scale = function(a, t) {
    return {
        x: a.x * t,
        y: a.y * t,
        z: a.z * t
    };
};

Vector.unitVector = function(a) {
    return Vector.scale(a, 1 / Vector.length(a));
};

Vector.add = function(a, b) {
    return {
        x: a.x + b.x,
        y: a.y + b.y,
        z: a.z + b.z
    };
};

Vector.add3 = function(a, b, c) {
    return {
        x: a.x + b.x + c.x,
        y: a.y + b.y + c.y,
        z: a.z + b.z + c.z
    };
};

Vector.subtract = function(a, b) {
    return {
        x: a.x - b.x,
        y: a.y - b.y,
        z: a.z - b.z
    };
};

Vector.length = function(a) {
    return Math.sqrt(Vector.dotProduct(a, a));
};

Vector.reflectThrough = function(a, normal) {
    var d = Vector.scale(normal, Vector.dotProduct(a, normal));
    return Vector.subtract(Vector.scale(d, 2), a);
};

//dot
var Vector_dotProduct = function(a_x, a_y, a_z, b_x, b_y, b_z){
    return (a_x * b_x) + (a_y * b_y) + (a_z * b_z);
};

//length
var Vector_length = function(a_x, a_y, a_z) {
    return Math.sqrt(Vector_dotProduct(a_x, a_y, a_z, a_x, a_y, a_z));
};

//cross
var res_x, res_y, res_z;
var a_x, a_y, a_z, b_x, b_y, b_z;

res_x = (a_y * b_z) - (a_z * b_y);
res_y = (a_z * b_x) - (a_x * b_z);
res_z = (a_x * b_y) - (a_y * b_x);

//scale
var res_x, res_y, res_z;
var a_x, a_y, a_z;
var t;

res_x = a_x * t,
res_y = a_y * t,
res_z = a_z * t

//unit
var res_x, res_y, res_z;
var a_x, a_y, a_z;

var vec_length = Vector_length(a_x, a_y, a_z);
res_x = a_x / vec_length
res_y = a_y / vec_length
res_z = a_z / vec_length

//add
var res_x, res_y, res_z;
var a_x, a_y, a_z, b_x, b_y, b_z;

res_x = a_x + b_x;
res_y = a_y + b_y;
res_z = a_z + b_z;

//add3
var res_x, res_y, res_z;
var a_x, a_y, a_z, b_x, b_y, b_z, c_x, c_y, c_z;

res_x = a_x + b_x + c_x;
res_y = a_y + b_y + c_y;
res_z = a_z + b_z + c_z;

//subtract
var res_x, res_y, res_z;
var a_x, a_y, a_z, b_x, b_y, b_z;

res_x = a_x - b_x;
res_y = a_y - b_y;
res_z = a_z - b_z;


//reflect
var res_x, res_y, res_z;
var a_x, a_y, a_z, norm_x, norm_y, norm_z;
    //dotproduct
    var scale_factor = Vector_dotProduct(a_x, a_y, a_z, norm_x, norm_y, norm_z);
    //scale
    var temp_x, temp_y, temp_z;

    temp_x = norm_x * scale_factor;
    temp_y = norm_y * scale_factor;
    temp_z = norm_z * scale_factor;

    //scale 2nd
    temp_x = a_x * 2;
    temp_y = a_y * 2;
    temp_z = a_z * 2;

    //subtract
    res_x = temp_x - a_x;
    res_y = temp_y - a_y;
    res_z = temp_z - a_z;