/* Implementation of k-nearest-neighbor, kNN algorithm. */

console.log(' *** Implementation of k-nearest-neighbor, kNN algorithm. ***');

console.log('1. Put all the data you have (including the mystery point) on a graph.');
console.log('2. Measure the distance between the mystery point and every other point.');
console.log('3. Pick a number. Three is usually good for small data sets.');
console.log('4. Figure out what the three closest point to the mystery point are.');
console.log('5. The majority of the three closest points is the answer.');

console.json = function (object) {
	this.log(JSON.stringify(nodes, null, 4));
};

var Node = function (object) {
	for(var key in object) {
		this[key] = object[key];
	}
};

Node.prototype.measureDistance = function (area_range_obj, rooms_range_obj) {

    var area_range = area_range_obj.max - area_range_obj.min,
        rooms_range = rooms_range_obj.max - rooms_range_obj.min,
        neighbor,
        i;

    for (i in this.neighbors) {
        neighbor = this.neighbors[i];
    }
};


var NodeList = function (k) {
	this.nodes = [];
	this.k = k;
};

// perform normalization

NodeList.prototype.calculateRanges = function() {
	this.areas = { min: 1000000, max: 0 };
	this.rooms = { min: 1000000, max: 0 };

	var currentNode;

	for (var i in this.nodes) {

		currentNode = this.nodes[i];

		if  (this.rooms.min > currentNode.rooms) {
			this.rooms.min = currentNode.rooms;
		}

		if (this.rooms.max < currentNode.rooms) {
			this.rooms.max = currentNode.rooms;
		}

		if (this.areas.min > currentNode.area) {
			this.areas.min = currentNode.area;
		}

		if (this.areas.max < currentNode.area) {
			this.areas.max = currentNode.area;
		}

	}
};

NodeList.prototype.determineUnknown = function() {

    var i,
        j,
        outerNode,
        innerNode;

    this.calculateRanges();

    for (i in this.nodes) {

        outerNode = this.nodes[i];

        if (!outerNode.type) {
            outerNode.neighbors = [];

            for (j in this.nodes){
                innerNode = this.nodes[j];

                if (!innerNode.type) {
                    continue;
                }

                innerNode.neighbors.push(new Node(innerNode));
            }

            outerNode.mesureDistances(this.areas, this.rooms);
            outerNode.sortByDistance();

            console.log(outerNode.guessType(this.k));

        }



    }


};

var nodes = new NodeList(5);

nodes.nodes.push(new Node({area: 10, rooms: 4}));
nodes.nodes.push(new Node({area: 66, rooms: 2}));

nodes.calculateRanges();
console.json(nodes);