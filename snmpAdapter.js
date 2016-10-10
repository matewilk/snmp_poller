'use strict';

let netSnmp = require('net-snmp');
let Subtree = require('./snmp/subtree');
let Get = require('./snmp/get');

function SnmpAdapter () {
    this.session;
    this.communityString;

    this.init = function (ip, communityString) {
        this.setCommunityString(communityString);
        this.createSession(ip);

        return this;
    };

    this.setCommunityString = function (string) {
        this.communityString = string;
    };

    this.getCommunityString = function () {
        return this.communityString;
    };

    this.getSession = function () {
        return this.session;
    };

    this.createSession = function (host) {
        let options = {
            timeout: 3000,
            version: netSnmp.Version2c
        };
        this.session = netSnmp.createSession(host, this.getCommunityString(), options);
    };

    this.get = function (oids, callback) {
        let session = this.getSession();

        let linuxOids = [
          // 1 minute load
          '1.3.6.1.4.1.2021.10.1.3.1',
          // percentage of user CPU time
          '1.3.6.1.4.1.2021.11.9.0',
          // total Swap Size
          '1.3.6.1.4.1.2021.4.3.0',
          // available Swap Space
          '1.3.6.1.4.1.2021.4.4.0'
        ];

        let get = new Get(linuxOids);

        session.get(get.getOids(), get.getCallbackClosure());
    };

    this.subtree = function () {
        let session = this.getSession();

        let oidBase = '1.3.6.1.4.1.8072.1.3.2.4.1.2';
        let script = 'memstats';
        let subtree = new Subtree(oidBase, script);

        let extendedOid = subtree.getExtendedOid();

        // 1.3.6.1.4.1.8072.1.3.2.4.1.2.8.109.101.109.115.116.97.116.115
        session.subtree(
            extendedOid, 5,
            subtree.subtreeCallback(),
            subtree.doneSubtreeCallback()
        );
    };
}

module.exports = SnmpAdapter;
