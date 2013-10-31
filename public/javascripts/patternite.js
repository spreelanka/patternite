//Raphael group plugin
(function() {
    Raphael.fn.group = function(f, g) {
        var enabled = document.getElementsByTagName("svg").length > 0;
        if (!enabled) {
            // return a stub for VML compatibility
            return {
                add : function() {
                    // intentionally left blank
                }
            };
        }
      this.svg = "http://www.w3.org/2000/svg";
      this.defs = document.getElementsByTagName("defs")[f];
      this.svgcanv = document.getElementsByTagName("svg")[f];
      this.group = document.createElementNS(this.svg, "g");
      for(i = 0;i < g.length;i++) {
        this.group.appendChild(g[i].node)
      }
      this.svgcanv.appendChild(this.group);
      this.group.translate = function(c, a) {
        this.setAttribute("transform", "translate(" + c + "," + a + ") scale(" + this.getAttr("scale").x + "," + this.getAttr("scale").y + ")")
      };
      this.group.rotate = function(c, a, e) {
        this.setAttribute("transform", "translate(" + this.getAttr("translate").x + "," + this.getAttr("translate").y + ") scale(" + this.getAttr("scale").x + "," + this.getAttr("scale").y + ") rotate(" + c + "," + a + "," + e + ")")
      };
      this.group.scale = function(c, a) {
        this.setAttribute("transform", "scale(" + c + "," + a + ") translate(" + this.getAttr("translate").x + "," + this.getAttr("translate").y + ")")
      };
      this.group.push = function(c) {
        this.appendChild(c.node)
      };
      this.group.getAttr = function(c) {
        this.previous = this.getAttribute("transform") ? this.getAttribute("transform") : "";
        var a = [], e, h, j;
        a = this.previous.split(" ");
        for(i = 0;i < a.length;i++) {
          if(a[i].substring(0, 1) == "t") {
            var d = a[i], b = [];
            b = d.split("(");
            d = b[1].substring(0, b[1].length - 1);
            b = [];
            b = d.split(",");
            e = b.length == 0 ? {x:0, y:0} : {x:b[0], y:b[1]}
          }else {
            if(a[i].substring(0, 1) == "r") {
              d = a[i];
              b = d.split("(");
              d = b[1].substring(0, b[1].length - 1);
              b = d.split(",");
              h = b.length == 0 ? {x:0, y:0, z:0} : {x:b[0], y:b[1], z:b[2]}
            }else {
              if(a[i].substring(0, 1) == "s") {
                d = a[i];
                b = d.split("(");
                d = b[1].substring(0, b[1].length - 1);
                b = d.split(",");
                j = b.length == 0 ? {x:1, y:1} : {x:b[0], y:b[1]}
              }
            }
          }
        }
        if(e == undefined) {
          e = {x:0, y:0}
        }
        if(h == undefined) {
          h = {x:0, y:0, z:0}
        }
        if(j == undefined) {
          j = {x:1, y:1}
        }
        if(c == "translate") {
          var k = e
        }else {
          if(c == "rotate") {
            k = h
          }else {
            if(c == "scale") {
              k = j
            }
          }
        }
        return k
      };
      this.group.copy = function(el){
         this.copy = el.node.cloneNode(true);
         this.appendChild(this.copy);
      }
      return this.group
    };
})();
//end Raphael group plugin

var new_paths=[
			//[["M",138.54868,426.23975],["L",396.52665,426.23975,396.52665,185.58398,431.74584,226.26371,517.59916,168.18339,397.7285,29.71032,396.52665,30.52024,396.52665,29.71032]]
			//,['alterable']
			//,[["M",396.52665,29.71032],["L",355.48114,29.71032]]
			//,['alterable']
			//[["M",355.48114,29.71032],["C",338.40741,64.78015,305.41551,88.5483,267.53767,88.5483
			//]]//,229.65984,88.5483,196.6418,64.78015,179.56807,29.71032]]
			[["M",267.53767,88.5483],["C",229.65984,88.5483,196.6418,64.78015,179.56807,29.71032]]
			,['alterable']
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
			]
