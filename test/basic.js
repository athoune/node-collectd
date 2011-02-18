var Packet = require('../lib/collectd').Packet;

Buffer.prototype.asArray = function() {
	var a = new Array(this.length);
	for(var i = 0; i < this.length; i++) {
		a[i] = this[i];
	}
	return a;
};

exports.testInt16 = function(test) {
	test.expect(2);
	var p = new Packet();
	p.appendInt16(42);
	test.equals(2, p.length);
	test.deepEqual([0, 42], p.asBuffer().asArray());
	test.done();
};

exports.testString = function(test) {
	test.expect(2);
	var p = new Packet();
	p.appendString('toto');
	test.equals(4+3, p.length);
	test.deepEqual([0, 4+3+2, 116, 111, 116, 111, 0], p.asBuffer().asArray());
	test.done();
};