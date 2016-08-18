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
    var urlImageValue = new CSSURLImageValue('https://codereview.chromium.org/static/chromium-24.png');
    inlineStyleMap.set("background-image", urlImageValue);
    assert.strictEqual(urlImageValue.intrinsicWidth, 24);
    assert.strictEqual(urlImageValue.intrinsicHeight, 24);
    assert.strictEqual(urlImageValue.intrinsicRatio, 1);
  });
});
