//console.log('hello');
var Sequelize=require("sequelize");


var sequelize = new Sequelize('patternite', 'root', 'root'
// 	, {
//   host: "localhost",
//   port: 12345
// }
);

var Pattern = sequelize.define('Pattern',{
	name: Sequelize.STRING
});

var PatternSegment = sequelize.define('PatternSegment',{
	curve: Sequelize.STRING
	,order: Sequelize.INTEGER
	//side effects?
});

PatternSegment.belongsTo(Pattern);
Pattern.hasMany(PatternSegment);

//development stuff, drops tables
Pattern.sync({force:true});
PatternSegment.sync({force:true});

sequelize.sync().done(function(){console.log('helloooo');});

var new_paths=[
			//[["M",138.54868,426.23975],["L",396.52665,426.23975,396.52665,185.58398,431.74584,226.26371,517.59916,168.18339,397.7285,29.71032,396.52665,30.52024,396.52665,29.71032]]
			//,['alterable']
			//,[["M",396.52665,29.71032],["L",355.48114,29.71032]]
			//,['alterable']
			//[["M",355.48114,29.71032],["C",338.40741,64.78015,305.41551,88.5483,267.53767,88.5483
			//]]//,229.65984,88.5483,196.6418,64.78015,179.56807,29.71032]]

			['begin']
			,[["M",267.53767,88.5483],["C",229.65984,88.5483,196.6418,64.78015,179.56807,29.71032]]
			,['alterable',0]
			,[["M",179.56807,29.71032],["L",137.34683,29.71032]]
			,['alterable']
			,[["M",137.34683,29.71032],["L",17.45004,168.1834]]
			,['alterable']
			,[["M",17.45004,168.1834],["L",103.30336,226.26371]]
			,['alterable']
			,[["M",103.30336,226.26371],["L",138.54868,185.55785]]
			,['alterable']
			,[["M",138.54868,185.55785],["L",138.54868,202.94861]]
			,['alterable']
			//,[["M",138.2464,297.34212],["C",139.25906,203.67123,139.76539,203.67123,139.76539,203.67123]]
			,[["M",138.54868,202.94861],["L",138.54868,299.87377]]
			,['alterable']
			,[["M",137.23375,299.87377],["L",136.72742,424.43073]]
			,['end']
			]
;
Pattern.create({name:'tshirt mockup'}).success(function(pattern){
	for(var i=0;i<new_paths.length;i++){
		if(true){
			PatternSegment.create({curve:JSON.stringify(new_paths[i]),order:i}).success(function(ps){
				ps.setPattern(pattern);
			});
		}
	}
	sequelize.sync().done(function(){console.log('mock data loaded');});
});




module.exports={
	sequelize:sequelize,
	Pattern:Pattern,
	PatternSegment:PatternSegment
};




