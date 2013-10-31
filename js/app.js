
jQuery(document).ready(function($){

	$('#header span').click(function(){
		if(!parseInt($('body').css('left')))
			$('body').animate({'left': '75%'});
		else
			$('body').animate({'left': '0%'});
	});


	$('#menu ul li').click(function(){
		$('body').animate({'left': '0%'});
	});
	if(navigator.platform.substr(0, 3)=='Win')
	   onDeviceReady()
});




function shop_denmark() {
	$('.page').hide();
	$('#page_denmark').show();
	$('#header h1').text("Shop N' Shop - Denmark");
	page="denmark";
}

function shop_sweden() {
	$('.page').hide();
	$('#page_sweden').show();
	$('#header h1').text("Shop N' Shop - Sweden");
	page="sweden";
}

function show_contact() {
	$('.page').hide();
	$('#page_contact').show();
	$('#header h1').text("Contact");
}




var language,page="denmark";


document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	//checkStorage();
	loadOffers();





}


function loadOffers(){
	  $.getJSON('http://system-hostings.dev.wiredelta.com/colomer/api/offers/app_offers', function(resp){
		  var offers = '';
		  for(var i=0; i < resp.data.length; i++){
		   	offers += '<li><img src="'+resp.data[i].image+'" /> <a href="'+resp.data[i].url+'" target="_system" >MERE INFO &raquo;</a> </li>';
		  }
		  $('#page_'+page+' .slider').html(offers);



	})
}

