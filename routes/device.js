/*
 * GET home page.
 */

var device = require('../models/device');

exports.devOnlineListJson = function(req, res){

    var exec = require('child_process').exec,
        child;

    var execCommand = './checkIPCOnline.sh';
    child = exec(execCommand,
        function (error, stdout, stderr) {
            if (error !== null) {
                console.log('exec error: ' + error);
            }
            var stdoutArray = stdout.split("\n");
            var responseDeviceOnlineArray=[];
            for(var i=0; i<stdoutArray.length-1; i++){
                var tempStdoutArray = stdoutArray[i].split(" ");
                var devOnlineTemp = {ipAddress:'', isOnline:false};
                devOnlineTemp.ipAddress=tempStdoutArray[0];
                devOnlineTemp.isOnline=tempStdoutArray[1];
                responseDeviceOnlineArray.push(devOnlineTemp);
            }
            res.json(responseDeviceOnlineArray);
        });
}

exports.isRunOutOfTime = function(req, res){
    var exec = require('child_process').exec,
        child;

    var execCommand = './mmpegWatchdogEmail.sh';
    child = exec(execCommand,
        function (error, stdout, stderr) {
            if (error !== null) {
                console.log('exec error: ' + error);
            }
            var stdoutArray = stdout.split("\n");
            var responseStatusArray=[];
            for(var i=0; i<stdoutArray.length-1; i++){
                var tempStdoutArray = stdoutArray[i].split(" ");
                var devStatusTemp = {};
                devStatusTemp.ipAddressShort=tempStdoutArray[0];
                devStatusTemp.isRunOutOfTime=tempStdoutArray[1];
                responseStatusArray.push(devStatusTemp);
            }
            res.json(responseStatusArray);
        });
}


exports.appWorkingStatusJson = function(req, res){
    var exec = require('child_process').exec,
        child;

    var execCommand = './isProgramRunning.sh';
    child = exec(execCommand,
        function (error, stdout, stderr) {
            if (error !== null) {
                console.log('exec error: ' + error);
            }
            var stdoutArray = stdout.split("\n");
            var responseStatusArray=[];
            for(var i=0; i<stdoutArray.length-1; i++){
                var tempStdoutArray = stdoutArray[i].split(" ");
                var devStatusTemp = {};
                devStatusTemp.ipAddressShort=tempStdoutArray[0];
                devStatusTemp.isShooting=tempStdoutArray[1];
                responseStatusArray.push(devStatusTemp);
            }
            res.json(responseStatusArray);
        });
}

exports.stopIPC = function(req, res){
    var shortIPAddress=req.param("shortIPAddress");

    var exec = require('child_process').exec,
        child;
    var execCommand = './stopIPC.sh '+shortIPAddress;
    child = exec(execCommand,
        function (error, stdout, stderr) {
            if (error !== null) {
                res.json({success:true});
            }else{
                res.json({success:false});
            }

        });
}

exports.startIPC = function(req, res){
    var shortIPAddress=req.param("shortIPAddress");

    var exec = require('child_process').exec,
        child;
    var execCommand = './startIPC.sh '+shortIPAddress;
    child = exec(execCommand,
        function (error, stdout, stderr) {
            if (error !== null) {
                //res.json({success:true});
            }else{
               // res.json({success:false});
            }

        });
    setTimeout(function() {
        res.json({success:false});
    }, 5000);

}