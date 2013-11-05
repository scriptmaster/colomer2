jQuery(document).ready(function($){
	if(navigator.platform.substr(0, 3)=='Win')
	   onDeviceReady()

	$('#header span').click(function(){
		if(parseInt($('#content').css('left')) == 0)
			$('#menu,#content').animate({'left': '75%'});
		else
			$('#menu,#content').animate({'left': '0%'});
	});

	$('#menu ul li').click(function(){
		$('#menu,#content').css({'left': '0%'});
	});

	$(document).on('swipeleft', function(){
		if(parseInt($('#content').css('left')) > 0) {
			$('#menu,#content').animate({'left': '0%'});
		}
	});

	$('.slider').on('swipeleft', function(){
		$('.larrow', $(this).parent()).click();
	})

	$('.slider').on('swiperight', function(){
		$('.rarrow', $(this).parent()).click();
	})

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
	initPushNotifications();
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
	var offers = '';

	$('.page').hide();
	loadSplashIn();


	$.getJSON('http://system-hostings.dev.wiredelta.com/colomer/api/offers/app_offers?page='+page, function(resp){

		for(var i=0; i < resp.data.length; i++){
			offers += '<li>';
			offers += '<a href="#" onclick="if(confirm(\'You are about to leave the app to load this offer\')) window.open(\''+resp.data[i].url+'\', \'_system\')">MERE INFO &raquo;</a>';
			offers += '<img src="'+resp.data[i].image+'" />';
			offers += '</li>';
		}

		hideSplash();
	})
	.error(hideSplash);

	function hideSplash(){
		setTimeout(function(){
			$('#splash').hide();
			$('#content,#page_'+page).show();
			$('#page_'+page+' .slider').html(offers).wdSlider().fixImagesByHeight();
		}, 1000);
	}
}

function loadSplash(){
	var sss = '';

	if($(window).width() < 320){
	    sss = 'res/screen/android/'+page+'/screen-ldpi-portrait.png';
	}else if($(window).width() >= 320 || $(window).width() < 480){
	    sss = 'res/screen/android/'+page+'/screen-mdpi-portrait.png';
	}else if($(window).width() >= 480 || $(window).width() < 720){
	    sss = 'res/screen/android/'+page+'/screen-hdpi-portrait.png';
	}else if($(window).width() >= 720 || $(window).width() < 2048){
	    sss = 'res/screen/android/'+page+'/screen-xhdpi-portrait.png';
	}else if($(window).width() >= 2048){
		sss='res/screen/android/'+page+'/screen-2048x1536-portrait.jpg';
	}




	var ss_image = '<img src="'+sss+'" width="'+$(window).width()+'" height="'+$(window).height()+'" />';
	$('#splash').html(ss_image).show();
}



function loadSplashIn(){
	var sss = '';

	if($(window).width() < 320){
	    sss = 'res/screen/android/'+page+'/screen-ldpi-portraitin-in.png';
	}else if($(window).width() >= 320 || $(window).width() < 480){
	    sss = 'res/screen/android/'+page+'/screen-mdpi-portrait-in.png';
	}else if($(window).width() >= 480 || $(window).width() < 720){
	    sss = 'res/screen/android/'+page+'/screen-hdpi-portrait-in.png';
	}else if($(window).width() >= 720 || $(window).width() < 2048){
	    sss = 'res/screen/android/'+page+'/screen-xhdpi-portrait.png';
	}else if($(window).width() >= 2048){
		sss='res/screen/android/'+page+'/screen-2048x1536-portrait.jpg';
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
		}).error(loadOffers);
}

function geoFailure(err) {
	if(err.message) {
		alert('Please enable GPS');
		page='denmark';
		window.localStorage.setItem("page", "denmark");
	}

	loadOffers();
}

$.fn.wdSlider = function() {
	return this.each(function(){
		var self = this;
		var total = $('li', this).each(function(i, li){
			$(li).css('left', (i*100)+'%');
		}).length;
		var current=0;
		var parent = $(this).parent();
		

		$('.slider-icons', parent).unbind('click');

		$('.larrow', parent).click(function(){
			if($('li', self).is(':animated')) return false;
			if(current >= total-1) return current=total-1;

			current++;
			$('li', self).animate({left: '-=100%'},100, function(){
				// if($(this).is(':first')) $('li:first', self).remove().appendTo(self);
				updateNavIcons();
			});
		});
		$('.rarrow', parent).click(function(){
			if($('li', self).is(':animated')) return false;
			if(current <= 0) return current=0;

			current--;
			$('li', self).animate({left: '+=100%'},100, function(){
				// $('li:last', self).remove().prependTo(self);
				updateNavIcons();
			});
		});

		var slider_nav_icons='';
		for (var i = 0; i < total; i++) {
			slider_nav_icons += '<span class="slider-nav-circle" />';
		};

		$('.slider-nav-icons', parent).html(slider_nav_icons)
			.css('margin-left', -$('.slider-nav-icons', parent).outerWidth()/2)
			.find('.slider-nav-circle:first').addClass('current-slide')

		$('.slider-nav-icons .slider-nav-circle', parent).click(function(){
			// 
		});

		function updateNavIcons(){
			$('.slider-nav-icons .slider-nav-circle', parent).removeClass('current-slide')
					.filter(':eq('+current+')').addClass('current-slide')
		}

	});
}

$.fn.fixImagesByHeight = function() {
	return this.each(function(){
		var self = this;
		$('img', this).load(function(img){
			// alert('loaded'+i);
			// console.log( this, $(this).outerWidth(), $(this).outerHeight(), $(self).outerHeight() );
			var w = $(this).outerWidth();
			var h = $(this).outerHeight();

			var nh = $(self).outerHeight() - 80;
			var nw = (w / h) * nh;

			$(this).css({width: nw, height: nh});
		})
	})
}






// var debug_level=1001;
function initPushNotifications() {
	/*
	if(localStorage.regid != null){
		if(debug_level==1001) alert('already registered: '+localStorage.regid);
		return;
	}
	*/

	if(!window.plugins) return;
	var pushNotification = window.plugins.pushNotification;

	if(device.platform.toLowerCase()=="android"){
		pushNotification.register(gcmSuccess, regError, {"senderID":"811599554332","ecb":"onNotificationGCM"});
	} else {
		pushNotification.register(tokenHandler, regError, {alert:true, badge:true, sound: true, ecb: "onNotificationAPN"});
	}
}

function onNotificationAPN(e){
	console.log(e.event, e.message);
}

function tokenHandler(token) {

	alert([token,':',localStorage.regid]);

	$.post('http://wiredelta.com:8085/store_apn_device_token.node',
	{
		name: device.platform+' '+device.version,
		uuid: device.uuid,
		token: token
	},
	function(){
	    localStorage.regid = token;
	});
}

function gcmSuccess(r) {
	// alert('Callback Success! Result = '+r)
}

function regError(r) {
	// alert('Callback Success! Result = '+r)
}

function onNotificationGCM(e) {
    switch(e.event) {
            case 'registered':
                if(e.regid.length) {
                    $.post("http://system-hostings.dev.wiredelta.com/colomer/api/offers/add_device",
                    {
                            name:		device.name,
                            platform:	device.platform.toLowerCase(),
                            uuid:		device.uuid,
                            regid:		e.regid
                    },
                    function(data,status){
                        localStorage.regid = e.regid;
					});
            	}
            break;
            case 'message':
                // this is the actual push notification. its format depends on the data model from the push server
                alert(e.message);
            break;
	        case 'error':
                // alert('GCM error = '+e.msg);
            break;
            default:
                alert('An unknown GCM event has occurred');
            break;
    }
}
