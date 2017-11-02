'use strict';

module.exports = function(app, db) {

  app.route('/')
    .get(function(req, res) {
      res.sendFile(process.cwd() + '/views/index.html');
    });

  app.route('/new')
    .get(function(req, res) {
      res.send("You need to add a proper url, i.e. http://www.google.com");
    });
};