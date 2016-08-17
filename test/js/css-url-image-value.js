suite('CSSURLImageValue', function() {
  setup(function() {
    this.element = document.createElement('div');
    document.body.appendChild(this.element);
    // this.element.style.opacity = '0.5';
  });
  teardown(function() {
    document.body.removeChild(this.element);
  });

  test('CSSURLImageValue is a CSSURLImageValue, CSSImageValue, CSSResourceValue, and CSSStyleValue', function() {
    assert.instanceOf(new CSSURLImageValue('https://codereview.chromium.org/static/chromium-24.png'), CSSURLImageValue);
    assert.instanceOf(new CSSURLImageValue('https://codereview.chromium.org/static/chromium-24.png'), CSSImageValue);
    assert.instanceOf(new CSSURLImageValue('https://codereview.chromium.org/static/chromium-24.png'), CSSResourceValue);
    assert.instanceOf(new CSSURLImageValue('https://codereview.chromium.org/static/chromium-24.png'), CSSStyleValue);
  });

  test('Can get intrinsic dimensions of CSSURLImageValue', function() {
    var inlineStyleMap = this.element.styleMap();
    var bg = new CSSURLImageValue('https://codereview.chromium.org/static/chromium-24.png');
    // alert(bg._image.complete);
    alert(bg.cssText);
    inlineStyleMap.set("background-image", bg);
    alert(this.element.style['background-image']);
    assert.strictEqual(bg.intrinsicWidth, 24);
  });
});
