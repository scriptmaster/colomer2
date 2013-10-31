
jQuery(document).ready(function($){
	if(navigator.platform.substr(0, 3)=='Win')
	   onDeviceReady()

	$('#header span').click(function(){
		if(!parseInt($('body').css('left')))
			$('body').animate({'left': '75%'});
		else
			$('body').animate({'left': '0%'});
	});


	$('#menu ul li').click(function(){
		$('body').css({'left': '0%'});
	});
});



function shop_denmark() {
	$('.page').hide();
	$('#page_denmark').show();
	$('#header h1').text("Shop N' Shop - Denmark");
	page="denmark";
	loadOffers();
}

function shop_sweden() {
	$('.page').hide();
	$('#page_sweden').show();
	$('#header h1').text("Shop N' Shop - Sweden");
	page="sweden";
	loadOffers();
}

function show_contact() {
	$('.page').hide();
	$('#page_contact').show();
	$('#header h1').text("Contact");
}




var language, page="denmark";


document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	checkStorage();
	// loadOffers();
}

function checkStorage() {
	page = window.localStorage.getItem("page");
	if(page == null) {
		page = "denmark";
		window.localStorage.setItem("page", page);
	}
	loadSplash();
	var location = findLocation();
}

function loadOffers(){
	loadSplash();
	$('.page').hide();
	$.getJSON('http://system-hostings.dev.wiredelta.com/colomer/api/offers/app_offers?page='+page, function(resp){
		var offers = '';

		for(var i=0; i < resp.data.length; i++){
			offers += '<li>';
			offers += '<a href="'+resp.data[i].url+'" target="_system" >MERE INFO &raquo;</a>';
			offers += '<img src="'+resp.data[i].image+'" />';
			offers += '</li>';
		}

		setTimeout(function(){

		$('#splash').hide();
		$('#content,#page_'+page).show();
		$('#page_'+page+' .slider').html(offers);

		}, 200);
		
	})
}

function loadSplash(){
	var sss = '';

	if($(window).width() < 320){
	    sss = 'res/screen/android/'+page+'/screen-ldpi-portrait.png';
	}else if($(window).width() >= 320 || $(window).width() < 480){
	    sss = 'res/screen/android/'+page+'/screen-mdpi-portrait.png';
	}else if($(window).width() >= 480 || $(window).width() < 720){
	    sss = 'res/screen/android/'+page+'/screen-hdpi-portrait.png';
	}else if($(window).width() >= 720){
	    sss = 'res/screen/android/'+page+'/screen-xhdpi-portrait.png';
	}

	var ss_image = '<img src="'+sss+'" width="'+$(window).width()+'" height="'+$(window).height()+'" />';
	$('#splash').html(ss_image).show();
}


function findLocation() {
	navigator.geolocation.getCurrentPosition(geoSuccess, geoFailure);
}

function geoSuccess(position) {
	$.get('http://ws.geonames.org/countryCode?lat='+position.coords.latitude+'&lng='+position.coords.longitude,
		function(data){
			if(data == 'DK') {
				window.localStorage.setItem("page", "denmark");
				page='denmark';
			}

			loadOffers();
		});
}

function geoFailure(err) {
	if(err.message) {
		alert('Please enable GPS');
		page='denmark';
		window.localStorage.setItem("page", "denmark");
	}

	loadOffers();
}
