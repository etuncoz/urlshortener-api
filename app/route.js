'use strict';

module.exports = function(app, db) {
  app.route('/')
    .get(function(req, res) {
      res.render('index');
    });
  app.route('/new')
    .get(function(req, res) {
      res.send("Error: You need to add a proper url");
    });
};