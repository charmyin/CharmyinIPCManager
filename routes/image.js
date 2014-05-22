
/*
 * GET users listing.
 */
var fs = require('fs');
exports.showImg = function(req, res){
    var devDirName=req.param('devDirName');
    var dateDirName=req.param('dateDirName');
    var fileName=req.param('fileName');

    var imgPath = '/home/media/dkapm1/'+ devDirName +'/'+dateDirName+'/'+fileName;
    console.log(imgPath);
    var img = fs.readFileSync(imgPath);
    res.writeHead(200, {'Content-Type': 'image/jpeg' });
    res.end(img, 'binary');
};