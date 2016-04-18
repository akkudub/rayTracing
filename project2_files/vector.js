//dot
var Vector_dotProduct = function(a_x, a_y, a_z, b_x, b_y, b_z){
    return (a_x * b_x) + (a_y * b_y) + (a_z * b_z);
};

//length
var Vector_length = function(a_x, a_y, a_z) {
    return Math.sqrt(Vector_dotProduct(a_x, a_y, a_z, a_x, a_y, a_z));
};


// this section is for reference
//cross
// var res_x, res_y, res_z;
// var a_x, a_y, a_z, b_x, b_y, b_z;

// res_x = (a_y * b_z) - (a_z * b_y);
// res_y = (a_z * b_x) - (a_x * b_z);
// res_z = (a_x * b_y) - (a_y * b_x);

// //scale
// var res_x, res_y, res_z;
// var a_x, a_y, a_z;
// var t;

// res_x = a_x * t,
// res_y = a_y * t,
// res_z = a_z * t

// //unit
// var res_x, res_y, res_z;
// var a_x, a_y, a_z;

// var vec_length = Vector_length(a_x, a_y, a_z);
// res_x = a_x / vec_length
// res_y = a_y / vec_length
// res_z = a_z / vec_length

// //add
// var res_x, res_y, res_z;
// var a_x, a_y, a_z, b_x, b_y, b_z;

// res_x = a_x + b_x;
// res_y = a_y + b_y;
// res_z = a_z + b_z;

// //add3
// var res_x, res_y, res_z;
// var a_x, a_y, a_z, b_x, b_y, b_z, c_x, c_y, c_z;

// res_x = a_x + b_x + c_x;
// res_y = a_y + b_y + c_y;
// res_z = a_z + b_z + c_z;

// //subtract
// var res_x, res_y, res_z;
// var a_x, a_y, a_z, b_x, b_y, b_z;

// res_x = a_x - b_x;
// res_y = a_y - b_y;
// res_z = a_z - b_z;


// //reflect
// var res_x, res_y, res_z;
// var a_x, a_y, a_z, norm_x, norm_y, norm_z;
//     //dotproduct
//     var scale_factor = Vector_dotProduct(a_x, a_y, a_z, norm_x, norm_y, norm_z);
//     //scale
//     var temp_x, temp_y, temp_z;

//     temp_x = norm_x * scale_factor;
//     temp_y = norm_y * scale_factor;
//     temp_z = norm_z * scale_factor;

//     //scale 2nd
//     temp_x = a_x * 2;
//     temp_y = a_y * 2;
//     temp_z = a_z * 2;

//     //subtract
//     res_x = temp_x - a_x;
//     res_y = temp_y - a_y;
//     res_z = temp_z - a_z;