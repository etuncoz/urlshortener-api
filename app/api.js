module.exports = function(app,db) {
  
  app.get('/new/:url*', function(req,res){

    if(req.params.url) {
      urls[shortUrlNumber++] = req.params.url;

      var response = {};
      response['shortUrl'] = process.env.APP_URL + shortUrlNumber;
      response['originalUrl'] = urls[shortUrlNumber];

      shortUrlNumber++;

      res.send(response);
    }
    else {
      res.send('Please enter a valid url');
    } 
  });

  app.get('/:url*', processUrl);
  
  
  function processUrl(req, res) {
    var url = process.env.APP_URL + req.params.url;
    if (url != process.env.APP_URL + 'favicon.ico') {
      getUrl(url, db, res);
    }
  }
  
  function addNewUrl() {
    
  }
  
  
  function getUrl(link, db, res) {

    var sites = db.collection('sites');
    // get the url
    sites.findOne({
      "short_url": link
    }, function(err, result) {
      if (err) res.send("Something went wrong");

      if (result) {
        console.log('Result ' + result);
        console.log('Redirecting to: ' + result.original_url);
        res.redirect(result.original_url);
      } else {
        res.send("Url not found");
      }
    });
  }
  
  function validateURL(url) {
    // Regex from https://gist.github.com/dperini/729294
    var regex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
    return regex.test(url);
  }
  
  
}