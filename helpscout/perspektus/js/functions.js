function ajaxLogin() {
    var command = 'command=ajaxLogin';
    var dataString = command + '&' + $('form#ajaxLogin').serialize();

    $.ajax({
        url: 'callingAjax.php',
        type: 'POST',
        data: dataString,
        success: function(data) {

            if ($.trim(data) == 'success') {
            $("#ajaxLogin").fadeOut(1000);
      //$(".mapcontainerHome").css('zIndex',3);
      $('body').css('overflow','hidden');
      $("#mapcontainer").animate({opacity:1},3000);
                        $('.cmdHome').css('opacity','1');


        /*alert(data);
           $.ajax({
            url: 'home.php',
            type: 'GET',
            sucess: function(data){
              $("#ajaxLogin").fadeOut(1000);

              $('.tk-bigsmalls-regular').fadeIn('slow',function(){
                $('.tk-bigsmalls-regular').html(data);
                alert($('.tk-bigsmalls-regular').html());
              });
            },
            fail:function(data){
              alert(data);
              }

        });
      */
             /*   $('.tk-bigsmalls-regular').load('home.php', function() {
                    $(this).fadeIn(2000);
                });*/

                return false;
            } else {

                $('p#ajaxLoginMsg').css('visibility', 'visible');
                $('p#ajaxLoginMsg').jshake();
            }
        },
        error: function(e) {
            console.log(e.message);
        }
    });
}
