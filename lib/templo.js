/***

 _______ _______ _______  _____          _____    _____ _______
    |    |______ |  |  | |_____] |      |     |     |   |______
    |    |______ |  |  | |       |_____ |_____| . __|   ______|

     A lightweight module to define templates for JSON data.
                https://github.com/fmvilas/templo

            Copyright (c) 2015 Francisco Méndez Vilas
                 Licensed under the MIT license.

***/

'use strict';

var moment = require('moment');

function getDefaultValue(item) {
  var default_value = item.default,
      result;

  if( default_value === 'timestamp' ) {
    default_value = moment().utc().format();
  } else if( typeof default_value === 'function' ) {
    result = default_value.call(default_value);
    default_value = result !== undefined ? result : null;
  } else if( default_value === undefined ) {
    default_value = null;
  }

  return default_value;
}

function getValue(template, key, data) {
  var default_value = template[key].default,
      ret;

  switch(template[key].type) {
    case 'float':
      ret = parseFloat(data[key]);
      break;
    case 'number':
    case 'int':
      ret = parseInt(data[key], 10);
      break;
    case 'string':
      ret = '' + data[key];
      break;
    default:
      ret = data[key];
  }

  // If there is a specified default value and data doesn't contain
  // anything for this key, then the value should be the default.
  // Otherwise it should be null.
  if( default_value !== undefined && data[key] === undefined ) {
    ret = getDefaultValue(template[key]);
  } else {
    ret = null;
  }

  return ret;
}

exports.render = function(template, data) {
  if( typeof template !== 'object' || typeof template !== 'object' ) {
    throw new Error('Bad call to Templo.render: template and data parameters are required and must be objects.');
  }

  var key,
      output = {},
      attribute,
      template_has_key,
      data_has_key,
      errors;

  function logError(key, message) {
    errors = errors || {};
    errors[key] = {
      message: message
    };
  }

  for(key in template) {
    template_has_key = template.hasOwnProperty(key);
    data_has_key = data.hasOwnProperty(key);

    if( template_has_key ) {
      attribute = template[key];

      if( !data_has_key ) {
        if( attribute.required !== true && attribute.default === undefined ) {
          logError(key, 'Missing default value for attribute <' + key + '>.');
        } else if( attribute.required === true ) {
          logError(key, 'Missing required attribute <' + key + '>.');
        } else if( attribute.default !== undefined ) {
          output[key] = getValue(template, key, data);
        }
      } else {
        if( attribute.read_only === true ) {
          logError(key, 'Can\'t modify read only attribute <' + key + '>.');
        } else {
          output[key] = getValue(template, key, data);
        }
      }
    }
  }

  if( !errors ) {
    return { status: 'ok', result: output };
  } else {
    return { status: 'error', errors: errors };
  }
};
