(function(internal) {

  function variableReferenceValue(variableName, fragments) {
    var tokenStreamValue;
    if (fragments.length == 0) {
      tokenStreamValue = undefined;
    } else {
      tokenStreamValue = new CSSUnparsedValue(fragments);
    }
    variableReference = new CSSVariableReferenceValue(variableName, tokenStreamValue);
    return variableReference;
  }

  function getVariableReferenceValue(string) {
    var temp = internal.parsing.consumeToken(/.*?(?=\,)/, string);
    if (temp == null) {
      return variableReferenceValue(string.substr(1, string.length - 2), []);
    } else {
      return variableReferenceValue(temp[0].substr(1), stringToFragments(temp[1].substr(1, temp[1].length - 2)));
    }
  }

  function stringToFragments(string) {
    var fragments = [];
    while (string !== '') {
      var temp = internal.parsing.consumeToken(/.*?(?=var)/, string);
      if (temp == null) {
        if (string.startsWith("var(")) {
          fragments.push(getVariableReferenceValue(string.substr(4, string.length - 5)));
        } else {
          fragments.push(string);
        }
        string = '';
      } else {
        if (temp[0] !== '') {
          fragments.push(temp[0]);
        }
        string = temp[1];
        string = string.substr(3);
        temp = internal.parsing.consumeParenthesised(getVariableReferenceValue, string);
        fragments.push(temp[0]);
        string = temp[1];
      }
    }
    return fragments;
  }

  function consumeUnparsedValue(string) {
    if (string.search(/var/i) >= 0) {
      return [new CSSUnparsedValue(stringToFragments(string)), ""];
    }
    return null;
  }

  internal.parsing.consumeUnparsedValue = consumeUnparsedValue;
})(typedOM.internal);
