
/*
 * GET users listing.
 */
var directory = require('../models/directory');

exports.dirList = function(req, res){
        res.render('dirList', {title:'文件夹列表'});
};

exports.dirListJson = function(req, res){
    var exec = require('child_process').exec,
        child;
    child = exec('ls --full-time /home/cubie/apps/media/ -t | awk \'{print $6 " " $7 " " $9}\'',
        function (error, stdout, stderr) {
            // console.log('stdout: ' + stdout);
            //console.log('stderr: ' + stderr);
            if (error !== null) {
                console.log('exec error: ' + error);
            }
            var stdoutArray = stdout.split("\n");
            var responseDirectoryArray=[];
            for(var i=1; i<stdoutArray.length-1; i++){
                var tempStdoutArray = stdoutArray[i].split(" ");
                var directoryTemp = new directory.Directory();
                directoryTemp.createTime=tempStdoutArray[0]+"_"+tempStdoutArray[1];
                directoryTemp.name=tempStdoutArray[2];
                responseDirectoryArray.push(directoryTemp);
                console.log(stdoutArray[i]);
            }
            res.json(responseDirectoryArray);
        });
}
exports.imgView = function(req, res){
    res.render('imgView', {title:'图片展示'});
};
