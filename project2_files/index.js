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
function render(scene) {
    // first 'unpack' the scene to make it easier to reference
    var camera = scene.camera,
        objects = scene.objects,
        lights = scene.lights;

    // var eyeVector = Vector.unitVector(Vector.subtract(camera.vector, camera.point)),
    //     vpRight = Vector.unitVector(Vector.crossProduct(eyeVector, Vector.UP)),
    //     vpUp = Vector.unitVector(Vector.crossProduct(vpRight, eyeVector));

    // subtract
    var eyeVector_x = camera.vector.x - camera.point.x,
        eyeVector_y = camera.vector.y - camera.point.y,
        eyeVector_z = camera.vector.z - camera.point.z;
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

    var fovRadians = Math.PI * (camera.fieldOfView / 2) / 180,
        heightWidthRatio = height / width,
        halfWidth = Math.tan(fovRadians),
        halfHeight = heightWidthRatio * halfWidth,
        camerawidth = halfWidth * 2,
        cameraheight = halfHeight * 2,
        pixelWidth = camerawidth / (width - 1),
        pixelHeight = cameraheight / (height - 1);

    var index, color;
    var ray = {
        point: camera.point
    };
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {

            // var xcomp = Vector.scale(vpRight, (x * pixelWidth) - halfWidth),
            //     ycomp = Vector.scale(vpUp, (y * pixelHeight) - halfHeight);

            // ray.vector = Vector.unitVector(Vector.add3(eyeVector, xcomp, ycomp));

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
            ray.vector = {x:ray_v_x, y:ray_v_y, z:ray_v_z};

            color = trace(ray, scene, 0);

            // tracing begins:





            index = (x * 4) + (y * width * 4),
            data.data[index + 0] = color.x;
            data.data[index + 1] = color.y;
            data.data[index + 2] = color.z;
            data.data[index + 3] = 255;
        }
    }
    ctx.putImageData(data, 0, 0);
}

