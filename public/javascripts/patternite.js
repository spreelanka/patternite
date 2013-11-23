var grp;
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
			]
var new_mirror_paths=[
			//[["M",138.54868,426.23975],["L",396.52665,426.23975,396.52665,185.58398,431.74584,226.26371,517.59916,168.18339,397.7285,29.71032,396.52665,30.52024,396.52665,29.71032]]
			//,['alterable']
			//,[["M",396.52665,29.71032],["L",355.48114,29.71032]]
			//,['alterable']
			//[["M",355.48114,29.71032],["C",338.40741,64.78015,305.41551,88.5483,267.53767,88.5483
			//]]//,229.65984,88.5483,196.6418,64.78015,179.56807,29.71032]]
			[["M",267.53767,88.5483],["C",229.65984,88.5483,196.6418,64.78015,179.56807,29.71032]]
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
			]
var colors=["#000","#f00","#0f0","#00f","#ff0"];

var patternite ={
	workspace_init: function(domid,p){
		$("#"+domid).ready(function(){
			
      var save_button=$('<div id="save_button"></div>');

      save_button.append('save');
      save_button.click(function(){console.log('clicked')});
      save_button.addClass('patternite-button');
      $("#"+domid).append(save_button);
      var pattern_edit_div=$("#"+domid).append($('<div id="'+domid+'_raphael"></div>'));
      pattern_edit_div.ready(function(){
  			var r=Raphael(domid+'_raphael',10000,10000),discattr = {fill: "#000", stroke: "none"};
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
		});
	},
	nullfunction: function(){return null;},
	Pattern: function(paths_){
    console.log(paths_);
		this.paths=paths_;
		this.mirror_paths=JSON.parse(JSON.stringify(paths_));
		

	},


};

patternite.Pattern.prototype={
	constructor: patternite.Pattern,
	createGroupFromList:function(raphael_container,paths,mirror_matrix){
		var element_list=[];
		var discattr = {fill: "#000", stroke: "none"};
		var prev_path;
		for(var i=0;i<paths.length;i++){
      if(paths[i][0]=='begin'){
        i++;
      }else if(paths[i][0]=='end'){
        break;
      }
			if(paths[i][0]=='alterable'){
				console.log('alterable');

				i++;
				
				var current_path=raphael_container.path(paths[i]).attr({stroke: "hsb(0,.75,.75)"}).attr("stroke-width", "5")
				
				paths[i-1][1]=prev_path;
				paths[i-1][2]=current_path;

				var control=raphael_container.circle(paths[i][0][1], paths[i][0][2], 5).attr(discattr)
				control.dx=paths[i][0][1];
				control.dy=paths[i][0][2];
				control.parent_pattern=this;
				control.current_index=i;
				control.prev_index=i-2;
				paths[i-1][3]=control;
				if(mirror_matrix[0]){
					control.update= function(x,y){
						
						var X,Y;
						X = this.attr("cx") - x;
						var MX=this.attr("cx")+x;
						Y = this.attr("cy") + y;

						this.parent_pattern.mirror_paths[this.current_index][0][1]=X;
						this.parent_pattern.mirror_paths[this.current_index][0][2]=Y;
						

						var prev_len= this.parent_pattern.mirror_paths[this.prev_index].length;
						var prev_last_seg_len=this.parent_pattern.mirror_paths[this.prev_index][prev_len-1].length;

						this.parent_pattern.mirror_paths[this.prev_index][prev_len-1][prev_last_seg_len-2]=X;
						this.parent_pattern.mirror_paths[this.prev_index][prev_len-1][prev_last_seg_len-1]=Y;

						

						this.parent_pattern.mirror_paths[this.prev_index+1][2].attr({path:this.parent_pattern.mirror_paths[this.current_index]});
						this.parent_pattern.mirror_paths[this.prev_index+1][1].attr({path:this.parent_pattern.mirror_paths[this.prev_index]})
						this.attr({cx: X, cy: Y});
						//this.parent_pattern.paths[this.prev_index+1][3].update(x,y);
						X=MX;
						this.parent_pattern.paths[this.current_index][0][1]=X;
						this.parent_pattern.paths[this.current_index][0][2]=Y;
						

						var prev_len= this.parent_pattern.paths[this.prev_index].length;
						var prev_last_seg_len=this.parent_pattern.paths[this.prev_index][prev_len-1].length;

						this.parent_pattern.paths[this.prev_index][prev_len-1][prev_last_seg_len-2]=X;
						this.parent_pattern.paths[this.prev_index][prev_len-1][prev_last_seg_len-1]=Y;

						

						this.parent_pattern.paths[this.prev_index+1][2].attr({path:this.parent_pattern.paths[this.current_index]});
						this.parent_pattern.paths[this.prev_index+1][1].attr({path:this.parent_pattern.paths[this.prev_index]});
						this.parent_pattern.paths[this.prev_index+1][3].attr({cx: X,cy: Y});
					};
				}else{
					control.update= function(x,y){
						// var X,Y;

						// X = this.attr("cx") + x;
						// //var MX=this.attr("cx")-x;
						// Y = this.attr("cy") + y;

					
						// this.parent_pattern.paths[this.current_index][0][1]=X;
						// this.parent_pattern.paths[this.current_index][0][2]=Y;
						

						// var prev_len= this.parent_pattern.paths[this.prev_index].length;
						// var prev_last_seg_len=this.parent_pattern.paths[this.prev_index][prev_len-1].length;

						// this.parent_pattern.paths[this.prev_index][prev_len-1][prev_last_seg_len-2]=X;
						// this.parent_pattern.paths[this.prev_index][prev_len-1][prev_last_seg_len-1]=Y;

						

						// this.parent_pattern.paths[this.prev_index+1][2].attr({path:this.parent_pattern.paths[this.current_index]});
						// this.parent_pattern.paths[this.prev_index+1][1].attr({path:this.parent_pattern.paths[this.prev_index]});
						// this.attr({cx: X, cy: Y});
						this.parent_pattern.mirror_paths[this.prev_index+1][3].update(-x,y);
						
						// X=MX;
						// this.parent_pattern.mirror_paths[this.current_index][0][1]=X;
						// this.parent_pattern.mirror_paths[this.current_index][0][2]=Y;
						

						// var prev_len= this.parent_pattern.mirror_paths[this.prev_index].length;
						// var prev_last_seg_len=this.parent_pattern.mirror_paths[this.prev_index][prev_len-1].length;

						// this.parent_pattern.mirror_paths[this.prev_index][prev_len-1][prev_last_seg_len-2]=X;
						// this.parent_pattern.mirror_paths[this.prev_index][prev_len-1][prev_last_seg_len-1]=Y;

						

						// this.parent_pattern.mirror_paths[this.prev_index+1][2].attr({path:this.parent_pattern.mirror_paths[this.current_index]});
						// this.parent_pattern.mirror_paths[this.prev_index+1][1].attr({path:this.parent_pattern.mirror_paths[this.prev_index]})
						
						// this.parent_pattern.mirror_paths[this.prev_index+1][3].attr({cx: X,cy: Y});
						
					};
				}
				control.drag(function(dx,dy){
					this.update(dx - (this.dx || 0), dy - (this.dy || 0));
                    this.dx= dx;
                    this.dy= dy;
				},function(){
					this.dx=this.dy=0;
				});
				
				element_list.push(control);
				prev_path=current_path;
			}else{
				prev_path=raphael_container.path(paths[i]).attr({stroke: "hsb(0,.75,.75)"}).attr("stroke-width", "5");
			}
			element_list.push(prev_path);

		}
		//var g = raphael_container.group(0,element_list);
		//return g;
		return element_list
	},
	draw:function(raphael_container){
		
		var left_group=this.createGroupFromList(raphael_container,this.paths,[false,false]);
		var right_group=this.createGroupFromList(raphael_container,this.mirror_paths,[true,false]);
		
		var g = raphael_container.group(0,right_group);
		g.scale(-1,1);
		g.translate(g.getBBox().width*2+18,0);
		//g.translate(256*2,0);
		grp = g;
		setTimeout(function(){
			

		},3000);
		
		
		//g.translate(535,0);
		//right_group.scale(-1,1);
		//right_group.translate(500,0);
		
		
	}
};