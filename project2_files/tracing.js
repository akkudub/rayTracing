function trace_color0(ray_x, ray_y, ray_z, ray_v_x, ray_v_y, ray_v_z, n_objects_0_type, n_objects_0_x, n_objects_0_y, n_objects_0_z, n_objects_0_r, n_objects_0_g, n_objects_0_b, n_objects_0_spec, n_objects_0_lamb, n_objects_0_amb, n_objects_0_rad,
    n_objects_1_type, n_objects_1_x, n_objects_1_y, n_objects_1_z, n_objects_1_r, n_objects_1_g, n_objects_1_b, n_objects_1_spec, n_objects_1_lamb, n_objects_1_amb, n_objects_1_rad,
    n_objects_2_type, n_objects_2_x, n_objects_2_y, n_objects_2_z, n_objects_2_r, n_objects_2_g, n_objects_2_b, n_objects_2_spec, n_objects_2_lamb, n_objects_2_amb, n_objects_2_rad,
    lights_x, lights_y, lights_z, depth, color) {

    var a_ray_point_x = ray_x,
        a_ray_point_y = ray_y,
        a_ray_point_z = ray_z,
        a_ray_vector_x = ray_v_x,
        a_ray_vector_y = ray_v_y,
        a_ray_vector_z = ray_v_z;
    // intersectscene for calculating the distobject
    var a_closest_0 = 100000000,
        a_closest_1_point_x = -1,
        a_closest_1_point_y = -1,
        a_closest_1_point_z = -1,
        a_closest_1_color_x = -1,
        a_closest_1_color_y = -1,
        a_closest_1_color_z = -1,
        a_closest_1_specular = -1,
        a_closest_1_lambert = -1,
        a_closest_1_ambient = -1,
        a_closest_1_radius = -1;

    var a_object_point_x,
        a_object_point_y,
        a_object_point_z,
        a_object_color_x,
        a_object_color_y,
        a_object_color_z,
        a_object_specular,
        a_object_lambert,
        a_object_ambient,
        a_object_radius;

    for (var i = 0; i < 3; i++) {
        if (i == 0) {
            a_object_point_x = n_objects_0_x;
            a_object_point_y = n_objects_0_y;
            a_object_point_z = n_objects_0_z;
            a_object_color_x = n_objects_0_r;
            a_object_color_y = n_objects_0_g;
            a_object_color_z = n_objects_0_b;
            a_object_specular = n_objects_0_spec;
            a_object_lambert = n_objects_0_lamb;
            a_object_ambient = n_objects_0_amb;
            a_object_radius = n_objects_0_rad;
        } else if (i == 1) {
            a_object_point_x = n_objects_1_x;
            a_object_point_y = n_objects_1_y;
            a_object_point_z = n_objects_1_z;
            a_object_color_x = n_objects_1_r;
            a_object_color_y = n_objects_1_g;
            a_object_color_z = n_objects_1_b;
            a_object_specular = n_objects_1_spec;
            a_object_lambert = n_objects_1_lamb;
            a_object_ambient = n_objects_1_amb;
            a_object_radius = n_objects_1_rad;
        } else if (i == 2) {
            a_object_point_x = n_objects_2_x;
            a_object_point_y = n_objects_2_y;
            a_object_point_z = n_objects_2_z;
            a_object_color_x = n_objects_2_r;
            a_object_color_y = n_objects_2_g;
            a_object_color_z = n_objects_2_b;
            a_object_specular = n_objects_2_spec;
            a_object_lambert = n_objects_2_lamb;
            a_object_ambient = n_objects_2_amb;
            a_object_radius = n_objects_2_rad;
        }

        // sphere intersection
        // subtract
        var a_eye_to_center_x = a_object_point_x - a_ray_point_x,
            a_eye_to_center_y = a_object_point_y - a_ray_point_y,
            a_eye_to_center_z = a_object_point_z - a_ray_point_z;

        var a_dist = -1;

        var a_v = Vector_dotProduct(a_eye_to_center_x, a_eye_to_center_y, a_eye_to_center_z,
                a_ray_vector_x, a_ray_vector_y, a_ray_vector_z),
            a_eoDot = Vector_dotProduct(a_eye_to_center_x, a_eye_to_center_y, a_eye_to_center_z,
                a_eye_to_center_x, a_eye_to_center_y, a_eye_to_center_z),
            a_discriminant = (a_object_radius * a_object_radius) - a_eoDot + (a_v * a_v);
        if (a_discriminant < 0) {} else {
            a_dist = a_v - mathSqrt(a_discriminant);
        }
        //

        if (a_dist !== -1 && a_dist < a_closest_0) {
            a_closest_0 = a_dist;

            a_closest_1_point_x = a_object_point_x;
                a_closest_1_point_y = a_object_point_y;
                a_closest_1_point_z = a_object_point_z;
                a_closest_1_color_x = a_object_color_x;
                a_closest_1_color_y = a_object_color_y;
                a_closest_1_color_z = a_object_color_z;
                a_closest_1_specular = a_object_specular;
                a_closest_1_lambert = a_object_lambert;
                a_closest_1_ambient = a_object_ambient;
                a_closest_1_radius = a_object_radius;
        }
    }

    var a_distObject_0 = a_closest_0;
    var a_distObject_1_point_x = a_closest_1_point_x,
        a_distObject_1_point_y = a_closest_1_point_y,
        a_distObject_1_point_z = a_closest_1_point_z,
        a_distObject_1_color_x = a_closest_1_color_x,
        a_distObject_1_color_y = a_closest_1_color_y,
        a_distObject_1_color_z = a_closest_1_color_z,
        a_distObject_1_specular = a_closest_1_specular,
        a_distObject_1_lambert = a_closest_1_lambert,
        a_distObject_1_ambient = a_closest_1_ambient,
        a_distObject_1_radius = a_closest_1_radius;
    /////

    if (a_distObject_0 === 100000000) {
        return 200; // whit ish
    } else {
        var a_dist = a_distObject_0;

            a_object_point_x = a_distObject_1_point_x;
            a_object_point_y = a_distObject_1_point_y;
            a_object_point_z = a_distObject_1_point_z;
            a_object_color_x = a_distObject_1_color_x;
            a_object_color_y = a_distObject_1_color_y;
            a_object_color_z = a_distObject_1_color_z;
            a_object_specular = a_distObject_1_specular;
            a_object_lambert = a_distObject_1_lambert;
            a_object_ambient = a_distObject_1_ambient;
            a_object_radius = a_distObject_1_radius;

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
        var a_sphr_normal_len = Vector_length(a_sphr_normal_x, a_sphr_normal_y, a_sphr_normal_z);
        a_sphr_normal_x /= a_sphr_normal_len;
        a_sphr_normal_y /= a_sphr_normal_len;
        a_sphr_normal_z /= a_sphr_normal_len;

        // suraface calculation
        var a_a_x = a_object_color_x,
            a_a_y = a_object_color_y,
            a_a_z = a_object_color_z,
            a_c_x = 0,
            a_c_y = 0,
            a_c_z = 0,
            a_lambertAmount = 0;

         if (a_object_lambert>0) {
            
            // islightvisible
            var a_diff_x = a_pointAtTime_x - lights_x,
                a_diff_y = a_pointAtTime_y - lights_y,
                a_diff_z = a_pointAtTime_z - lights_z,
                a_diff_len = Vector_length(a_diff_x, a_diff_y, a_diff_z);
            a_diff_x /= a_diff_len;
            a_diff_y /= a_diff_len;
            a_diff_z /= a_diff_len;

            // intersectscene for distobject
            var a_scene_ray_point_x = a_pointAtTime_x,
                a_scene_ray_point_y = a_pointAtTime_y,
                a_scene_ray_point_z = a_pointAtTime_z,
                a_scene_ray_vector_x = a_diff_x,
                a_scene_ray_vector_y = a_diff_y,
                a_scene_ray_vector_z = a_diff_z;

            var a_closest_0 = 100000000,
                a_closest_1_point_x = -1,
                a_closest_1_point_y = -1,
                a_closest_1_point_z = -1,
                a_closest_1_color_x = -1,
                a_closest_1_color_y = -1,
                a_closest_1_color_z = -1,
                a_closest_1_specular = -1,
                a_closest_1_lambert = -1,
                a_closest_1_ambient = -1,
                a_closest_1_radius = -1;

            for (var i = 0; i < 3; i++) {

                if (i == 0) {
            a_object_point_x = n_objects_0_x;
            a_object_point_y = n_objects_0_y;
            a_object_point_z = n_objects_0_z;
            a_object_color_x = n_objects_0_r;
            a_object_color_y = n_objects_0_g;
            a_object_color_z = n_objects_0_b;
            a_object_specular = n_objects_0_spec;
            a_object_lambert = n_objects_0_lamb;
            a_object_ambient = n_objects_0_amb;
            a_object_radius = n_objects_0_rad;
        } else if (i == 1) {
            a_object_point_x = n_objects_1_x;
            a_object_point_y = n_objects_1_y;
            a_object_point_z = n_objects_1_z;
            a_object_color_x = n_objects_1_r;
            a_object_color_y = n_objects_1_g;
            a_object_color_z = n_objects_1_b;
            a_object_specular = n_objects_1_spec;
            a_object_lambert = n_objects_1_lamb;
            a_object_ambient = n_objects_1_amb;
            a_object_radius = n_objects_1_rad;
        } else if (i == 2) {
            a_object_point_x = n_objects_2_x;
            a_object_point_y = n_objects_2_y;
            a_object_point_z = n_objects_2_z;
            a_object_color_x = n_objects_2_r;
            a_object_color_y = n_objects_2_g;
            a_object_color_z = n_objects_2_b;
            a_object_specular = n_objects_2_spec;
            a_object_lambert = n_objects_2_lamb;
            a_object_ambient = n_objects_2_amb;
            a_object_radius = n_objects_2_rad;
        }

                // sphere intersection
                // subtract
                var a_dist = -1;
                var a_eye_to_center_x = a_object_point_x - a_scene_ray_point_x,
                    a_eye_to_center_y = a_object_point_y - a_scene_ray_point_y,
                    a_eye_to_center_z = a_object_point_z - a_scene_ray_point_z;

                var a_v = Vector_dotProduct(a_eye_to_center_x, a_eye_to_center_y, a_eye_to_center_z,
                        a_scene_ray_vector_x, a_scene_ray_vector_y, a_scene_ray_vector_z),
                    a_eoDot = Vector_dotProduct(a_eye_to_center_x, a_eye_to_center_y, a_eye_to_center_z,
                        a_eye_to_center_x, a_eye_to_center_y, a_eye_to_center_z),
                    a_discriminant = (a_object_radius * a_object_radius) - a_eoDot + (a_v * a_v);
                if (a_discriminant < 0) {} else {
                    a_dist = a_v - mathSqrt(a_discriminant);
                }
                //

                if (a_dist !== -1 && a_dist < a_closest_0) {
                    // a_closest = [a_dist, a_object];
                    a_closest_0 = a_dist;

                    a_closest_1_point_x = a_object_point_x;
                        a_closest_1_point_y = a_object_point_y;
                        a_closest_1_point_z = a_object_point_z;
                        a_closest_1_color_x = a_object_color_x;
                        a_closest_1_color_y = a_object_color_y;
                        a_closest_1_color_z = a_object_color_z;
                        a_closest_1_specular = a_object_specular;
                        a_closest_1_lambert = a_object_lambert;
                        a_closest_1_ambient = a_object_ambient;
                        a_closest_1_radius = a_object_radius;
                }
            }

            var a_distObject_0 = a_closest_0;
            var a_distObject_1_point_x = a_closest_1_point_x,
                a_distObject_1_point_y = a_closest_1_point_y,
                a_distObject_1_point_z = a_closest_1_point_z,
                a_distObject_1_color_x = a_closest_1_color_x,
                a_distObject_1_color_y = a_closest_1_color_y,
                a_distObject_1_color_z = a_closest_1_color_z,
                a_distObject_1_specular = a_closest_1_specular,
                a_distObject_1_lambert = a_closest_1_lambert,
                a_distObject_1_ambient = a_closest_1_ambient,
                a_distObject_1_radius = a_closest_1_radius;
            ////////
            //

            if (a_distObject_0 > -0.005) {
                // subtract first
                var a_diff_x = lights_x - a_pointAtTime_x,
                    a_diff_y = lights_y - a_pointAtTime_y,
                    a_diff_z = lights_z - a_pointAtTime_z,
                    a_diff_len = Vector_length(a_diff_x, a_diff_y, a_diff_z);
                a_diff_x /= a_diff_len;
                a_diff_y /= a_diff_len;
                a_diff_z /= a_diff_len;

                var contribution = Vector_dotProduct(a_diff_x, a_diff_y, a_diff_z, a_sphr_normal_x, a_sphr_normal_y, a_sphr_normal_z);

                if (contribution > 0) a_lambertAmount += contribution;
            }
        }

         if (a_object_specular>0) {
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

            // recursive call BEGINSSSSSS
            var reflectedColor = trace_color1(a_pointAtTime_x, a_pointAtTime_y, a_pointAtTime_z,
                a_reflectedRay_vector_x, a_reflectedRay_vector_y, a_reflectedRay_vector_z,
                n_objects_0_type, n_objects_0_x, n_objects_0_y, n_objects_0_z, n_objects_0_r, n_objects_0_g, n_objects_0_b, n_objects_0_spec, n_objects_0_lamb, n_objects_0_amb, n_objects_0_rad,
                n_objects_1_type, n_objects_1_x, n_objects_1_y, n_objects_1_z, n_objects_1_r, n_objects_1_g, n_objects_1_b, n_objects_1_spec, n_objects_1_lamb, n_objects_1_amb, n_objects_1_rad,
                n_objects_2_type, n_objects_2_x, n_objects_2_y, n_objects_2_z, n_objects_2_r, n_objects_2_g, n_objects_2_b, n_objects_2_spec, n_objects_2_lamb, n_objects_2_amb, n_objects_2_rad,
                lights_x, lights_y, lights_z, ++depth, color);


             if ( reflectedColor>0){
                //scale and add
                if (color == 0) {
                    a_c_x += reflectedColor * a_object_specular;;
                } else if (color == 1) {
                    a_c_y += reflectedColor * a_object_specular;
                } else if (color == 2) {
                    a_c_z += reflectedColor * a_object_specular;
                }

            }
        }

        a_lambertAmount = mathMin(1, a_lambertAmount);

        if (color == 0) {
            a_c_x += a_a_x * a_lambertAmount * a_object_lambert;
            a_c_x += a_a_x * a_object_ambient;
            return a_c_x;
        } else if (color == 1) {
            a_c_y += a_a_y * a_lambertAmount * a_object_lambert;
            a_c_y += a_a_y * a_object_ambient;
            return a_c_y;
        } else if (color == 2) {
            a_c_z += a_a_z * a_lambertAmount * a_object_lambert;
            a_c_z += a_a_z * a_object_ambient;
            return a_c_z;
        }
    }
}

