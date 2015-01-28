/*global describe,beforeEach,it*/
'use strict';

var assert = require('assert'),
  templo = require('../lib/json-tpl.js'),
  user_template,
  user_data;

describe('templo', function() {
  beforeEach(function() {
    user_template = {
      id:         { type: 'number' },
      name:       { type: 'string' },
      avatar_url: { type: 'string', required: true }
    };

    user_data = {
      id: 1,
      email: 'fake@email.com',
      name: 'Fake',
      created_at: '2014-10-24T20:39:12Z',
      updated_at: '2014-10-25T21:09:02Z'
    };
  });

  describe('#parse', function() {
    it('should return only id, name and avatar_url', function() {
      var output = templo.parse(user_template, user_data);

      console.dir(output);

      assert.strictEqual(output.id, 1);
      assert.strictEqual(output.name, 'Fake');
      assert.strictEqual(output.avatar_url, null);
      assert.strictEqual(output.email, undefined);
      assert.strictEqual(output.created_at, undefined);
      assert.strictEqual(output.updated_at, undefined);
    });
  });
});
