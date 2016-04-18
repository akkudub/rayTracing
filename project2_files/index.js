// # GPU Aceelerated Raytracing

// # Setup
var mainCanvas = document.getElementById('mainCanvas'),
    width = 800 * 0.5,
    height = 800 * 0.5;

mainCanvas.width = width;
mainCanvas.height = height;
mainCanvas.style.cssText = 'width:' + (width * 2) + 'px;height:' + (height*2) + 'px';
var ctx = mainCanvas.getContext('2d'),
    data = ctx.getImageData(0, 0, width, height);

// # Throwing Rays
function render(camera, objects, lights) {
    // first 'unpack' the scene to make it easier to reference
    var n_camera_point_x     = camera[0],
        n_camera_point_y     = camera[1],
        n_camera_point_z     = camera[2],
        n_camera_fieldOfView = camera[3],
        n_camera_vector_x    = camera[4],
        n_camera_vector_y    = camera[5],
        n_camera_vector_z    = camera[6],

        n_objects = objects,
        n_lights_x = lights[0],
        n_lights_y = lights[1],
        n_lights_z = lights[2];

    // subtract
    var eyeVector_x = n_camera_vector_x - n_camera_point_x,
        eyeVector_y = n_camera_vector_y - n_camera_point_y,
        eyeVector_z = n_camera_vector_z - n_camera_point_z;
    // unit vector
    var eyeVector_len = Vector_length(eyeVector_x,eyeVector_y,eyeVector_z);
        eyeVector_x /= eyeVector_len;
        eyeVector_y /= eyeVector_len;
        eyeVector_z /= eyeVector_len;
   
    // cross product
    var vpRight_x = (eyeVector_y * Vector_UP_z) - (eyeVector_z * Vector_UP_y),
        vpRight_y = (eyeVector_z * Vector_UP_x) - (eyeVector_x * Vector_UP_z),
        vpRight_z = (eyeVector_x * Vector_UP_y) - (eyeVector_y * Vector_UP_x);
    // unit vector
    var vpRight_len = Vector_length(vpRight_x,vpRight_y,vpRight_z);
        vpRight_x /= vpRight_len;
        vpRight_y /= vpRight_len;
        vpRight_z /= vpRight_len;
    
    // cross product
    var vpUp_x = (vpRight_y * eyeVector_z) - (vpRight_z * eyeVector_y),
        vpUp_y =  (vpRight_z * eyeVector_x) - (vpRight_x * eyeVector_z),
        vpUp_z =  (vpRight_x * eyeVector_y) - (vpRight_y * eyeVector_x);
    // unit vector
    var vpUp_len = Vector_length(vpUp_x,vpUp_y,vpUp_z);
        vpUp_x /= vpUp_len;
        vpUp_y /= vpUp_len;
        vpUp_z /= vpUp_len;

    var fovRadians = Math.PI * (n_camera_fieldOfView / 2) / 180,
        heightWidthRatio = height / width,
        halfWidth = Math.tan(fovRadians),
        halfHeight = heightWidthRatio * halfWidth,
        camerawidth = halfWidth * 2,
        cameraheight = halfHeight * 2,
        pixelWidth = camerawidth / (width - 1),
        pixelHeight = cameraheight / (height - 1);

    var index, color_R, color_G, color_B;
    var ray_x = n_camera_point_x, 
        ray_y = n_camera_point_y,
        ray_z = n_camera_point_z;
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {

            // scale
            var xfactor = (x * pixelWidth) - halfWidth,
                xcomp_x = vpRight_x * xfactor,
                xcomp_y = vpRight_y * xfactor,
                xcomp_z = vpRight_z * xfactor;

            // scale
            var yfactor = (y * pixelHeight) - halfHeight,
                ycomp_x = vpUp_x * yfactor,
                ycomp_y = vpUp_y * yfactor,
                ycomp_z = vpUp_z * yfactor;

            // add
            var ray_v_x = eyeVector_x + xcomp_x + ycomp_x,
                ray_v_y = eyeVector_y + xcomp_y + ycomp_y,
                ray_v_z = eyeVector_z + xcomp_z + ycomp_z;
            // unit vector
            var ray_v_len = Vector_length(ray_v_x,ray_v_y,ray_v_z);
                ray_v_x /= ray_v_len;
                ray_v_y /= ray_v_len;
                ray_v_z /= ray_v_len;

            color_R = trace_color(ray_x, ray_y, ray_z, ray_v_x, ray_v_y, ray_v_z,
                            n_objects, n_lights_x, n_lights_y, n_lights_z, 0, 0);
            color_G = trace_color(ray_x, ray_y, ray_z, ray_v_x, ray_v_y, ray_v_z,
                            n_objects, n_lights_x, n_lights_y, n_lights_z, 0, 1);
            color_B = trace_color(ray_x, ray_y, ray_z, ray_v_x, ray_v_y, ray_v_z,
                            n_objects, n_lights_x, n_lights_y, n_lights_z, 0, 2);

            // tracing begins:





            index = (x * 4) + (y * width * 4),
            data.data[index + 0] = color_R;
            data.data[index + 1] = color_G;
            data.data[index + 2] = color_B;
            data.data[index + 3] = 255;
        }
    }
    ctx.putImageData(data, 0, 0);
}

