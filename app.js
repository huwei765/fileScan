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
var w_file = 'E:/list.html';
var fileTypes = 'bmp,gif,jpg,png';
var w_content = '<ol>\n' + getAllFiles(root_path).join('\n') + '\n</ol>';

fs.readFile(root_path + w_file, function(err, data) {

    if (err && err.errno == 33) {

        fs.open(w_file, 'w', 0666, function(e, fd) {

            if (e) { console.log(e); };

            fs.write(fd, w_content, 0, 'utf8', function(e) {
                if (e) { console.log(e); };
                fs.closeSync(fd);
            });

        });

    } else {

        fs.writeFile(w_file, w_content, function(e) {
            if (e) { console.log(e); };
            console.log('Done, My Lord !');
        });

    };

});

function getAllFiles(root) {

    var res = [],
        files = fs.readdirSync(root);
    
    files.forEach(function(file) {
        var pathname = root + '/' + file,
            stat = fs.lstatSync(pathname);

        if (!stat.isDirectory()) {
            if (isFileType(file, fileTypes)) {
                res.push('<li><a href="file:///' + pathname + '" target="_blank">' + file + '</a></li>');
            };
        } else {
            res = res.concat(getAllFiles(pathname));
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