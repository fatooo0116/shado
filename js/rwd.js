$(window).ready(fn_0);
$(window).resize(fn_0);

function fn_0(){

    if (navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0) {

    } else {

        var w = $(window).width();
        var h = $(window).height();



        if(w < 1200) {
            $("#menuBtn").addClass("stop");
            $("#Nav").addClass("stop");
        }
        if(w >= 1200) {
            $("#menuBtn").removeClass("stop");
            $("#Nav").removeClass("stop");
        }


        if(w < 1580) {
            $("#List").addClass("mini");
        }
        if(w >= 1580) {
            $("#List").removeClass("mini");
        }

    }

}