function trace_color1(ray_x, ray_y, ray_z, ray_v_x, ray_v_y, ray_v_z, n_objects_0_type, n_objects_0_x, n_objects_0_y, n_objects_0_z, n_objects_0_r, n_objects_0_g, n_objects_0_b, n_objects_0_spec, n_objects_0_lamb, n_objects_0_amb, n_objects_0_rad,
    n_objects_1_type, n_objects_1_x, n_objects_1_y, n_objects_1_z, n_objects_1_r, n_objects_1_g, n_objects_1_b, n_objects_1_spec, n_objects_1_lamb, n_objects_1_amb, n_objects_1_rad,
    n_objects_2_type, n_objects_2_x, n_objects_2_y, n_objects_2_z, n_objects_2_r, n_objects_2_g, n_objects_2_b, n_objects_2_spec, n_objects_2_lamb, n_objects_2_amb, n_objects_2_rad,
    lights_x, lights_y, lights_z, depth, color) {

    var a_ray_point_x = ray_x,
        a_ray_point_y = ray_y,
        a_ray_point_z = ray_z,
        a_ray_vector_x = ray_v_x,
        a_ray_vector_y = ray_v_y,
        a_ray_vector_z = ray_v_z;
    // intersectscene for calculating the distobject
    var a_closest_0 = 100000000,
        a_closest_1_point_x = -1,
        a_closest_1_point_y = -1,
        a_closest_1_point_z = -1,
        a_closest_1_color_x = -1,
        a_closest_1_color_y = -1,
        a_closest_1_color_z = -1,
        a_closest_1_specular = -1,
        a_closest_1_lambert = -1,
        a_closest_1_ambient = -1,
        a_closest_1_radius = -1;

    var a_object_point_x,
        a_object_point_y,
        a_object_point_z,
        a_object_color_x,
        a_object_color_y,
        a_object_color_z,
        a_object_specular,
        a_object_lambert,
        a_object_ambient,
        a_object_radius;

    for (var i = 0; i < 3; i++) {
        if (i == 0) {
            a_object_point_x = n_objects_0_x;
            a_object_point_y = n_objects_0_y;
            a_object_point_z = n_objects_0_z;
            a_object_color_x = n_objects_0_r;
            a_object_color_y = n_objects_0_g;
            a_object_color_z = n_objects_0_b;
            a_object_specular = n_objects_0_spec;
            a_object_lambert = n_objects_0_lamb;
            a_object_ambient = n_objects_0_amb;
            a_object_radius = n_objects_0_rad;
        } else if (i == 1) {
            a_object_point_x = n_objects_1_x;
            a_object_point_y = n_objects_1_y;
            a_object_point_z = n_objects_1_z;
            a_object_color_x = n_objects_1_r;
            a_object_color_y = n_objects_1_g;
            a_object_color_z = n_objects_1_b;
            a_object_specular = n_objects_1_spec;
            a_object_lambert = n_objects_1_lamb;
            a_object_ambient = n_objects_1_amb;
            a_object_radius = n_objects_1_rad;
        } else if (i == 2) {
            a_object_point_x = n_objects_2_x;
            a_object_point_y = n_objects_2_y;
            a_object_point_z = n_objects_2_z;
            a_object_color_x = n_objects_2_r;
            a_object_color_y = n_objects_2_g;
            a_object_color_z = n_objects_2_b;
            a_object_specular = n_objects_2_spec;
            a_object_lambert = n_objects_2_lamb;
            a_object_ambient = n_objects_2_amb;
            a_object_radius = n_objects_2_rad;
        }

        // sphere intersection
        // subtract
        var a_dist = -1;
        var a_eye_to_center_x = a_object_point_x - a_ray_point_x,
            a_eye_to_center_y = a_object_point_y - a_ray_point_y,
            a_eye_to_center_z = a_object_point_z - a_ray_point_z;

        var a_v = Vector_dotProduct(a_eye_to_center_x, a_eye_to_center_y, a_eye_to_center_z,
                a_ray_vector_x, a_ray_vector_y, a_ray_vector_z),
            a_eoDot = Vector_dotProduct(a_eye_to_center_x, a_eye_to_center_y, a_eye_to_center_z,
                a_eye_to_center_x, a_eye_to_center_y, a_eye_to_center_z),
            a_discriminant = (a_object_radius * a_object_radius) - a_eoDot + (a_v * a_v);
        if (a_discriminant < 0) {} else {
            a_dist = a_v - mathSqrt(a_discriminant);
        }
        //

        if (a_dist !== -1 && a_dist < a_closest_0) {
            a_closest_0 = a_dist;

            a_closest_1_point_x = a_object_point_x;
                a_closest_1_point_y = a_object_point_y;
                a_closest_1_point_z = a_object_point_z;
                a_closest_1_color_x = a_object_color_x;
                a_closest_1_color_y = a_object_color_y;
                a_closest_1_color_z = a_object_color_z;
                a_closest_1_specular = a_object_specular;
                a_closest_1_lambert = a_object_lambert;
                a_closest_1_ambient = a_object_ambient;
                a_closest_1_radius = a_object_radius;
        }
    }

    var a_distObject_0 = a_closest_0;
    var a_distObject_1_point_x = a_closest_1_point_x,
        a_distObject_1_point_y = a_closest_1_point_y,
        a_distObject_1_point_z = a_closest_1_point_z,
        a_distObject_1_color_x = a_closest_1_color_x,
        a_distObject_1_color_y = a_closest_1_color_y,
        a_distObject_1_color_z = a_closest_1_color_z,
        a_distObject_1_specular = a_closest_1_specular,
        a_distObject_1_lambert = a_closest_1_lambert,
        a_distObject_1_ambient = a_closest_1_ambient,
        a_distObject_1_radius = a_closest_1_radius;
    /////

    if (a_distObject_0 === 100000000) {
        return 200; // whit ish
    } else {
        var a_dist = a_distObject_0;

            a_object_point_x = a_distObject_1_point_x;
            a_object_point_y = a_distObject_1_point_y;
            a_object_point_z = a_distObject_1_point_z;
            a_object_color_x = a_distObject_1_color_x;
            a_object_color_y = a_distObject_1_color_y;
            a_object_color_z = a_distObject_1_color_z;
            a_object_specular = a_distObject_1_specular;
            a_object_lambert = a_distObject_1_lambert;
            a_object_ambient = a_distObject_1_ambient;
            a_object_radius = a_distObject_1_radius;

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
        var a_sphr_normal_len = Vector_length(a_sphr_normal_x, a_sphr_normal_y, a_sphr_normal_z);
        a_sphr_normal_x /= a_sphr_normal_len;
        a_sphr_normal_y /= a_sphr_normal_len;
        a_sphr_normal_z /= a_sphr_normal_len;

        // suraface calculation
        var a_a_x = a_object_color_x,
            a_a_y = a_object_color_y,
            a_a_z = a_object_color_z,
            a_c_x = 0,
            a_c_y = 0,
            a_c_z = 0,
            a_lambertAmount = 0;

         if (a_object_lambert>0) {
            
            // islightvisible
            var a_diff_x = a_pointAtTime_x - lights_x,
                a_diff_y = a_pointAtTime_y - lights_y,
                a_diff_z = a_pointAtTime_z - lights_z,
                a_diff_len = Vector_length(a_diff_x, a_diff_y, a_diff_z);
            a_diff_x /= a_diff_len;
            a_diff_y /= a_diff_len;
            a_diff_z /= a_diff_len;

            // intersectscene for distobject
            var a_scene_ray_point_x = a_pointAtTime_x,
                a_scene_ray_point_y = a_pointAtTime_y,
                a_scene_ray_point_z = a_pointAtTime_z,
                a_scene_ray_vector_x = a_diff_x,
                a_scene_ray_vector_y = a_diff_y,
                a_scene_ray_vector_z = a_diff_z;

            var a_closest_0 = 100000000,
                a_closest_1_point_x = -1,
                a_closest_1_point_y = -1,
                a_closest_1_point_z = -1,
                a_closest_1_color_x = -1,
                a_closest_1_color_y = -1,
                a_closest_1_color_z = -1,
                a_closest_1_specular = -1,
                a_closest_1_lambert = -1,
                a_closest_1_ambient = -1,
                a_closest_1_radius = -1;

            for (var i = 0; i < 3; i++) {

                if (i == 0) {
            a_object_point_x = n_objects_0_x;
            a_object_point_y = n_objects_0_y;
            a_object_point_z = n_objects_0_z;
            a_object_color_x = n_objects_0_r;
            a_object_color_y = n_objects_0_g;
            a_object_color_z = n_objects_0_b;
            a_object_specular = n_objects_0_spec;
            a_object_lambert = n_objects_0_lamb;
            a_object_ambient = n_objects_0_amb;
            a_object_radius = n_objects_0_rad;
        } else if (i == 1) {
            a_object_point_x = n_objects_1_x;
            a_object_point_y = n_objects_1_y;
            a_object_point_z = n_objects_1_z;
            a_object_color_x = n_objects_1_r;
            a_object_color_y = n_objects_1_g;
            a_object_color_z = n_objects_1_b;
            a_object_specular = n_objects_1_spec;
            a_object_lambert = n_objects_1_lamb;
            a_object_ambient = n_objects_1_amb;
            a_object_radius = n_objects_1_rad;
        } else if (i == 2) {
            a_object_point_x = n_objects_2_x;
            a_object_point_y = n_objects_2_y;
            a_object_point_z = n_objects_2_z;
            a_object_color_x = n_objects_2_r;
            a_object_color_y = n_objects_2_g;
            a_object_color_z = n_objects_2_b;
            a_object_specular = n_objects_2_spec;
            a_object_lambert = n_objects_2_lamb;
            a_object_ambient = n_objects_2_amb;
            a_object_radius = n_objects_2_rad;
        }

                // sphere intersection
                // subtract

                var a_dist = -1;
                var a_eye_to_center_x = a_object_point_x - a_scene_ray_point_x,
                    a_eye_to_center_y = a_object_point_y - a_scene_ray_point_y,
                    a_eye_to_center_z = a_object_point_z - a_scene_ray_point_z;

                var a_v = Vector_dotProduct(a_eye_to_center_x, a_eye_to_center_y, a_eye_to_center_z,
                        a_scene_ray_vector_x, a_scene_ray_vector_y, a_scene_ray_vector_z),
                    a_eoDot = Vector_dotProduct(a_eye_to_center_x, a_eye_to_center_y, a_eye_to_center_z,
                        a_eye_to_center_x, a_eye_to_center_y, a_eye_to_center_z),
                    a_discriminant = (a_object_radius * a_object_radius) - a_eoDot + (a_v * a_v);
                if (a_discriminant < 0) {} else {
                    a_dist = a_v - mathSqrt(a_discriminant);
                }
                //

                if (a_dist !== -1 && a_dist < a_closest_0) {
                    // a_closest = [a_dist, a_object];
                    a_closest_0 = a_dist;

                    a_closest_1_point_x = a_object_point_x;
                        a_closest_1_point_y = a_object_point_y;
                        a_closest_1_point_z = a_object_point_z;
                        a_closest_1_color_x = a_object_color_x;
                        a_closest_1_color_y = a_object_color_y;
                        a_closest_1_color_z = a_object_color_z;
                        a_closest_1_specular = a_object_specular;
                        a_closest_1_lambert = a_object_lambert;
                        a_closest_1_ambient = a_object_ambient;
                        a_closest_1_radius = a_object_radius;
                }
            }

            var a_distObject_0 = a_closest_0;
            var a_distObject_1_point_x = a_closest_1_point_x,
                a_distObject_1_point_y = a_closest_1_point_y,
                a_distObject_1_point_z = a_closest_1_point_z,
                a_distObject_1_color_x = a_closest_1_color_x,
                a_distObject_1_color_y = a_closest_1_color_y,
                a_distObject_1_color_z = a_closest_1_color_z,
                a_distObject_1_specular = a_closest_1_specular,
                a_distObject_1_lambert = a_closest_1_lambert,
                a_distObject_1_ambient = a_closest_1_ambient,
                a_distObject_1_radius = a_closest_1_radius;
            ////////
            //

            if (a_distObject_0 > -0.005) {
                // subtract first
                var a_diff_x = lights_x - a_pointAtTime_x,
                    a_diff_y = lights_y - a_pointAtTime_y,
                    a_diff_z = lights_z - a_pointAtTime_z,
                    a_diff_len = Vector_length(a_diff_x, a_diff_y, a_diff_z);
                a_diff_x /= a_diff_len;
                a_diff_y /= a_diff_len;
                a_diff_z /= a_diff_len;

                var contribution = Vector_dotProduct(a_diff_x, a_diff_y, a_diff_z, a_sphr_normal_x, a_sphr_normal_y, a_sphr_normal_z);

                if (contribution > 0) a_lambertAmount += contribution;
            }
        }

         if (a_object_specular>0) {
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

            // recursive call BEGINSSSSSS
            var reflectedColor = trace_color2(a_pointAtTime_x, a_pointAtTime_y, a_pointAtTime_z,
                a_reflectedRay_vector_x, a_reflectedRay_vector_y, a_reflectedRay_vector_z,
                n_objects_0_type, n_objects_0_x, n_objects_0_y, n_objects_0_z, n_objects_0_r, n_objects_0_g, n_objects_0_b, n_objects_0_spec, n_objects_0_lamb, n_objects_0_amb, n_objects_0_rad,
                n_objects_1_type, n_objects_1_x, n_objects_1_y, n_objects_1_z, n_objects_1_r, n_objects_1_g, n_objects_1_b, n_objects_1_spec, n_objects_1_lamb, n_objects_1_amb, n_objects_1_rad,
                n_objects_2_type, n_objects_2_x, n_objects_2_y, n_objects_2_z, n_objects_2_r, n_objects_2_g, n_objects_2_b, n_objects_2_spec, n_objects_2_lamb, n_objects_2_amb, n_objects_2_rad,
                lights_x, lights_y, lights_z, ++depth, color);


             if ( reflectedColor>0){
                //scale and add
                if (color == 0) {
                    a_c_x += reflectedColor * a_object_specular;;
                } else if (color == 1) {
                    a_c_y += reflectedColor * a_object_specular;
                } else if (color == 2) {
                    a_c_z += reflectedColor * a_object_specular;
                }

            }
        }

        a_lambertAmount = mathMin(1, a_lambertAmount);

        if (color == 0) {
            a_c_x += a_a_x * a_lambertAmount * a_object_lambert;
            a_c_x += a_a_x * a_object_ambient;
            return a_c_x;
        } else if (color == 1) {
            a_c_y += a_a_y * a_lambertAmount * a_object_lambert;
            a_c_y += a_a_y * a_object_ambient;
            return a_c_y;
        } else if (color == 2) {
            a_c_z += a_a_z * a_lambertAmount * a_object_lambert;
            a_c_z += a_a_z * a_object_ambient;
            return a_c_z;
        }
    }
}
function trace_color2(ray_x, ray_y, ray_z, ray_v_x, ray_v_y, ray_v_z, n_objects_0_type, n_objects_0_x, n_objects_0_y, n_objects_0_z, n_objects_0_r, n_objects_0_g, n_objects_0_b, n_objects_0_spec, n_objects_0_lamb, n_objects_0_amb, n_objects_0_rad,
    n_objects_1_type, n_objects_1_x, n_objects_1_y, n_objects_1_z, n_objects_1_r, n_objects_1_g, n_objects_1_b, n_objects_1_spec, n_objects_1_lamb, n_objects_1_amb, n_objects_1_rad,
    n_objects_2_type, n_objects_2_x, n_objects_2_y, n_objects_2_z, n_objects_2_r, n_objects_2_g, n_objects_2_b, n_objects_2_spec, n_objects_2_lamb, n_objects_2_amb, n_objects_2_rad,
    lights_x, lights_y, lights_z, depth, color) {

    var a_ray_point_x = ray_x,
        a_ray_point_y = ray_y,
        a_ray_point_z = ray_z,
        a_ray_vector_x = ray_v_x,
        a_ray_vector_y = ray_v_y,
        a_ray_vector_z = ray_v_z;
    // intersectscene for calculating the distobject
    var a_closest_0 = 100000000,
        a_closest_1_point_x = -1,
        a_closest_1_point_y = -1,
        a_closest_1_point_z = -1,
        a_closest_1_color_x = -1,
        a_closest_1_color_y = -1,
        a_closest_1_color_z = -1,
        a_closest_1_specular = -1,
        a_closest_1_lambert = -1,
        a_closest_1_ambient = -1,
        a_closest_1_radius = -1;

    var a_object_point_x,
        a_object_point_y,
        a_object_point_z,
        a_object_color_x,
        a_object_color_y,
        a_object_color_z,
        a_object_specular,
        a_object_lambert,
        a_object_ambient,
        a_object_radius;

    for (var i = 0; i < 3; i++) {
        if (i == 0) {
            a_object_point_x = n_objects_0_x;
            a_object_point_y = n_objects_0_y;
            a_object_point_z = n_objects_0_z;
            a_object_color_x = n_objects_0_r;
            a_object_color_y = n_objects_0_g;
            a_object_color_z = n_objects_0_b;
            a_object_specular = n_objects_0_spec;
            a_object_lambert = n_objects_0_lamb;
            a_object_ambient = n_objects_0_amb;
            a_object_radius = n_objects_0_rad;
        } else if (i == 1) {
            a_object_point_x = n_objects_1_x;
            a_object_point_y = n_objects_1_y;
            a_object_point_z = n_objects_1_z;
            a_object_color_x = n_objects_1_r;
            a_object_color_y = n_objects_1_g;
            a_object_color_z = n_objects_1_b;
            a_object_specular = n_objects_1_spec;
            a_object_lambert = n_objects_1_lamb;
            a_object_ambient = n_objects_1_amb;
            a_object_radius = n_objects_1_rad;
        } else if (i == 2) {
            a_object_point_x = n_objects_2_x;
            a_object_point_y = n_objects_2_y;
            a_object_point_z = n_objects_2_z;
            a_object_color_x = n_objects_2_r;
            a_object_color_y = n_objects_2_g;
            a_object_color_z = n_objects_2_b;
            a_object_specular = n_objects_2_spec;
            a_object_lambert = n_objects_2_lamb;
            a_object_ambient = n_objects_2_amb;
            a_object_radius = n_objects_2_rad;
        }

        // sphere intersection
        // subtract
        var a_dist = -1;
        var a_eye_to_center_x = a_object_point_x - a_ray_point_x,
            a_eye_to_center_y = a_object_point_y - a_ray_point_y,
            a_eye_to_center_z = a_object_point_z - a_ray_point_z;

        var a_v = Vector_dotProduct(a_eye_to_center_x, a_eye_to_center_y, a_eye_to_center_z,
                a_ray_vector_x, a_ray_vector_y, a_ray_vector_z),
            a_eoDot = Vector_dotProduct(a_eye_to_center_x, a_eye_to_center_y, a_eye_to_center_z,
                a_eye_to_center_x, a_eye_to_center_y, a_eye_to_center_z),
            a_discriminant = (a_object_radius * a_object_radius) - a_eoDot + (a_v * a_v);
        if (a_discriminant < 0) {} else {
            a_dist = a_v - mathSqrt(a_discriminant);
        }
        //

        if (a_dist !== -1 && a_dist < a_closest_0) {
            a_closest_0 = a_dist;

            a_closest_1_point_x = a_object_point_x;
                a_closest_1_point_y = a_object_point_y;
                a_closest_1_point_z = a_object_point_z;
                a_closest_1_color_x = a_object_color_x;
                a_closest_1_color_y = a_object_color_y;
                a_closest_1_color_z = a_object_color_z;
                a_closest_1_specular = a_object_specular;
                a_closest_1_lambert = a_object_lambert;
                a_closest_1_ambient = a_object_ambient;
                a_closest_1_radius = a_object_radius;
        }
    }

    var a_distObject_0 = a_closest_0;
    var a_distObject_1_point_x = a_closest_1_point_x,
        a_distObject_1_point_y = a_closest_1_point_y,
        a_distObject_1_point_z = a_closest_1_point_z,
        a_distObject_1_color_x = a_closest_1_color_x,
        a_distObject_1_color_y = a_closest_1_color_y,
        a_distObject_1_color_z = a_closest_1_color_z,
        a_distObject_1_specular = a_closest_1_specular,
        a_distObject_1_lambert = a_closest_1_lambert,
        a_distObject_1_ambient = a_closest_1_ambient,
        a_distObject_1_radius = a_closest_1_radius;
    /////

    if (a_distObject_0 === 100000000) {
        return 200; // whit ish
    } else {
        var a_dist = a_distObject_0;

            a_object_point_x = a_distObject_1_point_x;
            a_object_point_y = a_distObject_1_point_y;
            a_object_point_z = a_distObject_1_point_z;
            a_object_color_x = a_distObject_1_color_x;
            a_object_color_y = a_distObject_1_color_y;
            a_object_color_z = a_distObject_1_color_z;
            a_object_specular = a_distObject_1_specular;
            a_object_lambert = a_distObject_1_lambert;
            a_object_ambient = a_distObject_1_ambient;
            a_object_radius = a_distObject_1_radius;

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
        var a_sphr_normal_len = Vector_length(a_sphr_normal_x, a_sphr_normal_y, a_sphr_normal_z);
        a_sphr_normal_x /= a_sphr_normal_len;
        a_sphr_normal_y /= a_sphr_normal_len;
        a_sphr_normal_z /= a_sphr_normal_len;

        // suraface calculation
        var a_a_x = a_object_color_x,
            a_a_y = a_object_color_y,
            a_a_z = a_object_color_z,
            a_c_x = 0,
            a_c_y = 0,
            a_c_z = 0,
            a_lambertAmount = 0;

         if (a_object_lambert>0) {
            
            // islightvisible
            var a_diff_x = a_pointAtTime_x - lights_x,
                a_diff_y = a_pointAtTime_y - lights_y,
                a_diff_z = a_pointAtTime_z - lights_z,
                a_diff_len = Vector_length(a_diff_x, a_diff_y, a_diff_z);
            a_diff_x /= a_diff_len;
            a_diff_y /= a_diff_len;
            a_diff_z /= a_diff_len;

            // intersectscene for distobject
            var a_scene_ray_point_x = a_pointAtTime_x,
                a_scene_ray_point_y = a_pointAtTime_y,
                a_scene_ray_point_z = a_pointAtTime_z,
                a_scene_ray_vector_x = a_diff_x,
                a_scene_ray_vector_y = a_diff_y,
                a_scene_ray_vector_z = a_diff_z;

            var a_closest_0 = 100000000,
                a_closest_1_point_x = -1,
                a_closest_1_point_y = -1,
                a_closest_1_point_z = -1,
                a_closest_1_color_x = -1,
                a_closest_1_color_y = -1,
                a_closest_1_color_z = -1,
                a_closest_1_specular = -1,
                a_closest_1_lambert = -1,
                a_closest_1_ambient = -1,
                a_closest_1_radius = -1;

            for (var i = 0; i < 3; i++) {

                if (i == 0) {
            a_object_point_x = n_objects_0_x;
            a_object_point_y = n_objects_0_y;
            a_object_point_z = n_objects_0_z;
            a_object_color_x = n_objects_0_r;
            a_object_color_y = n_objects_0_g;
            a_object_color_z = n_objects_0_b;
            a_object_specular = n_objects_0_spec;
            a_object_lambert = n_objects_0_lamb;
            a_object_ambient = n_objects_0_amb;
            a_object_radius = n_objects_0_rad;
        } else if (i == 1) {
            a_object_point_x = n_objects_1_x;
            a_object_point_y = n_objects_1_y;
            a_object_point_z = n_objects_1_z;
            a_object_color_x = n_objects_1_r;
            a_object_color_y = n_objects_1_g;
            a_object_color_z = n_objects_1_b;
            a_object_specular = n_objects_1_spec;
            a_object_lambert = n_objects_1_lamb;
            a_object_ambient = n_objects_1_amb;
            a_object_radius = n_objects_1_rad;
        } else if (i == 2) {
            a_object_point_x = n_objects_2_x;
            a_object_point_y = n_objects_2_y;
            a_object_point_z = n_objects_2_z;
            a_object_color_x = n_objects_2_r;
            a_object_color_y = n_objects_2_g;
            a_object_color_z = n_objects_2_b;
            a_object_specular = n_objects_2_spec;
            a_object_lambert = n_objects_2_lamb;
            a_object_ambient = n_objects_2_amb;
            a_object_radius = n_objects_2_rad;
        }

                // sphere intersection
                // subtract
                var a_dist = -1;
                var a_eye_to_center_x = a_object_point_x - a_scene_ray_point_x,
                    a_eye_to_center_y = a_object_point_y - a_scene_ray_point_y,
                    a_eye_to_center_z = a_object_point_z - a_scene_ray_point_z;

                var a_v = Vector_dotProduct(a_eye_to_center_x, a_eye_to_center_y, a_eye_to_center_z,
                        a_scene_ray_vector_x, a_scene_ray_vector_y, a_scene_ray_vector_z),
                    a_eoDot = Vector_dotProduct(a_eye_to_center_x, a_eye_to_center_y, a_eye_to_center_z,
                        a_eye_to_center_x, a_eye_to_center_y, a_eye_to_center_z),
                    a_discriminant = (a_object_radius * a_object_radius) - a_eoDot + (a_v * a_v);
                if (a_discriminant < 0) {} else {
                    a_dist = a_v - mathSqrt(a_discriminant);
                }
                //

                if (a_dist !== -1 && a_dist < a_closest_0) {
                    // a_closest = [a_dist, a_object];
                    a_closest_0 = a_dist;

                    a_closest_1_point_x = a_object_point_x;
                        a_closest_1_point_y = a_object_point_y;
                        a_closest_1_point_z = a_object_point_z;
                        a_closest_1_color_x = a_object_color_x;
                        a_closest_1_color_y = a_object_color_y;
                        a_closest_1_color_z = a_object_color_z;
                        a_closest_1_specular = a_object_specular;
                        a_closest_1_lambert = a_object_lambert;
                        a_closest_1_ambient = a_object_ambient;
                        a_closest_1_radius = a_object_radius;
                }
            }

            var a_distObject_0 = a_closest_0;
            var a_distObject_1_point_x = a_closest_1_point_x,
                a_distObject_1_point_y = a_closest_1_point_y,
                a_distObject_1_point_z = a_closest_1_point_z,
                a_distObject_1_color_x = a_closest_1_color_x,
                a_distObject_1_color_y = a_closest_1_color_y,
                a_distObject_1_color_z = a_closest_1_color_z,
                a_distObject_1_specular = a_closest_1_specular,
                a_distObject_1_lambert = a_closest_1_lambert,
                a_distObject_1_ambient = a_closest_1_ambient,
                a_distObject_1_radius = a_closest_1_radius;
            ////////
            //

            if (a_distObject_0 > -0.005) {
                // subtract first
                var a_diff_x = lights_x - a_pointAtTime_x,
                    a_diff_y = lights_y - a_pointAtTime_y,
                    a_diff_z = lights_z - a_pointAtTime_z,
                    a_diff_len = Vector_length(a_diff_x, a_diff_y, a_diff_z);
                a_diff_x /= a_diff_len;
                a_diff_y /= a_diff_len;
                a_diff_z /= a_diff_len;

                var contribution = Vector_dotProduct(a_diff_x, a_diff_y, a_diff_z, a_sphr_normal_x, a_sphr_normal_y, a_sphr_normal_z);

                if (contribution > 0) a_lambertAmount += contribution;
            }
        }

         if (a_object_specular>0) {
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

            // recursive call BEGINSSSSSS
            var reflectedColor = trace_color3(a_pointAtTime_x, a_pointAtTime_y, a_pointAtTime_z,
                a_reflectedRay_vector_x, a_reflectedRay_vector_y, a_reflectedRay_vector_z,
                n_objects_0_type, n_objects_0_x, n_objects_0_y, n_objects_0_z, n_objects_0_r, n_objects_0_g, n_objects_0_b, n_objects_0_spec, n_objects_0_lamb, n_objects_0_amb, n_objects_0_rad,
                n_objects_1_type, n_objects_1_x, n_objects_1_y, n_objects_1_z, n_objects_1_r, n_objects_1_g, n_objects_1_b, n_objects_1_spec, n_objects_1_lamb, n_objects_1_amb, n_objects_1_rad,
                n_objects_2_type, n_objects_2_x, n_objects_2_y, n_objects_2_z, n_objects_2_r, n_objects_2_g, n_objects_2_b, n_objects_2_spec, n_objects_2_lamb, n_objects_2_amb, n_objects_2_rad,
                lights_x, lights_y, lights_z, ++depth, color);


             if ( reflectedColor>0){
                //scale and add
                if (color == 0) {
                    a_c_x += reflectedColor * a_object_specular;;
                } else if (color == 1) {
                    a_c_y += reflectedColor * a_object_specular;
                } else if (color == 2) {
                    a_c_z += reflectedColor * a_object_specular;
                }

            }
        }

        a_lambertAmount = mathMin(1, a_lambertAmount);

        if (color == 0) {
            a_c_x += a_a_x * a_lambertAmount * a_object_lambert;
            a_c_x += a_a_x * a_object_ambient;
            return a_c_x;
        } else if (color == 1) {
            a_c_y += a_a_y * a_lambertAmount * a_object_lambert;
            a_c_y += a_a_y * a_object_ambient;
            return a_c_y;
        } else if (color == 2) {
            a_c_z += a_a_z * a_lambertAmount * a_object_lambert;
            a_c_z += a_a_z * a_object_ambient;
            return a_c_z;
        }
    }
}
function trace_color3(ray_x, ray_y, ray_z, ray_v_x, ray_v_y, ray_v_z, n_objects_0_type, n_objects_0_x, n_objects_0_y, n_objects_0_z, n_objects_0_r, n_objects_0_g, n_objects_0_b, n_objects_0_spec, n_objects_0_lamb, n_objects_0_amb, n_objects_0_rad,
    n_objects_1_type, n_objects_1_x, n_objects_1_y, n_objects_1_z, n_objects_1_r, n_objects_1_g, n_objects_1_b, n_objects_1_spec, n_objects_1_lamb, n_objects_1_amb, n_objects_1_rad,
    n_objects_2_type, n_objects_2_x, n_objects_2_y, n_objects_2_z, n_objects_2_r, n_objects_2_g, n_objects_2_b, n_objects_2_spec, n_objects_2_lamb, n_objects_2_amb, n_objects_2_rad,
    lights_x, lights_y, lights_z, depth, color) {

    var a_ray_point_x = ray_x,
        a_ray_point_y = ray_y,
        a_ray_point_z = ray_z,
        a_ray_vector_x = ray_v_x,
        a_ray_vector_y = ray_v_y,
        a_ray_vector_z = ray_v_z;
    // intersectscene for calculating the distobject
    var a_closest_0 = 100000000,
        a_closest_1_point_x = -1,
        a_closest_1_point_y = -1,
        a_closest_1_point_z = -1,
        a_closest_1_color_x = -1,
        a_closest_1_color_y = -1,
        a_closest_1_color_z = -1,
        a_closest_1_specular = -1,
        a_closest_1_lambert = -1,
        a_closest_1_ambient = -1,
        a_closest_1_radius = -1;

    var a_object_point_x,
        a_object_point_y,
        a_object_point_z,
        a_object_color_x,
        a_object_color_y,
        a_object_color_z,
        a_object_specular,
        a_object_lambert,
        a_object_ambient,
        a_object_radius;

    for (var i = 0; i < 3; i++) {
        if (i == 0) {
            a_object_point_x = n_objects_0_x;
            a_object_point_y = n_objects_0_y;
            a_object_point_z = n_objects_0_z;
            a_object_color_x = n_objects_0_r;
            a_object_color_y = n_objects_0_g;
            a_object_color_z = n_objects_0_b;
            a_object_specular = n_objects_0_spec;
            a_object_lambert = n_objects_0_lamb;
            a_object_ambient = n_objects_0_amb;
            a_object_radius = n_objects_0_rad;
        } else if (i == 1) {
            a_object_point_x = n_objects_1_x;
            a_object_point_y = n_objects_1_y;
            a_object_point_z = n_objects_1_z;
            a_object_color_x = n_objects_1_r;
            a_object_color_y = n_objects_1_g;
            a_object_color_z = n_objects_1_b;
            a_object_specular = n_objects_1_spec;
            a_object_lambert = n_objects_1_lamb;
            a_object_ambient = n_objects_1_amb;
            a_object_radius = n_objects_1_rad;
        } else if (i == 2) {
            a_object_point_x = n_objects_2_x;
            a_object_point_y = n_objects_2_y;
            a_object_point_z = n_objects_2_z;
            a_object_color_x = n_objects_2_r;
            a_object_color_y = n_objects_2_g;
            a_object_color_z = n_objects_2_b;
            a_object_specular = n_objects_2_spec;
            a_object_lambert = n_objects_2_lamb;
            a_object_ambient = n_objects_2_amb;
            a_object_radius = n_objects_2_rad;
        }

        // sphere intersection
        // subtract
        var a_dist = -1;
        var a_eye_to_center_x = a_object_point_x - a_ray_point_x,
            a_eye_to_center_y = a_object_point_y - a_ray_point_y,
            a_eye_to_center_z = a_object_point_z - a_ray_point_z;

        var a_v = Vector_dotProduct(a_eye_to_center_x, a_eye_to_center_y, a_eye_to_center_z,
                a_ray_vector_x, a_ray_vector_y, a_ray_vector_z),
            a_eoDot = Vector_dotProduct(a_eye_to_center_x, a_eye_to_center_y, a_eye_to_center_z,
                a_eye_to_center_x, a_eye_to_center_y, a_eye_to_center_z),
            a_discriminant = (a_object_radius * a_object_radius) - a_eoDot + (a_v * a_v);
        if (a_discriminant < 0) {} else {
            a_dist = a_v - mathSqrt(a_discriminant);
        }
        //

        if (a_dist !== -1 && a_dist < a_closest_0) {
            a_closest_0 = a_dist;

            a_closest_1_point_x = a_object_point_x;
                a_closest_1_point_y = a_object_point_y;
                a_closest_1_point_z = a_object_point_z;
                a_closest_1_color_x = a_object_color_x;
                a_closest_1_color_y = a_object_color_y;
                a_closest_1_color_z = a_object_color_z;
                a_closest_1_specular = a_object_specular;
                a_closest_1_lambert = a_object_lambert;
                a_closest_1_ambient = a_object_ambient;
                a_closest_1_radius = a_object_radius;
        }
    }

    var a_distObject_0 = a_closest_0;
    var a_distObject_1_point_x = a_closest_1_point_x,
        a_distObject_1_point_y = a_closest_1_point_y,
        a_distObject_1_point_z = a_closest_1_point_z,
        a_distObject_1_color_x = a_closest_1_color_x,
        a_distObject_1_color_y = a_closest_1_color_y,
        a_distObject_1_color_z = a_closest_1_color_z,
        a_distObject_1_specular = a_closest_1_specular,
        a_distObject_1_lambert = a_closest_1_lambert,
        a_distObject_1_ambient = a_closest_1_ambient,
        a_distObject_1_radius = a_closest_1_radius;
    /////

    if (a_distObject_0 === 100000000) {
        return 200; // whit ish
    } else {
        var a_dist = a_distObject_0;

            a_object_point_x = a_distObject_1_point_x;
            a_object_point_y = a_distObject_1_point_y;
            a_object_point_z = a_distObject_1_point_z;
            a_object_color_x = a_distObject_1_color_x;
            a_object_color_y = a_distObject_1_color_y;
            a_object_color_z = a_distObject_1_color_z;
            a_object_specular = a_distObject_1_specular;
            a_object_lambert = a_distObject_1_lambert;
            a_object_ambient = a_distObject_1_ambient;
            a_object_radius = a_distObject_1_radius;

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
        var a_sphr_normal_len = Vector_length(a_sphr_normal_x, a_sphr_normal_y, a_sphr_normal_z);
        a_sphr_normal_x /= a_sphr_normal_len;
        a_sphr_normal_y /= a_sphr_normal_len;
        a_sphr_normal_z /= a_sphr_normal_len;

        // suraface calculation
        var a_a_x = a_object_color_x,
            a_a_y = a_object_color_y,
            a_a_z = a_object_color_z,
            a_c_x = 0,
            a_c_y = 0,
            a_c_z = 0,
            a_lambertAmount = 0;

         if (a_object_lambert>0) {
            
            // islightvisible
            var a_diff_x = a_pointAtTime_x - lights_x,
                a_diff_y = a_pointAtTime_y - lights_y,
                a_diff_z = a_pointAtTime_z - lights_z,
                a_diff_len = Vector_length(a_diff_x, a_diff_y, a_diff_z);
            a_diff_x /= a_diff_len;
            a_diff_y /= a_diff_len;
            a_diff_z /= a_diff_len;

            // intersectscene for distobject
            var a_scene_ray_point_x = a_pointAtTime_x,
                a_scene_ray_point_y = a_pointAtTime_y,
                a_scene_ray_point_z = a_pointAtTime_z,
                a_scene_ray_vector_x = a_diff_x,
                a_scene_ray_vector_y = a_diff_y,
                a_scene_ray_vector_z = a_diff_z;

            var a_closest_0 = 100000000,
                a_closest_1_point_x = -1,
                a_closest_1_point_y = -1,
                a_closest_1_point_z = -1,
                a_closest_1_color_x = -1,
                a_closest_1_color_y = -1,
                a_closest_1_color_z = -1,
                a_closest_1_specular = -1,
                a_closest_1_lambert = -1,
                a_closest_1_ambient = -1,
                a_closest_1_radius = -1;

            for (var i = 0; i < 3; i++) {

                if (i == 0) {
            a_object_point_x = n_objects_0_x;
            a_object_point_y = n_objects_0_y;
            a_object_point_z = n_objects_0_z;
            a_object_color_x = n_objects_0_r;
            a_object_color_y = n_objects_0_g;
            a_object_color_z = n_objects_0_b;
            a_object_specular = n_objects_0_spec;
            a_object_lambert = n_objects_0_lamb;
            a_object_ambient = n_objects_0_amb;
            a_object_radius = n_objects_0_rad;
        } else if (i == 1) {
            a_object_point_x = n_objects_1_x;
            a_object_point_y = n_objects_1_y;
            a_object_point_z = n_objects_1_z;
            a_object_color_x = n_objects_1_r;
            a_object_color_y = n_objects_1_g;
            a_object_color_z = n_objects_1_b;
            a_object_specular = n_objects_1_spec;
            a_object_lambert = n_objects_1_lamb;
            a_object_ambient = n_objects_1_amb;
            a_object_radius = n_objects_1_rad;
        } else if (i == 2) {
            a_object_point_x = n_objects_2_x;
            a_object_point_y = n_objects_2_y;
            a_object_point_z = n_objects_2_z;
            a_object_color_x = n_objects_2_r;
            a_object_color_y = n_objects_2_g;
            a_object_color_z = n_objects_2_b;
            a_object_specular = n_objects_2_spec;
            a_object_lambert = n_objects_2_lamb;
            a_object_ambient = n_objects_2_amb;
            a_object_radius = n_objects_2_rad;
        }

                // sphere intersection
                // subtract
                var a_dist = -1;
                var a_eye_to_center_x = a_object_point_x - a_scene_ray_point_x,
                    a_eye_to_center_y = a_object_point_y - a_scene_ray_point_y,
                    a_eye_to_center_z = a_object_point_z - a_scene_ray_point_z;

                var a_v = Vector_dotProduct(a_eye_to_center_x, a_eye_to_center_y, a_eye_to_center_z,
                        a_scene_ray_vector_x, a_scene_ray_vector_y, a_scene_ray_vector_z),
                    a_eoDot = Vector_dotProduct(a_eye_to_center_x, a_eye_to_center_y, a_eye_to_center_z,
                        a_eye_to_center_x, a_eye_to_center_y, a_eye_to_center_z),
                    a_discriminant = (a_object_radius * a_object_radius) - a_eoDot + (a_v * a_v);
                if (a_discriminant < 0) {} else {
                    a_dist = a_v - mathSqrt(a_discriminant);
                }
                //

                if (a_dist !== -1 && a_dist < a_closest_0) {
                    // a_closest = [a_dist, a_object];
                    a_closest_0 = a_dist;

                    a_closest_1_point_x = a_object_point_x;
                        a_closest_1_point_y = a_object_point_y;
                        a_closest_1_point_z = a_object_point_z;
                        a_closest_1_color_x = a_object_color_x;
                        a_closest_1_color_y = a_object_color_y;
                        a_closest_1_color_z = a_object_color_z;
                        a_closest_1_specular = a_object_specular;
                        a_closest_1_lambert = a_object_lambert;
                        a_closest_1_ambient = a_object_ambient;
                        a_closest_1_radius = a_object_radius;
                }
            }

            var a_distObject_0 = a_closest_0;
            var a_distObject_1_point_x = a_closest_1_point_x,
                a_distObject_1_point_y = a_closest_1_point_y,
                a_distObject_1_point_z = a_closest_1_point_z,
                a_distObject_1_color_x = a_closest_1_color_x,
                a_distObject_1_color_y = a_closest_1_color_y,
                a_distObject_1_color_z = a_closest_1_color_z,
                a_distObject_1_specular = a_closest_1_specular,
                a_distObject_1_lambert = a_closest_1_lambert,
                a_distObject_1_ambient = a_closest_1_ambient,
                a_distObject_1_radius = a_closest_1_radius;
            ////////
            //

            if (a_distObject_0 > -0.005) {
                // subtract first
                var a_diff_x = lights_x - a_pointAtTime_x,
                    a_diff_y = lights_y - a_pointAtTime_y,
                    a_diff_z = lights_z - a_pointAtTime_z,
                    a_diff_len = Vector_length(a_diff_x, a_diff_y, a_diff_z);
                a_diff_x /= a_diff_len;
                a_diff_y /= a_diff_len;
                a_diff_z /= a_diff_len;

                var contribution = Vector_dotProduct(a_diff_x, a_diff_y, a_diff_z, a_sphr_normal_x, a_sphr_normal_y, a_sphr_normal_z);

                if (contribution > 0) a_lambertAmount += contribution;
            }
        }

         if (a_object_specular>0) {
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

            // recursive call BEGINSSSSSS
            var reflectedColor = trace_color4(color);


             if ( reflectedColor>0){
                //scale and add
                if (color == 0) {
                    a_c_x += reflectedColor * a_object_specular;;
                } else if (color == 1) {
                    a_c_y += reflectedColor * a_object_specular;
                } else if (color == 2) {
                    a_c_z += reflectedColor * a_object_specular;
                }

            }
        }

        a_lambertAmount = mathMin(1, a_lambertAmount);

        if (color == 0) {
            a_c_x += a_a_x * a_lambertAmount * a_object_lambert;
            a_c_x += a_a_x * a_object_ambient;
            return a_c_x;
        } else if (color == 1) {
            a_c_y += a_a_y * a_lambertAmount * a_object_lambert;
            a_c_y += a_a_y * a_object_ambient;
            return a_c_y;
        } else if (color == 2) {
            a_c_z += a_a_z * a_lambertAmount * a_object_lambert;
            a_c_z += a_a_z * a_object_ambient;
            return a_c_z;
        }
    }
}


function trace_color4(x) {
    // we do not trace beyond 4 bounces
    return 1;
}