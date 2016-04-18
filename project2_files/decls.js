var fps = { startTime : 0, frameNumber : 0,
            getFPS : function() {
               this.frameNumber++;
               var d = new Date().getTime(), currentTime = ( d - this.startTime ) / 1000.0, result = Math.floor( ( this.frameNumber / currentTime ) );
               if( currentTime > 1 ) {
                  this.startTime = new Date().getTime();
                  this.frameNumber = 0;
               }
               return result;
            }
          };

// # Vector Constants
// Vector.UP = { x: 0, y: 1, z: 0 };
Vector.ZERO = { x: 0, y: 0, z: 0 };
Vector.WHITE = { x: 255, y: 255, z: 255 };

var Vector_UP_x = 0,
   Vector_UP_y = 1,
   Vector_UP_z = 0,

   Vector_ZERO_x = 0,
   Vector_ZERO_y = 0,
   Vector_ZERO_z = 0,
   
   Vector_WHITE_x = 255,
   Vector_WHITE_y = 255,
   Vector_WHITE_z = 255;