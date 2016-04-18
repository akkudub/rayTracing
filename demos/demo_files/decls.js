
   function Enum(constantsList) {
      for (var i in constantsList) {
         this[constantsList[i]] = i;
      }
   }

   var ObjTyp = new Enum(['EMPTY', 'SPHERE', 'CUBOID', 'CYLINDER', 'CONE', 'TRIANGLE']);

   var fps = { startTime : 0, frameNumber : 0,
               getFPS : function() {
                  this.frameNumber++;
                  var d = new Date().getTime()
                  var currentTime = ( d - this.startTime ) / 1000
                  var result = Math.floor( ( this.frameNumber / currentTime ) );
                  if( currentTime > 1 ) {
                     this.startTime = new Date().getTime();
                     this.frameNumber = 0;
                  }
                  return result;
               }
             };

   function sqr(x) {
      return x*x;
   }
   function dist(x1,y1,x2,y2) {
      return Math.sqrt( sqr(x2-x1)+sqr(y2-y1) );
   }
