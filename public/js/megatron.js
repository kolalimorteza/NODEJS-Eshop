jQuery(function ($) {
    "use strict";
    if ($("body").hasClass("rtl")) {
        $('.cloudzoom').each(function () {
            var pos = $(this).attr("data-cloudzoom");
            pos = pos + ", zoomPosition:13, zoomOffsetX:-35";
            $(this).attr('data-cloudzoom', pos);
        });
    }
});
jQuery(function ($) {
    "use strict";
	var hiddenBut = $('header.variant4 .navbar-secondary-menu .btn-group.btn-hidden'),
		hiddenWidth = 50,
		animDiration = 300;
	hiddenBut.hover(
	function () {
        $(this).stop(true, false).animate({'width': $(this).prop('scrollWidth') }, animDiration , function(){ $(this).css({'overflow':'visible'})});
		
		$(this).delay(400).queue(function(){
			$(this).addClass('open');
			$(this).dequeue();
		});
		
			 },
		
	function () {
        $(this).stop(true, false).removeClass('open').animate({'width':hiddenWidth}, animDiration, function(){ $(this).css({'overflow':'hidden'})});
		 $(this).removeClass('open')
    });

	var searchHidden = $('header.variant4 .navbar-search input.form-control');
		
		searchHidden.focus(function(){
			   $(this).parent().parent('.navbar-search').addClass("focus");
		  }).blur(function(){
			   $(this).parent().parent('.navbar-search').removeClass("focus");
		  })
});

function calculateMenuItemsInRow(row) {
    $(row).children(".item").each(function () {
        if ($(this).prev().prev().length > 0) {
            if ($(this).position().top != $(this).prev().prev().position().top) {
                if ($("body").hasClass("rtl")) {
                    var rightMargin = $('.navbar-main-menu').width() - $('.navbar-main-menu .item:first').position().left - $('.navbar-main-menu .item:first').width();
                    $(this).css({
                        'marginRight': rightMargin
                    });
                } else {
                    var leftMargin = $('.navbar-main-menu .item:first').position().left;
                    $(this).css({
                        'marginLeft': leftMargin
                    });
                }
                $(this).before('<div class="navbar-main-menu-divider clearfix"></div>');
                return false;
            };
        }
    });
};

function checkMenuOverlay() {

    var overlaps = (function () {
        function getPositions(elem) {
            var pos, width, height;
            pos = $(elem).offset();
            width = $(elem).width();
            height = $(elem).height();
            return [
                [pos.left, pos.left + width],
                [pos.top, pos.top + height]
            ];
        }

        function comparePositions(p1, p2) {
            var r1, r2;
            r1 = p1[0] < p2[0] ? p1 : p2;
            r2 = p1[0] < p2[0] ? p2 : p1;
            return r1[1] > r2[0] || r1[0] === r2[0];
        }

        return function (a, b) {
            var pos1 = getPositions(a),
                pos2 = getPositions(b);
            return comparePositions(pos1[0], pos2[0]) && comparePositions(pos1[1], pos2[1]);

        };
    })();

    $(".navbar-main-menu-divider").each(function () {
        $(this).remove()
    });

    var menu = $('.navbar-main-menu');
    var menu_item = $('.navbar-main-menu .item');

    var checkBoxOverlay = $('.navbar-search');

    var overlay = false;

    checkBoxOverlay.addClass('noTransition');
    menu_item.each(function () {
        var box = $(this),
            box1 = checkBoxOverlay;
        box.css({
            'background': 'none',
            'marginLeft': 0,
            'marginRight': 0
        });

        if (overlaps(box, box1)) {

            overlay = true;
            if ($("body").hasClass("rtl")) {
                var rightMargin = $('.navbar-main-menu').width() - $('.navbar-main-menu .item:first').position().left - $('.navbar-main-menu .item:first').width();
                box.css({
                    'marginRight': rightMargin
                });
            } else {
                var leftMargin = $('.navbar-main-menu .item:first').position().left;
                box.css({
                    'marginLeft': leftMargin
                });
            }
            $(this).before('<div class="navbar-main-menu-divider clearfix"></div>');
        }
    });
    if (overlay == false) {
        calculateMenuItemsInRow(menu)
    }
    var header = $("header .navbar"),
        menuHeightInner = $("header .navbar-height-inner");

    menuHeightInner.css({
        'height': $(".background", header).outerHeight(true)
    });
    checkBoxOverlay.removeClass('noTransition');

};

(function () {
    var viewportmeta = document.querySelector && document.querySelector('meta[name="viewport"]'),
        ua = navigator.userAgent,
        gestureStart = function () {
            viewportmeta.content = "width=device-width, minimum-scale=0.25, maximum-scale=1.6"
        },
        scaleFix = function () {
            if (viewportmeta && (/iPhone|iPad/.test(ua) && !/Opera Mini/.test(ua))) {
                viewportmeta.content = "width=device-width, minimum-scale=1.0, maximum-scale=1.0";
                document.addEventListener("gesturestart", gestureStart, false)
            }
        };
    scaleFix()
})();

jQuery(function ($) {
    "use strict";
    var socialItems = $('.social-widgets .items .item');
    var counter = 0;
    socialItems.each(function () {
        counter++;
        var itemclass = "item-0" + counter;
        $(this).addClass(itemclass)
    });
});
jQuery(function ($) {
	// customize selects
	if ($(".selectpicker").length > 0){ $('.selectpicker').selectpicker({});}
});

jQuery(function ($) {
	// countdown ini
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth(); 
	var yyyy = today.getFullYear();
	if ($("#countdown1").length > 0){$('#countdown1').countdown({until: new Date(yyyy, mm+1, dd)});}
});


