/*
 * GET home page.
 */

var device = require('../models/device');

exports.index = function(req, res){
  res.render('index', { title: '设备管理' });
};

exports.devListJson = function(req, res){
    var exec = require('child_process').exec,
        child;

    var execCommand = 'cat /etc/ipcs.info';
    child = exec(execCommand,
        function (error, stdout, stderr) {
            if (error !== null) {
                console.log('exec error: ' + error);
            }
            var stdoutArray = stdout.split("\n");
            var responseDeviceArray=[];
            for(var i=1; i<stdoutArray.length-1; i++){
                var tempStdoutArray = stdoutArray[i].split(";");
                var devTemp = new device.Device();
                devTemp.ipAddressShort=tempStdoutArray[0];
                devTemp.name=tempStdoutArray[2];
                devTemp.shootInterval=tempStdoutArray[3];
                responseDeviceArray.push(devTemp);
                console.log(stdoutArray[i]);
            }
            res.json(responseDeviceArray);
        });

}