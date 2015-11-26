// Copyright 2015 Google Inc. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
//     You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//     See the License for the specific language governing permissions and
// limitations under the License.

(function(shared, scope, testing) {

  /**
   * CalcLength(dictionary)
   * TODO: CalcLength(cssString)
   */
  function CalcLength(dictionary) {
    if (typeof dictionary != 'object') {
      throw(new TypeError('CalcLength must be passed a dictionary object'));
    }

    // NOTE: Does not check dictionary for invalid fields.
    for (var type in LengthValue.LengthType) {
      var value = dictionary[type];
      if (typeof value == 'number') {
        this[type] = value;
      } else if (typeof value == 'string') {
        var nValue = Number.parseFloat(value);
        if (!isNaN(nValue)) {
          this[type] = nValue;
        } else {
          throw(new TypeError('Value of each field must be null, a number or a numeric string.'));
        }
      } else if (value == undefined || value == null) {
        this[type] = null;
      } else {
        throw(new TypeError('Value of each field must be null, a number or a numeric string.'));
      }
    }
  }

  CalcLength.prototype = shared.LengthValue.prototype;

  scope.CalcLength = CalcLength;
  if (TYPED_OM_TESTING)
    testing.CalcLength = CalcLength;

})(baseClasses, window, typedOMTesting);
