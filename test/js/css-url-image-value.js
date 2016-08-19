suite('CSSURLImageValue', function() {
  setup(function() {
    this.element = document.createElement('div');
    document.body.appendChild(this.element);
  });

  teardown(function() {
    document.body.removeChild(this.element);
  });

  test('CSSURLImageValue is a CSSURLImageValue, CSSImageValue, CSSResourceValue, and CSSStyleValue', function() {
    assert.instanceOf(new CSSURLImageValue('http://1x1px.me/FF4D00-0.8.png'), CSSURLImageValue);
    assert.instanceOf(new CSSURLImageValue('http://1x1px.me/FF4D00-0.8.png'), CSSImageValue);
    assert.instanceOf(new CSSURLImageValue('http://1x1px.me/FF4D00-0.8.png'), CSSResourceValue);
    assert.instanceOf(new CSSURLImageValue('http://1x1px.me/FF4D00-0.8.png'), CSSStyleValue);
  });

  test('CSSURLImageValue only accepts string', function() {
    assert.throw(function() { new CSSURLImageValue(); }, TypeError, "URL must be a string");
    assert.throw(function() { new CSSURLImageValue([]); }, TypeError, "URL must be a string");
    assert.throw(function() { new CSSURLImageValue(1); }, TypeError, "URL must be a string");
    assert.doesNotThrow(function() { new CSSURLImageValue(''); });
  });

  test('Can get intrinsic dimensions of CSSURLImageValue', function(done) {
    var inlineStyleMap = this.element.styleMap();
    var urlImageValue = new CSSURLImageValue('http://1x1px.me/FF4D00-0.8.png');
    assert.equal(urlImageValue.url, "http://1x1px.me/FF4D00-0.8.png");
    inlineStyleMap.set("background-image", urlImageValue);
    var image = new Image();
    image.src = urlImageValue.url;
    image.onload = function() {
      assert.strictEqual(urlImageValue.state, "loaded");
      assert.strictEqual(urlImageValue.intrinsicWidth, 1);
      assert.strictEqual(urlImageValue.intrinsicHeight, 1);
      assert.strictEqual(urlImageValue.intrinsicRatio, 1);
      done();
    };
  });

  test('Invalid image will have error state and null intrinsic dimensions', function(done) {
    var inlineStyleMap = this.element.styleMap();
    var urlImageValue = new CSSURLImageValue('http://localhost');
    assert.equal(urlImageValue.url, 'http://localhost');
    inlineStyleMap.set("background-image", urlImageValue);

    var image = new Image();
    image.src = urlImageValue.url;
    image.onerror = function() {
      assert.strictEqual(urlImageValue.state, "error");
      assert.strictEqual(urlImageValue.intrinsicWidth, null);
      assert.strictEqual(urlImageValue.intrinsicHeight, null);
      assert.strictEqual(urlImageValue.intrinsicRatio, null);
      done();
    };
  });

  test('Can get CSSURLImageValue from StyleMap', function() {
    var inlineStyleMap = this.element.styleMap();
    inlineStyleMap.set("background-image", new CSSURLImageValue('http://1x1px.me/FF4D00-0.8.png'));
    var urlImageValue = inlineStyleMap.get("background-image");
    assert.instanceOf(urlImageValue, CSSURLImageValue);
    assert.equal(urlImageValue.url, "http://1x1px.me/FF4D00-0.8.png".toLowerCase());
  });
});
