var Packet = require('../lib/collectd').Packet;

Buffer.prototype.asArray = function() {
	var a = new Array(this.length);
	for(var i = 0; i < this.length; i++) {
		a[i] = this[i];
	}
	return a;
};

/*
exports.testInt8 = function(test) {
	test.expect(2);
	var p = new Packet();
	p.int8(42);
	var b = p.asBuffer();
	test.equals(1, b.length);
	test.deepEqual([42], b.asArray());
	test.done();
};

exports.testInt16 = function(test) {
	test.expect(2);
	var p = new Packet();
	p.int16(42);
	var b = p.asBuffer();
	test.equals(2, b.length);
	test.deepEqual([0, 42], b.asArray());
	test.done();
};

exports.testString = function(test) {
	test.expect(2);
	var p = new Packet();
	p.string('toto');
	var b = p.asBuffer();
	test.equals(4+2+1, b.length);
	test.deepEqual([0, 4+3+2, 116, 111, 116, 111, 0], b.asArray());
	test.done();
};
*/

exports.testHost = function(test) {
	test.expect(1);
	var p = new Packet();
	p.Host('www.nodejs.org');
	var b = p.asBuffer();
	test.deepEqual(new Buffer("www.nodejs.org").asArray(), b.slice(4, b.length -1).asArray());
	test.done();
};

exports.testTime = function(test) {
	test.expect(1);
	var p = new Packet();
	var d = new Date();
	p.Time(d);
	test.equals(d.getTime() & 0xFF, p.asBuffer()[11]);
	test.done();
};