// # Trace
function trace(a_ray, scene, depth) {
    if (depth > 3)
        return;
    // intersectscene for calculating the distobject
    var a_closest = [Infinity, null];

    for (var i = 0; i < scene.objects.length; i++) {
        var a_object = scene.objects[i], a_dist;
        // dist = sphereIntersection(object, ray);

        // sphere intersection
        // subtract
        var a_eye_to_center_x = a_object.point.x - a_ray.point.x,
            a_eye_to_center_y = a_object.point.y - a_ray.point.y,
            a_eye_to_center_z = a_object.point.z - a_ray.point.z;

        var a_v = Vector_dotProduct(a_eye_to_center_x, a_eye_to_center_y, a_eye_to_center_z,
                a_ray.vector.x, a_ray.vector.y, a_ray.vector.z),
            a_eoDot = Vector_dotProduct(a_eye_to_center_x, a_eye_to_center_y, a_eye_to_center_z,
                    a_eye_to_center_x, a_eye_to_center_y, a_eye_to_center_z),
            a_discriminant = (a_object.radius * a_object.radius) - a_eoDot + (a_v * a_v);
        if (a_discriminant < 0) {
        } else {
            a_dist = a_v - Math.sqrt(a_discriminant);
        }
        //

        if (a_dist !== undefined && a_dist < a_closest[0]) {
            a_closest = [a_dist, a_object];
        }
    }

    var a_distObject = a_closest;
    /////

    if (a_distObject[0] === Infinity) {
        return Vector.WHITE;
    }

    var a_dist = a_distObject[0],
        a_object = a_distObject[1];

    // var a_pointAtTime = Vector.add(ray.point, Vector.scale(ray.vector, dist));
    var a_pointAtTime, a_pointAtTime_x, a_pointAtTime_y, a_pointAtTime_z;
    // scaling first
        a_pointAtTime_x = a_ray.vector.x * a_dist;
        a_pointAtTime_y = a_ray.vector.y * a_dist;
        a_pointAtTime_z = a_ray.vector.z * a_dist;
    //adding
        a_pointAtTime_x += a_ray.point.x;
        a_pointAtTime_y += a_ray.point.y;
        a_pointAtTime_z += a_ray.point.z;
    a_pointAtTime = {x:a_pointAtTime_x, y:a_pointAtTime_y, z:a_pointAtTime_z};

    // calculating sphere normal first
    var a_sphr_normal, a_sphr_normal_x, a_sphr_normal_y, a_sphr_normal_z;
        //     return Vector.unitVector(Vector.subtract(b, a.point));
        // subtract
        a_sphr_normal_x = a_pointAtTime_x - a_object.point.x;
        a_sphr_normal_y = a_pointAtTime_y - a_object.point.y;
        a_sphr_normal_z = a_pointAtTime_z - a_object.point.z;
        // unit vector
    var a_sphr_normal_len = Vector_length(a_sphr_normal_x,a_sphr_normal_y,a_sphr_normal_z);
        a_sphr_normal_x /= a_sphr_normal_len;
        a_sphr_normal_y /= a_sphr_normal_len;
        a_sphr_normal_z /= a_sphr_normal_len;
    a_sphr_normal = {x:a_sphr_normal_x, y:a_sphr_normal_y, z:a_sphr_normal_z};

    // suraface calculation
    var a_b_x = a_object.color.x,
        a_b_y = a_object.color.y,
        a_b_z = a_object.color.z,
        a_c_x = Vector_ZERO_x,
        a_c_y = Vector_ZERO_y,
        a_c_z = Vector_ZERO_z,
        a_lambertAmount = 0;

    if (a_object.lambert) {
        for (var i = 0; i < scene.lights.length; i++) {
            var a_lightPoint = scene.lights[0],
                a_isLightVisible;

            // islightvisible
            var a_diff_x = a_pointAtTime_x - a_lightPoint.x,
                a_diff_y = a_pointAtTime_y - a_lightPoint.y,
                a_diff_z = a_pointAtTime_z - a_lightPoint.z,
                a_diff_len = Vector_length(a_diff_x, a_diff_y, a_diff_z);
                a_diff_x /= a_diff_len;
                a_diff_y /= a_diff_len;
                a_diff_z /= a_diff_len;

                // intersectscene for distobject
                var a_scene_ray = {point: a_pointAtTime, vector: {x:a_diff_x, y:a_diff_y, z:a_diff_z}};
                a_closest = [Infinity, null];

                for (var i = 0; i < scene.objects.length; i++) {
                    a_object = scene.objects[i], a_dist;
                    // dist = sphereIntersection(object, ray);

                    // sphere intersection
                    // subtract
                    a_eye_to_center_x = a_object.point.x - a_scene_ray.point.x,
                    a_eye_to_center_y = a_object.point.y - a_scene_ray.point.y,
                    a_eye_to_center_z = a_object.point.z - a_scene_ray.point.z;

                    a_v = Vector_dotProduct(a_eye_to_center_x, a_eye_to_center_y, a_eye_to_center_z,
                            a_scene_ray.vector.x, a_scene_ray.vector.y, a_scene_ray.vector.z),
                    a_eoDot = Vector_dotProduct(a_eye_to_center_x, a_eye_to_center_y, a_eye_to_center_z,
                                a_eye_to_center_x, a_eye_to_center_y, a_eye_to_center_z),
                        a_discriminant = (a_object.radius * a_object.radius) - a_eoDot + (a_v * a_v);
                    if (a_discriminant < 0) {
                    } else {
                        a_dist = a_v - Math.sqrt(a_discriminant);
                    }
                    //

                    if (a_dist !== undefined && a_dist < a_closest[0]) {
                        a_closest = [a_dist, a_object];
                    }
                }

                a_distObject = a_closest;
                ////////

            a_isLightVisible = a_distObject[0] > -0.005;
            //

            if (!a_isLightVisible) continue;
            // subtract first
                a_diff_x = a_lightPoint.x - a_pointAtTime_x,
                a_diff_y = a_lightPoint.y - a_pointAtTime_y,
                a_diff_z = a_lightPoint.z - a_pointAtTime_z,
                a_diff_len = Vector_length(a_diff_x, a_diff_y, a_diff_z);
                a_diff_x /= a_diff_len;
                a_diff_y /= a_diff_len;
                a_diff_z /= a_diff_len;

                contribution = Vector_dotProduct(a_diff_x, a_diff_y, a_diff_z, a_sphr_normal_x,a_sphr_normal_y,a_sphr_normal_z);

            if (contribution > 0) a_lambertAmount += contribution;
        }
    }

    if (a_object.specular) {
        // calculating reflected normal
        var a_reflectedRay_vector_x, a_reflectedRay_vector_y, a_reflectedRay_vector_z;
            //dotproduct
            var scale_factor = Vector_dotProduct(a_ray.vector.x, a_ray.vector.y, a_ray.vector.z, a_sphr_normal_x, a_sphr_normal_y, a_sphr_normal_z);
            //scale
            var a_temp_x, a_temp_y, a_temp_z;

            a_temp_x = a_sphr_normal_x * scale_factor;
            a_temp_y = a_sphr_normal_y * scale_factor;
            a_temp_z = a_sphr_normal_z * scale_factor;

            //scale 2nd
            a_temp_x = a_ray.vector.x * 2;
            a_temp_y = a_ray.vector.y * 2;
            a_temp_z = a_ray.vector.z * 2;

            //subtract
            a_reflectedRay_vector_x = a_temp_x - a_ray.vector.x;
            a_reflectedRay_vector_y = a_temp_y - a_ray.vector.y;
            a_reflectedRay_vector_z = a_temp_z - a_ray.vector.z;
        //

        var a_reflectedRay = {
            point: a_pointAtTime,
            vector: {x:a_reflectedRay_vector_x ,y:a_reflectedRay_vector_y ,z:a_reflectedRay_vector_z}
        };

        // recursive call BEGINSSSSSS
        var reflectedColor = trace(a_reflectedRay, scene, ++depth);
        

        if (reflectedColor) {
            //scale and add
            a_c_x += reflectedColor.x * a_object.specular;
            a_c_y += reflectedColor.y * a_object.specular;
            a_c_z += reflectedColor.z * a_object.specular;
        }
    }

    a_lambertAmount = Math.min(1, a_lambertAmount);

    // scale 1
    a_c_x += a_b_x * a_lambertAmount * a_object.lambert;
    a_c_y += a_b_y * a_lambertAmount * a_object.lambert;
    a_c_z += a_b_z * a_lambertAmount * a_object.lambert;
    // scale 2
    a_c_x += a_b_x * a_object.ambient;
    a_c_y += a_b_y * a_object.ambient;
    a_c_z += a_b_z * a_object.ambient;

    return {x:a_c_x, y:a_c_y, z:a_c_z};
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
    scene.objects[1].point.x = Math.sin(planet1) * 3.5;
    scene.objects[1].point.y = Math.cos(planet1) * 3.5;
    scene.objects[1].point.z = -3 + (Math.cos(planet1) * 3.5);

    scene.objects[2].point.x = Math.sin(planet2) * 4;
    scene.objects[2].point.z = -3 + (Math.cos(planet2) * 4);

    // finally, render the scene!
    render(scene);

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