var colors=["#000","#f00","#0f0","#00f","#ff0"];

var patternite ={
	workspace_init: function(domid){
		$("#"+domid).ready(function(){
			
			// var curve_paths=["m 178.54868,-17.76025 257.97797,0 0,-240.65577 35.21919,40.67973 85.85332,-58.08032 -119.87066,-138.47307 -1.20185,0.80992 0,-0.80992"
			// ,"m 436.52665,-414.28968 -41.04551,0"
			// ,"m 395.48114,-414.28968 c -17.07373,35.06983 -50.06563,58.83798 -87.94347,58.83798 -37.87783,0 -70.89587,-23.76815 -87.9696,-58.83798"
			// ,"m 219.56807,-414.28968 -41.01939,0 0,0.80993 -1.20185,-0.80993"
			// ,"M 177.34683,-414.28968 57.45004,-275.8166"
			// ,"m 57.45004,-275.8166 85.85332,58.08031"
			// ,"m 143.30336,-217.73629 35.24532,-40.70586"
			// ,"m 178.54868,-258.44215 0,17.39076"
			// //,"m 180.52004,-139.77723 c -0.27376,-87.3674 -0.81822,-119.51528 -2.03109,-119.91949 -0.91133,-0.30371 -9.06991,8.02763 -18.13002,18.51418 -9.06012,10.48654 -17.06143,19.06643 -17.78084,19.06643 -0.71928,0 -19.33573,-12.18877 -41.36994,-27.08615 l -40.06221,-27.08619 58.76914,-67.90797 58.76929,-67.90804 19.73213,0.0311 19.73213,0.0311 5.11573,9.0917 c 6.23988,11.08975 24.17698,29.28626 35.35851,35.87019 14.02151,8.25601 27.90137,12.38911 44.05322,13.11786 18.48681,0.83412 28.99161,-1.32814 46.11266,-9.49158 11.34071,-5.40729 15.78424,-8.59829 25.7212,-18.4706 6.60675,-6.56376 14.29205,-15.88049 17.07852,-20.7039 l 5.06633,-8.76983 19.80536,-0.40538 19.8052,-0.40538 55.37608,63.96151 c 30.45676,35.17876 56.8756,65.73558 58.70864,67.90403 l 3.33268,3.94262 -13.564,9.35578 c -7.46048,5.14578 -25.78636,17.61402 -40.72432,27.70726 l -27.1602,18.35139 -16.68898,-19.50553 c -9.40652,-10.99391 -17.64594,-19.3638 -18.8816,-19.18071 -1.92484,0.28516 -2.23806,14.90937 -2.56635,119.79385 l -0.37403,119.46906 -126.41468,0 -126.41467,0 -0.37389,-119.36731 z"
			// //,"m 180.52004,-139.77723 c -0.27376,-87.3674 -0.81822,-119.51528 -2.03109,-119.91949 -0.91133,-0.30371 -9.06991,8.02763 -18.13002,18.51418 -9.06012,10.48654 -17.06143,19.06643 -17.78084,19.06643 -0.71928,0 -19.33573,-12.18877 -41.36994,-27.08615 l -40.06221,-27.08619 58.76914,-67.90797 58.76929,-67.90804 19.73213,0.0311 19.73213,0.0311 5.11573,9.0917 c 6.23988,11.08975 24.17698,29.28626 35.35851,35.87019 14.02151,8.25601 27.90137,12.38911 44.05322,13.11786 18.48681,0.83412 28.99161,-1.32814 46.11266,-9.49158 11.34071,-5.40729 15.78424,-8.59829 25.7212,-18.4706 6.60675,-6.56376 14.29205,-15.88049 17.07852,-20.7039 l 5.06633,-8.76983 19.80536,-0.40538 19.8052,-0.40538 55.37608,63.96151 c 30.45676,35.17876 56.8756,65.73558 58.70864,67.90403 l 3.33268,3.94262 -13.564,9.35578 c -7.46048,5.14578 -25.78636,17.61402 -40.72432,27.70726 l -27.1602,18.35139 -16.68898,-19.50553 c -9.40652,-10.99391 -17.64594,-19.3638 -18.8816,-19.18071 -1.92484,0.28516 -2.23806,14.90937 -2.56635,119.79385 l -0.37403,119.46906 -126.41468,0 -126.41467,0 -0.37389,-119.36731 z"
			// //,"m 180.52004,-139.77723 c -0.27376,-87.3674 -0.81822,-119.51528 -2.03109,-119.91949 -0.91133,-0.30371 -9.06991,8.02763 -18.13002,18.51418 -9.06012,10.48654 -17.06143,19.06643 -17.78084,19.06643 -0.71928,0 -19.33573,-12.18877 -41.36994,-27.08615 l -40.06221,-27.08619 58.76914,-67.90797 58.76929,-67.90804 19.73213,0.0311 19.73213,0.0311 5.11573,9.0917 c 6.23988,11.08975 24.17698,29.28626 35.35851,35.87019 14.02151,8.25601 27.90137,12.38911 44.05322,13.11786 18.48681,0.83412 28.99161,-1.32814 46.11266,-9.49158 11.34071,-5.40729 15.78424,-8.59829 25.7212,-18.4706 6.60675,-6.56376 14.29205,-15.88049 17.07852,-20.7039 l 5.06633,-8.76983 19.80536,-0.40538 19.8052,-0.40538 55.37608,63.96151 c 30.45676,35.17876 56.8756,65.73558 58.70864,67.90403 l 3.33268,3.94262 -13.564,9.35578 c -7.46048,5.14578 -25.78636,17.61402 -40.72432,27.70726 l -27.1602,18.35139 -16.68898,-19.50553 c -9.40652,-10.99391 -17.64594,-19.3638 -18.8816,-19.18071 -1.92484,0.28516 -2.23806,14.90937 -2.56635,119.79385 l -0.37403,119.46906 -126.41468,0 -126.41467,0 -0.37389,-119.36731 z"
			// //,"m 180.87683,-139.2152 c 0,-100.03367 -0.32916,-119.82434 -2.00362,-120.46685 -1.62241,-0.62262 -23.06992,22.36667 -34.06993,36.51905 -1.47406,1.89636 -7.68661,-1.809 -42.68029,-25.45566 l -40.95527,-27.67505 58.41542,-67.47137 58.41543,-67.47136 20.30099,0 20.30086,0 4.69742,8.40443 c 2.63445,4.71346 10.26508,13.86061 17.37523,20.82835 19.85125,19.4536 40.33188,28.14511 66.63553,28.27846 15.75384,0.0798 25.75993,-2.10192 39.46426,-8.60512 18.792,-8.91743 36.00587,-24.69916 45.76962,-41.96184 l 3.9261,-6.94134 20.46295,0.0449 20.46295,0.0449 58.15044,67.31149 58.1504,67.31148 -5.5314,3.96277 c -5.95824,4.26857 -71.65452,48.68521 -74.4626,50.34351 -1.03532,0.61138 -8.32772,-6.65603 -18.72128,-18.6572 -11.28268,-13.02759 -17.73626,-19.38592 -19.13256,-18.85009 -1.81141,0.69508 -2.1071,17.61291 -2.1071,120.50658 l 0,119.69802 -126.43178,0 -126.43177,0 0,-119.69802 z"
			// //,"m 180.87683,-139.2152 c 0,-100.03367 -0.32916,-119.82434 -2.00362,-120.46685 -1.62241,-0.62262 -23.06992,22.36667 -34.06993,36.51905 -1.47406,1.89636 -7.68661,-1.809 -42.68029,-25.45566 l -40.95527,-27.67505 58.41542,-67.47137 58.41543,-67.47136 20.30099,0 20.30086,0 4.69742,8.40443 c 2.63445,4.71346 10.26508,13.86061 17.37523,20.82835 19.85125,19.4536 40.33188,28.14511 66.63553,28.27846 15.75384,0.0798 25.75993,-2.10192 39.46426,-8.60512 18.792,-8.91743 36.00587,-24.69916 45.76962,-41.96184 l 3.9261,-6.94134 20.46295,0.0449 20.46295,0.0449 58.15044,67.31149 58.1504,67.31148 -5.5314,3.96277 c -5.95824,4.26857 -71.65452,48.68521 -74.4626,50.34351 -1.03532,0.61138 -8.32772,-6.65603 -18.72128,-18.6572 -11.28268,-13.02759 -17.73626,-19.38592 -19.13256,-18.85009 -1.81141,0.69508 -2.1071,17.61291 -2.1071,120.50658 l 0,119.69802 -126.43178,0 -126.43177,0 0,-119.69802 z"
			// ,"m 178.2464,-146.65788 c 1.01266,-93.67089 1.51899,-93.67089 1.51899,-93.67089"
			// ,"m 177.23375,-144.12623 -0.50633,124.55696"
			// ];
			// var colors=["#000","#f00","#0f0","#00f","#ff0"];
			// for(var i=0;i<curve_paths.length;i++){
				
			// 	var curve=paper.path(
			// 		curve_paths[i]
			// 		);
			// 	curve.transform("t0,444.02497");
			// 	//curve.attr("fill", "#f00");
			// 	curve.attr("stroke", colors[i%colors.length]);
			// 	curve.attr("stroke-width", "5");
			// 	curve.drag(function(){
			// 		console.log('blah');
			// 		console.log(this);
			// 		//console.log(this);
			// 	},
			// 		function(){
			// 			this.attr("stroke", colors[Math.floor(Math.random()*colors.length)]);

			// 	});
			// }
			var r=Raphael(domid,10000,10000),discattr = {fill: "#000", stroke: "none"};
			var p=new patternite.Pattern();
			p.draw(r);
			
			
			
			function curve(x, y, ax, ay, bx, by, zx, zy, color) {
                    var path = [["M", x, y], ["C", ax, ay, bx, by, zx, zy]],
                        path2 = [["M", x, y], ["L", ax, ay], ["M", bx, by], ["L", zx, zy]],
                        curve = r.path(path).attr({stroke: color || Raphael.getColor(), "stroke-width": 4, "stroke-linecap": "round"}),
                        
                        controls = r.set(
                            r.path(path2).attr({stroke: "#ccc", "stroke-dasharray": ". "}),
                            r.circle(x, y, 5).attr(discattr),
                            r.circle(ax, ay, 5).attr(discattr),
                            r.circle(bx, by, 5).attr(discattr),
                            r.circle(zx, zy, 5).attr(discattr)
                        );
                        console.log(curve);

                    controls[1].update = function (x, y) {
                        var X = this.attr("cx") + x,
                            Y = this.attr("cy") + y;
                        this.attr({cx: X, cy: Y});
                        path[0][1] = X;
                        path[0][2] = Y;
                        path2[0][1] = X;
                        path2[0][2] = Y;
                        controls[2].update(x, y);
                    };
                    controls[2].update = function (x, y) {
                        var X = this.attr("cx") + x,
                            Y = this.attr("cy") + y;
                        this.attr({cx: X, cy: Y});
                        path[1][1] = X;
                        path[1][2] = Y;
                        path2[1][1] = X;
                        path2[1][2] = Y;
                        curve.attr({path: path});
                        controls[0].attr({path: path2});
                    };
                    controls[3].update = function (x, y) {
                        var X = this.attr("cx") + x,
                            Y = this.attr("cy") + y;
                        this.attr({cx: X, cy: Y});
                        path[1][3] = X;
                        path[1][4] = Y;
                        path2[2][1] = X;
                        path2[2][2] = Y;
                        curve.attr({path: path});
                        controls[0].attr({path: path2});
                    };
                    controls[4].update = function (x, y) {
                        var X = this.attr("cx") + x,
                            Y = this.attr("cy") + y;
                        this.attr({cx: X, cy: Y});
                        path[1][5] = X;
                        path[1][6] = Y;
                        path2[3][1] = X;
                        path2[3][2] = Y;
                        controls[3].update(x, y);
                    };
                    controls.drag(move, up);
                }
                function move(dx, dy) {
                    this.update(dx - (this.dx || 0), dy - (this.dy || 0));
                    this.dx = dx;
                    this.dy = dy;
                }
                function up() {
                    this.dx = this.dy = 0;
                }
                // curve(70, 100, 110, 100, 130, 200, 170, 200, "hsb(0, .75, .75)");
                // curve(170, 100, 210, 100, 230, 200, 270, 200, "hsb(.8, .75, .75)");
                // curve(270, 100, 310, 100, 330, 200, 370, 200, "hsb(.3, .75, .75)");
                // curve(370, 100, 410, 100, 430, 200, 470, 200, "hsb(.6, .75, .75)");
                // curve(470, 100, 510, 100, 530, 200, 570, 200, "hsb(.1, .75, .75)");
		});
	},
	nullfunction: function(){return null;},
	Pattern: function(){
		this.paths=new_paths;
		//console.log(paths);

	},


};

