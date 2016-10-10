'use strict';

let express = require('express');
let app = express();

let Poller = require('./poller');

app.set('port', process.env.PORT || 3001);

let server = app.listen(app.get('port'), () => {
	console.log('Epxress server listening on port ' + server.address().port);

	//let host = '192.168.1.161';//'ziller2.dyndns.org';

	let hosts = [
		{ip: '192.168.1.161', string: 'Quan7umL3ap'},
		// {ip: 'home.solarisfire.com', string: 'Quan7umL3ap' },
		{ip: '54.229.73.129', string: 'public'},
		{ip: '192.168.1.142', string: 'Quan7umL3ap'}
	];

	let limit = 1;

	setInterval(() => {
		// loop hosts
		hosts.forEach(function (host) {
			// create Poller instance (snmpAdapter instance underneath)
			let poller = new Poller();
			poller.init(host.ip, host.string);

			// send requests x times
			for (var i = 0; i < limit; i++) {
				poller.poll();
			}
		});
	}, 5000);
});
