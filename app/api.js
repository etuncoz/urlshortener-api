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
}