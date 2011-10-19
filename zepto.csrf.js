$.ajaxSettings.beforeSend = function (xhr, settings) {
    function getCookie (name) {
        var cookieValue,
            cookies,
            cookie,
            i;

        if (document.cookie && document.cookie != '') {
            cookies = document.cookie.split(';');

            for (i = 0; i < cookies.length; i++) {
                cookie = cookies[i].trim();

                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));

                    break;
                }
            }
        }

        return cookieValue;
    }

    function sameOrigin (url) {
        // url could be relative or scheme relative or absolute
        var sr_origin = '//' + document.location.host,
            origin = document.location.protocol + sr_origin;

        // Allow absolute or scheme relative URLs to same origin
        return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
            (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
            // or any other URL that isn't scheme relative or absolute i.e relative.
            !(/^(\/\/|http:|https:).*/.test(url));
    }

    if ( !(/^(GET|HEAD|OPTIONS|TRACE)$/.test(settings.type)) && sameOrigin(settings.url) ) {
        xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
    }
};