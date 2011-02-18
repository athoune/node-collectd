var Packet = require('../lib/collectd').Packet;

exports.testInt16 = function(test) {
	test.expect(2);
	var p = new Packet();
	p.appendInt16(42);
	test.equals(2, p.length);
	test.equals(new Buffer([0, 42 ]).toString(), p.asBuffer().toString());
	test.done();
};

exports.testString = function(test) {
	test.expect(2);
	var p = new Packet();
	p.appendString('toto');
	test.equals(4+7, p.length);
	console.log(p.asBuffer());
};