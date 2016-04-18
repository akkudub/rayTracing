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



var Vector_UP_x = 0,
   Vector_UP_y = 1,
   Vector_UP_z = 0,

   Vector_ZERO_x = 0,
   Vector_ZERO_y = 0,
   Vector_ZERO_z = 0;