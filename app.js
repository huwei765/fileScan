var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var express = require('express');
var logger = require('morgan');
var path = require('path');
var ejs = require('ejs');
var fs = require('fs');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var root_path = process.argv[2];
var listFile = 'E:/list.html';
var fileTypes = 'png,jpg,gif,bmp';
var listFileContent = '<!doctype html>\n<html>\n<head>\n<meta charset="utf-8">\n<title>Image Files</title>\n</head>\n<body>\n<ol>\n' + getAllFiles(root_path).join('\n') + '\n</ol>\n</body>\n</html>';

fs.readFile(listFile, function(err, data) {

    if (err && err.errno == 33) {

        fs.open(listFile, 'w', 0666, function(e, fd) {

            if (e) { console.log(e); };

            fs.write(fd, listFileContent, 0, 'utf8', function(e) {
                if (e) { console.log(e); };
                fs.closeSync(fd);
            });

        });

    } else {

        fs.writeFile(listFile, listFileContent, function(e) {
            if (e) { console.log(e); };
            console.log('All Done, My Lord !');
        });

    };

});

function getAllFiles(root) {

    var res = [],
        files = fs.readdirSync(root);

    if ( root.charAt(root.length - 1) !== '/' ) { root = root + '/'; };
    
    files.forEach(function(file) {

        var pathname = root + file;

        if ( pathname.indexOf('System Volume Information') == -1 && pathname.indexOf('$Recycle') == -1 && pathname.indexOf('$RECYCLE') == -1 && pathname.indexOf('.sys') == -1 && pathname.indexOf('MSOCache') == -1 && pathname.indexOf('latest_stat.xml') == -1 && pathname.indexOf('CrashReports') == -1 && pathname.indexOf('Microsoft') == -1 && pathname.indexOf('ElevatedDiagnostics') == -1 && pathname.indexOf('Windows') == -1 ) {

            var stat = fs.lstatSync(pathname);

            if (!stat.isDirectory()) {
                if (isFileType(file, fileTypes)) {
                    res.push('<li><a href="' + pathname + '" target="_blank">' + file + '</a></li>');
                };
            } else {
                res = res.concat(getAllFiles(pathname));
            };

        };

    });

    return res;

}

function isFileType(filename, types) {
    var reg = /,/;
    types = types.split(reg);
    var pattern = '\.(';
    for (var i = 0; i < types.length; i++) {
        if (0 != i) { pattern += '|'; };
        pattern += types[i].trim();
    };
    pattern += ')$';
    return new RegExp(pattern, 'i').test(filename);
}

module.exports = app;