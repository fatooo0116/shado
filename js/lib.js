// JavaScript Document




// �𠾼�潦�詻�准�潦�匧�䔶�敺䎚�怠�蠘��
$(window).load(function(){
    var w = $(window).width();
    var h = $(document).height();
    $('#nav').css('height',h+'px');
});








// �𠾼�潦�詻�准�潦�匧�䔶�敺䎚�怠�蠘��
$(function() {

    var w = $(window).width();
    var h = $(document).height();


    $(window).resize(function(){
        var h = $(document).height();
        $('#nav').css('height',h+'px');
    });




    $("ul").each(function(){
        jQuery(this).find("li:last").addClass("last");
    });
    $("ul").each(function(){
        jQuery(this).find("li:first").addClass("first");
    });
    $("ol").each(function(){
        jQuery(this).find("li:last").addClass("last");
    });
    $(".section").each(function(){
        jQuery(this).find("dl:last").addClass("last");
    });


    $('#whobought_area .product_item:nth-child(5)').each(function(){
        $(this).addClass("last");
    })


    $('#whobought_area .product_item:nth-child(4)').each(function(){
        $(this).addClass("fNone");
    })




    if (navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0) {
    } else {
        soundauto();
    }

});



function soundauto(){
    $("#soundBG").get(0).play();
    $("#soundBG").get(0).volume = 0.05;
}
function soundplay(){
    $("#soundBG").get(0).play();
}
function soundstop(){
    $("#soundBG").get(0).pause();
}

$(function(){
    $("#BGM .on").click(function(){
        $("#BGM .on").fadeOut();
        $("#BGM .off").fadeIn();
    });
    $("#BGM .off").click(function(){
        $("#BGM .off").fadeOut();
        $("#BGM .on").fadeIn();
    });

});

function downVolume() {
    //�𨺗��譌�雴�卝�鉝��
    v.volume = v.volume - 0.25;
}



$(function(){
    $("a").hover(function(){
        $(this).stop().animate({"opacity":"0.7"});
    },function(){
        $(this).stop().animate({"opacity":"1"});
    });
});









