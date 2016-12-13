/*! viewportSize | Author: Tyson Matanich, 2013 | License: MIT */
(function(n){n.viewportSize={},n.viewportSize.getHeight=function(){return t("Height")},n.viewportSize.getWidth=function(){return t("Width")};var t=function(t){var f,o=t.toLowerCase(),e=n.document,i=e.documentElement,r,u;return n["inner"+t]===undefined?f=i["client"+t]:n["inner"+t]!=i["client"+t]?(r=e.createElement("body"),r.id="vpw-test-b",r.style.cssText="overflow:scroll",u=e.createElement("div"),u.id="vpw-test-d",u.style.cssText="position:absolute;top:-1000px",u.innerHTML="<style>@media("+o+":"+i["client"+t]+"px){body#vpw-test-b div#vpw-test-d{"+o+":7px!important}}<\/style>",r.appendChild(u),i.insertBefore(r,e.head),f=u["offset"+t]==7?i["client"+t]:n["inner"+t],i.removeChild(r)):f=n["inner"+t],f}})(this);

/**
 * How to create a parallax scrolling website
 * Author: Petr Tichy
 * URL: www.ihatetomatoes.net
 * Article URL: http://ihatetomatoes.net/how-to-create-a-parallax-scrolling-website/
 */

( function( $ ) {
	
	// Setup variables
	$window = $(window);
	$slide = $('.homeSlide');
	$slideTall = $('.homeSlideTall');
	$slideTall2 = $('.homeSlideTall2');
	$body = $('body');
	
    //FadeIn all sections   
	$body.imagesLoaded( function() {
		setTimeout(function() {
		      
		      // Resize sections
		      adjustWindow();
		      
		      // Fade in sections
			  $body.removeClass('loading').addClass('loaded');
			  
		}, 800);
	});
	
	function adjustWindow(){
		
		// Init Skrollr
		var s = skrollr.init({
		    render: function(data) {
		    
		        //Debugging - Log the current scroll position.
		        //console.log(data.curTop);
		    }
		});
		skrollr.menu.init(s, {
		    //skrollr will smoothly animate to the new position using `animateTo`.
		    animate: true,

		    //The easing function to use.
		    easing: 'sqrt',


		    //How long the animation should take in ms.
		    duration: function(currentTop, targetTop) {
		        //By default, the duration is hardcoded at 500ms.
		        return 500;

		        //But you could calculate a value based on the current scroll position (`currentTop`) and the target scroll position (`targetTop`).
		        //return Math.abs(currentTop - targetTop) * 10;
		    },

		    //If you pass a handleLink function you'll disable `data-menu-top` and `data-menu-offset`.
		    //You are in control where skrollr will scroll to. You get the clicked link as a parameter and are expected to return a number.
		    handleLink: function(link) {
		        return 400;//Hardcoding 400 doesn't make much sense.
		    },

		    //By default skrollr-menu will only react to links whose href attribute contains a hash and nothing more, e.g. `href="#foo"`.
		    //If you enable `complexLinks`, skrollr-menu also reacts to absolute and relative URLs which have a hash part.
		    //The following will all work (if the user is on the correct page):
		    //http://example.com/currentPage/#foo
		    //http://example.com/currentDir/currentPage.html?foo=bar#foo
		    ///?foo=bar#foo
		    complexLinks: false,

		    //This event is triggered right before we jump/animate to a new hash.
		    change: function(newHash, newTopPosition) {
		        //Do stuff
		    },

		    //Add hash link (e.g. `#foo`) to URL or not.
		    updateUrl: false //defaults to `true`.
		});
		// Get window size
	    winH = $window.height();
	    
	    // Keep minimum height 550
	    if(winH <= 550) {
			winH = 550;
		} 
	    
	    // Resize our slides
	    $slide.height(winH);
	    $slideTall.height(winH*2);
	    $slideTall2.height(winH*3);
	    
	    // Refresh Skrollr after resizing our sections
	    s.refresh($('.homeSlide'));
	    
	}
		
} )( jQuery );