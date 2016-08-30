(function(internal) {

  function variableReferenceValue(variableName, fragments) {
    var tokenStreamValue;
    // if (fragments.length == 0)
    //   tokenStreamValue = undefined;
    // else
      tokenStreamValue = new CSSTokenStreamValue(fragments);
    variableReference = new CSSVariableReferenceValue(variableName, tokenStreamValue);
    return variableReference;
  }

  function getVariableReferenceValue(string) {
    var temp = internal.parsing.consumeToken(/[^,]*/, string);
    console.log(temp, string);
    if (temp == null) {
      return variableReferenceValue(string.substr(1, string.length - 2), []);
    } else {
      console.log("found comma in ", string);
      console.log(temp);
      return variableReferenceValue(temp[0].substr(1), stringToFragments(temp[1].substr(1, temp[1].length - 2)));
    }
  }

  function stringToFragments(string) {
    if (string === '') return [];
    var fragments = [];
    while (string !== '') {
      // var temp = internal.parsing.consumeToken(/[^\(]*/, string);
      var temp = internal.parsing.consumeToken(/.*?(?=var)/, string);
      console.log("after find var", temp);
      if (temp == null) {
        if (string.startsWith("var(")) {
          fragments.push(getVariableReferenceValue(string.substr(4, string.length - 5)));
        } else {
          fragments.push(string);
        }
        string = '';
      } else {
        fragments.push(temp[0]);
        string = temp[1];
        string = string.substr(3);
        temp = internal.parsing.consumeParenthesised(getVariableReferenceValue, string);
        fragments.push(temp[0]);
        string = temp[1];
      }
    }
    return fragments;
  }

  function consumeTokenStreamValue(string) {
    if (string.search(/var/i) >= 0) {
      return [new CSSTokenStreamValue(stringToFragments(string))];
    }
    return null;
  }
  internal.parsing.consumeTokenStreamValue = consumeTokenStreamValue;
})(typedOM.internal);