jQuery(function ($) {
    "use strict";
    var pageBody = $("body");

    function isTouchDevice() {
        return typeof window.ontouchstart != "undefined" ? true : false
    }
    if (isTouchDevice()) pageBody.addClass("touch");
    else pageBody.addClass("notouch")
});
jQuery(function ($) {
    "use strict";
    var loadmap = $(".social-widgets .item a");
    loadmap.click(function (e) {
        e.preventDefault()
    });
    loadmap.hover(function (e) {
        if (!$(this).parent().hasClass("load")) {
            var loadcontainer = $(this).parent().find(".loading");
            $.ajax({
                url: $(this).attr("href"),
                cache: false,
                success: function (data) {
                    setTimeout(function () {
                        loadcontainer.html(data)
                    }, 1000)
                }
            });
            $(this).parent().addClass("load")
        }
    })
});
jQuery(function ($) {
    "use strict";
    var viewGrid = $(".view-grid"),
        viewList = $(".view-list"),
        productList = $(".products-list");
    viewGrid.click(function (e) {
        productList.removeClass("products-list-in-row").addClass("products-list-in-column");
        e.preventDefault()
    });
    viewList.click(function (e) {
        productList.removeClass("products-list-in-column").addClass("products-list-in-row");
        e.preventDefault()
    })
});
jQuery(function ($) {
    "use strict";
    var searchblock = $(".navbar-search"),
        searchinput = searchblock.find("input"),
        searchdropdown = searchblock.find(".dropdown-search");
    searchinput.bind("change paste keyup", function () {
        searchdropdown.show()
    });
    searchinput.bind("blur", function () {
        searchdropdown.hide()
    })
});
jQuery(function ($) {
    "use strict";
    var iconcolor = $(".icon-color:not(.disable)");
    var iconsize = $(".icon-size:not(.disable)");
    iconcolor.click(function () {
        if ($(this).hasClass("selected")) iconcolor.each(function () {
            $(this).removeClass("selected")
        });
        else {
            iconcolor.each(function () {
                $(this).removeClass("selected")
            });
            $(this).addClass("selected")
        }
    });
    iconsize.click(function () {
        if ($(this).hasClass("selected")) iconsize.each(function () {
            $(this).removeClass("selected")
        });
        else {
            iconsize.each(function () {
                $(this).removeClass("selected")
            });
            $(this).addClass("selected")
        }
    });
    var iconcolorPreview = $(".product-preview .icon-color:not(.disable)");
    iconcolorPreview.click(function (e) {
        var url = $(this).data("href");
        $(this).closest(".product-preview").find(".preview-image img").prop("src", url);
        return false
    })
});
jQuery(function ($) {
    "use strict";
    var usualmenu = $("ul.sf-menu");
    if (usualmenu.length != 0) usualmenu.supersubs({
        minWidth: 18,
        maxWidth: 27,
        extraWidth: 1
    }).superfish({onBeforeShow: function() {
   if($(this).parents("ul").length > 1){
      var w = $(window).width();  
      var ul_offset = $(this).parents("ul").offset();
      var ul_width = $(this).parents("ul").outerWidth();
      ul_width = ul_width + 50;
      if((ul_offset.left+ul_width > w-(ul_width/2)) && (ul_offset.left-ul_width > 0)) {
         $(this).addClass('offscreen_fix');
      }
      else {
         $(this).removeClass('offscreen_fix');
      }
   };
}})
});
jQuery(function ($) {
    "use strict";
    var hoverfold = $("#hoverfold");
    if (hoverfold.length != 0) {
        Modernizr.load({
            test: Modernizr.csstransforms3d && Modernizr.csstransitions,
            yep: ["js/jquery.hoverfold.js"],
            nope: "css/fallback.css",
            callback: function (url, result, key) {
                if (url === "js/jquery.hoverfold.js") $("#hoverfold div").hoverfold()
            }
        });
        var $container = hoverfold;
        $container.isotope();
        var $optionSets = jQuery(".filters-by-category .option-set"),
            $optionLinks = $optionSets.find("a");
        $optionLinks.click(function () {
            var $this = $(this);
            if ($this.hasClass("selected")) return false;
            var $optionSet = $this.parents(".option-set");
            $optionSet.find(".selected").removeClass("selected");
            $this.addClass("selected");
            var options = {},
                key = $optionSet.attr("data-option-key"),
                value = $this.attr("data-option-value");
            value = value === "false" ? false : value;
            options[key] = value;
            if (key === "layoutMode" && typeof changeLayoutMode === "function") changeLayoutMode($this, options);
            else $container.isotope(options);
            return false
        })
    }
});
jQuery(function ($) {
    "use strict";
    var arrowPrev = $(".small-previews a.prev");
    var arrowNext = $(".small-previews a.next");
    arrowPrev.hover(function () {
        $(this).parent().find(".small-preview.prev").stop(true, false).fadeToggle(400, "linear")
    });
    arrowNext.hover(function () {
        $(this).parent().find(".small-preview.next").stop(true, false).fadeToggle(400, "linear")
    })
});
jQuery(function ($) {
    "use strict";
    if ($("#popup-box-newsletter").length > 0) $.fancybox.open("#popup-box-newsletter",  { wrapCSS    : 'fancybox-newsletter',  padding: 0 });
    if ($("#popup-box").length > 0) $.fancybox.open("#popup-box");
    if ($("#popup-box-cart").length > 0) $.fancybox.open("#popup-box-cart");
});
jQuery(function ($) {
    "use strict";
    var calculateProductsInRow = function (row) {
        $(".product-view-ajax-container.temp").each(function () {
            $(this).remove()
        });
        var productsInRow = 0;
        $(row).children(".product-preview").each(function () {
            if ($(this).prev().length > 0) {
                if ($(this).position().top != $(this).prev().position().top) return false;
                productsInRow++
            } else productsInRow++
        });
        $(row).children(":nth-child(" + productsInRow + "n)").after('<div class="product-view-ajax-container temp"></div>')
    };
    $(".products-list").each(function () {
        calculateProductsInRow(this)
    });
    $(window).resize(function () {
        $(".products-list").each(function () {
            calculateProductsInRow(this)
        })
    })
});


