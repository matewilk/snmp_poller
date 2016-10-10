'use strict';

let SnmpAdapter = require('./snmpAdapter');

function Poller () {
	this.snmpAdapter;

	this.init = function (ip, communityString) {
		this.snmpAdapter = new SnmpAdapter();
		this.snmpAdapter.init(ip, communityString);
	};

	this.poll = function () {
		this.snmpAdapter.get();
		this.snmpAdapter.subtree();
	};
}

module.exports = Poller;