patternite.Pattern.prototype={
	constructor: patternite.Pattern,
	
	draw:function(raphael_container){
		var prev_path;
		var discattr = {fill: "#000", stroke: "none"};
		var left_side_set=[];
		var right_side_set=new raphael_container.set();
		for(var i=0;i<this.paths.length;i++){
			if(this.paths[i][0]=='alterable'){
				console.log('alterable');

				i++;
				
				var current_path=raphael_container.path(this.paths[i]).attr({stroke: "hsb(0,.75,.75)"}).attr("stroke-width", "5")
				
				this.paths[i-1][1]=prev_path;
				this.paths[i-1][2]=current_path;

				var control=raphael_container.circle(this.paths[i][0][1], this.paths[i][0][2], 5).attr(discattr)
				control.dx=this.paths[i][0][1];
				control.dy=this.paths[i][0][2];
				control.parent_pattern=this;
				control.current_index=i;
				control.prev_index=i-2;

				control.update= function(x,y){
					//this.parepath[0][1]=path[0][2]=0;
					console.log(this.parent_pattern);
					var X = this.attr("cx") + x,// -x here for correct mirror behavior
			                Y = this.attr("cy") + y;
			            
			            
					this.parent_pattern.paths[this.current_index][0][1]=X;
					this.parent_pattern.paths[this.current_index][0][2]=Y;
					console.log(this.parent_pattern.paths[this.current_index][0]);

					var prev_len= this.parent_pattern.paths[this.prev_index].length;
					var prev_last_seg_len=this.parent_pattern.paths[this.prev_index][prev_len-1].length;

					this.parent_pattern.paths[this.prev_index][prev_len-1][prev_last_seg_len-2]=X;
					this.parent_pattern.paths[this.prev_index][prev_len-1][prev_last_seg_len-1]=Y;

					console.log(this.parent_pattern.paths[this.prev_index][prev_len-1]);

					this.parent_pattern.paths[this.prev_index+1][2].attr({path:this.parent_pattern.paths[this.current_index]});
					this.parent_pattern.paths[this.prev_index+1][1].attr({path:this.parent_pattern.paths[this.prev_index]})
					this.attr({cx: X, cy: Y});
				};
				control.drag(function(dx,dy){
					this.update(dx - (this.dx || 0), dy - (this.dy || 0));
                    this.dx= dx;
                    this.dy= dy;
				},function(){
					this.dx=this.dy=0;
				});
				left_side_set.push(control);
				prev_path=current_path;
			}else{
				prev_path=raphael_container.path(this.paths[i]).attr({stroke: "hsb(0,.75,.75)"}).attr("stroke-width", "5");
			}
			left_side_set.push(prev_path);

		}
		var g=raphael_container.group(0,left_side_set);
		g.scale(-1,1);
		g.translate(600,0);
		console.log(left_side_set);
		//left_side_set.scale(-1,1);
		//left_side_set.rotate(30);//(-1,1);
		//raphael_container.rotate(30);
	}
};