// ==UserScript==
// @name        relink.us
// @namespace   cpuidle
// @include     http://www.relink.us/view.php?id=*
// @version     1.0
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @grant       GM_openInTab
// ==/UserScript==

//Avoid conflicts
this.$ = this.jQuery = jQuery.noConflict(true);
$(document).ready(function()
{
    // FOLDER
    var links = $('div#links a.submit');
    var tabs = window.location.href.indexOf('&tab=');
    
    if (tabs == -1) {
        links.each(function(i, l) {
            var href = $(l).attr("onclick");
            var file = href.substring(href.indexOf("getFile") + 9);
            file = file.substring(0, file.indexOf("'"));
            GM_openInTab('frame.php?' + file);
//            GM_openInTab(window.location.href + '&tab=' + i);
        });
        window.close();
    }
/*
    else {
        var index = window.location.href.substring(tabs + 5);
        console.log("index: "+index);
        links.each(function(i, l) {
            if (i == index) {
                $(l).click();
                window.close();
            }
        });

        return(false);
    }
*/
});
