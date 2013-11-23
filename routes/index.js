
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
  model.Pattern.findAll({include: [model.PatternSegment]}).success(function(p){
  	//console.log(JSON.stringify(p));
  	var simple_pattern={};
  	simple_pattern.name=p.name;
  	simple_pattern.segments=[];
  	// console.log(p);
  	// console.log(Object.keys(p[0]));
  	// console.log('blah');
  	// console.log(p[0].patternSegments);
  	var ps=p[0].patternSegments.sort(function(a,b){return a.order-b.order;});

  	for(var i=0;i<ps.length;i++){
  		//console.log(ps[i].curve);
  		simple_pattern.segments.push(JSON.parse(ps[i].curve));
  	}

  	
  	
	res.render('index', { title: 'Patternite' , 
		svg: file_contents, 
		pattern: JSON.stringify(simple_pattern.segments)
		});
	});
  	
  	
  
  

};



