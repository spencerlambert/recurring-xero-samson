var express = require('express');
var router = express.Router();
var Xero = require('xero');
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {

var coustomer_Key = 'T1DZJYQ1RGWBDT6OOBWYTV1ZALJHBV',
consumer_Secret = 'JYA9PKFP1TLSTF87YXHRJS8LVTANAK';
var xero = new Xero(coustomer_Key, consumer_Secret, fs.readFileSync('privatekey.pem'));
xero.call('GET', '/Users', null, function(err, json) {
if (err) {
console.error(err);
return res.status(400).json({error: 'Unable to contact Xero'});
}
return res.status(200).json(json);
});
//res.render('index', { title: 'Express' });
});

module.exports = router;
