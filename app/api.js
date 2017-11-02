module.exports = function(app,db) {
  
  app.get('/new/:url*', function(req,res){


    
    var url = req.url.slice(5);
    
    console.log("Url: " + url);
    
    if(validateUrl(url)) {
      
      var addedRecord = addNewUrl();
      
      console.log("addedRecord:" + addedRecord);
      
      if(addedRecord)
        res.send({
          "short_url" : process.env.APP_URL + addedRecord._id,
          "original_url" : addedRecord.original_url
        });
      else 
        res.send("Unexpected error");
    }
    else{
      res.send("Url not valid");
    }
  });

  app.get('/:id*', processUrl);  
  
  function processUrl(req, res) {
    var id = req.params.id;
    getUrl(id, db, res);
  }
  
  function addNewUrl(originalUrl) {
    
    var sites = db.collection('sites');
    
    sites.find().sort({ _id : -1}).limit(1).toArray(function(err, records){
      
      console.log(err);
      console.log(record);
      
      if(err){
        console.log("Error: " +err);
        return null;
      }
      
      if(records) {
        console.log("newRecord");
        record._id = record._id + 1;
        record.original_url = originalUrl;
      }

      else {    
        console.log("firstRecord");
        record._id = 1000;
        record.original_url = originalUrl;
      }
    
      sites.insertOne(record);  

      return record;                 
    });                                     
  }
  
  function getUrl(id, db, res) {
    var sites = db.collection('sites');
    // get the url
    sites.findOne({
      _id: id
    }, function(err, result) {
      if (err) res.send("Something went wrong");

      if (result) {
        res.redirect(result.original_url);
      } else {
        res.send("Url not found");
      }
    });
  }
  
  function validateUrl(url) {
    // Regex from https://gist.github.com/dperini/729294
    var regex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
    return regex.test(url);
  }
  
  
}