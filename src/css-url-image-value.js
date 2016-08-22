(function(internal, scope) {

  CSSURLImageValue.from = function(url) {
    // need to remove 'url("' and '")'
    var temp = url.substring(5);
    var clean = temp.substr(0, temp.length - 2);
    return new CSSURLImageValue(clean);
  };

  var imagesEventsHandler = {
    onload: function() {
      this.state = "loaded";
      this.intrinsicWidth = this._image.naturalWidth;
      this.intrinsicHeight = this._image.naturalHeight;
      if (this.intrinsicHeight != 0)
        this.intrinsicRatio = this.intrinsicWidth / this.intrinsicHeight;
    },
    onerror: function() {
      this.state = "error";
    },
    onprogress: function() {
      this.state = "loading";
    }
  };

  function CSSURLImageValue(url) {
    if (typeof(url) != 'string') {
      throw new TypeError("URL must be a string");
    }
    this._image = new Image();
    this._image.src = url;
    this.state = "unloaded";
    this.intrinsicWidth = null;
    this.intrinsicHeight = null;
    this.intrinsicRatio = null;
    this.url = url;
    this.cssText = 'url(' + this.url + ')';

    this._image.onload = imagesEventsHandler.onload.bind(this);
    this._image.onprogress = imagesEventsHandler.onprogress.bind(this);
    this._image.onerror = imagesEventsHandler.onerror.bind(this);
  }

  internal.inherit(CSSURLImageValue, CSSImageValue);

  scope.CSSURLImageValue = CSSURLImageValue;

})(typedOM.internal, window);
