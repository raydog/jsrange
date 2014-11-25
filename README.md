jsrange
=======

An extremely simple range lib, for expanding "1..3,5..7"-like strings into [1, 2, 3, 5, 6, 7]

### Install

```sh
npm install --save jsrange
```

### Examples

```javascript
var range = require('jsrange');

// Every even number from 2 to 100:
range("2 .. 100 x 2");

// -20 to 30, stepping by 3 each time:
range("-20 .. 30 x 3");

// 2, 10, and 11:
range("2, 10, 11");

// 20 down to 12, then 12 back to 20 by 3s:
range("20 .. 12, 12 .. 20 x 3");
```

### Specifics on Syntax

- You have any number of `,`-deliminated sections. Each section will be represented in the result, in order.
- Each section is of one of these types:
    - A single value.<br>(`"5"` or `"-20"`.)
    - A start and an end value separated by `..`.<br>(`"1..42"` or `"7 .. -13"`)
    - A start and an end value separated by `..`, with a positive step value after a `x`.<br>(`"1 .. 10 x 3"` or `"22 .. -13 x 5"`)

### License
MIT
