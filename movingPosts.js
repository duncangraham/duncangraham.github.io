 //set up the arrays for moving before oneUp/Down are called.
          // UP!
          var postsArrayUp = [];
          $('.post').each(function(){
            postsArrayUp.push($(this).html());
          });

          // DOWN !
          var postsArrayDown = [];
          $('.post').each(function(){
            postsArrayDown.push($(this).html());
          });

          var addToArrays = function(el){
              postsArrayUp.shift();
              postsArrayDown.shift();
              postsArrayUp.push(el.html());
              postsArrayDown.push(el.html());
          };

          var shiftArrays = function(){
            var firstPostRemoved = postsArrayUp.shift(); //remove first
            postsArrayUp.push(firstPostRemoved); //add to end

            var lastPostRemoved = postsArrayDown.pop(); //remove last
            postsArrayDown.unshift(lastPostRemoved); //add to beginning
            

          };


          var oneUp = function(){
            $('.post').each(function(key){
              //the issue is that i'm adding it to the array, but also

              addToArrays($(this)); 
              $(this).html(postsArrayUp[key]); //change content of <li>'s
            });

            shiftArrays();
          };

          var oneDown = function(){
            $('.post').each(function(key){
              $(this).html(postsArrayDown[key]); 

              addToArrays($(this));
            });

            shiftArrays();
          }

// SOLUTION 2

            //set up the arrays for moving before oneUp/Down are called.
          // UP!
          var postsArr = [];
          var arrLength;

          $('.post').each(function(){
            postsArr.push($(this).html());
          });

          arrLength = postsArr.length;
          
          var upKey = 1; //position of the next top most <li>, on clicking the up arrow
          var downKey = arrLength - 1; //position of the next top most <li>, on clicking the down arrow
        
          var resetKeys = function (dir, keyVal) {
            if (dir == 'up'){
             if(keyVal == arrLength) {
                          upKey = 1;
                        } else {
                          upKey = keyVal + 1;
                        }
              if (keyVal == 1) {
                downKey = arrLength - 1;
              } else {
               downKey = upKey - 2; 
              }
            } else {
              if(keyVal == arrLength) {
                downKey = arrLength - 1;
              } else {
                downKey--; 
              }

              if (keyVal == arrLength - 2) {
                upKey = 0;
              } else {
                upKey = downKey + 2;
              }
            }
          };

          var oneUp = function(){
            $('.post').each(function(){
              if(upKey == arrLength) {
                upKey = 0;
              }
              $(this).html(postsArr[upKey]); //get the element in the static array at the upKey position

              upKey++;
            });
            // sets the beginning of the next move
            resetKeys('up', upKey);
          };

          var oneDown = function(){
            $('.post').each(function(){
              if(downKey == arrLength) {
                downKey = 0;
              }
              $(this).html(postsArr[downKey]); //get the element in the static array at the upKey position

              downKey++;
            });
            // sets the beginning of the next move
              resetKeys('down', downKey);
          };

          $('.diamond').on('click', function(){
            if($(this).hasClass('diamond-top')){
              oneUp();
            } else {
              oneDown();
            }
          });


          //there's gotta be a way to do this that doesn't fire after EVERY keydown
          window.onkeydown = function(ev) {
            if (ev.keyCode == 38) {
              oneUp();
            } else if (ev.keyCode == 40) {
              oneDown();
            }
          };