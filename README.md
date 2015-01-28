#  [![Build Status](https://secure.travis-ci.org/fmvilas/json-tpl.png?branch=master)](http://travis-ci.org/fmvilas/json-tpl)

> A module to define templates for JSON data.


## Getting Started

Install the module with: `npm install json-tpl`

```js
var jsonTpl = require('json-tpl'),
    tpl = {
        id:         { type: 'number' },
        name:       { type: 'string' },
        avatar_url: { type: 'string', default: null }
    };

jsonTpl.parse(tpl, {
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


[![Analytics](https://ga-beacon.appspot.com/UA-56319615-1/json-tpl/readme)](https://github.com/fmvilas/json-tpl)
