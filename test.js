var range = require('./index.js')
  , assert = require('assert');

describe("Range", function () {
  describe("rejects", function () {
    it("non-strings", function () {
      assert.deepEqual( range(null), [] );
      assert.deepEqual( range(NaN),  [] );
      assert.deepEqual( range({}),   [] );
      assert.deepEqual( range([]),   [] );
      assert.deepEqual( range(123),  [] );
    });

    it("invalid formats", function () {
      assert.deepEqual( range(""),              [] );
      assert.deepEqual( range("foobar"),        [] );
      assert.deepEqual( range("-1--10"),        [] );
      assert.deepEqual( range("12..14x"),       [] );
      assert.deepEqual( range("1,2,,3"),        [] );
      assert.deepEqual( range("1,2,3,1..2x-3"), [] );
    });
  });

  describe("works for", function () {
    it("single number", function () {
      assert.deepEqual( range("1"),     [1] );
      assert.deepEqual( range("10"),    [10] );
      assert.deepEqual( range("00003"), [3] );
      assert.deepEqual( range("90210"), [90210] );
    });

    it("negative number", function () {
      assert.deepEqual( range("-1"),     [-1] );
      assert.deepEqual( range("-123"),   [-123] );
      assert.deepEqual( range("-00000"), [0] );
    });

    it("multiple numbers", function () {
      assert.deepEqual( range("1,2,3"),    [1,2,3] );
      assert.deepEqual( range("10,2,-3"),  [10,2,-3] );
      assert.deepEqual( range("10,10,10"), [10,10,10] );
    });

    it("single range", function () {
      assert.deepEqual( range("1..3"),  [1,2,3] );
      assert.deepEqual( range("10..3"), [10,9,8,7,6,5,4,3] );
      assert.deepEqual( range("0..0"),  [0] );
    });

    it("single range, one negative", function () {
      assert.deepEqual( range("-1..3"), [-1,0,1,2,3] );
      assert.deepEqual( range("-5..0"), [-5,-4,-3,-2,-1,0] );
      assert.deepEqual( range("1..-3"), [1,0,-1,-2,-3] );
    });

    it("single range, both negative", function () {
      assert.deepEqual( range("-1..-3"),         [-1,-2,-3] );
      assert.deepEqual( range("-5..-1"),         [-5,-4,-3,-2,-1] );
      assert.deepEqual( range("-26379..-26379"), [-26379] );
    });

    it("multiple ranges", function () {
      assert.deepEqual( range("-1..-3,1..3"),    [-1,-2,-3,1,2,3] );
      assert.deepEqual( range("-5..0,4"),        [-5,-4,-3,-2,-1,0,4] );
      assert.deepEqual( range("2..2,2..2,2..2"), [2,2,2] );
    });

    it("single steps", function () {
      assert.deepEqual( range("1..5x2"),  [1,3,5] );
      assert.deepEqual( range("2..10x3"), [2,5,8] );
      assert.deepEqual( range("10..1x2"), [10,8,6,4,2] );
    });

    it("single step, one negative", function () {
      assert.deepEqual( range("-5..4x3"),  [-5,-2,1,4] );
      assert.deepEqual( range("5..-18x5"),  [5,0,-5,-10,-15] );
    });

    it("single step, both negative", function () {
      assert.deepEqual( range("-5..-13x2"),  [-5,-7,-9,-11,-13] );
      assert.deepEqual( range("-15..-7x1"),  [-15,-14,-13,-12,-11,-10,-9,-8,-7] );
    });

    it("multiple steps", function () {
      assert.deepEqual( range("-5..-13x2,1..8x3"),  [-5,-7,-9,-11,-13,1,4,7] );
    });

    it("ignores whitespace", function () {
      assert.deepEqual( range("  -5 .. -13 x   \t    2 , 1 .. \n   8 x 3      "),  [-5,-7,-9,-11,-13,1,4,7] );
    });
  });
});
