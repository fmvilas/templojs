/***

 _______ _______ _______  _____          _____    _____ _______
    |    |______ |  |  | |_____] |      |     |     |   |______
    |    |______ |  |  | |       |_____ |_____| . __|   ______|

     A lightweight module to define templates for JSON data.
               https://github.com/fmvilas/templojs

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

  if( data[key] === undefined ) {
    ret = default_value === undefined ? null : getDefaultValue(template[key]);
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
      errors,
      warnings;

  function logError(key, message) {
    errors = errors || {};
    errors[key] = {
      message: message
    };
  }

  function logWarning(key, message) {
    warnings = warnings || {};
    warnings[key] = {
      message: message
    };
  }

  for(key in template) {
    template_has_key = template.hasOwnProperty(key);
    data_has_key = data.hasOwnProperty(key);

    if( template_has_key ) {
      attribute = template[key];

      if( !data_has_key ) {
        if( attribute.required === true ) {
          logError(key, 'Missing required attribute <' + key + '>.');
        } else if( attribute.default !== undefined ) {
          output[key] = getValue(template, key, data);
        }
      } else {
        if( attribute.read_only === true ) {
          logWarning(key, 'Can\'t modify read only attribute <' + key + '>.');
        } else {
          output[key] = getValue(template, key, data);
        }
      }
    }
  }

  warnings = warnings || false;

  if( !errors ) {
    return { status: 'ok', output: output, warnings: warnings };
  } else {
    return { status: 'error', errors: errors, warnings: warnings };
  }
};
