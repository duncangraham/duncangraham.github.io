/**
 * The nav stuff
 */
(function( window ){

  'use strict';

        //$("nav.push-menu-bottom").css("bottom",-$("nav.push-menu-bottom").height());
        var lastItemWidth = document.body.clientWidth - 475;
        $("nav.push-menu-bottom ul li:last-child, .submenudiv").css('width',lastItemWidth+"px");
  var body = document.body,
    mask = document.createElement("div"),

    togglePushBottom = document.querySelector( ".toggle-push-bottom" ),

    activeNav
  ;
  //mask.className = "mask";

  /* slide menu left */
  /* push menu bottom */
  togglePushBottom.addEventListener( "click", function(){

        if (!classie.has(body, "pmb-open")) {
            classie.add(body, "pmb-open");
            document.body.appendChild(mask);
            $("#leftmenu").animate({height:"250px"},400,"linear",function(){

            });
            $("#cmd-panel").css("bottom", $(".menuitem").height());
            //$(".submenu").css("bottom","0px");
            activeNav = "pmb-open";
            $(".submenu").animate({bottom:"0px"},200);
        } else
        {

            $("#leftmenu").animate({height:"40px"},400,"linear",function(){
                classie.remove(body, "pmb-open");
            });
            if($("#submenudir").val()==1){
                $(".submenu").trigger("click");
            }
            $(".submenu").animate({bottom:"-50px"},200);
            $("#cmd-panel").animate({bottom:"0px"},400);
            activeNav = "";
            document.body.removeChild(mask);
        }
  } );
        $(".submenu").click(function(){

           $(this).css('position',"fixed");
           $(this).css('left',"475px");
          //$(this).animate({bottom: "350px"},500) ;

           if($("#submenudir").val()==1){

               $(".submenu").animate({bottom:"0"},100);
               $("#cmd-panel").animate({bottom:"50px"},100);
               $(".submenudiv").animate({bottom:"-385px"},500);
               $("#submenudir").val(0);
           }
           else
           {

               $(".submenu").animate({bottom:"350px"},500);
               $("#cmd-panel").animate({bottom:"385px"},500);
               $(".submenudiv").animate({bottom:"0"},500);

               $("#submenudir").val(1);
           }

        });
  /* hide active menu if mask is clicked */
  mask.addEventListener( "click", function(){
    classie.remove( body, activeNav );
    activeNav = "";
    document.body.removeChild(mask);
  } );

  /* hide active menu if close menu button is clicked */
  [].slice.call(document.querySelectorAll(".close-menu")).forEach(function(el,i){
    el.addEventListener( "click", function(){
      classie.remove( body, activeNav );
                      //  $("#mainmenu").css("bottom",0);
                      //  $("#quickmenu").css("bottom",0);
                      //  $("#cmd-panel").css("bottom",0);
      activeNav = "";
      document.body.removeChild(mask);
    } );
  });


})( window );
