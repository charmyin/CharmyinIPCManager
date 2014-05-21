
/*
 * GET users listing.
 */
var fs = require('fs');
exports.showImg = function(req, res){
    var count=req.param('count');
    console.log("---------------------------------++++++++++++++++++++++++++++++++\n");
    var imgPath = '/home/cubie/apps/timelapse/usb/cmfswebcam/img'+count+'.jpg';
    console.log(imgPath);
    var img = fs.readFileSync(imgPath);
    res.writeHead(200, {'Content-Type': 'image/jpeg' });
    res.end(img, 'binary');
};