// # GPU Aceelerated Raytracing

// # Setup
var mainCanvas = document.getElementById('mainCanvas'),
    width = 800 * 0.5,
    height = 800 * 0.5;

mainCanvas.width = width;
mainCanvas.height = height;
mainCanvas.style.cssText = 'width:' + (width * 2) + 'px;height:' + (height * 2) + 'px';
var ctx = mainCanvas.getContext('2d'),
    data = ctx.getImageData(0, 0, width, height);

// # Throwing Rays
function render(camera, objects, lights) {
    // first 'unpack' the arays so gpu.js can understand
    var n_camera_point_x = camera[0],
        n_camera_point_y = camera[1],
        n_camera_point_z = camera[2],
        n_camera_fieldOfView = camera[3],
        n_camera_vector_x = camera[4],
        n_camera_vector_y = camera[5],
        n_camera_vector_z = camera[6],

        n_objects_0_type = objects[0][0],
        n_objects_0_x = objects[0][1],
        n_objects_0_y = objects[0][2],
        n_objects_0_z = objects[0][3],
        n_objects_0_r = objects[0][4],
        n_objects_0_g = objects[0][5],
        n_objects_0_b = objects[0][6],
        n_objects_0_spec = objects[0][7],
        n_objects_0_lamb = objects[0][8],
        n_objects_0_amb = objects[0][9],
        n_objects_0_rad = objects[0][10],

        n_objects_1_type = objects[1][0],
        n_objects_1_x = objects[1][1],
        n_objects_1_y = objects[1][2],
        n_objects_1_z = objects[1][3],
        n_objects_1_r = objects[1][4],
        n_objects_1_g = objects[1][5],
        n_objects_1_b = objects[1][6],
        n_objects_1_spec = objects[1][7],
        n_objects_1_lamb = objects[1][8],
        n_objects_1_amb = objects[1][9],
        n_objects_1_rad = objects[1][10],

        n_objects_2_type = objects[2][0],
        n_objects_2_x = objects[2][1],
        n_objects_2_y = objects[2][2],
        n_objects_2_z = objects[2][3],
        n_objects_2_r = objects[2][4],
        n_objects_2_g = objects[2][5],
        n_objects_2_b = objects[2][6],
        n_objects_2_spec = objects[2][7],
        n_objects_2_lamb = objects[2][8],
        n_objects_2_amb = objects[2][9],
        n_objects_2_rad = objects[2][10],

        n_lights_x = lights[0],
        n_lights_y = lights[1],
        n_lights_z = lights[2];

    // subtract
    var eyeVector_x = n_camera_vector_x - n_camera_point_x,
        eyeVector_y = n_camera_vector_y - n_camera_point_y,
        eyeVector_z = n_camera_vector_z - n_camera_point_z;
    // unit vector
    var eyeVector_len = Vector_length(eyeVector_x, eyeVector_y, eyeVector_z);
    eyeVector_x /= eyeVector_len;
    eyeVector_y /= eyeVector_len;
    eyeVector_z /= eyeVector_len;

    // cross product
    var vpRight_x = (eyeVector_y * Vector_UP_z) - (eyeVector_z * Vector_UP_y),
        vpRight_y = (eyeVector_z * Vector_UP_x) - (eyeVector_x * Vector_UP_z),
        vpRight_z = (eyeVector_x * Vector_UP_y) - (eyeVector_y * Vector_UP_x);
    // unit vector
    var vpRight_len = Vector_length(vpRight_x, vpRight_y, vpRight_z);
    vpRight_x /= vpRight_len;
    vpRight_y /= vpRight_len;
    vpRight_z /= vpRight_len;

    // cross product
    var vpUp_x = (vpRight_y * eyeVector_z) - (vpRight_z * eyeVector_y),
        vpUp_y = (vpRight_z * eyeVector_x) - (vpRight_x * eyeVector_z),
        vpUp_z = (vpRight_x * eyeVector_y) - (vpRight_y * eyeVector_x);
    // unit vector
    var vpUp_len = Vector_length(vpUp_x, vpUp_y, vpUp_z);
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

    var debug_all = [];
    for (var x = 0; x < width; x++) {
        var debug_y = []
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
            var ray_v_len = Vector_length(ray_v_x, ray_v_y, ray_v_z);
            ray_v_x /= ray_v_len;
            ray_v_y /= ray_v_len;
            ray_v_z /= ray_v_len;

            if (x == 39 && y == 200) {
                debugger;
            }

            color_R = trace_color0(ray_x, ray_y, ray_z, ray_v_x, ray_v_y, ray_v_z,
                n_objects_0_type, n_objects_0_x, n_objects_0_y, n_objects_0_z, n_objects_0_r, n_objects_0_g, n_objects_0_b, n_objects_0_spec, n_objects_0_lamb, n_objects_0_amb, n_objects_0_rad,
                n_objects_1_type, n_objects_1_x, n_objects_1_y, n_objects_1_z, n_objects_1_r, n_objects_1_g, n_objects_1_b, n_objects_1_spec, n_objects_1_lamb, n_objects_1_amb, n_objects_1_rad,
                n_objects_2_type, n_objects_2_x, n_objects_2_y, n_objects_2_z, n_objects_2_r, n_objects_2_g, n_objects_2_b, n_objects_2_spec, n_objects_2_lamb, n_objects_2_amb, n_objects_2_rad,
                n_lights_x, n_lights_y, n_lights_z, 0, 0);
            color_G = trace_color0(ray_x, ray_y, ray_z, ray_v_x, ray_v_y, ray_v_z,
                n_objects_0_type, n_objects_0_x, n_objects_0_y, n_objects_0_z, n_objects_0_r, n_objects_0_g, n_objects_0_b, n_objects_0_spec, n_objects_0_lamb, n_objects_0_amb, n_objects_0_rad,
                n_objects_1_type, n_objects_1_x, n_objects_1_y, n_objects_1_z, n_objects_1_r, n_objects_1_g, n_objects_1_b, n_objects_1_spec, n_objects_1_lamb, n_objects_1_amb, n_objects_1_rad,
                n_objects_2_type, n_objects_2_x, n_objects_2_y, n_objects_2_z, n_objects_2_r, n_objects_2_g, n_objects_2_b, n_objects_2_spec, n_objects_2_lamb, n_objects_2_amb, n_objects_2_rad,
                n_lights_x, n_lights_y, n_lights_z, 0, 1);
            color_B = trace_color0(ray_x, ray_y, ray_z, ray_v_x, ray_v_y, ray_v_z,
                n_objects_0_type, n_objects_0_x, n_objects_0_y, n_objects_0_z, n_objects_0_r, n_objects_0_g, n_objects_0_b, n_objects_0_spec, n_objects_0_lamb, n_objects_0_amb, n_objects_0_rad,
                n_objects_1_type, n_objects_1_x, n_objects_1_y, n_objects_1_z, n_objects_1_r, n_objects_1_g, n_objects_1_b, n_objects_1_spec, n_objects_1_lamb, n_objects_1_amb, n_objects_1_rad,
                n_objects_2_type, n_objects_2_x, n_objects_2_y, n_objects_2_z, n_objects_2_r, n_objects_2_g, n_objects_2_b, n_objects_2_spec, n_objects_2_lamb, n_objects_2_amb, n_objects_2_rad,
                n_lights_x, n_lights_y, n_lights_z, 0, 2);

            // if (color_G > 116 && color_G < 117) {
            //     debugger;
            // }
            debug_y[y] = {
                r: color_R,
                g: color_G,
                b: color_B
            };

            index = (x * 4) + (y * width * 4),
                data.data[index + 0] = color_R;
            data.data[index + 1] = color_G;
            data.data[index + 2] = color_B;
            data.data[index + 3] = 255;
        }
        debug_all[x] = debug_y;
    }
    ctx.putImageData(data, 0, 0);
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
    // objects[1][1] = Math.sin(planet1) * 3.5;
    // objects[1][2] = Math.cos(planet1) * 3.5;
    // objects[1][3] = -3 + (Math.cos(planet1) * 3.5);

    // objects[2][1] = Math.sin(planet2) * 4;
    // objects[2][3] = -3 + (Math.cos(planet2) * 4);

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

function boost(element) {
    if (element.value == "Using CPU") {
        selection = 1;
        element.value = "Using GPU";
    } else {
        selection = 0;
        element.value = "Using CPU";
    }
}