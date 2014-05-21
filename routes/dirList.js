
/*
 * GET users listing.
 */
var directory = require('../models/directory');
var image = require('../models/image');

exports.dirList = function(req, res){
        res.render('dirList', {title:'文件夹列表'});
};

exports.dirListJson = function(req, res){
    var exec = require('child_process').exec,
        child;
    child = exec('ls --full-time /home/cubie/apps/media/ -t | awk \'{print $6 " " $7 " " $9}\'',
        function (error, stdout, stderr) {
            if (error !== null) {
                console.log('exec error: ' + error);
            }
            var stdoutArray = stdout.split("\n");
            var responseDirectoryArray=[];
            for(var i=1; i<stdoutArray.length-1; i++){
                var tempStdoutArray = stdoutArray[i].split(" ");
                var directoryTemp = new directory.Directory();
                directoryTemp.createTime=tempStdoutArray[0]+" "+tempStdoutArray[1].split(".")[0];
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

exports.imgListJson = function(req, res){
    var exec = require('child_process').exec,
        child;
    child = exec('ls --full-time /home/cubie/apps/media/imgs -t | awk \'{print $6 " " $7 " " $9}\' | head -n 6',
        function (error, stdout, stderr) {
            if (error !== null) {
                console.log('exec error: ' + error);
            }
            var stdoutArray = stdout.split("\n");
            var responseImageArray=[];
            for(var i=1; i<stdoutArray.length-1; i++){
                if(i==6){
                    break;
                }
                var tempStdoutArray = stdoutArray[i].split(" ");
                var imageTemp = new image.Image();
                imageTemp.createTime=tempStdoutArray[0]+" "+tempStdoutArray[1].split(".")[0];
                imageTemp.name=tempStdoutArray[2];
                responseImageArray.push(imageTemp);
                console.log(stdoutArray[i]);
            }
            res.json(responseImageArray);
        });
}


