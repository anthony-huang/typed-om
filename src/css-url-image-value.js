(function(internal, scope) {

  CSSURLImageValue.from = function(url) {
    // need to remove 'url("' and '")'
    var temp = url.substring(5);
    var clean = temp.substr(0, temp.length - 2);
    return new CSSURLImageValue(clean);
  };

  function CSSURLImageValue(url) {
    if (typeof(url) != 'string') {
      throw new TypeError("URL must be a string");
    }
    CSSImageValue.call(this, new Image());
    this._image.src = url;
    this.url = url;
    this.cssText = 'url(' + this.url + ')';
  }

  internal.inherit(CSSURLImageValue, CSSImageValue);

  scope.CSSURLImageValue = CSSURLImageValue;

})(typedOM.internal, window);
