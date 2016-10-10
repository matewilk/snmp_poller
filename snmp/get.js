'use strict';

class Get {
  constructor (oids) {
    this.oids = oids;
  }

  getOids () {
    return this.oids;
  }

  // define response for snmp get request
	getCallbackClosure () {
		return function (error, varbinds) {
			if (error) {
				console.error(error);
			} else {
				for (var i = 0; i < varbinds.length; i++) {
          console.log(varbinds[i].oid + ' = ' + varbinds[i].value);
				}
			}
		};
	}
}

module.exports = Get;
