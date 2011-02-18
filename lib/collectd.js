
var Packet = function() {
	this.length = 0;
	this.buffer = new Buffer(1452);
};

exports.Packet = Packet;

Packet.prototype.appendInt16 = function(code) {
	this.buffer[this.length] = code >> 8;
	this.buffer[this.length+1] = code & 0x00FF;
	this.length += 2;
};

Packet.prototype.appendString = function(str) {
	var len = this.buffer.write(str, this.length+2, 'utf8');
	this.appendInt16(len+5);
	this.buffer[this.length + len + 1] = 0;
	this.length += len + 1;
	return len+1;
};

Packet.prototype.asBuffer = function() {
	return this.buffer.slice(0, this.length);
};

Packet.prototype.Host = function(host) {
	this.appendInt16(0x0000);
};

Packet.prototype.Time = function(time) {
	this.appendInt16(0x0001);
};

/*
var p = new Packet();
p.appendString('toto');
console.log(p.asBuffer());
*/