
   function Enum(constantsList) {
      for (var i in constantsList) {
         this[constantsList[i]] = i;
      }
   }

   var ObjTyp = new Enum(['EMPTY', 'SPHERE', 'CUBOID', 'CYLINDER', 'CONE', 'TRIANGLE']);

   var fps = { startTime : 0, frameNumber : 0,
               getFPS : function() {
                  this.frameNumber++;
                  var d = new Date().getTime(), currentTime = ( d - this.startTime ) / 1000, result = Math.floor( ( this.frameNumber / currentTime ) );
                  if( currentTime > 1 ) {
                     this.startTime = new Date().getTime();
                     this.frameNumber = 0;
                  }
                  return result;
               }
             };

// # Vector Constants
Vector.UP = { x: 0, y: 1, z: 0 };
Vector.ZERO = { x: 0, y: 0, z: 0 };
Vector.WHITE = { x: 255, y: 255, z: 255 };