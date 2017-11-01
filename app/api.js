module.exports = function(app,db) {
  
  app.get('/new/:url*', function(req,res){

    if(req.params.url) {
      urls[shortUrlNumber++] = req.params.url;

      var response = {};
      response['shortUrl'] = 'https://brick-board.glitch.me/' + shortUrlNumber;
      response['originalUrl'] = urls[shortUrlNumber];

      shortUrlNumber++;

      res.send(response);
    }
    else {
      res.send('Please enter a valid url');
    } 
  });

  app.get('/:url*', processUrl);
  
  
  var processUrl = function (request, response) {
    
  }
  
  var addNewUrl = function () {
    
  }
  
  
  function getUrl(link, db, res) {
    // Check to see if the site is already there
    var sites = db.collection('sites');
    // get the url
    sites.findOne({
      "short_url": link
    }, function(err, result) {
      if (err) throw err;
      // object of the url
      if (result) {
        // we have a result
        console.log('Found ' + result);
        console.log('Redirecting to: ' + result.original_url);
        res.redirect(result.original_url);
      } else {
        // we don't
        res.send({
        "error": "This url is not on the database."
      });
      }
    });
  }
}