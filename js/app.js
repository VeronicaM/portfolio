/*! viewportSize | Author: Tyson Matanich, 2013 | License: MIT */
(function(n){n.viewportSize={},n.viewportSize.getHeight=function(){return t("Height")},n.viewportSize.getWidth=function(){return t("Width")};var t=function(t){var f,o=t.toLowerCase(),e=n.document,i=e.documentElement,r,u;return n["inner"+t]===undefined?f=i["client"+t]:n["inner"+t]!=i["client"+t]?(r=e.createElement("body"),r.id="vpw-test-b",r.style.cssText="overflow:scroll",u=e.createElement("div"),u.id="vpw-test-d",u.style.cssText="position:absolute;top:-1000px",u.innerHTML="<style>@media("+o+":"+i["client"+t]+"px){body#vpw-test-b div#vpw-test-d{"+o+":7px!important}}<\/style>",r.appendChild(u),i.insertBefore(r,e.head),f=u["offset"+t]==7?i["client"+t]:n["inner"+t],i.removeChild(r)):f=n["inner"+t],f}})(this);


( function( $ ) {
	
	// Setup variables
	$window = $(window);
	$slide = $('.homeSlide');
	$slideTall = $('.homeSlideTall');
	$slideTall2 = $('.homeSlideTall2');
	$body = $('body');
var lastId,
    topMenu = $("#top-menu"),
    topMenuHeight = topMenu.outerHeight(),
    // All list items
    menuItems = topMenu.find('a[href*="#"]'),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function(){
      var item = $($(this).attr("href"));
      if (item.length) { return item; }
    });	


    //FadeIn all sections   
	$body.imagesLoaded( function() {
		setTimeout(function() {
		      
		      // Resize sections
		      adjustWindow();
		      
		      // Fade in sections
			  $body.removeClass('loading').addClass('loaded');
			  
		}, 800);
	});
		    
		// Bind to scroll
		$(window).scroll(function(){
		   // Get container scroll position
		      var fromTop = jQuery(this).scrollTop()+topMenuHeight;

               // Get id of current scroll item
               var cur = scrollItems.map(function(){
                 if (jQuery(this)[0].attributes[1].nodeValue < fromTop)
                   return this;
               });

               // Get the id of the current element
               cur = cur[cur.length-1];
               var id = cur && cur.length ? cur[0].id : "";               

              menuItems.parent().children().removeClass("active");
               if(id){
                    menuItems.parent().end().filter("[href*='#"+id+"']").parent().children()[0].className="active";
               }                 
		});
	function adjustWindow(){
	
		
		// Get window size
	    var winH = $window.height();
	     winW = $window.width();
	    // Keep minimum height 550
	    if(winH <= 550) {
			winH = 550;
		} 
	    // Init Skrollr for 768 and up
	    if( winW>= 918) {
	        // Init Skrollr
	       // Init Skrollr
			var s = skrollr.init({
					forceHeight: false,
					smoothScrolling: true,
					smoothScrollingDuration: 150
				});

			var sm = skrollr.menu.init(s, {
					easing: 'outCubic',
		            animate: true,
					duration: 500
			});
		    // Resize our slides
		    $slide.height(winH);
		    $slideTall.height(winH);
		    $slideTall2.height(2*winH);
		    // Refresh Skrollr after resizing our sections
		    s.refresh($('.homeSlide'));
	    } else {
	        // Init Skrollr
	        var s = skrollr.init();
	        s.destroy();
	    }
	};
	function initAdjustWindow() {
	    return {
	        match : function() {
	            adjustWindow();
	        },
	        unmatch : function() {
	            adjustWindow();
	        }
	     };
   }
 
  enquire.register("screen and (min-width : 768px)", initAdjustWindow(), false);
	
		
} )( jQuery,enquire);