Zepto CSRF AJAX Plugin
=============

This plugin extends [Zepto.js](https://github.com/madrobby/zepto)' AJAX beforeSend method to set an `X-CSRFToken` header for any non-safe request methods.

This plugin is an adaptation of the jQuery CSRF ajaxSend functionality provided in the Django [Cross Site Request Forgery protection](https://docs.djangoproject.com/en/dev/ref/contrib/csrf/) documentation.


Usage
-----

Simply include the script in your site's templates, after zepto.min.js:

    <script type="text/javascript" src="zepto.csrf.min.js"></script>

That's it! If needed, any requests made through Zepto.AJAX will set an `X-CSRFToken` header.