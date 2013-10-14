
/*
 * GET home page.
 */
var fs=require('fs');
exports.index = function(req, res){
  //var file=fs.openSync("images/tshirt_scaled.svg",'r');
  var file_contents=fs.readFileSync("public/images/tshirt_scaled.svg")
  res.render('index', { title: 'Patternite' , svg: file_contents});

};