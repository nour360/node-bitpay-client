var fs         = require('fs');
var KeyUtils   = require('../lib/key-utils');
var HOME       = process.env['HOME'];
var BitPay     = require('../lib/rest-client');
var encPrivkey = fs.readFileSync(HOME + '/.bp/api.key').toString();
var config     = require('../config');
var privkey    = KeyUtils.decrypt(config.keyPassword, encPrivkey);
var client     = new BitPay(privkey);

var data = {
  price: 100,
  currency: 'USD',
  notificationURL: 'http://gordon.bp:8989'
};

client.on('ready', function() {

  client.post('invoices', data, function(err, invoice) {
    console.log(err || invoice);

  });

});
