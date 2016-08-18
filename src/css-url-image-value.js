(function(internal, scope) {

  CSSURLImageValue.from = function(url) {
    var temp = url.substring(5);
    var clean = temp.substr(0, temp.length - 2);
    return new CSSURLImageValue(clean);
  };

  function CSSURLImageValue(url) {
    if (typeof(url) != 'string') {
      throw new TypeError("URL must be a string");
    }
    var urlImageValue = this;
    this._image = new Image();
    this._image.src = url;
    this.state = "unloaded";
    this.intrinsicWidth = null;
    this.intrinsicHeight = null;
    this.intrinsicRatio = null;
    this.url = url;
    this.cssText = 'url(' + this.url + ')';
    // calculate(this);
    this._image.onload = function() { calculate(urlImageValue); };
    this._image.onprogress = function() { progress(urlImageValue); };
    this._image.onerror = function() { error(urlImageValue); };


    // loading image
  }

  internal.inherit(CSSURLImageValue, CSSImageValue);

  function progress(urlImageValue) {
    urlImageValue.state = "loading";
  }

  function error(urlImageValue) {
    urlImageValue.state = "error";
  }

  function calculate(urlImageValue) {
    urlImageValue.state = "loaded";
    urlImageValue.intrinsicWidth = urlImageValue._image.naturalWidth;
    urlImageValue.intrinsicHeight = urlImageValue._image.naturalHeight;
    if (urlImageValue.intrinsicHeight != 0)
      urlImageValue.intrinsicRatio = urlImageValue.intrinsicWidth / urlImageValue.intrinsicHeight;
  }

  scope.CSSURLImageValue = CSSURLImageValue;

})(typedOM.internal, window);
