jQuery(document).ready(function($){
	$('#header a').click(function(){
		// $('#menu').animate({width: '75%'}).show();
		if(!parseInt($('body').css('left')))
			$('body').animate({'left': '75%'});
		else
			$('body').animate({'left': '0%'});
	});
})