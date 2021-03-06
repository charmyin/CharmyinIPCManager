
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , gpio = require('./routes/gpio')
  , image = require('./routes/image')
  , dirList = require('./routes/dirList')
  , device = require('./routes/device')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/gpio/blink', gpio.blink);
app.get('/image/showImg', image.showImg);
app.get('/ipcs/dirList', dirList.dirList);
app.get('/ipcs/dirList/imgView', dirList.imgView);
app.get('/ipcs/dirList/dirListJson', dirList.dirListJson);
app.get('/ipcs/dirList/imgListJson', dirList.imgListJson);
app.get('/ipcs/dirList/devListJson', routes.devListJson);
app.get('/ipcs/dirList/devOnlineListJson', device.devOnlineListJson);
app.get('/ipcs/dirList/appWorkingStatusJson', device.appWorkingStatusJson);
app.get('/ipcs/dirList/isRunOutOfTime', device.isRunOutOfTime);
app.get('/ipcs/dirList/stopIPC', device.stopIPC);
app.get('/ipcs/dirList/startIPC', device.startIPC);



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
