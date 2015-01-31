#  [![Build Status](https://secure.travis-ci.org/fmvilas/templojs.png?branch=master)](http://travis-ci.org/fmvilas/templojs)

> A lightweight module to define templates for JSON data.


## Getting Started

Install the module with: `npm install templo`

```js
var templo = require('templo'),
    tpl = {
        id:         { type: 'string', required: true },
        name:       { type: 'string', required: true },
        avatar_url: { type: 'string', default: null },
        created_at: { type: 'string', read_only: true, default: 'timestamp' }
    };

templo.render(tpl, {
    id: 1,
    name: 'Fran',
    created_at: '2012-03-01'
});

// It will return something like this:

{
    status: 'ok',
    output: {
        id: '1',
        name: 'Fran',
        avatar_url: null,
        created_at: '2014-10-25T21:09:02Z'
    },
    warnings: {
        created_at: {
            message: "Can't modify read only attribute <created_at>."
        }
    }
}

```


## Documentation

Do you like TemploJS? You can contribute and help documenting it.


## Examples

Do you like TemploJS? You can contribute and add some examples on how to use it.


## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com).


## License

Copyright (c) 2014 Francisco Méndez Vilas  
Licensed under the MIT license.


[![Analytics](https://ga-beacon.appspot.com/UA-59082921-1/templojs/readme)](https://github.com/fmvilas/templojs)
