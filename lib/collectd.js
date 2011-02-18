
var Packet = function() {
	this.length = 0;
	this.buffer = new Buffer(1452);
};

exports.Packet = Packet;

Packet.prototype.appendInt16 = function(code) {
	this.buffer[this.length] = code >> 8 & 0x00FF;
	this.buffer[this.length+1] = code & 0x00FF;
	this.length += 2;
};

Packet.prototype.appendInt64 = function(code) {
	for(var i=0; i < 8; i++) {
		this.buffer[this.length + 7 -i ] = code >> 8*i & 0x00FF;
	}
	this.length += 8;
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
	this.appendString(host);
};

Packet.prototype.Time = function(time) {
	if(time instanceof Date) {
		time = time.getTime();
	}
	this.appendInt16(0x0001);
	this.appendInt16(12);
	this.appendInt64(time);
};
