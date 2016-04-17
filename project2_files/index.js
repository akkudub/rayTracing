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
function trace(ray, scene, depth) {
    if (depth > 3) return;


    // intersectscene for calculating the distobject
    var closest = [Infinity, null];

    for (var i = 0; i < scene.objects.length; i++) {
        var object = scene.objects[i], dist;
        // dist = sphereIntersection(object, ray);

        // sphere intersection
        // subtract
        var eye_to_center_x = object.point.x - ray.point.x,
            eye_to_center_y = object.point.y - ray.point.y,
            eye_to_center_z = object.point.z - ray.point.z;

        var v = Vector_dotProduct(eye_to_center_x, eye_to_center_y, eye_to_center_z,
                ray.vector.x, ray.vector.y, ray.vector.z),
            eoDot = Vector_dotProduct(eye_to_center_x, eye_to_center_y, eye_to_center_z,
                    eye_to_center_x, eye_to_center_y, eye_to_center_z),
            discriminant = (object.radius * object.radius) - eoDot + (v * v);
        if (discriminant < 0) {
        } else {
            dist = v - Math.sqrt(discriminant);
        }
        //

        if (dist !== undefined && dist < closest[0]) {
            closest = [dist, object];
        }
    }

    var distObject = closest;
    /////

    if (distObject[0] === Infinity) {
        return Vector.WHITE;
    }

    var dist = distObject[0],
        object = distObject[1];

    // var pointAtTime = Vector.add(ray.point, Vector.scale(ray.vector, dist));
    var pointAtTime, pointAtTime_x, pointAtTime_y, pointAtTime_z;
    // scaling first
        pointAtTime_x = ray.vector.x * dist;
        pointAtTime_y = ray.vector.y * dist;
        pointAtTime_z = ray.vector.z * dist;
    //adding
        pointAtTime_x += ray.point.x;
        pointAtTime_y += ray.point.y;
        pointAtTime_z += ray.point.z;
    pointAtTime = {x:pointAtTime_x, y:pointAtTime_y, z:pointAtTime_z};

    // calculating sphere normal first
    var sphr_normal, sphr_normal_x, sphr_normal_y, sphr_normal_z;
        //     return Vector.unitVector(Vector.subtract(b, a.point));
        // subtract
        sphr_normal_x = pointAtTime_x - object.point.x;
        sphr_normal_y = pointAtTime_y - object.point.y;
        sphr_normal_z = pointAtTime_z - object.point.z;
        // unit vector
    var sphr_normal_len = Vector_length(sphr_normal_x,sphr_normal_y,sphr_normal_z);
        sphr_normal_x /= sphr_normal_len;
        sphr_normal_y /= sphr_normal_len;
        sphr_normal_z /= sphr_normal_len;
    sphr_normal = {x:sphr_normal_x, y:sphr_normal_y, z:sphr_normal_z};

    // suraface calculation
    var b_x = object.color.x,
        b_y = object.color.y,
        b_z = object.color.z,
        c_x = Vector_ZERO_x,
        c_y = Vector_ZERO_y,
        c_z = Vector_ZERO_z,
        lambertAmount = 0;

    if (object.lambert) {
        for (var i = 0; i < scene.lights.length; i++) {
            var lightPoint = scene.lights[0],
                isLightVisible;

            // islightvisible
            var diff_x = pointAtTime_x - lightPoint.x,
                diff_y = pointAtTime_y - lightPoint.y,
                diff_z = pointAtTime_z - lightPoint.z,
                diff_len = Vector_length(diff_x, diff_y, diff_z);
                diff_x /= diff_len;
                diff_y /= diff_len;
                diff_z /= diff_len;

                // intersectscene for distobject
                var scene_ray = {point: pointAtTime, vector: {x:diff_x, y:diff_y, z:diff_z}};
                closest = [Infinity, null];

                for (var i = 0; i < scene.objects.length; i++) {
                    object = scene.objects[i], dist;
                    // dist = sphereIntersection(object, ray);

                    // sphere intersection
                    // subtract
                    eye_to_center_x = object.point.x - scene_ray.point.x,
                    eye_to_center_y = object.point.y - scene_ray.point.y,
                    eye_to_center_z = object.point.z - scene_ray.point.z;

                    v = Vector_dotProduct(eye_to_center_x, eye_to_center_y, eye_to_center_z,
                            scene_ray.vector.x, scene_ray.vector.y, scene_ray.vector.z),
                    eoDot = Vector_dotProduct(eye_to_center_x, eye_to_center_y, eye_to_center_z,
                                eye_to_center_x, eye_to_center_y, eye_to_center_z),
                        discriminant = (object.radius * object.radius) - eoDot + (v * v);
                    if (discriminant < 0) {
                    } else {
                        dist = v - Math.sqrt(discriminant);
                    }
                    //

                    if (dist !== undefined && dist < closest[0]) {
                        closest = [dist, object];
                    }
                }

                distObject = closest;
                ////////

            isLightVisible = distObject[0] > -0.005;
            //

            if (!isLightVisible) continue;
            // subtract first
                diff_x = lightPoint.x - pointAtTime_x,
                diff_y = lightPoint.y - pointAtTime_y,
                diff_z = lightPoint.z - pointAtTime_z,
                diff_len = Vector_length(diff_x, diff_y, diff_z);
                diff_x /= diff_len;
                diff_y /= diff_len;
                diff_z /= diff_len;

                contribution = Vector_dotProduct(diff_x, diff_y, diff_z, sphr_normal_x,sphr_normal_y,sphr_normal_z);

            if (contribution > 0) lambertAmount += contribution;
        }
    }

    if (object.specular) {
        // calculating reflected normal
        var reflectedRay_vector_x, reflectedRay_vector_y, reflectedRay_vector_z;
            //dotproduct
            var scale_factor = Vector_dotProduct(ray.vector.x, ray.vector.y, ray.vector.z, sphr_normal_x, sphr_normal_y, sphr_normal_z);
            //scale
            var temp_x, temp_y, temp_z;

            temp_x = sphr_normal_x * scale_factor;
            temp_y = sphr_normal_y * scale_factor;
            temp_z = sphr_normal_z * scale_factor;

            //scale 2nd
            temp_x = ray.vector.x * 2;
            temp_y = ray.vector.y * 2;
            temp_z = ray.vector.z * 2;

            //subtract
            reflectedRay_vector_x = temp_x - ray.vector.x;
            reflectedRay_vector_y = temp_y - ray.vector.y;
            reflectedRay_vector_z = temp_z - ray.vector.z;
        //

        var reflectedRay = {
            point: pointAtTime,
            vector: {x:reflectedRay_vector_x ,y:reflectedRay_vector_y ,z:reflectedRay_vector_z}
        };
        var reflectedColor = trace(reflectedRay, scene, ++depth);
        if (reflectedColor) {
            //scale and add
            c_x += reflectedColor.x * object.specular;
            c_y += reflectedColor.y * object.specular;
            c_z += reflectedColor.z * object.specular;
        }
    }

    lambertAmount = Math.min(1, lambertAmount);

    // scale 1
    c_x += b_x * lambertAmount * object.lambert;
    c_y += b_y * lambertAmount * object.lambert;
    c_z += b_z * lambertAmount * object.lambert;
    // scale 2
    c_x += b_x * object.ambient;
    c_y += b_y * object.ambient;
    c_z += b_z * object.ambient;

    return {x:c_x, y:c_y, z:c_z};
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