// ==UserScript==
// @name        moviesource
// @namespace   cpuidle
// @include     http://moviesource.to/protection/folder*.html
// @include     http://www.moviesource.to/protection/folder*.html
// @include     http://hoerbuch.in/protection/folder*.html
// @include     http://www.hoerbuch.in/protection/folder*.html
// @include     http://uploaded.net/404
// @include     http://uploaded.net/file/*
// @include     ul.html
// @version     1.0
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @grant       GM_openInTab
// ==/UserScript==

// file not found
if (document.URL == 'http://uploaded.net/404') {
    window.close();
    return;
}

//Avoid conflicts
this.$ = this.jQuery = jQuery.noConflict(true);
$(document).ready(function()
{
    if (document.URL.match('/uploaded.net\/file/')) {
        // FILE
        if ($('button.prem').length) {
            $('button.prem').trigger('click');

            // close after 30 seconds
            setTimeout(function(){
                window.close();
            }, 1000*30);
        }
    }
    else {
        // FOLDER
        var button = $('input#submit');
        
        if (button.length) {
            // open regular download page
            button.parent().submit();
        }
        else {
            // add Load All button
            $('body').append('<input type="button" value="Load All" id="gmLoadAll" />');
            
            // load
            $('#gmLoadAll').click(function() {
                $('div.container a').each(function(i, el) {
//                if (i<1)
                    GM_openInTab($(el).attr("href"));
                });
                window.close();
                return(false);
            });
            
            $('#gmLoadAll').click();
        }
    }
});
