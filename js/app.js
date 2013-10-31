
jQuery(document).ready(function($){

	$('#header span').click(function(){
		if(!parseInt($('body').css('left')))
			$('body').animate({'left': '75%'});
		else
			$('body').animate({'left': '0%'});
	});

});


function shop_denmark() {
	$('.page').hide();
	$('#page_denmark').show();
	$('#header h1').text("Shop N' Shop Denmark");
}

function shop_sweden() {
	$('.page').hide();
	$('#page_sweden').show();
	$('#header h1').text("Shop N' Shop Sweden");
}

function show_contact() {
	$('.page').hide();
	$('#page_contact').show();
	$('#header h1').text("Contact");
}
