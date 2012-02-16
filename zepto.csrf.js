/*
 * Zepto.CSRF is freely distributable under the MIT license.
 *
 * @version 1.1
 *
 * Copyright (c) 2011 Daniel Lacy (daniellacy.com)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
 * of the Software, and to permit persons to whom the Software is furnished to do
 * so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
**/
(function ($) {
    /*
     * Retrieves the value of a cookie by the given key.
     *
     * @param key, (string) Name of the cookie to retrieve.
     * @return (string) Value of the given key or null.
    **/
    function getCookie (key) {
        var result = (
                new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)')
            ).exec(document.cookie);

        return result ? result[1] : null;

    }

    /*
     * Checks if our host matches the request's host.
     *
     * @param url, (string) URL of request.
     * @return (boolean) Request is to origin.
    **/
    function sameOrigin (url) {
        // Url could be relative or scheme relative or absolute
        var sr_origin = '//' + document.location.host,
            origin = document.location.protocol + sr_origin;

        // Allow absolute or scheme relative URLs to same origin
        return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
            (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
            // or any other URL that isn't scheme relative or absolute i.e relative.
            !(/^(\/\/|http:|https:).*/.test(url));

    }

    /*
     * Extend Zepto's AJAX beforeSend method by setting an X-CSRFToken on any
     * 'unsafe' request methods.
    **/
    $.extend($.ajaxSettings, {
        beforeSend : function (xhr, settings) {console.log(settings);
            if (
                !(/^(GET|HEAD|OPTIONS|TRACE)$/.test(settings.type)) &&
                sameOrigin(settings.url)
            ) {
                xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
            }

        }
    });

})(Zepto);