function trace_color(ray_x, ray_y, ray_z, ray_v_x, ray_v_y, ray_v_z,
        objects, lights_x, lights_y, lights_z, depth, color) {
    if (depth > 3)
        return;
    var a_ray_point_x  = ray_x ,
        a_ray_point_y  = ray_y ,
        a_ray_point_z  = ray_z ,
        a_ray_vector_x = ray_v_x,
        a_ray_vector_y = ray_v_y,
        a_ray_vector_z = ray_v_z;
    // intersectscene for calculating the distobject
        var a_closest_0 = Infinity, a_closest_1_point_x = null,
             a_closest_1_point_y  =  null,
             a_closest_1_point_z  = null ,
             a_closest_1_color_x  = null ,
             a_closest_1_color_y  = null ,
             a_closest_1_color_z  = null ,
             a_closest_1_specular = null ,
             a_closest_1_lambert  = null ,
             a_closest_1_ambient  = null ,
             a_closest_1_radius   = null;

    for (var i = 0; i < 3; i++) {
        var a_object_point_x     = objects[i][1],
            a_object_point_y     = objects[i][2] ,
            a_object_point_z     = objects[i][3] ,
            a_object_color_x     = objects[i][4],
            a_object_color_y     = objects[i][5],
            a_object_color_z     = objects[i][6] ,
            a_object_specular    = objects[i][7] ,
            a_object_lambert     = objects[i][8] ,
            a_object_ambient     = objects[i][9] ,
            a_object_radius      = objects[i][10];
        // sphere intersection
        // subtract
        var a_eye_to_center_x = a_object_point_x - a_ray_point_x,
            a_eye_to_center_y = a_object_point_y - a_ray_point_y,
            a_eye_to_center_z = a_object_point_z - a_ray_point_z;

        var a_v = Vector_dotProduct(a_eye_to_center_x, a_eye_to_center_y, a_eye_to_center_z,
                a_ray_vector_x, a_ray_vector_y, a_ray_vector_z),
            a_eoDot = Vector_dotProduct(a_eye_to_center_x, a_eye_to_center_y, a_eye_to_center_z,
                    a_eye_to_center_x, a_eye_to_center_y, a_eye_to_center_z),
            a_discriminant = (a_object_radius * a_object_radius) - a_eoDot + (a_v * a_v);
        if (a_discriminant < 0) {
        } else {
            a_dist = a_v - Math.sqrt(a_discriminant);
        }
        //

        if (a_dist !== undefined && a_dist < a_closest_0) {
            a_closest_0 = a_dist;

             a_closest_1_point_x  = a_object_point_x,
             a_closest_1_point_y  = a_object_point_y ,
             a_closest_1_point_z  = a_object_point_z ,
             a_closest_1_color_x  = a_object_color_x ,
             a_closest_1_color_y  = a_object_color_y ,
             a_closest_1_color_z  = a_object_color_z ,
             a_closest_1_specular = a_object_specular ,
             a_closest_1_lambert  = a_object_lambert ,
             a_closest_1_ambient  = a_object_ambient ,
             a_closest_1_radius   = a_object_radius ;
        }
    }

    var a_distObject_0 = a_closest_0;
    var a_distObject_1_point_x  = a_closest_1_point_x,
        a_distObject_1_point_y  = a_closest_1_point_y,
        a_distObject_1_point_z  = a_closest_1_point_z ,
        a_distObject_1_color_x  = a_closest_1_color_x  ,
        a_distObject_1_color_y  = a_closest_1_color_y  ,
        a_distObject_1_color_z  = a_closest_1_color_z  ,
        a_distObject_1_specular = a_closest_1_specular ,
        a_distObject_1_lambert  = a_closest_1_lambert  ,
        a_distObject_1_ambient  = a_closest_1_ambient  ,
        a_distObject_1_radius   = a_closest_1_radius   ;
    /////

    if (a_distObject_0 === Infinity) {
        return 200; // whit ish
    }
    else{
        var a_dist = a_distObject_0,

        a_object_point_x     =a_distObject_1_point_x  ,
        a_object_point_y     =a_distObject_1_point_y   ,
        a_object_point_z     =a_distObject_1_point_z   ,
        a_object_color_x     =a_distObject_1_color_x  ,
        a_object_color_y     =a_distObject_1_color_y  ,
        a_object_color_z     =a_distObject_1_color_z   ,
        a_object_specular    =a_distObject_1_specular  ,
        a_object_lambert     =a_distObject_1_lambert   ,
        a_object_ambient     =a_distObject_1_ambient   ,
        a_object_radius      =a_distObject_1_radius;

        var a_pointAtTime_x, a_pointAtTime_y, a_pointAtTime_z;
        // scaling first
            a_pointAtTime_x = a_ray_vector_x * a_dist;
            a_pointAtTime_y = a_ray_vector_y * a_dist;
            a_pointAtTime_z = a_ray_vector_z * a_dist;
        //adding
            a_pointAtTime_x += a_ray_point_x;
            a_pointAtTime_y += a_ray_point_y;
            a_pointAtTime_z += a_ray_point_z;

        // calculating sphere normal first
        var a_sphr_normal_x, a_sphr_normal_y, a_sphr_normal_z;
            // subtract
            a_sphr_normal_x = a_pointAtTime_x - a_object_point_x;
            a_sphr_normal_y = a_pointAtTime_y - a_object_point_y;
            a_sphr_normal_z = a_pointAtTime_z - a_object_point_z;
            // unit vector
        var a_sphr_normal_len = Vector_length(a_sphr_normal_x,a_sphr_normal_y,a_sphr_normal_z);
            a_sphr_normal_x /= a_sphr_normal_len;
            a_sphr_normal_y /= a_sphr_normal_len;
            a_sphr_normal_z /= a_sphr_normal_len;

        // suraface calculation
        var a_a_x = a_object_color_x,
            a_a_y = a_object_color_y,
            a_a_z = a_object_color_z,
            a_c_x = Vector_ZERO_x,
            a_c_y = Vector_ZERO_y,
            a_c_z = Vector_ZERO_z,
            a_lambertAmount = 0;

        if (a_object_lambert) {
            var a_isLightVisible;

            // islightvisible
            var a_diff_x = a_pointAtTime_x - lights_x,
                a_diff_y = a_pointAtTime_y - lights_y,
                a_diff_z = a_pointAtTime_z - lights_z,
                a_diff_len = Vector_length(a_diff_x, a_diff_y, a_diff_z);
                a_diff_x /= a_diff_len;
                a_diff_y /= a_diff_len;
                a_diff_z /= a_diff_len;

                // intersectscene for distobject
            var a_scene_ray_point_x  = a_pointAtTime_x,
                a_scene_ray_point_y  = a_pointAtTime_y,
                a_scene_ray_point_z  = a_pointAtTime_z,
                a_scene_ray_vector_x = a_diff_x,
                a_scene_ray_vector_y = a_diff_y,
                a_scene_ray_vector_z = a_diff_z;

            var a_closest_0 = Infinity, a_closest_1_point_x = null,
             a_closest_1_point_y  =  null,
             a_closest_1_point_z  = null ,
             a_closest_1_color_x  = null ,
             a_closest_1_color_y  = null ,
             a_closest_1_color_z  = null ,
             a_closest_1_specular = null ,
             a_closest_1_lambert  = null ,
             a_closest_1_ambient  = null ,
             a_closest_1_radius   = null;

            for (var i = 0; i < 3; i++) {

                var a_object_point_x     = objects[i][1],
                    a_object_point_y     = objects[i][2] ,
                    a_object_point_z     = objects[i][3] ,
                    a_object_color_x     = objects[i][4],
                    a_object_color_y     = objects[i][5],
                    a_object_color_z     = objects[i][6] ,
                    a_object_specular    = objects[i][7] ,
                    a_object_lambert     = objects[i][8] ,
                    a_object_ambient     = objects[i][9] ,
                    a_object_radius      = objects[i][10];

                // sphere intersection
                // subtract
                a_eye_to_center_x = a_object_point_x - a_scene_ray_point_x,
                a_eye_to_center_y = a_object_point_y - a_scene_ray_point_y,
                a_eye_to_center_z = a_object_point_z - a_scene_ray_point_z;

                a_v = Vector_dotProduct(a_eye_to_center_x, a_eye_to_center_y, a_eye_to_center_z,
                        a_scene_ray_vector_x, a_scene_ray_vector_y, a_scene_ray_vector_z),
                a_eoDot = Vector_dotProduct(a_eye_to_center_x, a_eye_to_center_y, a_eye_to_center_z,
                            a_eye_to_center_x, a_eye_to_center_y, a_eye_to_center_z),
                    a_discriminant = (a_object_radius * a_object_radius) - a_eoDot + (a_v * a_v);
                if (a_discriminant < 0) {
                } else {
                    a_dist = a_v - Math.sqrt(a_discriminant);
                }
                //

                if (a_dist !== undefined && a_dist < a_closest_0) {
                    // a_closest = [a_dist, a_object];
                     a_closest_0 = a_dist;

                     a_closest_1_point_x  = a_object_point_x,
                     a_closest_1_point_y  = a_object_point_y ,
                     a_closest_1_point_z  = a_object_point_z ,
                     a_closest_1_color_x  = a_object_color_x ,
                     a_closest_1_color_y  = a_object_color_y ,
                     a_closest_1_color_z  = a_object_color_z ,
                     a_closest_1_specular = a_object_specular ,
                     a_closest_1_lambert  = a_object_lambert ,
                     a_closest_1_ambient  = a_object_ambient ,
                     a_closest_1_radius   = a_object_radius  ;
                }
            }

            var a_distObject_0 = a_closest_0;
            var a_distObject_1_point_x  = a_closest_1_point_x,
                a_distObject_1_point_y  = a_closest_1_point_y,
                a_distObject_1_point_z  = a_closest_1_point_z ,
                a_distObject_1_color_x  = a_closest_1_color_x  ,
                a_distObject_1_color_y  = a_closest_1_color_y  ,
                a_distObject_1_color_z  = a_closest_1_color_z  ,
                a_distObject_1_specular = a_closest_1_specular ,
                a_distObject_1_lambert  = a_closest_1_lambert  ,
                a_distObject_1_ambient  = a_closest_1_ambient  ,
                a_distObject_1_radius   = a_closest_1_radius   ;
                ////////
            a_isLightVisible = a_distObject_0 > -0.005;
            //

            if (a_isLightVisible){
            // subtract first
                a_diff_x = lights_x - a_pointAtTime_x,
                a_diff_y = lights_y - a_pointAtTime_y,
                a_diff_z = lights_z - a_pointAtTime_z,
                a_diff_len = Vector_length(a_diff_x, a_diff_y, a_diff_z);
                a_diff_x /= a_diff_len;
                a_diff_y /= a_diff_len;
                a_diff_z /= a_diff_len;

                contribution = Vector_dotProduct(a_diff_x, a_diff_y, a_diff_z, a_sphr_normal_x,a_sphr_normal_y,a_sphr_normal_z);

            if (contribution > 0) a_lambertAmount += contribution;
            }
        }

        if (a_object_specular) {
            // calculating reflected normal
            var a_reflectedRay_vector_x, a_reflectedRay_vector_y, a_reflectedRay_vector_z;
                //dotproduct
                var scale_factor = Vector_dotProduct(a_ray_vector_x, a_ray_vector_y, a_ray_vector_z, a_sphr_normal_x, a_sphr_normal_y, a_sphr_normal_z);
                //scale
                var a_temp_x, a_temp_y, a_temp_z;

                a_temp_x = a_sphr_normal_x * scale_factor;
                a_temp_y = a_sphr_normal_y * scale_factor;
                a_temp_z = a_sphr_normal_z * scale_factor;

                //scale 2nd
                a_temp_x = a_ray_vector_x * 2;
                a_temp_y = a_ray_vector_y * 2;
                a_temp_z = a_ray_vector_z * 2;

                //subtract
                a_reflectedRay_vector_x = a_temp_x - a_ray_vector_x;
                a_reflectedRay_vector_y = a_temp_y - a_ray_vector_y;
                a_reflectedRay_vector_z = a_temp_z - a_ray_vector_z;
            //

            var a_reflectedRay = {
                point: {x:a_pointAtTime_x, y:a_pointAtTime_y, z:a_pointAtTime_z},
                vector: {x:a_reflectedRay_vector_x ,y:a_reflectedRay_vector_y ,z:a_reflectedRay_vector_z}
            };

            // recursive call BEGINSSSSSS
            var reflectedColor = trace_color(a_pointAtTime_x, a_pointAtTime_y, a_pointAtTime_z,
                            a_reflectedRay_vector_x ,a_reflectedRay_vector_y ,a_reflectedRay_vector_z,
                            objects, lights_x, lights_y, lights_z, ++depth, color);
            

            if (reflectedColor) {
                //scale and add
                if (color == 0){                    
                    a_c_x += reflectedColor * a_object_specular;;
                }else if (color == 1){
                    a_c_y += reflectedColor * a_object_specular;
                }else if (color == 2){
                    a_c_z += reflectedColor * a_object_specular;
                }
          
            }
        }

        a_lambertAmount = Math.min(1, a_lambertAmount);        

        if (color == 0){
            a_c_x += a_a_x * a_lambertAmount * a_object_lambert;
            a_c_x += a_a_x * a_object_ambient;
            return a_c_x;
        }else if (color == 1){
            a_c_y += a_a_y * a_lambertAmount * a_object_lambert;
            a_c_y += a_a_y * a_object_ambient;
            return a_c_y;
        }else if (color == 2){
            a_c_z += a_a_z * a_lambertAmount * a_object_lambert;
            a_c_z += a_a_z * a_object_ambient;
            return a_c_z;
        }
    }
}

var planet1 = 0,
    planet2 = 0;

var f = document.querySelector("#fps");
function renderLoop() {
    // make one planet spin a little bit faster than the other, just for
    // effect.
    planet1 += 0.05;
    planet2 += 0.08;

    // set the position of each moon with some trig.
    objects[1][1] = Math.sin(planet1) * 3.5;
    objects[1][2] = Math.cos(planet1) * 3.5;
    objects[1][3] = -3 + (Math.cos(planet1) * 3.5);

    objects[2][1] = Math.sin(planet2) * 4;
    objects[2][3] = -3 + (Math.cos(planet2) * 4);

    // finally, render the scene!
    render(camera, objects, lights);

    //get the FPS
    f.innerHTML = fps.getFPS();

    // and as soon as we're finished, render it again and move the planets
    // again
    setTimeout(renderLoop, 1);
}

window.onload = renderLoop;

//stooopid functions
var selection = 0;

function boost( element ) {
  if ( element.value == "Using CPU" ) {
     selection = 1;
     element.value = "Using GPU";
  } else {
     selection = 0;
     element.value = "Using CPU";
  }
}