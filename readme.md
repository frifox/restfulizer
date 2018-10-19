Restfulizer
==========

A jQuery plugin to transform `<a>` links into restful POST/PUT/UPDATE requests

## How to use

__0:__ Load jQuery

__1:__ Load `restfulizer.js`

```html
 <script type="text/javascript" src="restfulizer.js"></script>
```

__2:__ Add appropriate `data-method` attribute to your `<a>` links and run `$.restfulizer()`

```html
<a href="/user/3" data-method="post">POST</a>
<a href="/user/3" data-method="put">PUT</a>
<a href="/user/3" data-method="delete">DELETE</a>
```

```javascript
$.restfulizer();

// which is effectively a shortcut for:

$('a').restfulize();
```

## Pass query vars as POST

```html
<a href="/campaign/3?status=paused" class="campaign-actions">Pause</a>
<a href="/campaign/3?status=active" class="campaign-actions">Resume</a>
```

```javascript
$(".campaign-actions").restfulize({
    query_to_post: true
});
```

## Available options
```javascript
$("#link").restfulize({
    query_to_post: true,        // Send query vars as part of POST body (default `false`)
    method: "put",              // Request method, GET/POST/PUT/DELETE (default `POST`)
    action: "/endpoint?var=val" // If using href attribute isn't an option
});
```

# Laravel CSRF
Make sure your `<head>` contains csrf-token meta tag, it will get fwd as `_token` var in POST
```html
<meta name="csrf-token" content="{{ csrf_token() }}">
```