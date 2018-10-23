;(function( $ ) {

    "use strict";

    var methods = {

        init: function ( options ) {

            var o = $.extend({
                preloadCssImages: true,
                cssImageSelectors: ["backgroundImage", "listStyleImage", "borderImage", "borderCornerImage", "cursor"],
                onSuccess: function ( number ) {},
                onEach: function ( number, loaded ) {}
            }, options );

            return this.each(function() {

                var i,
                    $this = $(this),
                    images = [],
                    loaded = 0,
                    number = 0;

                var iLoad = function( ) {
                    loaded++;
                    o.onEach( number, loaded );
                    if ( number === loaded ) {
                        o.onSuccess( number );
                    }
                };

                $this.find("img").each(function () {

                    if( this.complete ) {
                        return true;
                    }

                    images.push( this.src );

                    return true;
                });

                if( o.preloadCssImages ) {

                    var res,
                        pattern = /url\s*\(\s*["']?\s*(.*?)\s*["']?\s*\)\s*/g;

                    $this.find("*").addBack().each(function () {

                        var prop,
                            $img = $(this);

                        for( i = 0; i < o.cssImageSelectors.length; i++ ) {

                            prop = $img.css( o.cssImageSelectors[i] );
                            if( prop ) {
                                while ( ( res = pattern.exec(prop) ) != null) {
                                    images.push( res[1] );
                                }
                            }

                        }

                    });
                }

                number = images.length;

                if( ! images.length ) {
                    o.onSuccess( number );
                } else {
                    for ( i = 0; i < images.length; i++ ) {
                        $("<img src='" + images[0] + "' alt=''>").load( iLoad ).error( iLoad );
                    }
                }

            });
        },

        destroy : function( ) {

            return this.each(function() {

                var $this = $(this);

                $this.removeData('rw-slider');

            } );

        }
    };

    $.fn.rwPreloader = function ( method ) {

        if ( methods[method] ) {
            return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method with name "' +  method + '" not issue for jQuery.rwPreloader' );
            return this;
        }

    };

})( jQuery );