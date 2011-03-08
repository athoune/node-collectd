
var Packet = function() {
	this.length = 0;
	this.buffer = new Buffer(1452);
};

exports.Packet = Packet;

Packet.prototype.appendInt8 = function(code) {
	this.buffer[this.length] = code & 0x00FF;
	this.length += 1;
	return this;
};

Packet.prototype.appendInt16 = function(code) {
	this.buffer[this.length] = code >> 8 & 0x00FF;
	this.buffer[this.length+1] = code & 0x00FF;
	this.length += 2;
	return this;
};

Packet.prototype.appendInt64 = function(code) {
	for(var i=0; i < 8; i++) {
		this.buffer[this.length + 7 -i ] = code >> 8*i & 0x00FF;
	}
	this.length += 8;
	return this;
};

Packet.prototype.appendString = function(str) {
	var len = this.buffer.write(str, this.length+2, 'utf8');
	this.appendInt16(len+5);
	this.buffer[this.length + len + 1] = 0;
	this.length += len + 1;
	return this;
};

Packet.prototype.asBuffer = function() {
	return this.buffer.slice(0, this.length);
};

Packet.prototype.Host = function(host) {
	return this.appendInt16(0x0000).appendString(host);
};

Packet.prototype.Time = function(time) {
	if(time instanceof Date) {
		time = time.getTime();
	}
	return this.appendInt16(0x0001).appendInt16(12).appendInt64(time);
};

Packet.prototype.Plugin = function(plugin) {
	return this.appendInt16(0x0002).appendString(plugin);
};

Packet.prototype.PluginInstance = function(pluginInstance) {
	return this.appendInt16(0x0003).appendString(pluginInstance);
};

Packet.prototype.Type = function(type) {
	return this.appendInt16(0x0004).appendString(type);
};

Packet.prototype.TypeInstance = function(typeInstance) {
	return this.appendInt16(0x0005).appendString(typeInstance);
};

Packet.prototype.Values = function(values) {
	this.appendInt16(0x0006);
	var pozLength = this.length;
	this.length += 2;
	this.appendInt16(values.length);
	var p = this;
	values.forEach(function(value) {
		p.append8(value.dataType);
		value.data.copy(p, p.length, 0, 8);
		p.length+=8;
	});
};

Packet.prototype.Interval = function(value) {
	this.appendInt16(0x0006);
	this.appendInt16(12);
	this.appendInt64(value);
};

var COUNTER = function(value) {
	this.dataType = 0;
	this.data = new Buffer(64);
	for(var i=0; i < 8; i++) {
		this.data[ 7 -i ] = value >> 8*i & 0x00FF;
	}
};

exports.COUNTER = COUNTER;

var GAUGE = function(value) {
	this.dataType = 1;
};

var DERIVE = function(value) {
	this.dataType = 2;
};

var ABSOLUTE = function(value) {
	this.dataType = 3;
};