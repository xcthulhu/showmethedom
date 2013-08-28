'use strict';

angular.module('showmethedomApp')
  .controller('MainCtrl', function ($scope, $http) {
  	$scope.d3 = function (data) {
  		//JSON object with the data
      var treeData = {"name" : "A", "info" : "tst", "children" : [
			{"name" : "A1" },
			{"name" : "A2" },
			{"name" : "A3", "children": [
			      {"name" : "A31", "children" :[
			{"name" : "A311" },
			{"name" : "A312" }
	]}] }
      ]};

      // Create a svg canvas
      var vis = d3.select("#result").append("svg:svg")
	  .attr("width", 400)
	  .attr("height", 300)
	  .append("svg:g")
	  .attr("transform", "translate(40, 0)"); // shift everything to the right

      // Create a tree "canvas"
      var tree = d3.layout.tree()
	.size([300,150]);

      var diagonal = d3.svg.diagonal()
	  // change x and y (for the left to right tree)
	  .projection(function(d) { return [d.y, d.x]; });

      // Preparing the data for the tree layout, convert data into an array of nodes
      var nodes = tree.nodes(treeData);
      // Create an array with all the links
      var links = tree.links(nodes);

      var link = vis.selectAll("pathlink")
	  .data(links)
	  .enter().append("svg:path")
	  .attr("class", "link")
	  .attr("d", diagonal)

      var node = vis.selectAll("g.node")
	  .data(nodes)
	  .enter().append("svg:g")
	  .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })

      // Add the dot at every node
      node.append("svg:circle")
	  .attr("r", 3.5);

      // place the name atribute left or right depending if children
      node.append("svg:text")
	  .attr("dx", function(d) { return d.children ? -8 : 8; })
	  .attr("dy", 3)
	  .attr("text-anchor", function(d) { return d.children ? "end" : "start"; })
	  .text(function(d) { return d.name; })
  	};
    $scope.submit = function () {
		$http.get(this.mainURL).success(function (data) {
			$scope.d3(data);
		});
    };
    $scope.d3stuff = "<h1>HEEH</h1>"
  });
