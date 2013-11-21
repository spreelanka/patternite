
/*
 * GET home page.
 */
var fs=require('fs');
var model=require('../model');


exports.index = function(req, res){
  //var file=fs.openSync("images/tshirt_scaled.svg",'r');
  console.log(model);
  
  
  model.sequelize.sync().done(function(){console.log('hellooooaaa');});
  var file_contents=fs.readFileSync("public/images/tshirt_scaled.svg")
  res.render('index', { title: 'Patternite' , svg: file_contents});

};



