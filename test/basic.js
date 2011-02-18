var Packet = require('../lib/collectd').Packet;

exports.testParts = function(test) {
	test.expect(2);
	var p = new Packet();
	p.appendInt16(42);
	test.equals(2, p.length);
	test.equals(new Buffer([0, 42 ]).toString(), p.asBuffer().toString());
	test.done();
};