jQuery(function ($) {
    "use strict";
    var carousel = $(".tabsslider"),
        carouselnext = $(".carousel-next"),
        carouselprev = $(".carousel-prev"),
        carousellast = carousel.find("li:last-child"),
        carouselfirst = carousel.find("li:first-child");
    var hideshowarrow = function () {
        var carouselw = carousel.width();
        if (carousellast.width() + carousellast.position().left < carouselw) carouselnext.addClass("disable");
        else carouselnext.removeClass("disable"); if (carouselfirst.position().left - 15 >= 0) carouselprev.addClass("disable");
        else carouselprev.removeClass("disable")
    };
    if (carousel.length > 0) hideshowarrow();
    carouselnext.click(function () {
        var carousel = $(this).parents(".tabsslider").find("ul");
        var scroll = carousel.scrollLeft();
        var w = carousel.width();
        var x = 0;
        carousel.find("li").each(function (i) {
            if ($(this).position().left < w) x = $(this).position().left
        });
        carousel.animate({
            scrollLeft: scroll + x
        }, "fast", function () {
            hideshowarrow()
        });
        return false
    });
    carouselprev.click(function () {
        var carousel = $(this).parents(".tabsslider").find("ul");
        var scroll = carousel.scrollLeft();
        var w = carousel.width();
        var x = 0;
        carousel.find("li").each(function (i) {
            if ($(this).position().left < 1 - w) x = $(this).position().left
        });
        if (x == 0) carousel.animate({
            scrollLeft: 0
        }, "fast", function () {
            hideshowarrow()
        });
        else carousel.animate({
            scrollLeft: scroll + x
        }, "fast", function () {
            hideshowarrow()
        });
        return false
    });
    $(window).resize(function () {
        if (this.resizeTO) clearTimeout(this.resizeTO);
        this.resizeTO = setTimeout(function () {
            $(this).trigger("resizeEnd")
        }, 100)
    });
    $(window).bind("resizeEnd", function () {
        if (carousel.length > 0) hideshowarrow()
    })
});
jQuery(function ($) {
    "use strict";
    $(".blog-widget .posts").flexslider({
        animation: "slide",
        keyboard: false,
        controlNav: false,
        animationLoop: false,
        slideshow: false,
        prevText: "",
        nextText: "",
        itemMargin: 50
    });
    $(".blog-widget-small .posts").flexslider({
        animation: "slide",
        keyboard: false,
        controlNav: false,
        animationLoop: false,
        slideshow: false,
        prevText: "",
        nextText: "",
        itemMargin: 0
    });
    //    $(".products-widget").flexVSlider({
    //        animation: "slide",
    //        direction: "vertical",
    //        move: 3,
    //        keyboard: false,
    //        controlNav: false,
    //        animationLoop: false,
    //		touch: false,
    //        slideshow: false,
    //        prevText: "",
    //        nextText: ""
    //    });
    var productWidget = $(".products-widget");
    productWidget.each(function () {
        var jcarousetItemsNumber = $(this).find("ul li").size();
		var scrollItems = 3;
		var autoTime = 0;
        if (jcarousetItemsNumber > 3) {
			if ($(this).hasClass('autoscroll')) { scrollItems = 1; autoTime = 3;}
            $(this).jcarousel({
              vertical: true,
                items: 'ul.slides li',
                scroll: scrollItems,
				wrap: 'circular',
				auto: autoTime,
				animation:"slow",
				easing:"swing",
                buttonNextHTML: '<a></a>',
                buttonPrevHTML: '<a></a>'
            });
        }
    })
});
jQuery(function ($) {
    "use strict";
    var brandsImg = $(".brands-carousel img");
    brandsImg.mouseover(function () {
        brandsImg.removeClass("brands_active").addClass("brands_n_active");
        $(this).removeClass("brands_n_active").addClass("brands_active")
    }).mouseout(function () {
        brandsImg.removeClass("brands_n_active").removeClass("brands_active")
    })
});
jQuery(function ($) {
    "use strict";
    $.initQuantity = function ($control) {
        $control.each(function () {
            var $this = $(this),
                data = $this.data("inited-control"),
                $plus = $(".input-group-addon:last", $this),
                $minus = $(".input-group-addon:first", $this),
                $value = $(".form-control", $this);
            if (!data) {
                $control.attr("unselectable", "on").css({
                    "-moz-user-select": "none",
                    "-o-user-select": "none",
                    "-khtml-user-select": "none",
                    "-webkit-user-select": "none",
                    "-ms-user-select": "none",
                    "user-select": "none"
                }).bind("selectstart", function () {
                    return false
                });
                $plus.click(function () {
                    var val =
                        parseInt($value.val()) + 1;
                    $value.val(val);
                    return false
                });
                $minus.click(function () {
                    var val = parseInt($value.val()) - 1;
                    $value.val(val > 0 ? val : 1);
                    return false
                });
                $value.blur(function () {
                    var val = parseInt($value.val());
                    $value.val(val > 0 ? val : 1)
                })
            }
        })
    };
    $.initQuantity($(".quantity-control"));
    $.initSelect = function ($select) {
        $select.each(function () {
            var $this = $(this),
                data = $this.data("inited-select"),
                $value = $(".value", $this),
                $hidden = $(".input-hidden", $this),
                $items = $(".dropdown-menu li > a", $this);
            if (!data) {
                $items.click(function (e) {
                    if ($(this).closest(".sort-isotope").length >
                        0) e.preventDefault();
                    var data = $(this).attr("data-value"),
                        dataHTML = $(this).html();
                    $this.trigger("change", {
                        value: data,
                        html: dataHTML
                    });
                    $value.html(dataHTML);
                    if ($hidden.length) $hidden.val(data)
                });
                $this.data("inited-select", true)
            }
        })
    };
    $.initSelect($(".btn-select"))
});


