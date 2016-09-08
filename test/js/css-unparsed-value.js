suite('CSSUnparsedValue', function() {
  test("CSSUnparsedValue is a CSSUnparsedValue and CSSStyleValue", function() {
    assert.instanceOf(new CSSUnparsedValue(), CSSUnparsedValue);
    assert.instanceOf(new CSSUnparsedValue(), CSSStyleValue);
  });

  test('Values not an array throws', function() {
    assert.throw(function() { new CSSUnparsedValue(1); }, TypeError, 'CSSUnparsedValue should be an array of string or CSSVariableReferenceValue');
    assert.throw(function() { new CSSUnparsedValue("123"); }, TypeError, 'CSSUnparsedValue should be an array of string or CSSVariableReferenceValue');
    assert.throw(function() { new CSSUnparsedValue({ h:10, w:5, d:4, t:"5" });}, TypeError, 'CSSUnparsedValue should be an array of string or CSSVariableReferenceValue');
  });

  test('Values not an array of string or CSSVariableReferenceValue throws', function() {
    assert.throw(function() { new CSSUnparsedValue([1]); }, TypeError, "CSSUnparsedValue\'s elements should be string or CSSVariableReferenceValue");
    assert.throw(function() { new CSSUnparsedValue(["1234", "2342", 1]); }, TypeError, "CSSUnparsedValue\'s elements should be string or CSSVariableReferenceValue");
  });

  test('keys() must be an iterator of an array that stores the indices', function() {
    var values = ['test', '12345', new CSSVariableReferenceValue('var', new CSSUnparsedValue(['1'])), 'a2'];
    var unparsedValues = new CSSUnparsedValue(values);
    var keys = unparsedValues.keys();
    for (var i = 0; i < values.length; i++) {
      var temp = keys.next();
      assert.strictEqual(temp.done, false, '\'done\' should be false');
      assert.strictEqual(temp.value, i, '\'value\' should be equal to index');
    }
    var temp = keys.next();
    assert.strictEqual(temp.done, true, '\'done\' should be true at the end');
    assert.strictEqual(temp.value, undefined, '\'value\' should be undefined at the end');
  });

  test('values() must be an iterator of an array that stores the values', function() {
    var values = ['test', '12345', new CSSVariableReferenceValue('var', new CSSUnparsedValue(['1'])), 'a2'];
    var unparsedValues = new CSSUnparsedValue(values);
    var streamValues = unparsedValues.values();
    for (var i = 0; i < values.length; i++) {
      var temp = streamValues.next();
      assert.strictEqual(temp.done, false, '\'done\' should be false');
      assert.strictEqual(temp.value, values[i], '\'value\' should be equal to value at the constructor' + i);
    }
    var temp = streamValues.next();
    assert.strictEqual(temp.done, true, '\'done\' should be true at the end');
    assert.strictEqual(temp.value, undefined, '\'value\' should be undefined at the end');
  });

  test('entries() must be an iterator of an array that stores array of [index, value]', function() {
    var values = ['test', '12345', new CSSVariableReferenceValue('var', new CSSUnparsedValue(['1'])), 'a2'];
    var unparsedValues = new CSSUnparsedValue(values);
    var entries = unparsedValues.entries();
    for (var i = 0; i < values.length; i++) {
      var temp = entries.next();
      assert.strictEqual(temp.done, false, '\'done\' should be false');
      assert.strictEqual(temp.value.length, 2, '\'value\' should have length = 2');
      assert.strictEqual(temp.value[0], i, '\'value[0]\' should be equal to index');
      assert.strictEqual(temp.value[1], values[i], '\'value[1]\' should be equal to value');
    }
    var temp = entries.next();
    assert.strictEqual(temp.done, true, '\'done\' should be true at the end');
    assert.strictEqual(temp.value, undefined, '\'value\' should be undefined at the end');
  });

  test('Construction of CSSUnparsedValue is normalized using example from the spec', function() {
    document.documentElement.style.height = 'calc(42px + var(--foo, 15em) + var(--bar, var(--far) + 15px))';
    var values = document.documentElement.styleMap().get('height').values();
    assert.strictEqual(values.next().value, "calc(42px + ");
    var foo = values.next().value;
    assert.strictEqual(foo.variable, "--foo");
    assert.strictEqual(foo.fallback.values().next().value, " 15em");
    assert.strictEqual(values.next().value, " + ");
    var bar = values.next().value;
    assert.strictEqual(bar.variable, "--bar");
    var barFallback = bar.fallback.values();
    assert.strictEqual(barFallback.next().value, " ");
    var far = barFallback.next().value;
    assert.strictEqual(far.variable, "--far");
    assert.strictEqual(far.fallback, undefined);
    assert.strictEqual(barFallback.next().value, " + 15px");
    assert(barFallback.next().done);
    assert.strictEqual(values.next().value, ")");
    assert(values.next().done);
  });

  test('Has several values', function() {
    document.documentElement.style.height = 'var(--a, 10px, 20px, 30em)';
    var values = document.documentElement.styleMap().get('height').values();
    var a = values.next().value;
    assert.strictEqual(a.variable, "--a");
    var aFallback = a.fallback.values();
    assert.strictEqual(aFallback.next().value, " 10px, 20px, 30em");
    assert(aFallback.next().done);
    assert(values.next().done);
  });
});
