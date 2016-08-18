(function(internal, scope) {

  function CSSURLImageValue(url) {
    this._image = new Image();
    this._image.src = url;
    this._image.addEventListener("load", calculate(this));
    this._url = url;
    this.cssText = 'url(' + this._url + ')';

    CSSImageValue.call(this, this._image);
  }

  internal.inherit(CSSURLImageValue, CSSImageValue);

  function calculate(urlImageValue) {
    urlImageValue.intrinsicWidth = urlImageValue._image.naturalWidth;
    urlImageValue.intrinsicHeight = urlImageValue._image.naturalHeight;
    urlImageValue.intrinsicRatio = urlImageValue.intrinsicWidth / urlImageValue.intrinsicHeight;
  }

  scope.CSSURLImageValue = CSSURLImageValue;

})(typedOM.internal, window);
