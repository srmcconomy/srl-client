'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.set('port', process.env.PORT || 4000);

app.use('/', _express2.default.static(_path2.default.join(__dirname, 'public')));
app.listen(app.get('port'), function () {
  return console.log(app.get('port'));
});