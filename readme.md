Restfulizer
==========

A jQuery plugin to transform `<a>` links into restful POST/PUT/UPDATE requests

## How to use

__0:__ Load jQuery

__1:__ Load `restfulizer.js`

```html
 <script type="text/javascript" src="restfulizer.js"></script>
```

__2:__ Add appropriate `data-method` attribute to your `<a>` links

```html
<a href="/user/3" data-method="post">POST</a>
<a href="/user/3" data-method="put">PUT</a>
<a href="/user/3" data-method="delete">DELETE</a>
<a href="/user/3" data-method="delete" data-confirm="false">sudo DELETE</a>
```

__3__  Run `restfulize()`
```javascript
$('a').restfulize();
```

## Available options
```javascript
$("a").restfulize({
    post_query: true,            // Send query vars as part of POST body (default `true`)
    method: "post",              // Request method, GET/POST/PUT/DELETE (default `POST`)
    action: "/endpoint?var=val", // If using href attribute isn't an option
    confirm: 'Are you sure?'     // Prompt text to confirm DELETE. Set to "false" to disable
});
```

# Laravel CSRF
Make sure your `<head>` contains csrf-token meta tag, it will get fwd as `_token` var in POST
```html
<meta name="csrf-token" content="{{ csrf_token() }}">
```

# Examples
See `example.html` for examples