'use strict';

let netSnmp = require('net-snmp');

class Subtree {
	constructor (oidBase, scriptName) {
		this.oidBase = oidBase;
		this.scriptName = scriptName;

		this.scriptOid = this.buildOid();
	}

	buildOid () {
		let scriptName = this.scriptName;
		let oidBase = this.oidBase;

		let oidExtension = `${scriptName.length}.`;
        for (let i = 0; i < scriptName.length; i++) {
            oidExtension += `${scriptName.charCodeAt(i)}.`;
        }
        oidExtension = oidExtension.replace(/\.$/, '');

        return `${oidBase}.${oidExtension}`;
	}

	getExtendedOid () {
		return this.scriptOid;
	}

	/**
  * subtreeCallback : pushes each output line from executed script to res.locals.walkResponse
  * shared between standard subtree (remote script execution) and customSubtree (templateName starts with 'custom')
  * @param {Object} res response
  * @param {String} template template name
  * @returns {function(*)} closure
  */
  subtreeCallback () {
      return (varbinds) => {
          for (let i = 0; i < varbinds.length; i++) {
              if (netSnmp.isVarbindError(varbinds[i])) {
                  console.error(netSnmp.varbindError(varbinds[i]));
              } else {
                  console.log(varbinds[i].value.toString());
              }
          }
      };
  }

  doneSubtreeCallback () {
  	return (error) => {
  		if(error) {
  			console.error(error.toString());
  		} else {
  			console.log('Subtree DONE!');
  		}
  	};
  }
}

module.exports = Subtree;
