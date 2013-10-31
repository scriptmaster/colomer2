
jQuery(document).ready(function($){

	$('#header a').click(function(){
		if(!parseInt($('body').css('left')))
			$('body').animate({'left': '75%'});
		else
			$('body').animate({'left': '0%'});
	});


	$('#menu ul li').click(function(){

		$('body').animate({'left': '0%'});

		


	});


});




function shop_denmark() {
	$('.page').hide();
	$('#page_denmark').show();
}

function shop_sweden() {
	$('.page').hide();
	$('#page_sweden').show();
}

function show_contact() {
	$('.page').hide();
	$('#page_contact').show();
}



