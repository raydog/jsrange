var SECTION_RE    = "\\s*-?\\d+\\s*(\\.\\.\\s*-?\\d+\\s*(x\\s*\\d+)?)?\\s*"
  , VALIDATION_RE = new RegExp("^" + SECTION_RE + "(," + SECTION_RE + ")*$");


/**
 * Will expand a range string into an array of numbers.
 *
 * Syntax: (Kinda EBNF)
 *   RANGE_STR    = SECTION { "," SECTION }
 *   SECTION      = SECT_SINGLE | SECT_RANGE | SECT_STEP
 *   SECT_SINGLE  = WS INT WS
 *   SECT_RANGE   = WS INT WS ".." WS INT WS
 *   SECT_STEP    = WS INT WS ".." WS INT WS "x" WS POSITIVE_INT WS
 *   INT          = [ "-" ] POSITIVE_INT
 *   POSITIVE_INT = DIGIT { DIGIT }
 *   DIGIT        = "0" | "1" | ... | "9"
 *   WS           = { " " | "\n" | "\t" | ... }
 * 
 * Examples:
 *   "-3..3"       --> [-3, -2, -1, 0, 1, 2, 3]
 *   "1..10x2"     --> [1, 3, 5, 7, 9]
 *   "1,2,7,8"     --> [1, 2, 7, 8]
 *   "1..3,6,5..2" --> [1, 2, 3, 6, 5, 4, 3, 2]
 *   
 * @param  {String} str The range format string. (See above for syntax + examples.)
 * @return {Array}      Array of numbers. Array is empty if there was a problem.
 */
module.exports = function _range(str) {
  // Validation:
  if (typeof str !== 'string')  { return []; }
  if (!VALIDATION_RE.test(str)) { return []; }

  return str
    .split(',')
    .map(function (section) {
      
      if (section.indexOf('..') < 0) {
        // Simple single-number segment:
        return [ parseInt(_trim(section), 10) ];

      } else {
        // start/end segment w/ optional step:
        var parsed = section.split('x').map(_trim)
          , mult   = parseInt(parsed[1], 10) || 1
          , ranges = parsed[0].split('..').map(_trim)
          , left   = parseInt(ranges[0], 10)
          , right  = parseInt(ranges[1], 10)
          , sign   = (left < right) ? 1 : -1
          , step   = sign * mult
          , out    = [];

        while ((sign * left) <= (sign * right)) {
          out.push(left);
          left += step;
        }
        return out;
      }
    })
    .reduce(function (a, b) { return a.concat(b); });
};


// Useful for .map()'s:
function _trim(str) {
  return str.trim();
}
