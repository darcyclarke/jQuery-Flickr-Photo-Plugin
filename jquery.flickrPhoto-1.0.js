/**
 * Flickr Photo Plugin
 * @author Darcy Clarke
 *
 * Copyright (c) 2012 Darcy Clarke
 * Dual licensed under the MIT and GPL licenses.
 * http://darcyclarke.me/
 */

(function($){
    $.fn.flickrPhoto = function(options){
        var settings = $.extend({ 
            url : '',
            key : '',
            secret : ''
            }, options),
            id,
            method = 'flickr.photos.getInfo',
            format = 'json',
            collection = this;
        id = settings.url.match(/\/photos\/(.*)/)[1].split('/')[1];
        $.ajax({
            url: 'http://www.flickr.com/services/rest/?method='+method+'&format='+format+'&api_key='+settings.key,
            dataType: 'jsonp',
            data: {'photo_id':id},
            type: 'GET',
            jsonpCallback: 'jsonFlickrApi',
            success: function(data){
                collection.each(function(){
                    $(this).append('<img src="http://farm'+data.photo.farm+'.static.flickr.com/'+data.photo.server+'/'+id+'_'+data.photo.secret+'.jpg">'); 
                });
            }
        });
        return collection;
    };
})(jQuery);