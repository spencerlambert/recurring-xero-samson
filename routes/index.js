var express = require('express');
var router = express.Router();
var Xero = require('xero');
var fs = require('fs');
/* GET home page. */
router.get('/', function(req, res, next) {
//xero provided coustomer key
var coustomer_Key = 'VDTYDYXKF1UWDXC0KPLOUJ4UBG0BRI';
//xero provided consumer secret
var consumer_Secret = 'MB6JYPIZLAFI1OKZWE4WR7ELTI6RIT';
//rsa private key
var rsaPrivateKey = fs.readFileSync('privatekey.pem');

var xero = new Xero(coustomer_Key, consumer_Secret, rsaPrivateKey);

xero.call('GET', '/Users', null, function(err, json) {
        if (err) {
            console.error(err);
            return res.status(400).json({error: 'Unable to contact Xero'});
        }
        return res.status(200).json(json);
    });
//end of Xero
//res.render('index', { title: 'Express' });
});

module.exports = router;