(function(internal, scope) {

  function CSSURLImageValue(url) {
    this._image = new Image();
    this._image.src = url;
    this._image.addEventListener("load", calculate);
    this.cssText = "url(" + url + ")";

    CSSImageValue.call(this, this._image);
  }

  internal.inherit(CSSURLImageValue, CSSImageValue);

  function calculate() {
    this.intrinsicWidth = this._image.naturalWidth;
    this.intrinsicHeight = this._image.naturalHeight;
    this.intrinsicRatio = this.intrinsicWidth / this.intrinsicHeight;
  }

  scope.CSSURLImageValue = CSSURLImageValue;

})(typedOM.internal, window);
