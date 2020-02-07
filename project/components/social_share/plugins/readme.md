### Usage

Script works with any HTML tags: `<a>` or `<div>` or `<button>` or other.

> So you can choose any and add required attributes `data-social`.

For example:

``` html
<!-- Create button with share to Twitter -->
<button data-social="twitter">Share this to Twitter</button>

<!-- Create link with share to Facebook -->
<a href="#" data-social="facebook">Share this to Facebook</a>

<!-- Create div container with share to LinkedIn -->
<div data-social="linkedin">Share this to LinkedIn</div>

<!-- Create icon from Fontello.com with share to Google+ -->
<i class="icon-google-plus" data-social="googleplus"></i>
```

By default, `goodshare.js` search this tags for get title, description and image (for some social networks):

``` html
<head>
  <title>Current page title</title>
  <meta name="description" content="Current page description.">
  <link rel="apple-touch-icon" href="http://example.com/path/to/image.png">
  ...
</head>
```

If you want to add different `url`, `title`, `description` and `image` to share element&nbsp;&mdash; use special `data-*` attributes:

* `data-url` redefines `document.location.href`
* `data-title` redefines `document.title`
* `data-description` redefines `meta[name="description"]`
* `data-image` redefines `link[rel="apple-touch-icon"]`

> Note: Please keep in mind, not all social networks support all of them data attributes!

To display share count, just add `data-counter` attribute to HTML element that will contain numbers. For example:

``` html
<!-- Create link with share to Facebook and counter -->
<a href="#" data-social="facebook">
  Share this to Facebook
  <span data-counter="facebook"></span>
</a>
```

> You also may put this attribute to any element.
