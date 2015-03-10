$(document).ready(function() {
    $(document).ajaxStart(function() {
        $("body").addClass("loading");
    }).ajaxComplete(function() {
        $("body").removeClass("loading");
    });


    if (!$("html").is("lt-ie9")) {
        $.getScript("//platform.twitter.com/widgets.js");
    }
});
