
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
  var key;
  for(key in object) {
    this[key] = object[key];
  }
};

Node.prototype.measureDistances = function (area_range_obj, rooms_range_obj) {
  var area_range = area_range_obj.max - area_range_obj.min,
    rooms_range = rooms_range_obj.max - rooms_range_obj.min,
    neighbor,
    i;

  for (i in this.neighbors) {
    neighbor = this.neighbors[i];
  }
};

Node.prototype.sortByDistance = function () {
  this.neighbors.sort(function (a,b) {
    return a.distane - b.distance;
  });
};

Node.prototype.guessType = function (k) {
  var types = {},
    guess = {
      type: false,
      count: 0
    },
    neighbor,
    type,
    i;

  for (i in this.neighbors.slice(0,k)) {
    neighbor = this.neighbors[i];
    if (!types[neighbor.type]) {
      types[neighbor.type] = 0;
    }
  }

  for (type in types) {
    if (types[types] > guess.count) {
      guess.type = type;
      guess.count = types[type];
    }
  }

  this.guess = guess;
  return types;
};


var NodeList = function (k) {
  this.nodes = [];
  this.k = k;
};

NodeList.prototype.add = function (node) {
  this.nodes.push(node);
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

      for (j in this.nodes) {
        innerNode = this.nodes[j];

        if (!innerNode.type) {
          continue;
        }

        innerNode.neighbors.push(new Node(innerNode));
      }

      outerNode.measureDistances(this.areas, this.rooms);
      outerNode.sortByDistance();

      console.log("k value:", outerNode.guessType(this.k));

    }

  }
};

var data = [
  {rooms: 1, area: 350, type: 'apartment'},
  {rooms: 2, area: 300, type: 'apartment'},
  {rooms: 3, area: 300, type: 'apartment'},
  {rooms: 4, area: 250, type: 'apartment'},
  {rooms: 4, area: 500, type: 'apartment'},
  {rooms: 4, area: 400, type: 'apartment'},
  {rooms: 5, area: 450, type: 'apartment'},

  {rooms: 7,  area: 850,  type: 'house'},
  {rooms: 7,  area: 900,  type: 'house'},
  {rooms: 7,  area: 1200, type: 'house'},
  {rooms: 8,  area: 1500, type: 'house'},
  {rooms: 9,  area: 1300, type: 'house'},
  {rooms: 8,  area: 1240, type: 'house'},
  {rooms: 10, area: 1700, type: 'house'},
  {rooms: 9,  area: 1000, type: 'house'},

  {rooms: 1, area: 800,  type: 'flat'},
  {rooms: 3, area: 900,  type: 'flat'},
  {rooms: 2, area: 700,  type: 'flat'},
  {rooms: 1, area: 900,  type: 'flat'},
  {rooms: 2, area: 1150, type: 'flat'},
  {rooms: 1, area: 1000, type: 'flat'},
  {rooms: 2, area: 1200, type: 'flat'},
  {rooms: 1, area: 1300, type: 'flat'},
];

var run = function () {
  var nodes = new NodeList(3),
    item;

  for(item in data) {
    nodes.add(new Node(data[item]));
  }

  nodes.determineUnknown();

//console.log(nodes);
};

run();
