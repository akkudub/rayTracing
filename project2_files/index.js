// # GPU Aceelerated Raytracing

// # Setup
var mainCanvas = document.getElementById('mainCanvas'),
    width = 640 * 0.5,
    height = 480 * 0.5;

mainCanvas.width = width;
mainCanvas.height = height;
mainCanvas.style.cssText = 'width:' + (width * 2) + 'px;height:' + (height*2) + 'px';
var ctx = mainCanvas.getContext('2d'),
    data = ctx.getImageData(0, 0, width, height);

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

// # Throwing Rays
function render(scene) {
    // first 'unpack' the scene to make it easier to reference
    var camera = scene.camera,
        objects = scene.objects,
        lights = scene.lights;

    var eyeVector = Vector.unitVector(Vector.subtract(camera.vector, camera.point)),
        vpRight = Vector.unitVector(Vector.crossProduct(eyeVector, Vector.UP)),
        vpUp = Vector.unitVector(Vector.crossProduct(vpRight, eyeVector)),

        fovRadians = Math.PI * (camera.fieldOfView / 2) / 180,
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
            var xcomp = Vector.scale(vpRight, (x * pixelWidth) - halfWidth),
                ycomp = Vector.scale(vpUp, (y * pixelHeight) - halfHeight);

            ray.vector = Vector.unitVector(Vector.add3(eyeVector, xcomp, ycomp));

            color = trace(ray, scene, 0);
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

    var distObject = intersectScene(ray, scene);

    if (distObject[0] === Infinity) {
        return Vector.WHITE;
    }

    var dist = distObject[0],
        object = distObject[1];

    var pointAtTime = Vector.add(ray.point, Vector.scale(ray.vector, dist));

    return surface(ray, scene, object, pointAtTime, sphereNormal(object, pointAtTime), depth);
}

// # Detecting collisions against all objects
function intersectScene(ray, scene) {

    var closest = [Infinity, null];

    for (var i = 0; i < scene.objects.length; i++) {
        var object = scene.objects[i],
            dist = sphereIntersection(object, ray);
        if (dist !== undefined && dist < closest[0]) {
            closest = [dist, object];
        }
    }
    return closest;
}

// ## Detecting collisions against a sphere
function sphereIntersection(sphere, ray) {
    var eye_to_center = Vector.subtract(sphere.point, ray.point),
        v = Vector.dotProduct(eye_to_center, ray.vector),
        eoDot = Vector.dotProduct(eye_to_center, eye_to_center),
        discriminant = (sphere.radius * sphere.radius) - eoDot + (v * v);
    if (discriminant < 0) {
        return;
    } else {
        return v - Math.sqrt(discriminant);
    }
}

function sphereNormal(sphere, pos) {
    return Vector.unitVector(
        Vector.subtract(pos, sphere.point));
}

// # Surface
function surface(ray, scene, object, pointAtTime, normal, depth) {
    var b = object.color,
        c = Vector.ZERO,
        lambertAmount = 0;

    if (object.lambert) {
        for (var i = 0; i < scene.lights.length; i++) {
            var lightPoint = scene.lights[0];

            if (!isLightVisible(pointAtTime, scene, lightPoint)) continue;
            var contribution = Vector.dotProduct(Vector.unitVector(
                Vector.subtract(lightPoint, pointAtTime)), normal);

            if (contribution > 0) lambertAmount += contribution;
        }
    }

    if (object.specular) {
        var reflectedRay = {
            point: pointAtTime,
            vector: Vector.reflectThrough(ray.vector, normal)
        };
        var reflectedColor = trace(reflectedRay, scene, ++depth);
        if (reflectedColor) {
            c = Vector.add(c, Vector.scale(reflectedColor, object.specular));
        }
    }

    lambertAmount = Math.min(1, lambertAmount);

    return Vector.add3(c,
        Vector.scale(b, lambertAmount * object.lambert),
        Vector.scale(b, object.ambient));
}

function isLightVisible(pt, scene, light) {
    var distObject =  intersectScene({
        point: pt,
        vector: Vector.unitVector(Vector.subtract(pt, light))
    }, scene);
    return distObject[0] > -0.005;
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