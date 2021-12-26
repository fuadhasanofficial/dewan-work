

var menu = $(".menu");
$(window).resize(function(){
	$(".menu-toggle").removeClass("active");
	if($(window).innerWidth() > 600){
		menu.show();
	} else {
		menu.hide();
	}
});
$(".menu-toggle").click(function(){
	$(this).toggleClass("active");
	menu.slideToggle();
})
$(".open-submenu").click(function(){
	$(this).toggleClass("active");
	$(this).next("ul").slideToggle();
	$(this).children(".arrow").toggleClass("down up");
});









$(document).ready(function(){
	$(".cr_intro1").click(function(){
		$(".demo").show();
	})
});



$(document).ready(function(){
	$(".cr_intro").click(function(){
		$('.demo').hide();
	});
});



$(document).ready(function(){
	$(".croos").click(function(){
		$(".pop_up").hide();
	})
})


