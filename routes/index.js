
var GPIO = require('../node_modules/gpio/gpio');



/*
 * GET home page.
 */

exports.index = function(req, res){
  var LED = GPIO.PD0;
  var state = GPIO.input(LED)
  res.render('index', { title: 'Express', status: state });
};