jQuery(function ($) {
    "use strict";
    var duration = {
            menuShow: 500,
            menuSlide: 500,
            headerTransform: 500,
            switcherFade: 500
        },
        $header = $("header .navbar"),
        $window = $(window),
        $backToTop = $("header .back-to-top"),
        $body = $("body"),
        $switcher = $(".navbar-switcher", $header),
        $menu = $(".navbar-main-menu", $header),
        $menuItems = $(".item", $menu),
        $menuContainer = $("<dd class='item-content' id='menuScrollerWrapper'></dd>"),
        $menuScroller = $("<div style='overflow: hidden;' id='menuScroller'></div>"),
        $menuHeight = $("header .navbar-compact"),
        menuHeightInner = $("header .navbar-height-inner"),
        menuInner = $("header .navbar-height-inner").length,
        $menuForSlide =
        $menuContainer.add($menuHeight),
        menuWidth = 0,
        menuActive = false,
        headerHeight = $header.outerHeight(),
		headerStaticHeight = $header.outerHeight(),
		marginTopStatic = headerStaticHeight,
		latent = $window.scrollTop() >= headerHeight,
        positionHeader = false,
        active = false;
		
		if($menu.css("display") == "none") {
			marginTopStatic = headerStaticHeight;
		} else { marginTopStatic = 0;}


    var reculcPosHeader = function () {
        var headerCompact = false,
            menuShow = false;
        if (menuActive) {
            // $menuForSlide.hide();
            menuShow = true
        }
        if (!$header.hasClass("navbar-compact")) {
            headerCompact = true;
            $header.addClass("navbar-compact");
        }
        headerHeight = $header.outerHeight();
		//menuHeightInnerHeight = $("header .navbar-height-inner").outerHeight(),
        positionHeader = -$header.height() + 3;
        if (headerCompact) $header.removeClass("navbar-compact");
        if (menuShow) $menuForSlide.show();
        if (parseInt($header.css("top")) < -1) $header.css("top", positionHeader + "px");
    };
    if (latent) {
        $switcher.show();
        $header.addClass("navbar-compact").css("top", positionHeader + "px")
		headerStaticHeight = $header.outerHeight();
    }

     $(window).load(function () {  
		checkMenuOverlay();
		reculcPosHeader();
		headerStaticHeight = $header.outerHeight();
		if($menu.css("display") == "none") {
			marginTopStatic = headerStaticHeight;
		} else { marginTopStatic = 0;}
	 })
	 
    $backToTop.click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 400)
    });
	
    $(window).resize(function () {
		checkMenuOverlay();
        reculcPosHeader();
        menuHeightInner.css({'height': $(".background", $header).height()});
		headerStaticHeight = $header.outerHeight();
		if($menu.css("display") == "none") {
			marginTopStatic = headerStaticHeight;
		} else { marginTopStatic = 0;}
    });
    var menuTimer;
    $menuItems.each(function () {
        var $this = $(this),
            $dropdown = $this.next("dd.item-content");
        if ($dropdown.length) {
            var pos =
                menuWidth;
            menuWidth += 100;
            $dropdown = $("<div style='width: 50%; float: left;'></div>").append($dropdown.html());
            $menuScroller.append($dropdown);
            $this.addClass("with-sub").mouseenter(function (e) {
                e.preventDefault();
                if (menuTimer) {
                    clearTimeout(menuTimer);
                }
                if (menuActive || menuActive === 0) {
                    if (menuActive !== pos) {

                        var posN = pos / 100;


                        menuActive = pos;
                        $menuItems.removeClass("active");
                        $this.addClass("active");
                        $menuScroller.stop().animate({
                            marginLeft: -pos + "%"
                        }, {
                            duration: duration.menuSlide
                        }, function () {
                            reculcPosHeader();
                        })
                    }
                } else {
                    $menuScroller.css({
                        marginLeft: -pos + "%"
                    });
                    menuActive = pos;
                    $menuItems.removeClass("active");
                    $this.addClass("active");
                    $switcher.hide();
                    var posN = pos / 100;
                    $("#menuScrollerWrapper").css({
                        display: 'block'
                    });

                    $("#menuScrollerWrapper").css({
                        display: 'none'
                    });

                    $menuForSlide.stop().slideDown(duration.menuShow, function () {
                        reculcPosHeader();
                    });
                }
            }).mouseleave(function (e) {
                    menuTimer = setTimeout(function () {
                        $menuItems.removeClass("active");
                        $menuForSlide.slideUp(duration.menuShow, function () {
                            if (latent) $switcher.fadeIn(duration.switcherFade);
                            reculcPosHeader();
                        });
                        menuActive = false;
                    }, 200);
                });;

        }
    });
    $menuScroller.mouseenter(function (e) {
        if (menuTimer) {
            clearTimeout(menuTimer);
        }
    })
        .mouseleave(function (e) {
            menuTimer = setTimeout(function () {
                $menuItems.removeClass("active");
                $menuForSlide.slideUp(duration.menuShow, function () {
                    if (latent) $switcher.fadeIn(duration.switcherFade);
                    reculcPosHeader();
                });
                menuActive = false;
            }, 200);
        });
    $menuScroller.css("width",
        menuWidth + "%");
    $menuScroller.children("div").css("width", 100 / (menuWidth / 100) + "%");
    $menu.append($menuContainer.append($menuScroller));
    $menuHeight.css({
        height: $menuContainer.height() + (menuInner ? 0 : headerHeight - 14) + "px",
        display: "none"
    });
	
    $window.scroll(function () {
        if (!latent && $window.scrollTop() >= headerStaticHeight) {
            //$menuItems.removeClass("active");
            $menuForSlide.slideUp(duration.menuShow, function () {
                if (latent) $switcher.fadeIn(duration.switcherFade)
            });
            menuActive = false;
            $switcher.show();
            $backToTop.stop().fadeIn(300);
			var $heightOld = $header.outerHeight();
            $header.addClass("navbar-compact");
            checkMenuOverlay();
            reculcPosHeader();
			var $heightNew = $header.outerHeight();
			var $marginTop = Math.abs($heightNew-$heightOld);
			if (marginTopStatic > 0) {$marginTop = 0}
            $header.css("top", positionHeader + "px");
			if ($('#slider').length) {
				$("#slider").css({ 'marginTop' : $marginTop + marginTopStatic + "px"});
			}
			else if (!$('section.main-slider').length) {
   		    	$("#outer-canvas").find('section.container:first').css({ 'marginTop' : $marginTop + marginTopStatic + "px"});
			}
            latent = true;
            $body.click()
        } else if (latent && $window.scrollTop() < headerStaticHeight) {
            $switcher.hide();
            $header.stop().css("top", "").removeClass("navbar-compact").css("top", "0px");
            checkMenuOverlay();
            $backToTop.stop().fadeOut(300);
            $switcher.removeClass("active");
            active = false;
			if ($('#slider').length) {
				$("#slider").css({ 'marginTop' : 0 });
			} else {
   		    	$("#outer-canvas").find('section.container:first').css({ 'marginTop' : 0 });
			}
            latent = false;
            $body.click()
        }
    });
    $switcher.click(function () {
        active = !active;
        $switcher.toggleClass("active");
        $header.animate({
            top: active ? "0" : positionHeader
        }, {
            duration: duration.headerTransform
        })
    })
}); 
jQuery(function ($) {
    "use strict";
	if ($(".rw-slider").length){
    $(".rw-slider").rwSlider({
        swipe: true
    });

    $(".rw-slider .scroll-down").click(function () {
        $("html, body").animate({
            scrollTop: $(".rw-slider").height()
        }, 400);
    });

	}
	$("#slider .scroll-down").click(function () {
        $("html, body").animate({
            scrollTop: $(window).height()
        }, 400);
    });	
	
	$(window).scroll(function () {
        if ( $(window).scrollTop() > 0) {$(".scroll-down").stop(true.false).fadeOut(0)}
		else {$(".scroll-down").stop(true.false).fadeIn(0)}
	})
});
jQuery(function ($) {
    "use strict";
    $("#off-canvas-menu-toggle").bind("click", function (e) {
        $("body").toggleClass("off-canvas-menu-open");
        $("header .navbar").removeClass("navbar-compact");
        $("html, body").animate({
            scrollTop: 0
        }, "300");
        e.preventDefault()
    });
    $("#off-canvas-menu-close").bind("click", function (e) {
        $("body").removeClass("off-canvas-menu-open");
        $mobileNavItems.removeClass("active")
    });
    var $mobileNavItems = $(".mobile-nav .nav-item"),
        $mobileNavItemsLink = $(".mobile-nav .nav-item > a");
    $mobileNavItemsLink.each(function () {
        var $this =
            $(this),
            timer;
        $this.on("click", function (e) {
            e.preventDefault();
            if (!$this.parent().hasClass("active")) {
                $mobileNavItems.removeClass("active");
                $this.parent().addClass("active")
            } else $this.parent().removeClass("active")
        })
    })
});
jQuery(function ($) {
    "use strict";
    $(".social-widgets .item").each(function () {
        var $this = $(this),
            timer;
        $this.on("mouseenter", function () {
            var $this = $(this);
            if (timer) clearTimeout(timer);
            timer = setTimeout(function () {
                $this.addClass("active")
            }, 200)
        }).on("mouseleave", function () {
            var $this = $(this);
            if (timer) clearTimeout(timer);
            timer = setTimeout(function () {
                $this.removeClass("active")
            }, 100)
        }).on("click", function (e) {
            e.preventDefault()
        })
    })
});
jQuery(function ($) {
    "use strict";
    $(".live-chat").each(function () {
        var $this = $(this),
            timer;
        $this.on("mouseenter", function () {
            var $this = $(this);
            if (timer) clearTimeout(timer);
            timer = setTimeout(function () {
                $this.addClass("active")
            }, 200)
        }).on("mouseleave", function () {
            var $this = $(this);
            if (timer) clearTimeout(timer);
            timer = setTimeout(function () {
                $this.removeClass("active")
            }, 100)
        }).on("click", function (e) {
            e.preventDefault()
        })
    })
});
jQuery(function ($) {
    "use strict";
    var $sliderRange = $(".slider-range");
    if ($sliderRange.length) $sliderRange.each(function () {
        var $this = $(this),
            $slider = $this.find(".control"),
            $min = $this.find(".min .value"),
            $max = $this.find(".max .value"),
            min = parseInt($min.text(), 10) || 0,
            max = parseInt($max.text(), 10) || 0;
        $slider.slider({
            range: true,
            animate: true,
            min: min,
            max: max,
            values: [min, max],
            slide: function (event, ui) {
                $min.text(ui.values[0]);
                $max.text(ui.values[1])
            }
        })
    })
});
jQuery(function ($) {
    "use strict";
    $(".expander-list").find("ul").hide().end().find(" .expander").text("+").end().find(".active").each(function () {
        $(this).parents("li ").each(function () {
            var $this = $(this),
                $ul = $this.find("> ul"),
                $name = $this.find("> .name a"),
                $expander = $this.find("> .name .expander");
            $ul.show();
            $name.css("font-weight", "bold");
            $expander.html("&minus;")
        })
    }).end().find(" .expander").each(function () {
        var $this = $(this),
            hide = $this.text() === "+",
            $ul = $this.parent(".name").next("ul"),
            $name = $this.next("a");
        $this.click(function () {
            if ($ul.css("display") ==
                "block") $ul.slideUp("slow");
            else $ul.slideDown("slow");
            $(this).html(hide ? "&minus;" : "+");
            $name.css("font-weight", hide ? "bold" : "normal");
            hide = !hide
        })
    })
});
jQuery(function ($) {
    "use strict";
    $(".collapsed-block .expander").click(function (e) {
        var collapse_content_selector = $(this).attr("href");
        var expander = $(this);
        if (!$(collapse_content_selector).hasClass("open")) expander.addClass("open").html("&minus;");
        else expander.removeClass("open").html("+"); if (!$(collapse_content_selector).hasClass("open")) $(collapse_content_selector).addClass("open").slideDown("normal");
        else $(collapse_content_selector).removeClass("open").slideUp("normal");
        e.preventDefault()
    })
});
jQuery(function ($) {
    "use strict";
    var windowWidth = window.innerWidth || document.documentElement.clientWidth;
    if (windowWidth > 767) {
		if ($(".cloudzoom").length){CloudZoom.quickStart();}
	} else {
		$(".cloudzoom-gallery").bind("click", function () {
			var cloudzoomArray =  $(this).data("cloudzoom").split(",");
			var cloudzoomArrayImage = cloudzoomArray[1].split(":");
			var newImage = cloudzoomArrayImage[1].replace(/\'/g, "");
			//console.log (newImage)
			$(".large-image > img").attr('src', newImage);
			
		})
	}
    $(".fancybox-gallery").fancybox({
        "transitionIn": "elastic",
        "transitionOut": "elastic",
        "speedIn": 600,
        "speedOut": 200,
        "overlayShow": false
    });
    $(".fancybox.quick-view").fancybox({
        "closeBtn": false,
        ajax: {
            complete: function () {
    	if ($(".cloudzoom").length){CloudZoom.quickStart();}
                var $productView = $(".product-preview-popup"),
                    $nav = $(".product-preview-popup  .flexslider-thumb");
                if ($productView && $productView.length) $.initSelect($productView.find(".btn-select"));
                $nav.each(function () {
                    var jcarousetItemsNumber = $(this).find("ul li").size();
                    if (jcarousetItemsNumber > 3) {
                        $(this).flexslider({
                            animation: "slide",
                            keyboard: false,
                            controlNav: false,
                            animationLoop: false,
                            slideshow: false,
                            prevText: "",
                            nextText: "",
                            itemWidth: 76,
                            itemMargin: 7
                        })
                    }
                })
            }
        },
        onComplete: function () {
            $(".product-preview-popup .cloudzoom").CloudZoom()
        }
    });
    $(".large-image .cloudzoom").bind("click", function () {
        var cloudZoom = $(this).data("CloudZoom");
        cloudZoom.closeZoom();
        $.fancybox.open(cloudZoom.getGalleryList());
        return false
    });
    if ($(".various").length > 0) $(".various").fancybox({
        maxWidth: 800,
        maxHeight: 600,
        fitToView: false,
        width: "70%",
        height: "70%",
        autoSize: false,
        closeClick: false,
        openEffect: "none",
        closeEffect: "none"
    })
});
jQuery(function ($) {
    "use strict";
    var $mainContainer = $(".container"),
        $section = $(".products-list"),
        $links = $(".quick-view:not(.fancybox)"),
        $view = $(".product-view-ajax"),
        $container = $(".product-view-container", $view),
        $loader = $(".ajax-loader", $view),
        $layar = $(".layar", $view),
        $slider;
    var initProductView = function ($productView) {
        var $slider = $(".flexslider-large", $productView),
            $nav = $(".flexslider-thumb", $productView),
            $navvertical = $(".flexslider-thumb-vertical", $productView),
            $close = $(".close-view", $productView);
        if ($productView && $productView.length) $.initSelect($productView.find(".btn-select"));
        $navvertical.each(function () {
            var jcarousetItemsNumber = $(this).find("ul li").size();
            if (jcarousetItemsNumber > 3) {
                $(this).flexVSlider({
                    animation: "slide",
                    direction: "vertical",
                    move: 3,
                    keyboard: false,
                    controlNav: false,
                    animationLoop: false,
                    slideshow: false,
                    prevText: "",
                    nextText: ""
                })
            }
        })
        $nav.each(function () {
            var jcarousetItemsNumber = $(this).find("ul li").size();
            if (jcarousetItemsNumber > 3) {
                $(this).flexslider({
                    animation: "slide",
                    keyboard: false,
                    controlNav: false,
                    animationLoop: false,
                    slideshow: false,
                    prevText: "",
                    nextText: "",
                    itemWidth: 76,
                    itemMargin: 7
                })
            }
        })
        $slider.flexslider({
            animation: "slide",
            keyboard: false,
            controlNav: true,
            directionNav: true,
            animationLoop: false,
            slideshow: false,
            prevText: "",
            nextText: ""
        });
        $close.click(function (e) {
            e.preventDefault();
            $container.slideUp(500, function () {
                $container.empty();
                $view.hide();
                $container.show()
            })
        })
    };
    $links.click(function (e) {
        if ($(".hidden-xs").is(":visible")) {
            e.preventDefault();
            var $this = $(this),
                url = $this.attr("href");
            if ($this.closest(".product-carousel").length > 0) $this.closest(".row").find(".product-view-ajax-container").first().append($view);
            else $this.parent().parent().nextAll(".product-view-ajax-container").first().append($view);
            $view.show();
            $layar.show();
            $loader.show();
            $.ajax({
                url: url,
                cache: false,
                success: function (data) {
                    var $data = $(data);
                    initProductView($data);
                    $loader.hide();
                    $layar.hide();
                    if (!$container.text()) {
                        $data.hide();
                        $container.empty().append($data);
                        $data.slideDown(500)
                    } else $container.empty().append($data)
                },
                complete: function () {
                    if ($(".various").length > 0) $(".various").fancybox({
                        maxWidth: 800,
                        maxHeight: 600,
                        fitToView: false,
                        width: "70%",
                        height: "70%",
                        autoSize: false,
                        closeClick: false,
                        openEffect: "none",
                        closeEffect: "none"
                    });
                    console.log("ajax complete");
                    CloudZoom.quickStart()
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    $loader.hide();
                    $container.html(textStatus)
                }
            })
        }
    });
    initProductView();
    var productCarousel = $(".product-carousel"),
        container = $(".container");
    if (productCarousel.length > 0) productCarousel.each(function () {
        var items = 4,
            itemsDesktop = 4,
            itemsDesktopSmall = 3,
            itemsTablet = 2,
            itemsMobile = 1;

        if ($("body").hasClass("noresponsive")) {

            var items = 4,
                itemsDesktop = 4,
                itemsDesktopSmall = 4,
                itemsTablet = 4,
                itemsMobile = 4;
            if ($(this).closest("section.col-md-8.col-lg-9").length > 0) var items = 3,
                itemsDesktop = 3,
                itemsDesktopSmall = 3,
                itemsTablet = 3,
                itemsMobile = 3;
            else if ($(this).closest("section.col-lg-9").length > 0) var items = 3,
                itemsDesktop = 3,
                itemsDesktopSmall = 3,
                itemsTablet = 3,
                itemsMobile = 3;
            else if ($(this).closest("section.col-sm-12.col-lg-6").length > 0) var items = 2,
                itemsDesktop = 2,
                itemsDesktopSmall = 2,
                itemsTablet = 2,
                itemsMobile = 2;
            else if ($(this).closest("section.col-lg-6").length > 0) var items = 2,
                itemsDesktop = 2,
                itemsDesktopSmall = 2,
                itemsTablet = 2,
                itemsMobile = 12;
            else if ($(this).closest("section.col-sm-12.col-lg-3").length > 0) var items = 1,
                itemsDesktop = 1,
                itemsDesktopSmall = 1,
                itemsTablet = 1,
                itemsMobile = 1;
            else if ($(this).closest("section.col-lg-3").length > 0) var items = 1,
                itemsDesktop = 1,
                itemsDesktopSmall = 1,
                itemsTablet = 1,
                itemsMobile = 1;

        } else if ($(this).closest("section.col-md-8.col-lg-9").length > 0) var items = 3,
            itemsDesktop = 3,
            itemsDesktopSmall = 2,
            itemsTablet = 2,
            itemsMobile = 1;
        else if ($(this).closest("section.col-lg-9").length > 0) {var items = 3,
            itemsDesktop = 3,
            itemsDesktopSmall = 2,
            itemsTablet = 2,
            itemsMobile = 1;}
        else if ($(this).closest("section.col-sm-12.col-lg-6").length > 0) var items = 2,
            itemsDesktop = 2,
            itemsDesktopSmall = 3,
            itemsTablet = 2,
            itemsMobile = 1;
        else if ($(this).closest("section.col-lg-6").length > 0) var items = 2,
            itemsDesktop = 2,
            itemsDesktopSmall = 2,
            itemsTablet = 2,
            itemsMobile = 1;
        else if ($(this).closest("section.col-sm-12.col-lg-3").length > 0) var items = 1,
            itemsDesktop = 1,
            itemsDesktopSmall = 3,
            itemsTablet = 2,
            itemsMobile = 1;
        else if ($(this).closest("section.col-lg-3").length > 0) var items = 1,
            itemsDesktop = 1,
            itemsDesktopSmall = 2,
            itemsTablet = 2,
            itemsMobile = 1;
        $(this).owlCarousel({
            items: items,
            itemsDesktop: [1199, itemsDesktop],
            itemsDesktopSmall: [980, itemsDesktopSmall],
            itemsTablet: [768, itemsTablet],
            itemsTabletSmall: false,
            itemsMobile: [360, itemsMobile],
            navigation: true,
            pagination: false,
            rewindNav: false,
            navigationText: ["", ""],
            scrollPerPage: true,
            slideSpeed: 500,
            beforeInit: function rtlSwapItems(el) {
                if ($("body").hasClass("rtl")) el.children().each(function (i, e) {
                    $(e).parent().prepend($(e))
                })
            },
            afterInit: function afterInit(el) {
                if ($("body").hasClass("rtl")) this.jumpTo(1000)
            }
        })
    });
    var productsListSmall = $(".products-list-small .slides");
    if (productsListSmall.length > 0) {
        var items = 12,
            itemsDesktop = 12,
            itemsDesktopSmall = 8,
            itemsTablet = 6,
            itemsMobile = 3;
        if ($("body").hasClass("noresponsive")) var items = 12,
            itemsDesktop = 12,
            itemsDesktopSmall = 12,
            itemsTablet = 12,
            itemsMobile = 12;
        productsListSmall.owlCarousel({
            items: items,
            itemsDesktop: [1199, itemsDesktop],
            itemsDesktopSmall: [980, itemsDesktopSmall],
            itemsTablet: [768, itemsTablet],
            itemsTabletSmall: false,
            itemsMobile: [360, itemsMobile],
            navigation: true,
            pagination: false,
            rewindNav: false,
            navigationText: ["", ""],
            scrollPerPage: true,
            slideSpeed: 500,
            beforeInit: function rtlSwapItems(el) {
                if ($("body").hasClass("rtl")) el.children().each(function (i, e) {
                    $(e).parent().prepend($(e))
                })
            },
            afterInit: function afterInit(el) {
                if ($("body").hasClass("rtl")) this.jumpTo(1000)
            }
        })
    }

    var brandsCarousel = $(".brands-carousel ul");
	var brandsCarouselMax = 6;
	if ($(".content-center .brands-carousel ul").length > 0) {  brandsCarouselMax = 4 }
	
	if (brandsCarousel.length > 0){
	        brandsCarousel.carouFredSel({
					responsive: true,
					width: '100%',
					scroll: 1,
					prev: '#brands-carousel-prev',
					next: '#brands-carousel-next',
					items: {
						width: 170,
						height: '30%',	//	optionally resize item-height
						visible: {
							min: 1,
							max: brandsCarouselMax
						}
					}
				});

	}
    var productWidgets = $(".product-widgets");
    if (productWidgets.length > 0) productWidgets.owlCarousel({
        items: 1,
        navigation: true,
        pagination: false,
        rewindNav: false,
        navigationText: ["", ""],
        scrollPerPage: true,
        slideSpeed: 300
    });
    var $contentcenter = $(".content-center"),
        $contentaside = $(".content-aside");
    if ($(".visible-xs").is(":visible")) $contentcenter.insertBefore($contentaside);
    $(window).resize(function () {
        var $contentcenter = $(".content-center"),
            $contentaside = $(".content-aside");
        if ($(".visible-xs").is(":visible")) $contentcenter.insertBefore($contentaside);
        else $contentaside.insertBefore($contentcenter)
    })
});
$(window).load(function () {
	
	$("body").width($("body").width() + 1).width("auto");

    var windowWidth = window.innerWidth || document.documentElement.clientWidth;
    var animate = $(".notouch .animate");
    var animateDelay = $(".notouch .animate-delay-outer");
    var animateDelayItem = $(".notouch .animate-delay");
    if (windowWidth > 767) {
        animate.bind("inview", function (event, visible) {
            if (visible && !$(this).hasClass("animated")) $(this).addClass("animated")
        });
        animateDelay.bind("inview", function (event, visible) {
            if (visible && !$(this).hasClass("animated")) {
                var j = -1;
                var $this = $(this).find(".animate-delay");
                $this.each(function () {
                    var $this = jQuery(this);
                    j++;
                    setTimeout(function () {
                        $this.addClass("animated")
                    }, 200 * j)
                });
                $(this).addClass("animated")
            }
        })
    } else {
        animate.each(function () {
            $(this).removeClass("animate")
        });
        animateDelayItem.each(function () {
            $(this).removeClass("animate-delay")
        })
    }

    var counter = $(".counter")

    if (counter.length > 0) {
        $('.counter').countTo();
    }

    var tabsLeftTabs = $(".responsive .tabs-left .nav-tabs"),
        tabsLeftContent = $('.responsive .tabs-left .tab-content');

    if (tabsLeftContent.length > 0) {
        tabsLeftContent.css({
            'min-height': tabsLeftTabs.height() - 3
        });
    }


    var mainOwlSlider = function () {
        var $containerw = $(".container").width(),
            $owlslider = $(".owl-slider"),
            $bannersblock = $owlslider.parent().next(".banners-block");
        if ($bannersblock.length > 0) {
			$owlsliderw = "70%";
			$owlslider.parent().css({
				width: $owlsliderw
			});
		}
        $owlslider.owlCarousel({
            slideSpeed: 500,
            singleItem: true,
            navigation: true,
            rewindNav: true,
            navigationText: ["", ""],
            pagination: false,
            autoPlay: true,
            cycle: true,
            //transitionStyle: "fade",
            stopOnHover: true
        })
    };
    mainOwlSlider();
    $(".preview.hover-slide .preview-image").each(function () {
		var border = $(this).outerWidth() - $(this).width();
        var imageHeight = $(this).find("img").outerHeight() + border;
        $(this).css({
            "height": imageHeight
        })
    });
    $(".loader").fadeOut("slow");
    if ($(".notouch .parallax").length > 0) $(".notouch .parallax").parallax({
        speed: 0,
        axis: "y"
    });
    var $isotopposts = $(".posts-isotope");
    if ($isotopposts.length) {
        $isotopposts.isotope({
            itemSelector: ".col-sm-6",
            layoutMode: "masonry",
            masonry: {},
            resizable: true
        });
        var $optionSets = jQuery(".filters-by-category .option-set"),
            $optionLinks = $optionSets.find("a");
        $optionLinks.click(function () {
            var $this = $(this);
            if ($this.hasClass("selected")) return false;
            var $optionSet = $this.parents(".option-set");
            $optionSet.find(".selected").removeClass("selected");
            $this.addClass("selected");
            var options = {},
                key = $optionSet.attr("data-option-key"),
                value = $this.attr("data-option-value");
            value = value === "false" ? false : value;
            options[key] = value;
            if (key === "layoutMode" && typeof changeLayoutMode === "function") changeLayoutMode($this, options);
            else $isotopposts.isotope(options);
            return false
        })
    }
    var $isotop = $(".products-list-isotope"),
        $isotopmobile = $(".products-mobile-list > ul");
    if ($isotop.length) {
        var $sortAscending = $(".sort-select-arrow");
        if ($.support.opacity) window.onresize = function () {
            $isotop.isotope({
                masonry: {}
            })
        };
        $isotop.isotope({
            itemSelector: ".product-preview",
            layoutMode: "masonry",
            masonry: {},
            resizable: false,
            sortBy: "position",
            sortAscending: true,
            getSortData: {
                position: function ($elem) {
                    return parseInt($elem.attr("data-position"), 10)
                },
                rating: function ($elem) {
                    return parseFloat($elem.attr("data-rating"))
                },
                price: function ($elem) {
                    return parseFloat($elem.find(".price:last").text().replace("$", "").replace(",", "."))
                },
                dateAdded: function ($elem) {
                    return Date.parse($elem.attr("data-date-added"))
                }
            }
        });
        $isotopmobile.isotope({
            itemSelector: "li",
            layoutMode: "masonry",
            masonry: {},
            resizable: false,
            sortBy: "position",
            sortAscending: true,
            getSortData: {
                position: function ($elem) {
                    return parseInt($elem.attr("data-position"),
                        10)
                },
                rating: function ($elem) {
                    return parseFloat($elem.attr("data-rating"))
                },
                price: function ($elem) {
                    return parseFloat($elem.find(".price:last").text().replace("$", "").replace(",", "."))
                },
                dateAdded: function ($elem) {
                    return Date.parse($elem.attr("data-date-added"))
                }
            }
        });
        var $optionSets = jQuery(".filters-by-category .option-set"),
            $optionLinks = $optionSets.find("a");
		
		$optionLinks.each(function () {var $this = $(this);
			 if ($this.hasClass("selected")) {
				 
            var $optionSet = $this.parents(".option-set");
            var options = {},
                key = $optionSet.attr("data-option-key"),
                value = $this.attr("data-option-value");
            value = value === "false" ? false : value;
            options[key] = value;
            if (key === "layoutMode" && typeof changeLayoutMode === "function") changeLayoutMode($this, options);
            else $isotop.isotope(options);

				 }
			
			})	
			
        $optionLinks.click(function () {
            var $this = $(this);
            if ($this.hasClass("selected")) return false;
            var $optionSet = $this.parents(".option-set");
            $optionSet.find(".selected").removeClass("selected");
            $this.addClass("selected");
            var options = {},
                key = $optionSet.attr("data-option-key"),
                value = $this.attr("data-option-value");
            value = value === "false" ? false : value;
            options[key] = value;
            if (key === "layoutMode" && typeof changeLayoutMode === "function") changeLayoutMode($this, options);
            else $isotop.isotope(options);
            return false
        });
        $(".sort-select").change(function (e, data) {
            $(".sort-select .value").html(data.html);
            if (data.value) {
                $isotop.isotope({
                    sortBy: data.value
                });
                $isotopmobile.isotope({
                    sortBy: data.value
                })
            }
        });
        $sortAscending.click(function (e) {
            if ($(this).parent().find(".sort-isotope").length >
                0) e.preventDefault();
            var $this = $(this);
            if ($this.hasClass("up")) {
                $isotop.isotope({
                    layoutMode: "masonry",
                    sortAscending: false
                });
                $sortAscending.removeClass("up").addClass("down")
            } else {
                $isotop.isotope({
                    layoutMode: "masonry",
                    sortAscending: true
                });
                $sortAscending.removeClass("down").addClass("up")
            }
        })
    }
    $(window).resize(function () {

        checkMenuOverlay();

        mainOwlSlider();
        if ($(".visible-xs").is(":visible")) $isotopmobile.isotope("reLayout");
        setTimeout(function () {
            $(".preview.hover-slide .preview-image").each(function () {
                var imageHeight = $(this).find("img").height();
                $(this).css({
                    "height": imageHeight
                })
            })
        }, 1000)
    })
});