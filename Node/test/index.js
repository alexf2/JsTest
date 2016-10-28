var assert = require('assert'),
    testNode = require('..');

describe('test-node', function() {
  it('should say hello', function(done) {
    assert.equal(testNode(), 'Hello, world');
    done();
  });
});

