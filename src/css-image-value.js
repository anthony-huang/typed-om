(function(internal, scope) {

  function CSSImageValue(image) {
    if (!(image instanceof Image)) {
      throw new TypeError("image must be an Image object");
    }
    this._image = image;
  }

  CSSImageValue.prototype.intrinsicWidth = function() {
    if (this._image.naturalWidth == 0) return null;
    return this._image.naturalWidth;
  }

  CSSImageValue.prototype.intrinsicHeight = function() {
    if (this._image.naturalHeight == 0) return null;
    return this._image.naturalHeight;
  }

  CSSImageValue.prototype.intrinsicRatio = function() {
    if (intrinsicHeight() == 0) return null;
    return intrinsicWidth() / intrinsicHeight();
  }

  internal.inherit(CSSImageValue, CSSResourceValue);

  scope.CSSImageValue = CSSImageValue;

})(typedOM.internal, window);
