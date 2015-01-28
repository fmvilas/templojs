#  [![Build Status](https://secure.travis-ci.org/fmvilas/templojs.png?branch=master)](http://travis-ci.org/fmvilas/templojs)

> A lightweight module to define templates for JSON data.


## Getting Started

Install the module with: `npm install templo`

```js
var templo = require('templo'),
    tpl = {
        id:         { type: 'number' },
        name:       { type: 'string' },
        avatar_url: { type: 'string', default: null }
    };

templo.parse(tpl, {
    id: 1,
    name: 'Fran'
});
```


## Documentation

_(Coming soon)_


## Examples

_(Coming soon)_


## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com).


## License

Copyright (c) 2014 Francisco Méndez Vilas  
Licensed under the MIT license.


[![Analytics](https://ga-beacon.appspot.com/UA-59082921-1/templojs/readme)](https://github.com/fmvilas/templojs)
