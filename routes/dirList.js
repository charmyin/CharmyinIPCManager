
/*
 * GET users listing.
 */

exports.dirList = function(req, res){

    res.render('dirList', {title:'文件夹列表'});
};

exports.imgView = function(req, res){

    res.render('imgView', {title:'图片展示'});
};
