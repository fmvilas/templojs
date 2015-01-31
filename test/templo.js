/*global describe,beforeEach,it*/

/*
 * TODO: Missing tests for types and default types.
 */
'use strict';

var assert = require('assert'),
    templo = require('../lib/templo.js'),
    user_show_template,
    user_create_template,
    params_template,
    user_data,
    result;

describe('TemploJS', function() {
  beforeEach(function() {
    user_show_template = {
      id:         { type: 'string', required: true },
      email:      { type: 'string', required: true },
      name:       { type: 'string', required: true },
      avatar_url: { type: 'string', default: '' },
      created_at: { type: 'string', required: true },
      updated_at: { type: 'string', required: true }
    };


    user_create_template = {
      email:      { type: 'string', required: true },
      password:   { type: 'string', required: true },
      name:       { type: 'string', required: true },
      avatar_url: { type: 'string', default: null },
      created_at: { type: 'string', read_only: true, default: 'timestamp' },
      updated_at: { type: 'string', read_only: true, default: 'timestamp' }
    };

    params_template = {
      visibility: { type: 'string' },
      ownership:  { type: 'string' }
    };

    user_data = {
      email: 'fake@email.com',
      name: 'Fake'
    };
  });

  describe('#render', function() {
    it('should return an object filtered by the template', function() {
      user_data.id = '1';
      user_data.created_at = '2014-10-24T20:39:12Z';
      user_data.updated_at = '2014-10-25T21:09:02Z';
      user_data.it_should_not_be_here = 'It shouldnt be here';

      result = templo.render(user_show_template, user_data);

      assert.strictEqual(result.status, 'ok');
      assert.strictEqual(result.output.id, user_data.id);
      assert.strictEqual(result.output.name, user_data.name);
      assert.strictEqual(result.output.avatar_url, user_show_template.avatar_url.default);
      assert.strictEqual(result.output.email, user_data.email);
      assert.strictEqual(result.output.created_at, user_data.created_at);
      assert.strictEqual(result.output.updated_at, user_data.updated_at);
      assert.strictEqual(result.output.it_should_not_be_here, undefined);
    });

    it('should warn about read only params', function() {
      user_data.password = 'password here';
      user_data.created_at = '2014-10-24T20:39:12Z';
      user_data.updated_at = '2014-10-25T21:09:02Z';
      user_data.it_should_not_be_here = 'It shouldnt be here but will not be warned';

      result = templo.render(user_create_template, user_data);

      assert.strictEqual(result.status, 'ok');
      assert.strictEqual(typeof result.warnings, 'object');
      assert.strictEqual(result.warnings.created_at.message, 'Can\'t modify read only attribute <created_at>.');
      assert.strictEqual(result.warnings.updated_at.message, 'Can\'t modify read only attribute <updated_at>.');
    });

    it('should fail if a required attribute is not passed', function() {
      result = templo.render(user_create_template, user_data);

      assert.strictEqual(result.status, 'error');
      assert.strictEqual(result.errors.password.message, 'Missing required attribute <password>.');
    });

    it('should respond with warnings as false if there is no warnings', function() {
      result = templo.render(user_create_template, user_data);

      assert.strictEqual(result.warnings, false);
    });

    it('should ignore non-required attributes that does not have default value nor passed data', function() {
      result = templo.render(params_template, {});

      assert.strictEqual(result.status, 'ok');
      assert.strictEqual(result.output.hasOwnProperty('visibility'), false);
      assert.strictEqual(result.output.hasOwnProperty('ownership'), false);
    });
  });
});
