;(function( $ ){

    "use strict";

    var RwSlider = function( $element, options ) {

        var
            self = this,
            timer = null,
            stoped = true,
            settings = {
                first: 1,
                swipe: false,
                interval: 5000,
                duration: 2000,
                startDelay: 1000,
                moveIndex: 0.4,
                auto: true,
                preload: true,
                fullscreen: true,
                maxRatio: 2.2,
                controls: true,
                scaleFont: true,
                prev: ".prev",
                next: ".next"
            };

        this.$el = $element;
        this.$list = $( "ul", $element );
        this.$items = $( "li", $element );
        this.$layers = $( "li > *", $element );
        this.settings = $.extend( settings, options );
        this.current = this.settings.first;
        this.successStack = null;
        this.successNumber = 0;
        this.defaultFontSize = this.$el.css("font-size");
        this.started = $.Deferred();

        this.start = function ( ) {
            if ( !this.settings.auto ) {
                return this;
            }
            stoped = false;
            if ( this.successStack && this.successStack.push ) {
                if ( this.successStack.length < 1 ) {
                    this.successStack.push(function() {
                        self.play();
                    });
                }
            } else {
                this.play();
            }

            return this;
        };

        this.play = function ( ) {
            if( stoped ) {
                return this;
            }
            if( timer ) {
                clearTimeout( timer );
            }
            timer = setTimeout(function() {
                self.next(function() {
                    self.play();
                });
            }, this.settings.interval );

            return this;
        };

        this.stop = function( ) {
            if ( !this.settings.auto ) {
                return this;
            }
            stoped = true;
            if( timer ) {
                clearTimeout( timer );
            }
            return this;
        };

        this.init = function(){

            var s = this.settings;

            $( s.prev + ", " + s.next).hide();

            this.setOptions();

            this.$items.hide();

            if( s.preload && $.fn.rwPreloader ) {

                var tmpl = $("<li class='rw-slider-preload'>0</li>");

                this.$list
                    .append( tmpl )
                    .rwPreloader({
                        onEach: function ( number, loaded ) {
                            tmpl.text( Math.floor( loaded / number * 100 ) );
                        },
                        onSuccess: function ( number ) {
                            tmpl.remove();
                            $( s.prev + ", " + s.next).show();
                            self.$items.show();

                            self.started.done( function() {
                                self.goto( self.current, function() {
                                    self.start();
                                } );
                                //self.start();
                            } );
                        }
                    });
            } else {
                $( s.prev + ", " + s.next).show();
                self.$items.show();
                self.goto( self.current, function() {
                    self.start();
                } );
            }

            window.onresize = function() {

                self.stop();
                self.successStack = null;
                self.successNumber = 0;

                self.$items.stop( true, true );
                self.$layers.stop( true, true ).find( "img" ).stop( true, true );

                self.setOptions();

                timer = setTimeout(function() {

                    self.start();

                }, 2000 );

            };

            if ( s.swipe ) {
                Hammer( self.$list.get( 0 ) ).on( "swipeleft", function( event ) {
                    if ( self.successNumber < self.$items.length ) {
                        self.prev();
                    }
                }).on( "swiperight", function( event ) {
                    if ( self.successNumber < self.$items.length ) {
                        self.next();
                    }
                });
            }

            if ( s.controls ) {

                $( s.prev ).on( "click.rwslider", function ( e ) {
                    e.preventDefault();
                    e.stopPropagation();
                    if ( self.successNumber < self.$items.length ) {
                        self.prev();
                    }
                });

                $( s.next ).on( "click.rwslider", function ( e ) {
                    e.preventDefault();
                    if ( self.successNumber < self.$items.length ) {
                        self.next();
                    }
                });

                $( s.prev + ", " + s.next ).on( "mouseenter.rwslider", function ( e ) {
                    e.preventDefault();
                    e.stopPropagation();
                    self.stop();
                });

                $( s.prev + ", " + s.next ).on( "mouseleave.rwslider", function ( e ) {
                    e.preventDefault();
                    e.stopPropagation();
                    self.start();
                });
            }

        };

        this.init();

        return this;
    };

    RwSlider.prototype.setOptions = function () {

        var self = this,
            s = this.settings;

        this.$layers.css( "-webkit-transform", "translate3d(0,0,0)" );

        var wHeight = $( window ).height(),
            wWidth = $( window ).width(),
            wRatio = wWidth / wHeight;

        if ( s.maxRatio < wRatio ) {
            wHeight = Math.round( wWidth / s.maxRatio );
            wRatio = wWidth / wHeight;
        }

        if( s.fullscreen ) {
            this.$list.css({
                height : wHeight,
                width : "100%",
                overflow : "hidden"
            });
        }

        if ( s.scaleFont && this.defaultFontSize ) {
            var size = parseInt( this.defaultFontSize, 10),
                cfx = wWidth / 1170;

            if ( cfx < 0.4 ) {
               cfx = 0.4;
            }
            if ( size && cfx < 1 ) {
                size = Math.round( cfx * size ) + "px";
            } else {
                size = this.defaultFontSize;
            }
            this.$el.css( "font-size", size );
        }

        this.$layers.each(function( idx ) {

            var w, h, r, $img, $innerLayer,
                $this = $( this ),
                data = $this.attr( "data-rw-slider" ),
                img = new Image();

            if( !data && $this.is( "a" ) ) {

                $innerLayer = $this.children( ":first" );
                data = $innerLayer.attr( "data-rw-slider" );

            }

            if ( data ) {

                data = data.replace( /;/g, ",").replace( /\s+$/g, "").replace(/;$/g,"");
                eval( "data = {" + data + "};" );

                if ( data.main && $this.is( "img" ) ) {
                    $img = $this;
                    $this.parent().data( "rw-slider", $img );
                } else if ( data.main && $innerLayer.is( "img" ) ) {

                    $img = $innerLayer;
                    $this.parent().data( "rw-slider", $img );
                    $this.addClass( "rw-slider-image-link" );
                    $img.css( "-webkit-transform", "translate3d(0,0,0)" );
                }

            } else if ( $this.is( "img" ) ) {
                $img = $this;
            }

            if ( $img ) {

                img.onload = function() {

                    w = img.width || $img.width();
                    h = img.height || $img.height();
                    r = w / h;

                    if( s.fullscreen ) {

                        if ( r <= wRatio ) {
                            $img.css({
                                width: "100%",
                                height: "",
                                left: 0,
                                top: 0
                            });
                        } else {
                            $img.css({
                                height: "100%",
                                width: "",
                                left: "-" + Math.round( ( wHeight * r - wWidth ) / 2 ) + "px",
                                top: 0
                            });
                        }
                    }

                    if ( data && data.move ) {
                        var duration, t = ( wWidth / r ) - wHeight, rd = wRatio - r;

                        if ( rd > s.moveIndex ) {
                            duration = Math.round( rd * 7000 );
                            data.move = {
                                top: "-" + t + "px",
                                duration: duration
                            };
                        } else {
                            data.move = false;
                        }

                    }

                    if ( data && data.scale ) {

                        if ( r <= wRatio ) {
                            // width
                            data.scale = {
                                prop1: "width",
                                value1: "110%",
                                prop2: "left",
                                value2: - Math.round( wWidth * 0.05 ) + "px",
                                duration: 5000
                            };
                        } else {
                            // height
                            data.scale = {
                                prop1: "height",
                                value1: "105%",
                                prop2: "top",
                                value2: - Math.round( wHeight * 0.025 ) + "px",
                                duration: 1000
                            };
                        }
                        data.scale = false;

                    }

                    if ( data ) {

                        if ( $innerLayer && $innerLayer.is( "img" ) ) {
                            $img.data( "rw-slider", data );
                        } else {
                            $this.data( "rw-slider", data );
                        }
                    }

                    if ( idx === self.current - 1 ) {
                        self.started.resolve();
                    }

                };

                img.src = $img.attr("src");

                return this;
            }

            if ( data ) {

                if ( $innerLayer && $innerLayer.is( "img" ) ) {
                    $img.data( "rw-slider", data );
                } else {
                    $this.data( "rw-slider", data );
                }
            }

            return this;

        });

    };

    RwSlider.prototype.goto = function ( cN, onSuccess ) {

        var self = this,
            n = cN,
            $this = this.$items.eq( n - 1 );

        if ( n > this.$items.length ) {
            n = 1;
        } else if ( n < 1 ) {
            n = this.$items.length;
        }

        this.successStack = [];
        this.successNumber++;

        if ( this.current !== n ) {
            $this.hide().appendTo( this.$list ).fadeIn( this.settings.duration );
            self.fx( $this, this.settings.duration, onSuccess );
        } else {

            $this.appendTo( this.$list );
            self.fx( $this, this.settings.startDelay, onSuccess );
        }

        self.current = n;

        return this;
    };

    RwSlider.prototype.fx = function ( $this, shift, onSuccess ) {

        var self = this,
            $img = $this.data( "rw-slider" ),
            data = $img && $img.data( "rw-slider" );

        var
            success = function(){
                if ( self.successNumber > 0 ) {
                    self.successNumber--;
                }

                if( self.successStack && self.successStack[0] && self.successNumber < 1 ) {
                    self.successStack[0]();
                }

                if( self.successNumber < 1 ) {
                    self.successStack = null;
                }

                if ( onSuccess ) {
                    onSuccess();
                }
            };

        if ( $img && data && data.move ) {

            $img.stop( true, true )
                .css({
                        top: 0
                    })
                .delay( shift )
                .animate( {
                        top: data.move.top
                    }, {
                        duration: data.move.duration,
                        easing: "easeInOutCubic",
                        always: success
                    });

        } else if ( $img && data && data.scale ) {

            var cssObj = {}, animCss = {}, animOpt = {};

            cssObj[ data.scale.prop2 ] = 0;
            animCss[ data.scale.prop1 ] = data.scale.value1;
            animCss[ data.scale.prop2 ] = data.scale.value2;

            animOpt = {
                duration: data.scale.duration,
                easing: "easeInOutCubic",
                always: success
            };

            $img.stop( true, true )
                .css( cssObj )
                .delay( shift )
                .animate( animCss, animOpt );

        } else {
            setTimeout(function() {
                success();
            }, shift);
        }

    };

    RwSlider.prototype.next = function ( onSuccess ) {

        var n = this.current + 1;

        if ( n > this.$items.length ) {
           n = 1;
        }

        this.goto( n, onSuccess );

    };

    RwSlider.prototype.prev = function ( onSuccess ) {

        var n = this.current - 1;

        if ( n < 1 ) {
            n = this.$items.length;
        }

        this.goto( n, onSuccess );

    };

    var methods = {

        init : function( options ) {

            return this.each(function(){

                var $this = $(this),
                    data = $this.data( "rw-slider" );

                if ( ! data ) {

                    $(this).data( "rw-slider", {
                        target : $this,
                        slider : new RwSlider( $this, options )
                    });

                }
            });
        }/*,

        destroy : function( ) {

            return this.each(function(){

                var $this = $(this);

                $this.removeData( "rw-slider" );

            });

        }*/
    };

    $.fn.rwSlider = function( method ) {

        if ( methods[method] ) {
            return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method with name "' +  method + '" not issue for jQuery.rwSlider' );
            return this;
        }

    };

})( jQuery );