$(window).ready(fn_0);
$(window).resize(fn_0);

function fn_0(){

    var winH = $(window).height();
    var winW = $(window).width();
    var mainimages_x = winW - 885;
    $("#mainimages").css({"width": mainimages_x + "px"});
    $("#mainimages").css({"height": winH + "px"});
    $("#mainimages .info").css({"height": winH + "px"});
    $(".flexslider").css({"height": winH + "px"});
    $(".slides").css({"height": winH + "px"});



    $("#Product li a").css({"height": ($("#Product li").width() / 3) * 2 + "px"});

}



$(function(){

    $("#mainimages").delay(1000).fadeIn(1000, 'easeOutCubic');
    $("#mainimages ul").delay(2000).fadeIn(2000, 'easeOutCubic');
    /*if($.cookie("access")){
     $("#introWrap").delay(1000).animate({
     opacity: 1
     }, 1000, 'easeOutCubic');
     } else {
     $("#introWrap").delay(3000).animate({
     opacity: 1
     }, 3000, 'easeOutCubic');
     $("#Intro").fadeIn(500,'easeOutCubic');
     $("#Intro").delay(1500).fadeOut(1500,'easeOutCubic');
     }
     $(window).load(function(){
     $.cookie("access",$('body').addClass('access'));
     })*/


    animate_fade01();
    animate_fade02();
    animate_fade03();
    animate_fade04();
    animate_fade05();
    animate_fade06();
    animate_fade07();
    animate_fade08();
    animate_fade09();
    animate_fade10();
    animate_fade11();
    animate_fade12();
    animate_fade13();





});





function animate_fade01(){

    var fadeSpeed = 2500;
    var timeSpeed = 1500;

    $("#item01 .photo02").delay(timeSpeed).fadeIn(fadeSpeed,'easeOutCubic');
    $("#item01 .photo02").delay(timeSpeed).fadeOut(fadeSpeed,'easeOutCubic');

    setTimeout("animate_fade01()",timeSpeed);

}




function animate_fade02(){

    var fadeSpeed = 2500;
    var timeSpeed = 2500;

    $("#item02 .photo02").delay(timeSpeed).fadeIn(fadeSpeed,'easeOutCubic');
    $("#item02 .photo02").delay(timeSpeed).fadeOut(fadeSpeed,'easeOutCubic');

    setTimeout("animate_fade02()",timeSpeed);

}




function animate_fade03(){

    var fadeSpeed = 2500;
    var timeSpeed = 3000;

    $("#item03 .photo02").delay(timeSpeed).fadeIn(fadeSpeed,'easeOutCubic');
    $("#item03 .photo02").delay(timeSpeed).fadeOut(fadeSpeed,'easeOutCubic');

    setTimeout("animate_fade03()",timeSpeed);

}




function animate_fade04(){

    var fadeSpeed = 2500;
    var timeSpeed = 1500;

    $("#item04 .photo02").delay(timeSpeed).fadeIn(fadeSpeed,'easeOutCubic');
    $("#item04 .photo02").delay(timeSpeed).fadeOut(fadeSpeed,'easeOutCubic');

    setTimeout("animate_fade04()",timeSpeed);

}




function animate_fade05(){

    var fadeSpeed = 2500;
    var timeSpeed = 2500;

    $("#item05 .photo02").delay(timeSpeed).fadeIn(fadeSpeed,'easeOutCubic');
    $("#item05 .photo02").delay(timeSpeed).fadeOut(fadeSpeed,'easeOutCubic');

    setTimeout("animate_fade05()",timeSpeed);

}




function animate_fade06(){

    var fadeSpeed = 2500;
    var timeSpeed = 2500;

    $("#item06 .photo02").delay(timeSpeed).fadeIn(fadeSpeed,'easeOutCubic');
    $("#item06 .photo02").delay(timeSpeed).fadeOut(fadeSpeed,'easeOutCubic');

    setTimeout("animate_fade06()",timeSpeed);

}




function animate_fade07(){

    var fadeSpeed = 2500;
    var timeSpeed = 3000;

    $("#item07 .photo02").delay(timeSpeed).fadeIn(fadeSpeed,'easeOutCubic');
    $("#item07 .photo02").delay(timeSpeed).fadeOut(fadeSpeed,'easeOutCubic');

    setTimeout("animate_fade07()",timeSpeed);

}




function animate_fade08(){

    var fadeSpeed = 2500;
    var timeSpeed = 1500;

    $("#item08 .photo02").delay(timeSpeed).fadeIn(fadeSpeed,'easeOutCubic');
    $("#item08 .photo02").delay(timeSpeed).fadeOut(fadeSpeed,'easeOutCubic');

    setTimeout("animate_fade08()",timeSpeed);

}





function animate_fade09(){

    var fadeSpeed = 2500;
    var timeSpeed = 1500;

    $("#item09 .photo02").delay(timeSpeed).fadeIn(fadeSpeed,'easeOutCubic');
    $("#item09 .photo02").delay(timeSpeed).fadeOut(fadeSpeed,'easeOutCubic');

    setTimeout("animate_fade09()",timeSpeed);

}




function animate_fade10(){

    var fadeSpeed = 2500;
    var timeSpeed = 2500;

    $("#item10 .photo02").delay(timeSpeed).fadeIn(fadeSpeed,'easeOutCubic');
    $("#item10 .photo02").delay(timeSpeed).fadeOut(fadeSpeed,'easeOutCubic');

    setTimeout("animate_fade10()",timeSpeed);

}




function animate_fade11(){

    var fadeSpeed = 2500;
    var timeSpeed = 2500;

    $("#item11 .photo02").delay(timeSpeed).fadeIn(fadeSpeed,'easeOutCubic');
    $("#item11 .photo02").delay(timeSpeed).fadeOut(fadeSpeed,'easeOutCubic');

    setTimeout("animate_fade11()",timeSpeed);

}




function animate_fade12(){

    var fadeSpeed = 2500;
    var timeSpeed = 3000;

    $("#item12 .photo02").delay(timeSpeed).fadeIn(fadeSpeed,'easeOutCubic');
    $("#item12 .photo02").delay(timeSpeed).fadeOut(fadeSpeed,'easeOutCubic');

    setTimeout("animate_fade12()",timeSpeed);

}




function animate_fade13(){

    var fadeSpeed = 2500;
    var timeSpeed = 1500;

    $("#item13 .photo02").delay(timeSpeed).fadeIn(fadeSpeed,'easeOutCubic');
    $("#item13 .photo02").delay(timeSpeed).fadeOut(fadeSpeed,'easeOutCubic');

    setTimeout("animate_fade13()",timeSpeed);

}










