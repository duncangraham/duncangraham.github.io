function addInitialMeta() {
  var rowCount = 0;
  jQuery('#the-list tr').each(function() {
    rowCount++;
  });
  setTimeout(function (){
  if (rowCount < 2) {
    jQuery("#metakeyselect").attr("value","Keywords");
    jQuery("#metavalue").attr("value","Post Keywords");
    jQuery("#newmeta-submit").click();
    setTimeout(function (){
      jQuery("#metakeyselect").attr("value","Web Headline");
      jQuery("#metavalue").attr("value","Short headline");
      jQuery("#newmeta-submit").click();
      jQuery("#metakeyselect").attr("value","Blurb");
      jQuery("#metavalue").attr("value","Short summary of story");
      jQuery("#newmeta-submit").click();
    }, 500);
   }
  }, 900);
}

if (top.location.toString().indexOf("post-new.php") > -1) {
        jQuery(window).load(function() {
                jQuery("#addmetasub").focus();
                setTimeout("addInitialMeta()",300);
        });
}

setTimeout( function () {
  jQuery(".table_discussion").remove();
  jQuery("#menu-comments").remove();
  jQuery(".post-com-count-wrapper").css("visibility","hidden");
}, 100 );
